import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver({ root=null, rootMargin='0px', threshhold=0 }) {
    /* 
     * Here we setup state for the node and entry, as well as, set a ref to
     * hold a reference to the observer...
    */
    const [node, setNode] = useState(null);
    const [bounds, setBounds] = useState(null);
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
            ([entry]) => {
                setBounds(entry.rootBounds);
                setEntry(entry);
                
                if (entry.isIntersecting) {
                    //entry.target.style.border = '1px solid blue';
                    console.log('===================');
                    console.log('intersectionRatio: ', entry.intersectionRatio, entry.target);
                    console.log('===================');
                } else {
                    //entry.target.style.border = 'none';
                }
                
                const opacity = entry.intersectionRatio || 0;
                //const show = entry.intersectionRatio >= 0.9;
                //const nav = entry.target.querySelectorAll('nav a');
                //const img = entry.target.querySelector('img');
                
                entry.target.style.opacity = `${opacity}`;
                //img.style.filter = show ? 'none' : theme.filters.blur_1;
        
                /*nav.forEach((link) => {
                    link.style.opacity = show ? 1 : 0;
                }); */
            },
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
    return [entry, bounds, setNode];
}

/* const opacity = entry.intersectionRatio || 0;
    const show = entry.intersectionRatio >= 0.9;
    const nav = entry.target.querySelectorAll('nav a');
    const img = entry.target.querySelector('img');
        
    entry.target.style.opacity = `${opacity}`;
    img.style.filter = show ? 'none' : theme.filters.blur_1;

    nav.forEach((link) => {
        link.style.opacity = show ? 1 : 0;
    }); */