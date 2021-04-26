import { useContext } from 'react';
import _ from 'lodash';
import { useScrollDirection, useDocumentScroll } from 'hooks';
import { UIContext } from 'contexts/ui/ui.context';
import { UI_ACTION_TYPES } from 'contexts/ui/ui.reducer';
import { DIRECTION_TYPE, AXIS_TYPE, MAX_SCROLL_PROGRESS } from 'client/constants';

const { UPDATE_SCROLL_PROGRESS } = UI_ACTION_TYPES;

function useScrollProgress(pathname) {    
    const direction = useScrollDirection(AXIS_TYPE.Y);
    const { selector, dispatchAction } = useContext(UIContext);
    const scrollProgress = selector({
        stateKey: `routes.${pathname}.scrollProgress`,
        defaultValue: 0,
        parser: _.parseInt
    });
    
    useDocumentScroll({
        scrollHandler: () => {
            const shouldReportProgress = (
                direction === DIRECTION_TYPE.DOWN
                && scrollProgress < MAX_SCROLL_PROGRESS
            );
    
            if (shouldReportProgress) {
                dispatchAction({
                    type: UPDATE_SCROLL_PROGRESS,
                    route: pathname,
                    scrollProgress: Math.round((window.scrollY / document.body.clientHeight) * 100)
                });
            }
        },
        eventOptions: {
            passive: false
        }
    });

    return scrollProgress;
}

export default useScrollProgress;
