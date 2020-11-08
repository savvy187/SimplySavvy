import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import useResource from 'hooks/resource.hook';
import useDocumentScroll from 'hooks/document-scroll.hook';
import usePinToScroll from 'hooks/pin-to-scroll.hook';
import useDefinitionList from 'hooks/definition-list.hook';

const Article = ({ className }) => {
    const asideRef = useRef(null);
    const { id } = useParams();

    const { loading, success, empty, resource } = useResource({    
        resourceRoute: `/api/articles/${id}`
    });

    const categories = useDefinitionList(
        'Categories',
        _.get(resource, 'categories', [])
    );

    const similarArticles = useDefinitionList(
        'Similar Articles',
        _.get(resource, 'similarArticles', [])
    );

    useDocumentScroll(
        usePinToScroll(asideRef, 'scrolling')
    );

    return (
        <div className={className}>
            { loading ? '<Loading...>' : null}             
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
                                <aside ref={asideRef}>
                                    {categories}
                                    {similarArticles}
                                </aside>
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
        width: ${({ theme }) => theme.dimensions.aside.width};
        flex-shrink: 0;        
    }

    aside {
        width: ${({ theme }) => theme.dimensions.aside.width};

        &.scrolling {
            position: fixed;
            top: calc(
                ${({ theme }) => theme.dimensions.primary_nav.height}
                + ${({ theme }) => theme.dimensions.aside.offset}
            );
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
