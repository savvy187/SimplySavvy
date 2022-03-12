import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Typography } from 'components';

const { H2, P } = Typography;

const ArticleSection = ({ className, title, content }) => {
    return (
        <section className={className}>
            <H2>{title}</H2>                                     
            {
                _.map(content.text, (t, index) => (
                    <P key={`${content.id}-text-${index}`}>{t}</P>
                ))
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
`;
