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
`;

export const H2 = styled.h2`
    font: ${({ theme }) => theme.fonts.typography.h2};
    ${headingMixin}
`;

export const H3 = styled.h3`
    font: ${({ theme }) => theme.fonts.typography.h3};    
    ${headingMixin}
`;

export const H4 = styled.h4`
    font: ${({ theme }) => theme.fonts.typography.h4};    
    ${headingMixin}
`;

export const P = styled.p`
    font: ${({ theme }) => theme.fonts.typography.p};
    ${typographyMixin}
    line-height: 1.25;
`;
