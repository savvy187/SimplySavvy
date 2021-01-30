import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { SummaryImage, ApproximateTime, Typography, Links } from 'components';
import { useIntersectionObserver } from 'hooks';

const { H2, P } = Typography;
const { BlockAnchor } = Links;

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
    const primarNavHeight = _.parseInt(theme.dimensions.primary_nav.height);
    const [entry, bounds, setNode] = useIntersectionObserver({        
        root: null,
        rootMargin: `${-2 * primarNavHeight}px 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });    
    return (
        <div 
            data-testid="article-summary-component"
            ref={setNode}
            className={className}
        >
            <SummaryImage src={src} alt={alt} />
            <article>
                <div>
                    <Link
                        to={{ 
                            pathname: `/articles/${id}`,
                            search: null
                        }}
                    >
                        <H2 className="summary-title">{title}</H2>
                        <ApproximateTime timestamp={timestamp} />
                    </Link>
                </div>
                <P>{summary}</P>
                <nav>
                    <Link 
                        to={{ search: `?similarArticles=${id}` }}                        
                        component={BlockAnchor}
                    >
                        Similar Articles ({similarArticlesCount})
                    </Link>
                    <Link 
                        to={{ search: `?articleComments=${id}` }}
                        component={BlockAnchor}
                    >
                        Comments ({commentsCount})
                    </Link>
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
    margin: 0 0 1vw 0;
    padding: 2vw 0;    
    transform: all 0.5s linear;

    nav a:first-child {
        margin-left: 0;
    }
`;
