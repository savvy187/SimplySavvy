import { useLayoutEffect } from 'react';

export default function useDocumentScroll(scrollHandler) {
    useLayoutEffect(() => {
        const onScrollHanlder = (evt) => {
            requestAnimationFrame(() => scrollHandler(evt));
        };

        document.addEventListener('scroll', onScrollHanlder);
        return () => document.removeEventListener('scroll', onScrollHanlder);
    });    
}
