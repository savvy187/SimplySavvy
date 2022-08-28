import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Picture = ({ className, src, alt, sources }) => {        
    return (
        <picture className={className}>
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

Picture.propTypes = {
    className: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf(PropTypes.shape({
        media: PropTypes.string,
        srcset: PropTypes.string.isRequired,        
        type: PropTypes.string
    })),
    src: PropTypes.string,
    alt: PropTypes.string
};

Picture.defaultProps = {
    sources: []
};

export default styled(Picture)`
    
`;
