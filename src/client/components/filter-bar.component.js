import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSprings, animated } from 'react-spring';
import _ from 'lodash';
import { Links } from 'components';
import useQuery from 'hooks/query.hook';
import { NetworkContext } from 'contexts/network/network.context';

const { NavAnchor } = Links;

const FilterBar = ({ className }) => {
    const query = useQuery();
    const { selector } = useContext(NetworkContext);
    const requests = selector('requests');
    
    const articles = _.find(requests, (request, requestKey) => {        
        return requestKey === '/api/articles';
    });
    
    const articleCategories = useMemo(() => {
        const data = _.get(articles, 'data', []);
        const categories = _.flatMap(data, 'categories');
        return _.countBy(categories);        
    }, [articles]);

    const articleCategoriesView = _.map(articleCategories, (value, key) => (
        <NavAnchor
            to={{
                search: `categories=${value}`
            }}
            key={key}
            className={query.get('categories') === value ? 'active' : ''}
        >
            {key}: <em>{value}</em>
        </NavAnchor>
    ));
    
    /* 
     * Setting up the useSprings animation and providing a callback and API...
     * Starts at: opacity(0)    
    */
    const [springs, set, stop] = useSprings(1, index => ({ opacity: 0 }));
    /* 
     * Ends at: opacity(1)
    */
    set((index) => ({ opacity: 1 }));
    /* 
     * Done
    */
    stop();

    return (
        <div className={className}>
            <nav>
                {
                    springs.map(props => (
                        <animated.span key={props.toString()} style={props}>
                            {articleCategoriesView}       
                        </animated.span>
                    ))
                }
            </nav>
            
        </div>
    );
};

FilterBar.propTypes = {
    className: PropTypes.string.isRequired
};

export default styled(FilterBar)`    
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${({ theme }) => theme.dimensions.primary_nav.height};
    padding: 0 20px;
`;
