import { useEffect, useState } from 'react';

export default function useMediaQuery(mediaQuery) {
    /* 
     * Here, we build a MediaQueryList to track whether or not
     * the supplied media query should be applied or not...
    */
    const mediaQueryList = window.matchMedia(mediaQuery);
    const [matches, setMatches] = useState(mediaQueryList.matches);

    useEffect(() => {
        /* 
         * A change evt is fired and we again determine if 
         * the media query should be applied...
        */
        const changeHandler = (evt) => setMatches(evt.matches);        
        mediaQueryList.addEventListener('change', changeHandler);

        return () => mediaQueryList.removeEventListner('change', changeHandler);
    }, [mediaQuery]);

    return [matches, mediaQueryList.media];
}
