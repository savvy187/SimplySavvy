import React from 'react';
import PropTypes from 'prop-types';
import usePersistentStore from 'hooks/persistent-store.hook';
import NetworkReducer, { NETWORK_INITIAL_STATE } from './network.reducer';
import { STORAGE_TYPE } from 'client/constants';

export const NetworkContext = React.createContext();

export default function NetworkProvider({ children }) {
    const [selector, dispatchAction] = usePersistentStore(
        {
            storageType: STORAGE_TYPE.LOCAL_STORAGE,
            storageKey: 'simplySavvy.network'
        },         
        NetworkReducer, 
        NETWORK_INITIAL_STATE
    );
    return (
        <NetworkContext.Provider value={{ selector, dispatchAction }}>
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
