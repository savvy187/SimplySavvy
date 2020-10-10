import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    
    html,
    body {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #414142;
    }

    #savvy {
        width: 945px;
        min-height: 100vh;
        margin: 0 auto;
        padding: 0;
        background-color: white;
        box-shadow: 0px 0px 40px black;
    }
`;

export default GlobalStyles;
