import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver({ root=null, rootMargin='0px', threshold=0 }) {
    /* 
     * Here, we setup a piece of state to trak the entries of the intersection observer's event,
     * along with a ref to hold the value of the intersectio observer itself...
    */
    const [entries, setEntries] = useState([]);
    const observer = useRef(null);

    useEffect(() => {
        console.log('Effect running...');

        if (observer.current) {
            /* 
             * If we have a handle to any previous observer instances, stop observing
             * on thier nodes and disconnect...
            */                   
            console.log('Disconnecting Observer...');
            observer.current.disconnect();
        }

        console.log('Initializing Observer...');
        observer.current = new IntersectionObserver((entries) => {
            //console.log('Observer Callback: ', entries);
            setEntries(entries);
        }, { root, rootMargin, threshold });

        /* 
         * Now, we save a reference to the current observer, to 
         * use when cleaning up...
        */
        const { current: currentObserver } = observer;

        return () => {
            console.log('Cleaning up observer and disconnecting...');
            currentObserver.disconnect();
            observer.current = null;
        };

    }, [root, rootMargin, threshold]);

    return { entries, observer: observer.current };
}
