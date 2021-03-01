import React, { useState, useMemo, useRef } from 'react';
import _ from 'lodash';
import { useDocumentScroll } from 'hooks';
import { DIRECTION_TYPE } from 'client/constants';

const getDirectionalElement = ({ directions, axis, currentDirection }) => {
    const axisDirections = _.get(directions, axis, []);
    const directional = _.find(axisDirections, {
        type: currentDirection[axis]
    });
    const directionalElement = _.get(directional, 'component', null);    
    const defaulted = _.find(axisDirections, { isDefault: true });
    const defauledElement = _.get(defaulted, 'component', null);
    
    return !_.isNil(directionalElement)
        ? directionalElement
        : defauledElement;
    
};

function useDirectionalElement(directions) {
    /* 
     * Here, we track the scrollPosition to compare
     * against that of the evt...
    */
    const scrollPosition = useRef({
        x: window.scrollX,
        y: window.scrollY
    });

    /* 
     * We cannot yet determine a direction...
    */
    const [direction, setDirection] = useState(() => ({
        x: null,
        y: null
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

            scrollPosition.current = {
                x: window.scrollX,
                y: window.scrollY
            };
        },
        eventOptions: {
            passive: false
        }
    });
    

    return useMemo(() => {
        const YDirectionalElement = getDirectionalElement({                     
            directions,
            axis: 'y',
            currentDirection: direction
        });
        const XDirectionalElement = getDirectionalElement({                     
            directions,
            axis: 'x',
            currentDirection: direction
        });
        
        return (
            <>
                {
                    !_.isNil(YDirectionalElement)
                        ? <YDirectionalElement />
                        : null
                }
                {
                    !_.isNil(XDirectionalElement)
                        ? <XDirectionalElement />
                        : null
                }
            </>
        );
        
    }, [direction]);
}

export default useDirectionalElement;
