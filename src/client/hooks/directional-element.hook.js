import React, { useMemo } from 'react';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import { useScrollDirection } from 'hooks';

const getDirectionalElement = ({ directions, axis, currentDirection, pathname }) => {    
    /*
     * axisDirections gives up the entire set of possible directions and associated
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
        const hasNoRouteSpecified = _.isEmpty(axisDirection.routes);        
        const hasApplicableRoute = _.includes(axisDirection.routes, pathname);        
        return isCurrentDirection && (hasNoRouteSpecified || hasApplicableRoute);
    });
    
    return _.get(directionEntry, 'component', null);
};

function useDirectionalElement(directions) {
    const { pathname } = useLocation();
    const direction = useScrollDirection();    

    return useMemo(() => {
        /* 
         * A computed element to show for the Y Axis...
        */
        const YDirectionalElement = getDirectionalElement({                     
            directions,
            axis: 'y',
            currentDirection: direction.y,
            pathname
        });
        /* 
         * A computed element to show for the X Axis...
        */
        const XDirectionalElement = getDirectionalElement({                     
            directions,
            axis: 'x',
            currentDirection: direction.x,
            pathname
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
        
    }, [direction, pathname]);
}

export default useDirectionalElement;
