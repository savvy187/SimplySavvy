import { useEffect, useState, useCallback, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useQuery from 'hooks/query.hook';
import ApiClient, { CancelToken, isCancel } from 'utils/api-client';
import { NetworkContext } from 'contexts/network/network.context';
import { NETWORK_ACTION_TYPES } from 'contexts/network/network.reducer';

export default function useResource(options) {    
    const { id } = useParams();
    console.log(id);
    const query = useQuery();
    const [resourceOptions, setResourceOptions] = useState(options);    
    const cancelRef = useRef(null);
    const { selector, dispatchAction } = useContext(NetworkContext);        
    
    /* 
     * We need to wrap this setter inside of `useCallback` because 
     * of referential equality - the expected state return is an object
    */
    const updateResourceOptions = useCallback((options) => setResourceOptions(options), [resourceOptions]);    

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
            
                
            try {
                /* 
                 * First, we generate a new cancel token for use in cleanup...
                */           
                cancelRef.current = CancelToken.source();
                
                /*  
                * Dispatching an action to mark the start of a network request...
                */
                dispatchAction({
                    type: START_NETWORK_REQUEST,
                    route: resourceRoute
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
                    route: resourceRoute,
                    data: res.data,
                    statusCode: res.status
                });

            }  catch(error) {                
                if (isCancel(error)) {
                    
                    /* 
                     * Dispatching an action to mark the cancellation of the request...
                    */
                    dispatchAction({
                        type: CANCEL_NETWORK_REQUEST,
                        route: resourceRoute,
                        statusCode: res.status
                    });
                
                } else {
                    
                    dispatchAction({
                        type: NETWORK_REQUEST_FAIL,
                        route: resourceRoute,
                        statusCode: error.status,
                        error: error.message
                    });
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
        loading: selector('loading'),
        cancelled: selector('cancelled'),
        success: selector('success'),
        error: selector('error'),
        statusCode: selector(`requests[${resourceOptions.resourceRoute}].statusCode`),
        resource: selector(`requests[${resourceOptions.resourceRoute}].data`), 
        resourceOptions,
        cancelToken: cancelRef.current,
        updateResourceOptions
    };
}
