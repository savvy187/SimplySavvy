import { useEffect, useState } from 'react';

export default function useNetworkStatus() {
    /* 
     * TODO: Replace this with a context...
    */
    const [isOnline, setNetworkStatus] = useState(navigator.onLine);

    /*  
     * A callback to use, which updates network status, for any 
     * of the network events...
    */
    const updateNetworkStatus = () => setNetworkStatus(navigator.onLine);

    useEffect(() => {
        /*  
         * We listen for offline and online network events...
        */
        window.addEventListener('offline', updateNetworkStatus());
        window.addEventListener('online', updateNetworkStatus());

        /* 
         * And clean up any previously registered events...
        */
        return () => {
            window.removeEventListener('offline', updateNetworkStatus());
            window.removeEventListener('online', updateNetworkStatus());            
        };
    }, []);

    return isOnline;
}
