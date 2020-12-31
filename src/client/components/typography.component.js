import styled, { css } from 'styled-components';

const headingMixin = css`
    display: inline-block;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        text-decoration-skip: objects;
    }
`;
const typographyMixin = css`        
    color: ${props => props.theme.colors.typography.default};    

    &::selection {
        color: ${({ theme }) => theme.colors.typography.selected};
    }
`;

export const H1 = styled.h1`
    font: ${({ theme }) => theme.fonts.typography.h1};
    ${headingMixin}
    ${typographyMixin}
`;

export const H2 = styled.h2`
    font: ${({ theme }) => theme.fonts.typography.h2};
    ${headingMixin}
    ${typographyMixin}
`;

export const H3 = styled.h3`
    font: ${({ theme }) => theme.fonts.typography.h3};
    ${headingMixin}
    ${typographyMixin}
`;

export const H4 = styled.h4`
    font: ${({ theme }) => theme.fonts.typography.h4};
    ${headingMixin}
    ${typographyMixin}
`;

export const P = styled.p`
    font: ${({ theme }) => theme.fonts.typography.p};
    ${typographyMixin}
`;
