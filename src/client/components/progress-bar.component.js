import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useScrollProgress } from 'hooks';
import { MAX_SCROLL_PROGRESS } from 'client/constants';

const ProgressBar = ({ className }) => {
    const { pathname } = useLocation();
    const scrollProgress = useScrollProgress(pathname);
    return (
        <div className={className}>
            {
                scrollProgress >= MAX_SCROLL_PROGRESS
                    ? <span>Article Read!</span>
                    : <span>Reading Progress: {scrollProgress}%</span>
            }
        </div>
    );
};

ProgressBar.propTypes = {
    pathname: PropTypes.string,
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
