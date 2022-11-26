import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { Typography, Picture } from 'components';
import { useIntersectionObserver } from 'hooks';
import { CONTENT_TYPE } from 'client-constants';

const { H2, P, PullQuote } = Typography;

const ArticleSection = ({ className, title, content }) => {
    const history = useHistory();
    const sectionRef = useRef();

    const { observe, unobserve } = useIntersectionObserver({        
        rootMargin: '0px 0px -95% 0px',
        threshold: 1,
        entryCallback: (entries) => {
            const entry = _.first(entries);
            
            if (entry.isIntersecting) {
                const id = entry.target.id;
                history.replace(`#${id}`);
            }
        }
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
            <H2 className="section-title">{title}</H2>                                     
            {
                _.map(content, (item, index) => {                                    
                    switch(item.type) {
                        case CONTENT_TYPE.TEXT: 
                            return  _.map(item.text, (t, i) => <P key={i}>{t}</P>);
                        case CONTENT_TYPE.IMAGE:
                            return (
                                <Picture 
                                    src={item.src}
                                    alt={item.alt}
                                    anchor={item.anchor}
                                />
                            );
                        case CONTENT_TYPE.PULL_QUOTE:
                            return (
                                <PullQuote 
                                    anchor={item.anchor}
                                    key={index}
                                >
                                    {item.text}
                                </PullQuote>
                            );
                    }
                })
            }                    
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
    border: 1px solid red;
    
    &:after {
        clear: right;
    }

    h2 {
        display: block;
    }    

    img { 
        height: 250px;
    }
`;
