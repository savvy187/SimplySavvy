import React from 'react';
import PropTypes from 'prop-types';
import usePersistentStore from 'hooks/persistent-store.hook';
import UIReducer, { UI_INITIAL_STATE } from './ui.reducer';
import { STORAGE_TYPE } from 'client/constants';

export const UIContext = React.createContext();

export default function UIProvider({ children }) {
    const [selector, dispatchAction] = usePersistentStore(
        {
            storageType: STORAGE_TYPE.SESSION_STORAGE,
            storageKey: 'simplySavvy.ui'
        },         
        UIReducer, 
        UI_INITIAL_STATE
    );
    return (
        <UIContext.Provider value={{ selector, dispatchAction }}>
            {children}
        </UIContext.Provider>
    );
}

UIProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};
