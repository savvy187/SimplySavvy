import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header } from 'components';
import { ArticlesList, Article } from 'containers';
import { useMediaQuery } from 'hooks';

const SimplySavvy = () => {
    const [matches] = useMediaQuery('(min-width: 965px)');
    return (
        <>
            { matches ? <Header /> : null }
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
                />                        
            </Switch>
        </>
    );
};

export default SimplySavvy;
