import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useScrollDirection, useDocumentScroll } from 'hooks';
import { UIContext } from 'contexts/ui/ui.context';
import { UI_ACTION_TYPES } from 'contexts/ui/ui.reducer';
import { DIRECTION_TYPE } from 'client/constants';

const { UPDATE_SCROLL_PROGRESS } = UI_ACTION_TYPES;

function useScrollProgress(pathname) {    
    const direction = useScrollDirection();
    const { selector, dispatchAction } = useContext(UIContext);
    const scrollProgress = selector(`routes.${pathname}.scrollProgress`);

    useDocumentScroll({
        scrollHandler: () => {
            if (direction === DIRECTION_TYPE.DOWN) {
                /* dispatchAction({
                    type: UPDATE_SCROLL_PROGRESS,
                    route: pathname,
                    scrollProgress: (window.scrollY/document.body.clientHeight) * 100
                }); */
            }
        },
        eventOptions: {
            passive: true
        }
    });

    return scrollProgress;
}

export default useScrollProgress;
