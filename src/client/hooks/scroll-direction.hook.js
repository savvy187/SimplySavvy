import { useContext, useRef } from 'react';
import _ from 'lodash';
import { UIContext } from 'contexts/ui/ui.context';
import { useDocumentScroll } from 'hooks';
import { UI_ACTION_TYPES } from 'contexts/ui/ui.reducer';
import { DIRECTION_TYPE, AXIS_TYPE } from 'client/constants';

const { UPDATE_SCROLL_DIRECTION } = UI_ACTION_TYPES;

function useScrollDirection(axis) {
    const isValidAxis = _.includes(_.values(AXIS_TYPE), axis);
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
    const { selector, dispatchAction } = useContext(UIContext);
    const direction = selector({
        stateKey: 'scrollDirection',
        defaultValue: {
            x: DIRECTION_TYPE.LEFT,
            y: DIRECTION_TYPE.UP
        },
        transformer: isValidAxis
            ? (state) => state[axis]
            : null
    });
    
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

            dispatchAction({
                type: UPDATE_SCROLL_DIRECTION,
                scrollDirection: { x: dX, y: dY }
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
