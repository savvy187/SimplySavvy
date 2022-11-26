import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useParams, useLocation } from 'react-router-dom';
import useResource from 'hooks/resource.hook';
import useDocumentScroll from 'hooks/document-scroll.hook';
import usePinToScroll from 'hooks/pin-to-scroll.hook';
import { 
    ArticleSection,
    ApproximateTime, 
    DefinitionList, 
    Typography,
    Links
} from 'components';
import { ROUTES } from 'client-constants';

const { Hgroup, H1 } = Typography;
const { InlineAnchor, HashAnchor } = Links;

const Article = ({ className }) => {
    const asideRef = useRef(null);
    const { id } = useParams();
    const { hash } = useLocation();

    useDocumentScroll({
        scrollHandler: usePinToScroll(asideRef, 'scrolling'),
        eventOptions: {
            passive: true
        }
    });
    
    const { loading, success, resource: article } = useResource({    
        resourceRoute: `/api/articles/${id}`
    });

    return (
        <div className={className}>
            { loading ? '<Loading...>' : null}             
            { 
                success && article
                    ? (
                        <div className="article-container">
                            <article>
                                <Hgroup>
                                    <H1>{article.title}</H1>
                                    <ApproximateTime 
                                        timestamp={article.timestamp} 
                                        show                                            
                                    />
                                </Hgroup>
                                {
                                    _.map(article.sections, (section) => (
                                        <ArticleSection 
                                            key={section.id}                                        
                                            title={section.title}
                                            content={section.content}
                                        />
                                    ))
                                }
                            </article>
                            <div className="aside-container">
                                <aside ref={asideRef}>
                                    <DefinitionList
                                        listHeading="In This Article"
                                    >
                                        {
                                            _.map(article.sections, (section) => (
                                                <HashAnchor
                                                    key={section.hash}
                                                    displayAs="InlineAnchor"
                                                    hash={section.hash}
                                                    isActive={hash.substr(1) === section.hash}
                                                >
                                                    {section.hash}
                                                </HashAnchor>
                                            ))
                                        }
                                    </DefinitionList>
                                    <DefinitionList
                                        listHeading="Similar Articles"
                                        listItems={article.similarArticles}
                                    />
                                    <DefinitionList
                                        listHeading="Categories"                                        
                                    >
                                        {
                                            _.map(article.categories, (cat) => (
                                                <InlineAnchor
                                                    key={cat}
                                                    to={{
                                                        pathname: ROUTES.HOME,
                                                        search: `categories=${cat}`
                                                    }}
                                                >
                                                    {cat}
                                                </InlineAnchor>   
                                            ))
                                        }
                                    </DefinitionList>
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
    }
`;
