import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useResource } from 'hooks';
import { ArticleSummary, IntersectionObserverTargetGuidelines } from 'components';

const ArticlesList = ({ className }) => {    
    const { loading, success, empty, resource } = useResource({    
        resourceRoute: '/api/articles'
    });

    return (
        <div className={className}>
            {/* <IntersectionObserverTargetGuidelines /> */}
            {
                loading
                    ? '<Loading...>'
                    : null
            }      
            {
                success && !empty
                    ? (
                        <>
                            {_.map(resource, (entry) => <ArticleSummary key={entry.id} {...entry} />)}
                        </>
                    )
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
