import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import _ from 'lodash';
import { useIntersectionObserver } from 'hooks';

const IntersectionObserverTargetGuidelines = ({ className }) => {
    const theme = useContext(ThemeContext);
    const primarNavHeight = _.parseInt(theme.dimensions.primary_nav.height);
    const [, bounds, setNode] = useIntersectionObserver({
        rootMargin: `${-2 * primarNavHeight}px 0px`,
        threshold: 0        
    });    
    return (
        <div 
            className={className}
            ref={setNode}
            style={{
                top: `${_.get(bounds, 'top')}px`,
                left: `${_.get(bounds, 'left')}px`,
                width: `${_.get(bounds, 'width')}px`,
                height: `${_.get(bounds, 'height')}px`
            }}
        />
    );
};

IntersectionObserverTargetGuidelines.propTypes = {
    className: PropTypes.string.isRequired
};

export default styled(IntersectionObserverTargetGuidelines)`
    position: fixed;
    border: 1px solid red;
`;
