import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useScrollProgress } from 'hooks';

const ProgressBar = ({ className, pathname }) => {    
    const scrollProgress = useScrollProgress(pathname);
    console.log('scrollProgress: ', scrollProgress);
    return (
        <div className={className}>
            <span>Progress: {scrollProgress[pathname]}%</span>
        </div>
    );
};

ProgressBar.propTypes = {
    pathname: PropTypes.string,
    className: PropTypes.string.isRequired
};

/* export default styled(ProgressBar)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${({ theme }) => theme.dimensions.primary_nav.height};
    padding: 0 20px;
`; */
