import React, { useMemo, useCallback } from 'react';
import _ from 'lodash';
import { useScrollDirection } from 'hooks';

function useDirectionalElement({ ref, directions, pathname }) {
    const direction = useScrollDirection();

    const getDirectionalEntry = useCallback(({ directions, axis, currentDirection }) => {
        /*
         * axisDirections gives us the entire set of possible directions and associated
         * components. Some components may only show on a certain route.
        */
        const axisDirections = _.get(directions, axis, []);
        /* 
         * directional is the singular element to show for a given direction if
         * the route applies or there is no route specified and the direction 
         * is equal to the direction that is currently being scrolled in...
        */
        const directionEntry = _.find(axisDirections, (axisDirection) => {                
            const isCurrentDirection = axisDirection.type === currentDirection;        
            const hasNoRouteSpecified = _.isUndefined(axisDirection.routeMatch);
            const hasApplicableRoute = !_.isEmpty(axisDirection.routeMatch);
            return isCurrentDirection && (hasNoRouteSpecified || hasApplicableRoute);
        });
        
        return directionEntry;
    }, [pathname]);

    return useMemo(() => {
        /* 
         * A computed element to show for the Y Axis...
        */
        const yDirectionalEntry = getDirectionalEntry({
            directions,
            axis: 'y',
            currentDirection: direction.y
        });
        /* 
         * A computed element to show for the X Axis...
        */
        const xDirectionalEntry = getDirectionalEntry({                     
            directions,
            axis: 'x',
            currentDirection: direction.x
        });
        
        const YDirectionalElement = _.get(yDirectionalEntry, 'component');
        const XDirectionalElement = _.get(xDirectionalEntry, 'component');

        return (
            <>
                {
                    !_.isNil(YDirectionalElement)
                        ? (
                            <YDirectionalElement 
                                ref={ref} 
                                routeMatch={yDirectionalEntry.routeMatch} 
                            />
                        )
                        : null
                }
                {
                    !_.isNil(XDirectionalElement)
                        ? (
                            <XDirectionalElement
                                ref={ref}
                                routeMatch={xDirectionalEntry.routeMatch}
                            />
                        )
                        : null
                }
            </>
        );
        
    }, [direction, pathname]);
}

export default useDirectionalElement;
