import { useReducer, useEffect, useCallback } from 'react';

export default function usePersistentStore(localStorageKey, reducer={}, initialState) {
    const [state, dispatchAction] = useReducer(reducer, () => {
        try {
            /* 
             * Here we attempt to prime the store with whatever
             * state tree was last saved...
            */
            return JSON.parse(localStorage.getItem(localStorageKey));
        } catch (err) {
            /* 
             * Local storage is potentially corrupted, return 
             * initial state...
            */
            localStorage.deleteItem(localStorageKey);
            return initialState;
        }
    });

    /* 
     * We need to wrap this setter inside of `useCallback` because 
     * of referential equality - the expected state returned is an object
    */
    const dispatch = useCallback((action) => dispatchAction(action), []);

    useEffect(() => {
        /* 
         * We attempt to serialize the state to local storage, each
         * time it is mutated...
        */
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        } catch(err) {
            /* 
             * Probably not serious enough to do anything other than,
             * log and forget...
            */
            console.log('Failed to serialize local storage', localStorageKey);
        }
    }, [state]);

    return [state, dispatch];
}
