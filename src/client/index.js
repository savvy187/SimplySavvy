import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import defaultTheme from 'themes/default/default.theme';
import { GlobalStyles } from 'components';
import NetworkProvider from 'contexts/network/network.context';
import UIProvider from 'contexts/ui/ui.context';
import SimplySavvy from './simplySavvy';
import { CombineProviders } from 'utils/providers';

const App = (
    <CombineProviders
        providers={[
            { name: ThemeProvider, props: { theme: defaultTheme } },
            { name: NetworkProvider, props: {} },
            { name: UIProvider, props: {} }
        ]}
    >
        <>
            <GlobalStyles />
            <BrowserRouter>
                <SimplySavvy />
            </BrowserRouter>
        </>
    </CombineProviders>
);

ReactDOM.render(App, document.getElementById('savvy'));

