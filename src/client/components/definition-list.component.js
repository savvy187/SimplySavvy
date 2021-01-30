import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Links } from 'components';

const { InlineAnchor } = Links;

const DefinitionList = ({ className, listHeading, listItems=[] }) => {
    if (!_.isEmpty(listItems)) {
        return (
            <dl className={className}>
                <dt>{listHeading}</dt>
                {_.map(listItems, (item) => (
                    <dd key={item}>
                        <Link component={InlineAnchor}>{item}</Link>
                    </dd>
                ))}
            </dl>
        );
    }

    return null;
};

DefinitionList.propTypes = {
    className: PropTypes.string.isRequired,
    listHeading: PropTypes.string.isRequired,
    listItems: PropTypes.arrayOf(PropTypes.string)
};

export default styled(DefinitionList)`
    margin-bottom: 50px;
    
    dt {
        margin-bottom: 0.5em;
        padding: 0.5em;
        border-radius: 4px;
        font: ${({ theme }) => theme.fonts.definition_term};
        color: ${({ theme }) => theme.colors.definition_term.default};
        background-color: ${({ theme }) => theme.backgrounds.definition_term};
    }

    dd {
        padding: 0.25em;        
        border-bottom: ${({ theme }) => theme.borders.definition_definition.default};
    }    
`;
