import { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useQuery from 'hooks/query.hook';
import ApiClient, { CancelToken, isCancel } from 'util/api-client';
import { AppContext } from 'contexts/app/app.context';
import { NETWORK_ACTION_TYPES } from 'contexts/app/app.reducer';

export default function useResource(options) {
    const { id } = useParams();
    const query = useQuery();
    const [resourceOptions, setResourceOptions] = useState(options);    
    const cancelRef = useRef(null);
    const [selector, dispatchAction] = useContext(AppContext);
    /* 
     * We need to wrap this setter inside of `useCallback` because 
     * of referential equality - the expected state return is an object
    */
    const updateResourceOptions = useCallback((options) => setResourceOptions(options), []);
    
    useEffect(() => {
        const fetchResource = async () => {
            let res;
            const { resourceRoute, ...rest } = resourceOptions;
            const { 
                START_NETWORK_REQUEST, 
                CANCEL_NETWORK_REQUEST,
                NETWORK_REQUEST_SUCCESS,
                NETWORK_REQUEST_FAIL
            } = NETWORK_ACTION_TYPES;
            
            /* 
             * First, we generate a new cancel token for use in cleanup...
            */
            cancelRef.current = CancelToken.source();            

            try {
                /*  
                * Dispatching an action to mark the start of a network request...
                */
                dispatchAction({
                    type: START_NETWORK_REQUEST
                });

                /* 
                 * Now we make the actual AJAX request, with cancellation token. 
                 * HTTP method not implied...
                */
                res = await ApiClient({
                    ...rest,
                    id,
                    url: resourceRoute,
                    query: query.toString(),
                    CancelToken: cancelRef.current.token
                });
                
                /* 
                 * Disptaching a success action to set the data to the store...
                */
                dispatchAction({
                    type: NETWORK_REQUEST_SUCCESS,                    
                    data: res.data,
                    status: res.status
                });
            }  catch(err) {
                
                if (isCancel(err)) {
                    /* 
                     * Dispatching an action to mark the cancellation of the request...
                    */
                    dispatchAction({
                        type: CANCEL_NETWORK_REQUEST,
                        requestId: res.headers['X-request-id'],
                        status: res.status
                    });
                } else {
                    dispatchAction({
                        type: NETWORK_REQUEST_FAIL,
                        requestId: res.headers['X-request-id'],
                        status: res.status,
                        error: res.error
                    });
                    /* 
                    * This needs to be an instance of a HTTP Error
                    */
                    throw new Error(err.message);
                }

            }

            /* 
             * As part of cleanup, we save a reference to the 
             * stale request and cancel any outstanding ones...
            */
            const { current: currentCancelRef } = cancelRef;

            return () => currentCancelRef.cancel();
        };
        fetchResource();
    }, [resourceOptions, id, query.toString()]);

    return {
        resource: selector('network.requests'), 
        resourceOptions,
        cancelToken: cancelRef.current,
        updateResourceOptions
    };
}
