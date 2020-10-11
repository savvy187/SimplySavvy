import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import defaultTheme from 'themes/default/default.theme';
import { GlobalStyles, Header } from 'components';
import { ArticlesList, Article } from 'containers';
import NetworkProvider from 'contexts/network/network.context';

const App = (
    <ThemeProvider theme={defaultTheme}>
        <NetworkProvider>
            <GlobalStyles />
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route 
                        exact 
                        path="/" 
                        component={ArticlesList} 
                    />
                    <Route 
                        exact 
                        path="/articles" 
                        component={ArticlesList} 
                    />
                    <Route
                        path="/articles/:id"
                        component={Article}
                    />
                    <Route 
                        path="/twitter"                        
                    >
                        <h2>Twitter</h2>
                    </Route>
                </Switch>
            </BrowserRouter>
        </NetworkProvider>
    </ThemeProvider>
);

ReactDOM.render(App, document.getElementById('savvy'));

