import { useContext, useCallback } from 'react';
import _ from 'lodash';
import { useScrollDirection, useDocumentScroll } from 'hooks';
import { UIContext } from 'contexts/ui/ui.context';
import { UI_ACTION_TYPES } from 'contexts/ui/ui.reducer';
import { DIRECTION_TYPE, AXIS_TYPE, MAX_SCROLL_PROGRESS } from 'client/constants';

const { 
    UPDATE_SCROLL_PROGRESS,
    RESET
} = UI_ACTION_TYPES;

function useScrollProgress({ pathname, ref }) {
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

    const resetProgress = useCallback(() => {
        dispatchAction({ type: RESET });
        window.scrollTo(0, 0);
    });
    
    useDocumentScroll({
        scrollHandler: () => {
            const axis = (direction === DIRECTION_TYPE.DOWN)
                ? AXIS_TYPE.Y
                : AXIS_TYPE.X;
            
            const containerOffset = getRefOffset(axis);

            const shouldReportProgress = (
                containerOffset === 0
                && scrollProgress < MAX_SCROLL_PROGRESS
            );

            
            if (shouldReportProgress) {
                const windowHeight = window.innerHeight;
                const documentScrollHeight = document.documentElement.scrollHeight;                
                const trackLength = documentScrollHeight - windowHeight;                
                const scrollProgress = Math.floor((window.scrollY / trackLength) * 100);
                
                dispatchAction({
                    type: UPDATE_SCROLL_PROGRESS,
                    route: pathname,
                    scrollProgress
                });
            }
        },
        eventOptions: {
            passive: false
        }
    });

    return {
        scrollProgress,
        resetProgress    
    };
}

export default useScrollProgress;
