import React, { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Links } from 'components';
import { NetworkContext } from 'contexts/network/network.context';
import { useQuery } from 'hooks';
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
    
    return (
        <div className={className}>
            <nav>            
                {
                    _.map(articleCategories, (value, key) => (
                        <NavAnchor
                            to={{
                                search: `categories=${key}`
                            }}
                            key={key}
                            className={query.get('categories') === key ? 'active' : ''}
                        >
                            {key}: <em>{value}</em>
                        </NavAnchor>
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
