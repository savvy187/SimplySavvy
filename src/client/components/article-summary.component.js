import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import SummaryImage from 'components/summary-image.component';
import ApproximateTime from 'components/approximate-time.component';
import { Link } from 'react-router-dom';
import useIntersectionObserver from 'hooks/intersection-observer.hook';

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
    const [entry, setNode] = useIntersectionObserver({
        rootMargin: '0px',
        callback: (entry) => {
            console.log('ratio: ', entry.intersectionRatio);
            const opacity = entry.intersectionRatio || 0;
            const show = entry.intersectionRatio >= 0.9;
            const nav = entry.target.querySelectorAll('nav a');
            const img = entry.target.querySelector('img');
                
            entry.target.style.opacity = `${opacity}`;
            img.style.filter = show ? 'none' : theme.filters.blur_1;
    
            nav.forEach((link) => {
                link.style.opacity = show ? 1 : 0;
            });
        }
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
                    <h2 className="summary-title">{title}</h2>
                    <ApproximateTime timestamp={timestamp} />
                </div>
                <p className="summary">{summary}</p>
                <nav>
                    <Link 
                        to={{ search: `?similarArticles=${id}` }}                        
                        className="summary-link"
                    >
                        Similar Articles ({similarArticlesCount})
                    </Link>
                    <Link 
                        to={{ search: `?articleComments=${id}` }}
                        className="summary-link"
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
    opacity: ${props => `${props.opacity}`};
    transform: all 0.5s linear;

    .summary-title {
        display: inline-block;
        margin: 0.5vh 0;
        color: ${({ theme }) => theme.colors.summary_title.default};
        font: ${({ theme }) => theme.fonts.summary_title};
        text-transform: capitalize;
        flex-grow: 5;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
            text-decoration-skip: objects;
        }

        &::selection {
            color: ${({ theme }) => theme.colors.summary_title.selected};
            background-color: ${({ theme }) => theme.backgrounds.summary_title.selected};
        }
    }

    .summary {
        margin: 1vh 0;
        color: ${({ theme }) => theme.colors.summary.default};
        font: ${({ theme }) => theme.fonts.summary};

        &::selection {
            color: ${({ theme }) => theme.colors.summary.selected};
            background-color: ${({ theme }) => theme.backgrounds.summary.selected};
        }
    }

    .summary-link {
        padding: 4px;
        margin-right: 12px;
        color: ${({ theme }) => theme.colors.summary_link.default};
        font: ${({ theme }) => theme.fonts.summary_link};
        text-decoration: none;
        letter-spacing: 1.25px;
        border-radius: 4px;
        border: 1px solid transparent;
        opacity: ${props => `${props.show ? 1 : 0}`};
        transition: ${({ theme }) => theme.transitions.ease_in};

        &:hover,
        &:focus {
            color: ${({ theme }) => theme.colors.summary_link.hover};
            background-color: ${({ theme }) => theme.backgrounds.summary_link};
            outline: none;
        }

        &:focus {
            border: ${({ theme }) => theme.borders.summary_link.focus};
        }
    }
`;
