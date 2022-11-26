import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { ANCHOR_TYPE  } from 'client-constants';

const Picture = ({ className, src, alt, sources=[] }) => {        
    return (
        <picture className={className}>
            {_.map(sources, (source) => (
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
    anchor: PropTypes.oneOf([
        ANCHOR_TYPE.LEFT,
        ANCHOR_TYPE.RIGHT
    ]),
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
    float: ${({ anchor }) => anchor};
    clear: ${({ anchor }) => anchor};
`;
