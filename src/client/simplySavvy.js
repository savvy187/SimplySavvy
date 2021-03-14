import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, NavBar, FilterBar } from 'components';
import { ArticlesList, Article } from 'containers';
import { useDirectionalElement } from 'hooks';
import { DIRECTION_TYPE, ROUTES } from 'client/constants';

const SimplySavvy = () => {    
    const HeaderBar = useDirectionalElement({
        y: [
            {
                type: DIRECTION_TYPE.UP,
                component: NavBar,                
            },
            {
                type: DIRECTION_TYPE.DOWN,
                component: FilterBar,                
                routes: [
                    ROUTES.HOME,
                    ROUTES.ARTICLES
                ]
            },
            {
                type: DIRECTION_TYPE.DOWN,
                component: null,
                routes: [
                    ROUTES.ARTICLE
                ]
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
