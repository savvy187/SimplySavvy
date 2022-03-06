import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Header } from 'components';
import { ArticlesList, Article } from 'containers';
import { ROUTES } from 'client/constants';

const history = createBrowserHistory();

const SimplySavvy = () => {
    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Route 
                    exact 
                    path={ROUTES.HOME.pathname}
                    component={ArticlesList} 
                />
                <Route 
                    exact 
                    path={ROUTES.ARTICLES.pathname}
                    component={ArticlesList} 
                />
                <Route
                    path={ROUTES.ARTICLE.pathname}
                    component={Article}
                />
                <Route 
                    path={ROUTES.TWITTER.pathname}
                />                        
            </Switch>
        </Router>
    );
};

export default SimplySavvy;
