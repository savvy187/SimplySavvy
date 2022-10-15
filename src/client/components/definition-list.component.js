import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

const DefinitionList = ({ children, className, listHeading }) => {
    if (!_.isEmpty(children)) {
        return (
            <dl className={className}>
                <dt>{listHeading}</dt>
                {React.Children.map(children, (child, index) => {
                    return <dd key={index}>{child}</dd>;
                })}
            </dl>
        );
    }

    return null;
};

DefinitionList.propTypes = {
    className: PropTypes.string.isRequired,
    listHeading: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
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

        a {
            &:hover,
            &.active {
                font-weight: bold;
            }
        }
        

        &:last-child {
            border-bottom: none;
        }
    }    
`;
