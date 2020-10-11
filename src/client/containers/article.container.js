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
    console.log('error: ', error);
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
                                        <h2>{s.title}</h2>
                                        {_.map(s.content, (p) => (<p>{p}</p>))}
                                    </section>
                                ))}
                            </article>
                            {
                                _.size(resource.categories)
                                    ? (
                                        <aside>
                                            <ul>
                                                {_.map(resource.categories, (c) => (
                                                    <li key={c}>{c}</li>
                                                ))}
                                            </ul>
                                        </aside>
                                    )
                                    : null
                            }
                            {
                                _.size(resource.similiarArticles)
                                    ? (
                                        <aside>
                                            <ul>
                                                {_.map(resource.similiarArticles, (a) => (
                                                    <li key={a}>{a}</li>
                                                ))}
                                            </ul>
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
        border: 1px solid red;

        p {
            margin-bottom: 1.25em;
            font-size: 1rem;
            line-height: 1.25em;
        
            &:first-of-type {

                &:first-letter {
                    font-size: 3em;
                }
            }
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
