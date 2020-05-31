import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver({ root=null, rootMargin, threshhold=0 }) {
    /* 
     * Here we setup state for the node and entry, as well as, set a ref to
     * hold a reference to the observer...
    */
    const [node, setNode] = useState(null);
    const [entry, setEntry] = useState({});
    const observer = useRef(null);

    useEffect(() => {

        if (observer.current) {
            /* 
             * If we have a handle to any previous observers, stop observing
             * on thier nodes and disconnect...
            */
            observer.current.disconnect();
        }

        /* 
         * Now we create a new instance of `IntersectionObserver` and supply
         * a callback and our options. Our callback simply updates are exposed
         * state representing the intersection entry...
        */
        observer.current = new IntersectionObserver(
            ([entry]) => setEntry(entry),
            { root, rootMargin, threshhold }
        );

        /* 
         * Now, we save a reference to the current observer, to 
         * use when cleaning up...
        */
        const { current: currentObserver } = observer;

        if (node) {
            /* 
             * If we have access to a node, start observing it...
            */
            observer.current.observe(node);
        }

        return () => currentObserver.disconnect();

    }, [node, root, rootMargin, threshhold]);

    /*
     * We return both the intersection entry and a setter to update the 
     * node to observe on... 
    */
    return [entry, setNode];
}
