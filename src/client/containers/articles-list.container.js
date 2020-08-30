import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import useResource from 'hooks/resource.hook';
import ArticleSummary from 'components/article-summary.component';

const ArticlesList = ({ className }) => {    
    const { loading, success, error, resource } = useResource({    
        resourceRoute: `/api/articles`
    });

    return (
        <div className={className}>
            { 
                loading 
                    ? '<Loading...>' 
                    : null
            } 
            { 
                error 
                    ? '<Error...>' 
                    : null
            }
            { 
                success && !_.isEmpty(resource)                                                            
                    ? _.map(resource, (entry) => <ArticleSummary key={entry.id} {...entry} />)
                    : null
            }
        </div>
    );
};

ArticlesList.propTypes = {    
    className: PropTypes.string.isRequired
};

export default styled(ArticlesList)`
    padding: 2em;
`;
