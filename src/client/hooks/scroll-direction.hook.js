import { useState, useRef } from 'react';
import { useDocumentScroll } from 'hooks';
import { DIRECTION_TYPE } from 'client/constants';

function useScrollDirection() {
    /*
     * Here, we track the scrollPosition to compare
     * against that of the evt...
    */
    const scrollPosition = useRef({
        x: window.scrollX,
        y: window.scrollY
    });
    /* 
     * An object to hold directions along both axis...
    */
    const [direction, setDirection] = useState(() => ({
        x: DIRECTION_TYPE.LEFT,
        y: DIRECTION_TYPE.UP
    }));

    useDocumentScroll({
        scrollHandler: () => {
            /* 
            * A scroll evt fires and we capture both the 
            * direction and coordinates
            */
            const dX = window.scrollX < scrollPosition.current.x
                ? DIRECTION_TYPE.LEFT
                : DIRECTION_TYPE.RIGHT;
            
            const dY = window.scrollY < scrollPosition.current.y
                ? DIRECTION_TYPE.UP
                : DIRECTION_TYPE.DOWN;
            
            setDirection({
                x: dX,
                y: dY
            });
            /* 
             * Keep a reference to this to compare against, the next
             * time a scroll evt fires...
            */
            scrollPosition.current = {
                x: window.scrollX,
                y: window.scrollY
            };
        },
        eventOptions: {
            passive: false
        }
    });

    return direction;
}

export default useScrollDirection;
