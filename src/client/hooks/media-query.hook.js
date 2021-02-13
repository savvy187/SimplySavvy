import { useEffect, useState } from 'react';

export default function useMediaQuery(mediaQuery) {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const [matches, setMatches] = useState(mediaQueryList.matches);

    useEffect(() => {
        const changeHandler = (evt) => setMatches(evt.matches);        
        mediaQueryList.addEventListener('change', changeHandler);

        return () => mediaQueryList.removeEventListner('change', changeHandler);
    }, [mediaQuery]);

    return [matches, mediaQueryList.media];
}
