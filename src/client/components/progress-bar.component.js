import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useScrollProgress } from 'hooks';    
import { MAX_SCROLL_PROGRESS } from 'client/constants';

const ProgressBar = React.forwardRef(({ className, location, routeMatch }, ref) => {
    const { current: navRef } = ref;    
    const scrollProgress = useScrollProgress({
        pathname: routeMatch.path,
        ref: navRef
    });
    

    return (
        <div className={className}>
            <span className="scroll-progress">
                {
                    scrollProgress >= MAX_SCROLL_PROGRESS
                        ? 'Article Read!'
                        : `Reading Progress: ${scrollProgress}%`
                }
            </span>
        </div>
    );
});

ProgressBar.propTypes = {    
    className: PropTypes.string.isRequired,
    routeMatch: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default styled(ProgressBar)`
    display: flex;
    align-items: center;
    flex-basis: content;
    padding: 0 20px;    
    height: 100%;    
    color: ${({ theme }) => theme.colors.indicator};
    font: ${({ theme }) => theme.fonts.indicator};        
`;
