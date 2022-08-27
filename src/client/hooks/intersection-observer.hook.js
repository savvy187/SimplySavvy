import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import _ from 'lodash';

export default function useIntersectionObserver({ root, rootMargin, threshold, entryCallback }) {
    const observer = useRef(null);    
    const rootBounds = useRef(null);

    const unobserve = useCallback((target) => {
        if (observer.current) {
            observer.current.unobserve(target);
        }
    }, [observer.current]);

    const observe = useCallback((target) => {
        if (observer.current) {
            observer.current.observe(target);
        }
    }, [observer.current]);

    const debugTarget = useMemo(() => {       
        return (
            <div className="debug-target">
                <div ref={rootBounds} className="root"/>
            </div>
        );
    }, []);

    useEffect(() => {        
        if (observer.current) {
            /* 
             * If we have a handle to any previous observer instances, stop observing
             * on thier nodes and disconnect...
            */                               
            observer.current.disconnect();
        }
        
        observer.current = new IntersectionObserver((entries) => {            
            entryCallback(entries);

            if (rootBounds.current) {
                const entry = _.first(entries);
                rootBounds.current.style.top = `${entry.rootBounds.y}px`;
                rootBounds.current.style.left = `${entry.rootBounds.x}px`;
                rootBounds.current.style.width = `${entry.rootBounds.width}px`;                    
                rootBounds.current.style.height = `${entry.rootBounds.height}px`;                
            }
        }, { 
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
            currentObserver.disconnect();
            observer.current = null;
        };

    }, [root, rootMargin, threshold]);

    return { 
        observe, 
        unobserve,
        debugTarget
    };
}
