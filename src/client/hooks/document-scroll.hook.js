import { useEffect, useRef } from 'react';

export default function useDocumentScroll(scrollHandler=() => {}) {
    const animationRef = useRef();

    useEffect(() => {
        const onScrollHanlder = (evt) => {
            /* 
             * Here, we're wrapping the passed-in callback inside of a call to
             * `requestAnimationFrame()`
            */
            animationRef.current = requestAnimationFrame(() => scrollHandler(evt));
        };

        document.addEventListener('scroll', onScrollHanlder);
        return () => {            
            /* 
             * And on cleanup, we cancel any pending animations...
            */
            document.removeEventListener('scroll', onScrollHanlder);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);
}
