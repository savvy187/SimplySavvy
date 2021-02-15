import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CombineProviders = ({ providers, children }) => {
    return (
        <>
            {
                _.reduceRight(providers, (acc, provider) => {
                    const { name, props } = provider;
                    const ProviderName = name;
                    const providerProps = _.isEmpty(props) ? {} : props;                    
                    return <ProviderName {...providerProps}>{acc}</ProviderName>;
                }, children)
            }
        </>
    );
};

CombineProviders.propTypes = {
    providers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.func.isRequired,
        props: PropTypes.object
    })),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export { CombineProviders };
