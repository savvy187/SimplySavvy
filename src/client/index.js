import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import defaultTheme from 'themes/default/default.theme';
import { GlobalStyles } from 'components';
import NetworkProvider from 'contexts/network/network.context';
import SimplySavvy from './simplySavvy';

const App = (
    <ThemeProvider theme={defaultTheme}>
        <NetworkProvider>
            <GlobalStyles />
            <BrowserRouter>
                <SimplySavvy />
            </BrowserRouter>
        </NetworkProvider>
    </ThemeProvider>
);

ReactDOM.render(App, document.getElementById('savvy'));

