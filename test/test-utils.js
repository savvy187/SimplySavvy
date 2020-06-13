import React from 'react';
import { render, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/dom';
import { ThemeProvider } from 'styled-components';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import defaultTheme from 'themes/default/default.theme';
import NetworkProvider from 'contexts/network/network.context';

const history = createBrowserHistory();

const Providers = ({ children }) => (
    <ThemeProvider theme={defaultTheme}>
        <NetworkProvider>
            <Router history={history}>
                <Route path="/">
                    {children}
                </Route>
            </Router>
        </NetworkProvider>
    </ThemeProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });
const customAct = act;
const customRenderHook = (hook) => {    
    return renderHook(hook, { wrapper: Providers });
};

export * from '@testing-library/react';

export {
    history,
    customRender as render,
    customRenderHook as renderHook,
    customAct as act,
    waitFor
};
