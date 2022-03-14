import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useResource } from 'hooks';
import { ArticleSummary } from 'components';
import { useIntersectionObserver } from 'hooks';

const ArticlesList = ({ className }) => {    
    const { loading, success, empty, resource } = useResource({    
        resourceRoute: '/api/articles'
    });

    const { observe, unobserve } = useIntersectionObserver({        
        thresholdRange: [0, 0.25, 0.5, 0.75, 1],
        entryCallback: (entries) => {
            _.each(entries, (entry) => {
                const intersectionRatio = entry.intersectionRatio;
                entry.target.style.opacity = intersectionRatio;                
            });
        }       
    });
    
    return (
        <div className={className}>
            {
                loading
                    ? '<Loading...>'
                    : null
            }      
            {
                success && !empty
                    ? (
                        <>
                            {_.map(resource, (entry) => (                                
                                <ArticleSummary 
                                    key={entry.id}
                                    {...entry}
                                    observe={observe}
                                    unobserve={unobserve}
                                />
                            ))}
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
