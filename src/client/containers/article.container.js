import React, { useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import useResource from 'hooks/resource.hook';
import useDocumentScroll from 'hooks/document-scroll.hook';

const Article = ({ className }) => {
    const asideRef = useRef(null);
    const { id } = useParams();
    
    const { loading, success, empty, error, resource } = useResource({    
        resourceRoute: `/api/articles/${id}`
    });

    useDocumentScroll(useCallback(() => {
        const asideOffset = asideRef.current.offsetTop;
        const scrollTop = window.pageYOffset;
        scrollTop > asideOffset
            ? asideRef.current.classList.add('scrolling')
            : asideRef.current.classList.remove('scrolling');
    }), [asideRef]);
    
    const articleAside = useMemo(() => {
        const categories = _.get(resource, 'categories', []);
        const similiarArticles = _.get(resource, 'similiarArticles', []);
        const showAside = !_.isEmpty(_.concat(categories, similiarArticles));

        if (!showAside) {
            return null;
        }
                
        return (
            <aside ref={asideRef}>
                {
                    !_.isEmpty(categories)
                        ? (
                            <dl>
                                <dt>Categories</dt>
                                {_.map(resource.categories, (c) => (
                                    <dd key={c}>{c}</dd>
                                ))}
                            </dl>
                        )
                        : null
                }
                {
                    !_.isEmpty(similiarArticles)
                        ? (
                            <dl>
                                <dt>Similar Articles</dt>
                                {_.map(resource.similiarArticles, (a) => (
                                    <li key={a}>{a}</li>
                                ))}
                            </dl>
                        )
                        : null
                }
            </aside>
        );
    }, [resource]);

    return (
        <div className={className}>
            { loading ? '<Loading...>' : null} 
            { error ? '<Error...>' : null}
            { 
                success && resource
                    ? (
                        <div className="article-container">
                            <article>
                                <hgroup>
                                    <h1>{resource.title}</h1>
                                    <time dateTime={resource.timestamp}>
                                        {resource.timestamp}
                                    </time>
                                </hgroup>
                                {_.map(resource.sections, (s) => (
                                    <section key={s.title}>
                                        {/* <h2>{s.title}</h2> */}
                                        {_.map(s.content, (p) => (
                                            <p key={p}>{p}</p>
                                        ))}
                                    </section>
                                ))}
                            </article>
                            <div className="aside-container">
                                {articleAside}
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    );
};

Article.propTypes = {    
    className: PropTypes.string.isRequired
};

export default styled(Article)`
    .article-container {
        display: flex;
        padding: 20px;
    }

    section {
        flex-shrink: 0;
        padding: 0 0.5rem;
        margin-bottom: 1.5rem;

        p {
            margin-bottom: 1.25em;
            font-size: 1rem;
            line-height: 1.25em;
            font: ${({ theme }) => theme.fonts.summary};

            &:first-of-type {

                &:first-letter {
                    font: ${({ theme }) => theme.fonts.summary_title};
                    letter-spacing: 0.1em;
                }
            }
        }
    }

    .aside-container {        
        width: 200px;
        flex-shrink: 0;
        border: 1px solid red;
    }

    aside {
        width: 200px;

        &.scrolling {
            position: fixed;
            top: 100px;
        }

        dt {
            background-color: ${({ theme }) => theme.backgrounds.primary_nav};
            color: white;
            padding: 0.25em;
            border-radius: 4px;
        }

        dd {
            padding: 0.25em;
        }
    }

    h1 {
        font-size: 2.25rem;
    }

    h2 {
        margin-bottom: 1rem;
        font-size: 2rem;
        text-transform: uppercase;
    }
`;
