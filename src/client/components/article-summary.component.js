import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import _ from 'lodash';
import { SummaryImage, ApproximateTime, Typography, Links } from 'components';
//import { useIntersectionObserver } from 'hooks';

const { Hgroup, H2, P } = Typography;
const { HeadingAnchor, BlockAnchor } = Links;

const ArticleSummary = ({
    className,
    id,
    summaryImage: { src, alt }, 
    title, 
    summary,
    timestamp,
    similarArticlesCount, 
    commentsCount }) => {
    const theme = useContext(ThemeContext);
    //const primarNavHeight = _.parseInt(theme.dimensions.primary_nav.height);
    /* const [entry, bounds, setNode] = useIntersectionObserver({        
        root: null,
        rootMargin: `${-2 * primarNavHeight}px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });     */
    return (
        <div 
            data-testid="article-summary-component"
            //ref={setNode}
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
    summaryImage: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string
    }),
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    timestamp: PropTypes.any,
    similarArticlesCount: PropTypes.number,
    commentsCount: PropTypes.number
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
