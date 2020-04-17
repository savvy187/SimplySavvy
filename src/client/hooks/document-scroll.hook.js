import { useLayoutEffect, useRef } from 'react';

export default function useDocumentScroll(scrollHandler) {
    const animationRef = useRef();

    useLayoutEffect(() => {
        const onScrollHanlder = (evt) => {
            animationRef.current = requestAnimationFrame(() => scrollHandler(evt));
        };

        document.addEventListener('scroll', onScrollHanlder);
        return () => {
            document.removeEventListener('scroll', onScrollHanlder);
            cancelAnimationFrame(animationRef.current);
        };
    });    
}
