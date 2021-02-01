import styled, { css } from 'styled-components';

const headingMixin = css`
    display: inline-block;
    cursor: inherit;
    text-transform: capitalize;
    text-decoration: inherit;
    text-decoration-skip: objects;        
    color: ${({ theme }) => theme.colors.typography.headings.default};    

    &:hover {
        text-decoration: inherit;
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

export const Hgroup = styled.hgroup`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    margin-bottom: 0.5em;    
    ${headingMixin};

    *:first-child {
        margin-right: 0.25em;
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
    margin: 0 0 1.125em 0;
`;
