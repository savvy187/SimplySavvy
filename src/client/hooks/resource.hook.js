import { useEffect, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useQuery from 'hooks/query.hook';
import ApiClient, { CancelToken, isCancel } from 'util/api-client';

export default function useResource(options) {
    const { id } = useParams();
    const query = useQuery();    
    const [resource, setResource] = useState(null);
    const [resourceOptions, setResourceOptions] = useState(options);    
    const cancelRef = useRef(null);
    /* 
     * We need to wrap this setter inside of `useCallback` because 
     * of referential equality - the expected state return is an object
    */
    const updateResourceOptions = useCallback((options) => setResourceOptions(options), []);
    
    useEffect(() => {
        const fetchResource = async () => {
            const { resourceRoute, ...rest } = resourceOptions;
            
            /* 
             * First, we generate a new cancel token for use in cleanup...
            */
            cancelRef.current = CancelToken.source();
            
            try {
                /* 
                 * Now we make the actual AJAX request, with cancellation token. 
                 * HTTP method not implied...
                */
                const res = await ApiClient({
                    ...rest,
                    id,
                    url: resourceRoute,
                    query: query.toString(),
                    CancelToken: cancelRef.current.token
                });
                setResource(res);
            }  catch(err) {
                
                if (isCancel(err)) {
                    /* 
                     * What should we do here?
                    */
                    console.log('Request cancelled...');
                } else {
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
        resource, 
        resourceOptions,
        cancelToken: cancelRef.current,
        updateResourceOptions
    };
}
