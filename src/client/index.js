import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const App = (
    <BrowserRouter history={history}>
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
);


ReactDOM.render(App, document.getElementById('savvy'));

