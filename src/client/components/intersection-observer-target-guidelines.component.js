import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import _ from 'lodash';
//import { useIntersectionObserver } from 'hooks';

const IntersectionObserverTargetGuidelines = ({ className }) => {
    const theme = useContext(ThemeContext);
    /* const [node, entry] = useIntersectionObserver({        
        rootMargin: theme.dimensions.primary_nav.intersection_observer_root_margin,
        threshold: 0
    }); */
    //const { rootBounds: bounds } = entry;
    
    /* return (
        <div 
            className={className}
            ref={node}
            style={{
                top: `${_.get(bounds, 'top')}px`,
                left: `${_.get(bounds, 'left')}px`,
                width: `${_.get(bounds, 'width')}px`,
                height: `${_.get(bounds, 'height')}px`
            }}
        />
    ); */
};

IntersectionObserverTargetGuidelines.propTypes = {
    className: PropTypes.string.isRequired
};

export default styled(IntersectionObserverTargetGuidelines)`
    position: fixed;
    border: 1px solid red;
`;
