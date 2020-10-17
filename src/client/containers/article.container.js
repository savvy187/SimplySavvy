import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import useResource from 'hooks/resource.hook';

const Article = ({ className }) => {    
    const { id } = useParams();
    const { loading, success, empty, error, resource } = useResource({    
        resourceRoute: `/api/articles/${id}`
    });
    console.log('resource: ', resource);

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
                            {
                                _.size(resource.categories)
                                    ? (
                                        <aside>
                                            <dl>
                                                <dt>Categories</dt>
                                                {_.map(resource.categories, (c) => (
                                                    <dd key={c}>{c}</dd>
                                                ))}
                                            </dl>
                                        </aside>
                                    )
                                    : null
                            }
                            {
                                _.size(resource.similiarArticles)
                                    ? (
                                        <aside>
                                            <dl>
                                                <dt>Similar Articles</dt>
                                                {_.map(resource.similiarArticles, (a) => (
                                                    <li key={a}>{a}</li>
                                                ))}
                                            </dl>
                                        </aside>
                                    )
                                    : null
                            }
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
        padding: 2em;
    }

    section {
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

    aside {
        width: 300px;

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
