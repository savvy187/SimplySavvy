import { useEffect } from 'react';

export default function usePersistentStoreEvent(storeEventHandler=() => {}) {
    useEffect(() => {
        window.addEventListener('storage', storeEventHandler);
        return () => window.removeEventListener('storage', storeEventHandler);
    }, []);
}
