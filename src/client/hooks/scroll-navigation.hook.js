import React, { useMemo, useEffect, useState } from 'react';
import { Links } from 'components';
import { AXIS_TYPE, DIRECTION_TYPE } from 'client-constants';

const { ClickAnchor } = Links;

function useScrollNavigation({ axis, scrollAmount, scrollContainerRef }) {
    const [coords, setCoords] = useState({ [AXIS_TYPE.X]: 0, [AXIS_TYPE.Y]: 0 });
    
    const handleClick = (evt, scrollDirection) => {
        setCoords({
            [AXIS_TYPE.X]: (
                scrollDirection === DIRECTION_TYPE.LEFT
                    ? -1 * scrollAmount
                    : scrollAmount
            ),
            [AXIS_TYPE.Y]: (
                scrollDirection === DIRECTION_TYPE.UP
                    ? -1 * scrollAmount
                    : scrollAmount
            )
        });
    };

    const navigation = useMemo(() => {
        const previousScrollDirection = axis === AXIS_TYPE.x            
            ? DIRECTION_TYPE.LEFT
            : DIRECTION_TYPE.UP;
        
        const nextScrollDirection = axis === AXIS_TYPE.x
            ? DIRECTION_TYPE.RIGHT
            : DIRECTION_TYPE.DOWN;

        return {
            previous: (
                <ClickAnchor 
                    onClick={(evt) => handleClick(evt, previousScrollDirection)}
                    decoratorClass="scroll-navigation-anchor previous"
                >
                    Previous
                </ClickAnchor>
            ),
            next: (
                <ClickAnchor 
                    onClick={(evt) => handleClick(evt, nextScrollDirection)}
                    decoratorClass="scroll-navigation-anchor next"
                >
                    Next
                </ClickAnchor>
            )
        };
    }, [axis]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy(
                coords[AXIS_TYPE.X],
                coords[AXIS_TYPE.Y]
            );
        }
    }, [coords, scrollContainerRef.current]);

    return navigation;
}

export default useScrollNavigation;
