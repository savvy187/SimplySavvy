import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
                        <article>
                            <h1>{resource.title}</h1>
                        </article>
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
    padding: 2em;
`;
