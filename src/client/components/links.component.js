import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeadingAnchor = styled(Link)`
    text-decoration: none;    
    text-decoration-color: ${({ theme }) => theme.colors.typography.headings.textDecoration}!important;

    &:hover {
        text-decoration: underline;
        
    }
`;

export const NavAnchor = styled(Link)`
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

export const InlineAnchor = styled(Link)`
    display: inline-block;
    font: ${({ theme }) => theme.fonts.links.inline};
    color: ${({ theme }) => theme.colors.links.inline.default};
    margin: 0 0.5em;
    text-decoration: none;

    &:hover,
    &:focus {
        color: ${({ theme }) => theme.colors.links.inline.hover};
        text-decoration-color: ${({ theme }) => theme.backgrounds.links.inline.hover}!important;
        text-decoration-skip-ink: auto;
        text-decoration: underline;

    }
`;

export const BlockAnchor = styled(Link)`
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
