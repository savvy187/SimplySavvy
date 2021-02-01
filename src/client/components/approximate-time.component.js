import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useApproximateTime } from 'hooks';

const ApproximateTime = ({ className, timestamp }) => {
    const approximation = useApproximateTime(timestamp);
    return (
        <time 
            className={className}
            dateTime={timestamp}
        >
            {`written ${approximation}`}
        </time>
    );
};

ApproximateTime.propTypes = {
    className: PropTypes.string.isRequired,
    show: PropTypes.bool,
    timestamp: PropTypes.any.isRequired
};

ApproximateTime.defaultProps = {
    show: false
};

export default styled(ApproximateTime)`
    text-transform: lowercase;    
    font-size: 1em;
    font-style: italic;
    color: inherit;
    opacity: ${props => `${props.show ? 1 : 0}`};
    transition: ${({ theme }) => theme.transitions.ease_in};

    &::selection {
        color: inherit;
        background-color: inherit;
    }    
`;
