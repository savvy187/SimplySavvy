import { useEffect, useRef, useCallback } from 'react';

export default function useIntersectionObserver({ root, rootMargin, threshold, entryCallback }) {
    const observer = useRef(null);

    const unobserve = useCallback((target) => {
        if (observer.current) {
            observer.current.unobserve(target);
        }
    }, [observer.current]);

    const observe = useCallback((target) => {
        if (observer.current) {
            observer.current.observe(target);
        }
    });

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
        observer.current = new IntersectionObserver(entryCallback, { 
            root, 
            rootMargin, 
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

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

    return { observe, unobserve };
}
