import React from 'react';
import PropTypes from 'prop-types';
import usePersistentStore from 'hooks/persistent-store.hook';
import NetworkReducer from './network.reducer';

export const NetworkContext = React.createContext();

export default function NetworkProvider({ children }) {
    const [state, setState] = usePersistentStore('simplySavvy.network', NetworkReducer);
    return (
        <NetworkContext.Provider value={{ state, setState }}>
            {children}
        </NetworkContext.Provider>
    );
}

NetworkProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};
