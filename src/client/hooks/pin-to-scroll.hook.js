import { useCallback } from 'react';

function usePinToScroll(ref, toggleClass) {
    return useCallback(() => {
        const offsetTop = ref.current.offsetTop;
        const scrollTop = window.pageYOffset;

        scrollTop > offsetTop
            ? ref.current.classList.add(toggleClass)
            : ref.current.classList.remove(toggleClass);

    }, [ref, toggleClass]);
}

export default usePinToScroll;
