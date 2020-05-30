import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SummaryImage = ({ src, alt, sources }) => {        
    return (
        <picture>
            {sources.map((source) => (
                <source 
                    key={source.srcset}
                    media={source.media} 
                    srcSet={source.srcset}
                    type={source.type}
                ></source>
            ))}
            <img src={src} alt={alt} />
        </picture>
    );
};

SummaryImage.propTypes = {
    sources: PropTypes.arrayOf(PropTypes.shape({
        media: PropTypes.string,
        srcset: PropTypes.string.isRequired,        
        type: PropTypes.string
    })),
    src: PropTypes.string,
    alt: PropTypes.string
};

SummaryImage.defaultProps = {
    sources: []
};

export default styled(SummaryImage)`
    width: 150px;
    margin-right: 1em;
    border-radius: 4px;
    filter: ${({ theme }) => theme.filters.blur_1};
    box-shadow: ${({ theme }) => theme.shadows.summary_image};
`;
