import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import useResource from 'hooks/resource.hook';


const Article = ({ className }) => {    
    const { id } = useParams();
    const { loading, success, error, resource } = useResource({    
        resourceRoute: `/api/articles/${id}`
    });

    return (
        <div className={className}>
            { loading ? '<Loading...>' : null} 
            { error ? '<Error...>' : null}
            { 
                success && !_.isEmpty(resource)
                    ? JSON.stringify(resource)
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
