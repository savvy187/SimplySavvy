import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useScrollProgress, useArticleSectionsNavigation } from 'hooks';
import { MAX_SCROLL_PROGRESS } from 'client/constants';

const ProgressBar = React.forwardRef(({ className, location, routeMatch }, ref) => {
    const { current: navRef } = ref;           
    const scrollProgress = useScrollProgress({
        pathname: routeMatch.path,
        ref: navRef
    });
    const articleSectionsNavigation = useArticleSectionsNavigation({
        location,
        routeMatch
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
            <nav className="article-sections-navigation">
                { articleSectionsNavigation }
            </nav>
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
    justify-content: flex-start;
    padding: 0 20px;
    height: ${({ theme }) => theme.dimensions.primary_nav.height};
    color: ${({ theme }) => theme.colors.indicator};
    font: ${({ theme }) => theme.fonts.indicator};    
    overflow: hidden;

    .scroll-progress {
        flex-shrink: 0;
    }

    .article-sections-navigation {
        flex: none;        
        height: inherit;        
        padding: 0 10px;
        overflow-x: scroll;    
    }

    .article-sections-navigation::-webkit-scrollbar {
        display: none;
    }
`;
