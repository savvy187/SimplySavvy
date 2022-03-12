import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useScrollProgress, useArticleSectionsNavigation } from 'hooks';
import { MAX_SCROLL_PROGRESS } from 'client/constants';

const ProgressBar = React.forwardRef(({ className }, ref) => {
    const { current: navRef } = ref;    
    const { pathname } = useLocation();    
    const scrollProgress = useScrollProgress({
        pathname,
        ref: navRef
    });
    const articleSectionsNavigation = useArticleSectionsNavigation();
    return (
        <div className={className}>
            {
                scrollProgress >= MAX_SCROLL_PROGRESS
                    ? <span>Article Read!</span>
                    : <span>Reading Progress: {scrollProgress}%</span>
            }
            {
                articleSectionsNavigation
            }
        </div>
    );
});

ProgressBar.propTypes = {    
    className: PropTypes.string.isRequired
};

export default styled(ProgressBar)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    height: ${({ theme }) => theme.dimensions.primary_nav.height};
    color: ${({ theme }) => theme.colors.indicator};
    font: ${({ theme }) => theme.fonts.indicator};
`;
