import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SummaryImage = ({ src, alt }) => {    
    return (
        <picture>
            <image src={src} alt={alt} />
        </picture>
    );
};

SummaryImage.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string
};

export default styled(SummaryImage)`
    width: 150px;
    margin-right: 1em;
    border-radius: 4px;
    filter: ${({ theme }) => theme.filters.blur_1};
    box-shadow: ${({ theme }) => theme.shadows.summary_image};
`;
