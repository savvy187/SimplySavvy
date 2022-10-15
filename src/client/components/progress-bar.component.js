import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useScrollProgress } from 'hooks';    
import { MAX_SCROLL_PROGRESS } from 'client/constants';
import { Links } from 'components';

const { ClickAnchor } = Links;

const ProgressBar = React.forwardRef(({ className, routeMatch }, ref) => {
    const { current: navRef } = ref;    
    const { scrollProgress, resetProgress } = useScrollProgress({
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
            |      
            <ClickAnchor
                onClick={resetProgress}
                displayAs="NavAnchor"
            >
                Reset
            </ClickAnchor>
            <ClickAnchor
                displayAs="NavAnchor"
            >
                Tweet
            </ClickAnchor>
            <ClickAnchor
                displayAs="NavAnchor"
            >
                Share
            </ClickAnchor>
            <ClickAnchor
                displayAs="NavAnchor"
            >
                Recommend
            </ClickAnchor>
            
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
