import Axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useQuery from 'hooks/query.hook';

export default function useResource(options) {
    const { id } = useParams();
    const query = useQuery();    
    const [resource, setResource] = useState(null);
    const [resourceOptions, setResourceOptions] = useState(options);    
    /* 
     * We need to wrap this setter inside of `useCallback` because 
     * of referential equality - the expected state return is an object
    */
    const updateResourceOptions = useCallback((options) => setResourceOptions(options), []);
    
    useEffect(() => {
        const fetchResource = async () => {            
            const { resourceRoute, ...rest } = resourceOptions;
            try {
                /* 
                 * Now we make the actual AJAX request, HTTP method not implied...
                */
                const res = await Axios({
                    ...rest,
                    id,
                    url: resourceRoute,
                    query: query.toString()
                });
                setResource(res);
            }  catch(err) {
                /* 
                 * This needs to be an instance of a HTTP Error
                */
                throw new Error(err.message);
            }
        };
        fetchResource();
    }, [resourceOptions, id, query.toString()]);

    return [resource, resourceOptions, updateResourceOptions];
}
