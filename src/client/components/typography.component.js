import React from 'react';
import styled, { css } from 'styled-components';

const headingMixin = css`
    display: inline-block;
    text-transform: capitalize;
    cursor: pointer;
    color: ${props => props.theme.colors.typography.headings.default};

    &:hover {
        text-decoration: underline;
        text-decoration-skip: objects;
    }

    &::selection {
        color: ${({ theme }) => theme.colors.typography.headings.selected};
        background-color: ${({ theme }) => theme.backgrounds.typography.headings.selected};
        text-decoration: none;
    }
`;

const typographyMixin = css`        
    color: ${props => props.theme.colors.typography.p.default};    

    &::selection {
        color: ${({ theme }) => theme.colors.typography.p.selected};
        background-color: ${({ theme }) => theme.backgrounds.typography.p.selected};
    }
`;

export const H1 = styled.h1`
    font: ${({ theme }) => theme.fonts.typography.h1};
    ${typographyMixin}
    ${headingMixin}
    margin: 0.5em 0;
`;

export const H2 = styled.h2`
    font: ${({ theme }) => theme.fonts.typography.h2};
    ${headingMixin}
    margin: 0.375em 0;
`;

export const H3 = styled.h3`
    font: ${({ theme }) => theme.fonts.typography.h3};    
    ${headingMixin}
    margin: 0.245em 0;
`;

export const H4 = styled.h4`
    font: ${({ theme }) => theme.fonts.typography.h4};    
    ${headingMixin}
    margin: 0.12em 0;
`;

export const P = styled.p`
    font: ${({ theme }) => theme.fonts.typography.p};
    ${typographyMixin}
    line-height: 1.25;
    margin: 0 0 1.25em 0;
`;

const Anchor = React.forwardRef((props, ref) => ( // eslint-disable-line react/display-name
    <a ref={ref} {...props}>{props.children}</a> // eslint-disable-line react/prop-types
));

const StyledAnchor = styled(Anchor)`
    display: inline-block;
    font: ${({ theme }) => theme.fonts.typography.a};
    color: ${({ theme }) => theme.colors.typography.a.default};
    text-decoration: none;
    margin: 0 0.5em;
    padding: 0.5em;
    border-radius: 0.25em;
    transition: ${({ theme }) => theme.transitions.ease_in};

    &:hover,
    &:focus {
        color: ${({ theme }) => theme.colors.typography.a.hover};
        background-color: ${({ theme }) => theme.backgrounds.typography.a.hover};
        outline: none;
    }

    &:focus {
        border: ${({ theme }) => theme.borders.typography.a.focus};
    }
`;

export { StyledAnchor as Anchor };
