import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled, { ThemeContext } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useScrollProgress } from 'hooks';
import { MAX_SCROLL_PROGRESS } from 'client/constants';

const ProgressBar = React.forwardRef(({ className }, ref) => {
    const { current: navRef } = ref;
    const { dimensions } = useContext(ThemeContext);
    const { pathname } = useLocation();
    const logoContainerHeight = _.get(dimensions, 'logo_container.height');
    const scrollProgress = useScrollProgress({
        pathname,
        ref: navRef,
        initialRefOffset: _.parseInt(logoContainerHeight)
    });
    return (
        <div className={className}>
            {
                scrollProgress >= MAX_SCROLL_PROGRESS
                    ? <span>Article Read!</span>
                    : <span>Reading Progress: {scrollProgress}%</span>
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
