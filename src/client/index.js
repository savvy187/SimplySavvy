import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import defaultTheme from 'themes/default/default.theme';
import GlobalStyles from 'components/global-styles.component';
import Header from 'components/header.component';
import NetworkProvider from 'contexts/network/network.context';
import ArticlesList from 'containers/articles-list.container';
import Article from 'containers/article.container';

const history = createBrowserHistory();

const App = (
    <ThemeProvider theme={defaultTheme}>
        <NetworkProvider>
            <GlobalStyles />
            <BrowserRouter history={history}>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <ArticlesList />
                    </Route>
                    <Route exact path="/articles">
                        <ArticlesList />
                    </Route>
                    <Route path="/articles/:id">
                        <Article />
                    </Route>
                    <Route path="/twitter">
                        <h2>Twitter</h2>
                    </Route>
                </Switch>
            </BrowserRouter>
        </NetworkProvider>
    </ThemeProvider>
);

ReactDOM.render(App, document.getElementById('savvy'));

