import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const HeadingAnchorStyles = css`
    text-decoration: none;    
    text-decoration-color: ${({ theme }) => theme.colors.typography.headings.textDecoration}!important;

    &:hover {
        text-decoration: underline;
    }
`;

const NavAnchorStyles = css`
    padding: 0.25em;
    margin-right: 0.75em;
    color: ${({ theme }) => theme.colors.links.nav.default};
    font: ${({ theme }) => theme.fonts.links.nav};
    text-decoration: none;
    letter-spacing: 0.1em;
    border-radius: 0.25em;
    border: 1px solid transparent;
    transition: ${({ theme }) => theme.transitions.ease_in};

    &:hover,
    &:focus,
    &.active {
        color: ${({ theme }) => theme.colors.links.nav.hover};
        background-color: ${({ theme }) => theme.backgrounds.links.nav.hover};
        outline: none;
    }

    &:focus {
        border: ${({ theme }) => theme.borders.links.nav.focus};
    }
`;

const InlineAnchorStyles = css`
    display: inline-block;
    font: ${({ theme }) => theme.fonts.links.inline};
    color: ${({ theme }) => theme.colors.links.inline.default};
    margin: 0 0.5em;
    text-decoration: none;

    &:hover,
    &:focus,
    &.active {
        color: ${({ theme }) => theme.colors.links.inline.hover};
        text-decoration-color: ${({ theme }) => theme.backgrounds.links.inline.hover}!important;
        text-decoration-skip-ink: auto;
        text-decoration: underline;
    }
`;

const BlockAnchorStyles = css`
    display: inline-block;
    margin: 0 0.5em;
    padding: 0.5em;
    font: ${({ theme }) => theme.fonts.links.block};
    color: ${({ theme }) => theme.colors.links.block.default};
    text-decoration: none;    
    border: 1px solid transparent;
    border-radius: 0.25em;
    transition: ${({ theme }) => theme.transitions.ease_in};

    &:hover,
    &:focus,
    &.active {
        color: ${({ theme }) => theme.colors.links.block.hover};
        background-color: ${({ theme }) => theme.backgrounds.links.block.hover};
        outline: none;
    }

    &:focus {
        border: ${({ theme }) => theme.borders.links.block.focus};
    }
`;

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
