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
            {
                scrollProgress >= MAX_SCROLL_PROGRESS
                    ? <span>Article Read!</span>
                    : <span>Reading Progress: {scrollProgress}%</span>
            }
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
    justify-content: space-between;
    padding: 0 20px;
    height: ${({ theme }) => theme.dimensions.primary_nav.height};
    color: ${({ theme }) => theme.colors.indicator};
    font: ${({ theme }) => theme.fonts.indicator};
    border: 1px solid red;

    .article-sections-navigation {        
        height: inherit;
        overflow: hidden;
        padding: 0 10px;
        flex-grow: 10;
        border: 1px solid black;
    }
`;
