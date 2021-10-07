import { useContext, useCallback, useRef, useEffect } from 'react';
import _ from 'lodash';
import { useScrollDirection, useDocumentScroll } from 'hooks';
import { UIContext } from 'contexts/ui/ui.context';
import { UI_ACTION_TYPES } from 'contexts/ui/ui.reducer';
import { DIRECTION_TYPE, AXIS_TYPE, MAX_SCROLL_PROGRESS } from 'client/constants';

const { UPDATE_SCROLL_PROGRESS } = UI_ACTION_TYPES;

function useScrollProgress({ pathname, ref, initialRefOffset=0 }) {
    const direction = useScrollDirection(AXIS_TYPE.Y);
    const { selector, dispatchAction } = useContext(UIContext);
    
    const scrollProgress = selector({
        stateKey: `routes.${pathname}.scrollProgress`,
        defaultValue: 0,
        parser: _.parseInt
    });

    const getRefOffset = useCallback(
        (axis) => ref && ref.getBoundingClientRect()[axis],
        [ref]
    );
    
    useDocumentScroll({
        scrollHandler: () => {
            const axis = (direction === DIRECTION_TYPE.DOWN)
                ? AXIS_TYPE.Y
                : AXIS_TYPE.X;
            const containerOffset = getRefOffset(axis);
            
            const shouldReportProgress = (
                containerOffset === 0
                && direction === DIRECTION_TYPE.DOWN
                && scrollProgress < MAX_SCROLL_PROGRESS
            );
            
            if (shouldReportProgress) {
                const bodyHeight = document.body.clientHeight;
                const scrollOffset = Math.round((window.scrollY / bodyHeight) * 100);
                const scrollProgress = scrollOffset - initialRefOffset;
                
                console.log('=============');
                console.log('scrollY: ', window.scrollY);
                console.log('scrollOffset: ', scrollOffset);
                console.log('initialOffset: ', initialRefOffset);
                console.log('scrollProgress: ', scrollProgress);
                
                
                /* dispatchAction({
                    type: UPDATE_SCROLL_PROGRESS,
                    route: pathname,
                    scrollProgress
                }); */
            }
        },
        eventOptions: {
            passive: false
        }
    });

    return scrollProgress;
}

export default useScrollProgress;
