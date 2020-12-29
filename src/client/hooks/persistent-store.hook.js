import { useReducer, useEffect, useCallback } from 'react';
import _ from 'lodash';

export default function usePersistentStore(localStorageKey, reducer={}, initialState) {    
    const [state, dispatchAction] = useReducer(reducer, null, () => {
        try {
            /* 
             * Here we attempt to prime the store with whatever
             * state tree was last saved, but first we must determine 
             * if localStorage actually has an item with that key...
            */
            const item = localStorage.getItem(localStorageKey);

            return !_.isEmpty(item) ? JSON.parse(item) : initialState;
        } catch (err) {
            /* 
             * Local storage is potentially corrupted, return 
             * initial state...
            */
            try {
                localStorage.removeItem(localStorageKey);            
            } catch(err) {
                console.error('Unable to interact with localStorage interface: ', err);
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
    const selector = useCallback((stateKey) => _.get(state, stateKey, state), [state]);
    
    useEffect(() => {
        /* 
         * We attempt to serialize the state to local storage, each
         * time it is mutated...
        */
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(selector()));
        } catch(err) {
            /* 
             * Probably not serious enough to do anything other than,
             * log and forget...
            */
            console.error('Failed to serialize local storage', err, localStorageKey);
        }
    }, [state]);

    return [selector, dispatch];
}
