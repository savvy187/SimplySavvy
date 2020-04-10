import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html,
    body {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #savvy {
        width: 980px;
        margin: 0 auto;
        padding: 0 15px;
        background-image:url('bg-wrapper.gif');
        background-repeat: repeat-y;
    }
`;

export default GlobalStyles;
