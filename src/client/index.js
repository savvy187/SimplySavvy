import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import defaultTheme from 'themes/default/default.theme';
import GlobalStyles from 'components/global-styles.component';
import Header from 'components/header.component';

const history = createBrowserHistory();

const App = (
    <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <BrowserRouter history={history}>
            <Header />
            <Switch>
                <Route exact path="/">
                    <h2>Landing Page</h2>
                </Route>
                <Route path="/blog">
                    <h2>Blog</h2>
                </Route>
                <Route path="/blog/:id">
                    <h2>Blog ID</h2>
                </Route>
                <Route path="/tutorials">
                    <h2>Tutorials</h2>
                </Route>
                <Route path="/tutorials/:id">
                    <h2>Tutorials ID</h2>
                </Route>
                <Route path="/twitter">
                    <h2>Twitter</h2>
                </Route>
            </Switch>
        </BrowserRouter>
    </ThemeProvider>
);

ReactDOM.render(App, document.getElementById('savvy'));

