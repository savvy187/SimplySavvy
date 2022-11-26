import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {      
    useArticleSectionsNavigation,
    useScrollNavigation
} from 'hooks';
import { AXIS_TYPE } from 'client-constants';

const ArticleSectionsNavigation = ({ className, location, routeMatch }) => {
    const sectionNavRef = useRef(null);

    const articleSectionsNavigation = useArticleSectionsNavigation({
        location,
        routeMatch    
    });    
    
    const { previous, next } = useScrollNavigation({ 
        axis: AXIS_TYPE.X,
        scrollAmount: 50,
        scrollContainerRef: sectionNavRef
    });

    return (
        <nav 
            ref={sectionNavRef} 
            className={className}
        >
            { previous }
            { articleSectionsNavigation }
            { next }
        </nav>
    );
};

ArticleSectionsNavigation.propTypes = {
    className: PropTypes.string.isRequired,
    routeMatch: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default styled(ArticleSectionsNavigation)`    
    height: inherit;        
    padding: 0 10px;
    overflow: scroll;
    position: relative;    
`;
