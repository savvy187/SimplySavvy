import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useQuery from 'hooks/query.hook';

export default function useResource(options) {
    const [resource, setResource] = useState(null);
    const [resourceOptions, setResourceOptions] = useState(options);
    const { id } = useParams();
    const query = useQuery();

    useEffect(() => {
        const fetchResource = async () => {
            const { resourceRoute, ...rest } = resourceOptions;
            try {
                const res = await Axios(resourceRoute, { ...rest, id });
                setResource(res);
            }  catch(err) {
                console.log(err);
            }
        };
        fetchResource();
    }, [resourceOptions, query]);

    return [resource, resourceOptions, setResourceOptions];
}
