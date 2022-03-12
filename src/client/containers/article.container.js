import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import useResource from 'hooks/resource.hook';
import useDocumentScroll from 'hooks/document-scroll.hook';
import usePinToScroll from 'hooks/pin-to-scroll.hook';
import { 
    ArticleSection,
    ApproximateTime, 
    DefinitionList, 
    Typography 
} from 'components';

const { Hgroup, H1 } = Typography;

const Article = ({ className }) => {
    const asideRef = useRef(null);
    const { id } = useParams();

    useDocumentScroll({
        scrollHandler: usePinToScroll(asideRef, 'scrolling'),
        eventOptions: {
            passive: true
        }
    });
    
    const { loading, success, resource } = useResource({    
        resourceRoute: `/api/articles/${id}`
    });

    return (
        <div className={className}>
            { loading ? '<Loading...>' : null}             
            { 
                success && resource
                    ? (
                        <div className="article-container">
                            <article>
                                <Hgroup>
                                    <H1>{resource.title}</H1>
                                    <ApproximateTime 
                                        timestamp={resource.timestamp} 
                                        show                                            
                                    />
                                </Hgroup>
                                {_.map(resource.sections, (s) => (
                                    <ArticleSection 
                                        key={s.id}
                                        title={s.title}
                                        content={s.content}
                                    />
                                ))}
                            </article>
                            <div className="aside-container">
                                <aside ref={asideRef}>
                                    <DefinitionList
                                        listHeading="Categories"
                                        listItems={resource.categories}
                                    />
                                    <DefinitionList
                                        listHeading="Similar Articles"
                                        listItems={resource.similarArticles}
                                    />
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
