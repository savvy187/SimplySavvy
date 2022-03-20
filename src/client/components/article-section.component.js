import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Typography } from 'components';
import { useIntersectionObserver } from 'hooks';

const { H2, P } = Typography;

const ArticleSection = ({ className, title, content }) => {
    const history = useHistory();
    const sectionRef = useRef();

    const { observe, unobserve, debugTarget } = useIntersectionObserver({        
        rootMargin: '0px 0px -95% 0px',
        thresholdRange: 1,
        entryCallback: (entries) => {
            const entry = _.first(entries);
            
            if (entry.isIntersecting) {
                const id = entry.target.id;
                history.push(`#${id}`);
            }
        },
        debug: true
    });

    useEffect(() => {
        observe(sectionRef.current);
        return () => unobserve(sectionRef.current);
    }, []);
    
    return (
        <section 
            id={_.snakeCase(title)}
            ref={sectionRef}
            className={className}
        >
            <H2>{title}</H2>                                     
            {
                _.map(content.text, (t, index) => (
                    <P key={`${content.id}-text-${index}`}>{t}</P>
                ))
            }
            {debugTarget}
        </section>
    );
};

ArticleSection.propTypes = {
    className: PropTypes.string.isRequired,    
    title: PropTypes.string.isRequired,
    content: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        images: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired
        })),
        pullQuote: PropTypes.string,
        text: PropTypes.arrayOf(PropTypes.string.isRequired)
    })
};

export default styled(ArticleSection)`    
    flex-shrink: 0;
    padding: 0 0.5rem;
    margin-bottom: 1.5rem;
`;
