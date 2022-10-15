import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
    HeadingAnchorStyles,
    NavAnchorStyles,
    InlineAnchorStyles,
    BlockAnchorStyles
} from 'styles';

export const HeadingAnchor = styled(Link)`
    ${HeadingAnchorStyles};
`;

export const NavAnchor = styled(Link)`
    ${NavAnchorStyles};
`;

export const InlineAnchor = styled(Link)`
    ${InlineAnchorStyles};
`;

export const BlockAnchor = styled(Link)`
    ${BlockAnchorStyles};
`;

const HashAnchor = ({ children, className, hash, id, isActive }) => (
    <a 
        id={id}
        href={`#${hash}`}
        className={`${className} ${isActive ? 'active' : ''}`}

    >
        {children}
    </a>
);

HashAnchor.propTypes = {
    displayAs: PropTypes.oneOf([
        'HeadingAnchor',
        'NavAnchor',
        'InlineAnchor',
        'BlockAnchor'
    ]).isRequired,
    children: PropTypes.any,
    className: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    id: PropTypes.string,
    isActive: PropTypes.bool.isRequired
};

const StyledHashAnchor = styled(HashAnchor)`
    ${({ displayAs }) => displayAs === 'HeadingAnchor' ? HeadingAnchorStyles : ''};
    ${({ displayAs }) => displayAs === 'NavAnchor' ? NavAnchorStyles : ''};
    ${({ displayAs }) => displayAs === 'InlineAnchor' ? InlineAnchorStyles : ''};
    ${({ displayAs }) => displayAs === 'BlockAnchor' ? BlockAnchorStyles : ''};
`;

const ClickAnchor = ({ children, className, decoratorClass='', onClick }) => (
    <a 
        onClick={onClick} 
        className={`${className} ${decoratorClass}`}
    >
        {children}
    </a>
);

ClickAnchor.propTypes = {
    displayAs: PropTypes.oneOf([
        'HeadingAnchor',
        'NavAnchor',
        'InlineAnchor',
        'BlockAnchor'
    ]).isRequired,
    children: PropTypes.any,
    className: PropTypes.string.isRequired,
    decoratorClass: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

const StyledClickAnchor = styled(ClickAnchor)`
    ${({ displayAs }) => displayAs === 'HeadingAnchor' ? HeadingAnchorStyles : ''};
    ${({ displayAs }) => displayAs === 'NavAnchor' ? NavAnchorStyles : ''};
    ${({ displayAs }) => displayAs === 'InlineAnchor' ? InlineAnchorStyles : ''};
    ${({ displayAs }) => displayAs === 'BlockAnchor' ? BlockAnchorStyles : ''};
`;

export { 
    StyledHashAnchor as HashAnchor,
    StyledClickAnchor as ClickAnchor
};
