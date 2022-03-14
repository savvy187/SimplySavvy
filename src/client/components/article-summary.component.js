import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SummaryImage, ApproximateTime, Typography, Links } from 'components';

const { Hgroup, H2, P } = Typography;
const { HeadingAnchor, BlockAnchor } = Links;

// eslint-disable-next-line react/display-name
const ArticleSummary = ({
    className,
    id,    
    summaryImage: { src, alt }, 
    title, 
    summary,
    timestamp,
    similarArticlesCount, 
    commentsCount,
    observe,
    unobserve
}) => {
    const articleSummaryRef = useRef();
    
    useEffect(() => {
        observe(articleSummaryRef.current);
        return () => unobserve(articleSummaryRef.current);
    }, []);

    return (
        <div 
            ref={articleSummaryRef}
            data-testid="article-summary-component"
            className={className}
        >
            <SummaryImage src={src} alt={alt} />
            <article>
                <div>
                    <HeadingAnchor
                        to={`/articles/${id}`}
                    >
                        <Hgroup>
                            <H2 className="summary-title">{title}</H2>
                            <ApproximateTime 
                                show
                                timestamp={timestamp} 
                            />
                        </Hgroup>
                    </HeadingAnchor>
                </div>
                <P>{summary}</P>
                <nav>
                    <BlockAnchor 
                        to={{ search: `?similarArticles=${id}` }}
                    >
                        Similar Articles ({similarArticlesCount})
                    </BlockAnchor>
                    <BlockAnchor 
                        to={{ search: `?articleComments=${id}` }}                        
                    >
                        Comments ({commentsCount})
                    </BlockAnchor>
                </nav>
            </article>
        </div>
    );
};

ArticleSummary.propTypes = {
    className: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    observerEntry: PropTypes.object,
    summaryImage: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
    }),
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    timestamp: PropTypes.any,
    similarArticlesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    observe: PropTypes.func.isRequired,
    unobserve: PropTypes.func.isRequired
};

export default styled(ArticleSummary)`
    display: flex;
    justify-content: 'space-evenly';
    align-items: center;    
    margin: 0 0 1em 0;
    padding: 0.5em 0;    
    transform: all 0.5s linear;

    nav a:first-child {
        margin-left: 0;
    }
`;
