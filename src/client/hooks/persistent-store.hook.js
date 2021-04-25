import { useReducer, useEffect, useCallback } from 'react';
import _ from 'lodash';

export default function usePersistentStore(store, reducer = {}, initialState) {
    const { storageType, storageKey } = store;

    const [state, dispatchAction] = useReducer(reducer, null, () => {
        try {
            /* 
             * Here we attempt to prime the store with whatever
             * state tree was last saved, but first we must determine 
             * if the store actually has an item with that key...
            */
            const item = window[storageType].getItem(storageKey);

            return !_.isEmpty(item) ? JSON.parse(item) : initialState;
        } catch (err) {
            /* 
             * The store is potentially corrupted, return 
             * initial state...
            */
            try {
                window[storageType].removeItem(storageKey);            
            } catch(err) {
                console.error(`Unable to interact with ${storageType} interface: `, err);
            }
        }

        return initialState;
    });

    /* 
     * We need to wrap this setter inside of `useCallback` because 
     * of referential equality - the expected state returned is an object
    */
    const dispatch = useCallback((action) => dispatchAction(action), []);

    /* 
     * We provide a selector to return a portion of the state tree, instead
     * of returning the whole tree, each time...
     * 
     * TODO: memoize? Use state[stateKey] on watcher?
    */
    const selector = useCallback((stateKey, defaultValue) => {
        const defaulted = _.isUndefined(defaultValue) ? state : defaultValue;
        return _.get(state, stateKey, defaulted);
    }, [state]);
    
    useEffect(() => {
        /* 
         * We attempt to serialize the state to local storage, each
         * time it is mutated...
        */
        try {
            window[storageType].setItem(storageKey, JSON.stringify(selector()));
        } catch(err) {
            /* 
             * Probably not serious enough to do anything other than,
             * log and forget...
            */
            console.error(`Failed to serialize ${storageType} entry`, err, storageKey);
        }
    }, [state]);

    return [selector, dispatch];
}
