import { useEffect, useContext } from 'react';
import { AppContext } from 'contexts/app/app.context';
import { NETWORK_ACTION_TYPES } from 'contexts/app/app.reducer';

export default function useNetworkStatus() {
    /* 
     * An Action Type to dispatch when updating network status... 
    */
    const { UPDATE_NETWORK_STATUS } = NETWORK_ACTION_TYPES;    
    const [selector, dispatchAction] = useContext(AppContext);    

    /*  
     * A callback to use, which updates network status, for any 
     * of the network events...
    */
    const updateNetworkStatus = dispatchAction({
        type: UPDATE_NETWORK_STATUS,
        online: navigator.onLine
    });

    useEffect(() => {
        /*  
         * We listen for offline and online network events...
        */
        window.addEventListener('offline', updateNetworkStatus);
        window.addEventListener('online', updateNetworkStatus);

        /* 
         * And clean up any previously registered events...
        */
        return () => {
            window.removeEventListener('offline', updateNetworkStatus);
            window.removeEventListener('online', updateNetworkStatus);            
        };
    }, []);

    return selector('network.online');
}
