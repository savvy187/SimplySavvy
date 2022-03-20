import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';

function useScrollToHash({ idPrefix='', scrollOptions={} }) {
    const { hash } = useLocation();
    
    useEffect(() => {
        if (!_.isEmpty(hash)) {
            const hashId = hash.substr(1);
            const elementId = `${idPrefix}${hashId}`;
            const el = document.getElementById(elementId);
            
            if (el) {
                el.scrollIntoView(scrollOptions);
            }
        }
    }, [hash]);
}

export default useScrollToHash;
