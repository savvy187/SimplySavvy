import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, NavBar, FilterBar } from 'components';
import { ArticlesList, Article } from 'containers';
import { useDirectionalElement } from 'hooks';
import { DIRECTION_TYPE, ROUTES } from 'client/constants';

const Yo = () => <h1>yoooo</h1>;

const SimplySavvy = () => {    
    const HeaderBar = useDirectionalElement({
        y: [
            {
                type: DIRECTION_TYPE.UP,
                component: NavBar,
                isDefault: true
            },
            {
                type: DIRECTION_TYPE.DOWN,
                component: FilterBar,
                isDefault: false
            }
        ]
    });    

    return (
        <>
            <Header>
                {HeaderBar}
            </Header>
            <Switch>
                <Route 
                    exact 
                    path={ROUTES.HOME}
                    component={ArticlesList} 
                />
                <Route 
                    exact 
                    path={ROUTES.ARTICLES}
                    component={ArticlesList} 
                />
                <Route
                    path={ROUTES.ARTICLE}
                    component={Article}
                />
                <Route 
                    path={ROUTES.TWITTER}
                />                        
            </Switch>
        </>
    );
};

export default SimplySavvy;
