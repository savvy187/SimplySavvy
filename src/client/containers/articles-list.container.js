import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useResource } from 'hooks';
import { ArticleSummary } from 'components';
import useIntersectionObserver from '../hooks/intersection-observer.hook';

const ArticlesList = ({ className }) => {    
    const containerRef = useRef(null);
    const articleSummariesRef = useRef({});

    const { loading, success, empty, resource } = useResource({    
        resourceRoute: '/api/articles'
    });

    const { 
        entries: observerEntries, 
        observer: currentObserver 
    } = useIntersectionObserver({
        root: containerRef.current        
    });
    
    useEffect(() => {        
        const canRunObserver = (
            _.size(articleSummariesRef.current)
            && currentObserver
        );     

        if (canRunObserver) {
            _.each(articleSummariesRef.current, (ref) => {                
                ref.current && currentObserver.observe(ref.current);
            });
            
        }
    }, [
        containerRef, 
        articleSummariesRef, 
        currentObserver
    ]);
    
    return (
        <div ref={containerRef} className={className}>
            {
                loading
                    ? '<Loading...>'
                    : null
            }      
            {
                success && !empty
                    ? (
                        <>
                            {_.map(resource, (entry) => {
                                const articleSummaryRef = React.createRef();
                                articleSummariesRef.current[entry.id] = articleSummaryRef;
                                const observerEntry = _.find(observerEntries, (entry) => (
                                    entry.target === articleSummaryRef.current
                                ));
                                return (
                                    <ArticleSummary 
                                        key={entry.id} 
                                        ref={articleSummaryRef}
                                        observerEntry={observerEntry}
                                        {...entry} 
                                    />
                                );
                            })}
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
