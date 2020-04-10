import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SummaryImage from 'components/summary-image.component';
import ApproximateTime from 'components/approximate-time.component';
import { Link } from 'react-router-dom';

const ArticleSummary = ({
    img: { src, alt }, 
    title, 
    summary,
    timestamp,
    similarArticlesCount, 
    commentsCount }) => {
    return (
        <div>
            <SummaryImage src={src} alt={alt} />
            <article>
                <div>
                    <h2 className="summary-title">{title}</h2>
                    <ApproximateTime timestamp={timestamp} />
                </div>
                <p className="summary">{summary}</p>
                <nav>
                    <Link 
                        to="?similar="
                        className="summary-link"
                    >
                        Similar Articles ({similarArticlesCount})
                    </Link>
                    <link 
                        to="?comments="
                        className="summary-link"
                    >
                        Comments ({commentsCount})
                    </link>
                </nav>
            </article>
        </div>
    );
};

ArticleSummary.propTypes = {
    img: PropTypes.shape({
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
            border: ${({ theme }) => theme.border.summary_link.focus};
        }
    }
`;
