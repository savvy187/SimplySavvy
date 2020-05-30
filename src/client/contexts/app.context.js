import React from 'react';
import PropTypes from 'prop-types';
import usePersistentStore from 'hooks/persistent-store.hook';

export const AppContext = React.createContext();

export default function StateProvider({ children }) {
    const [state, setState] = usePersistentStore('simplySavvy');
    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
}

StateProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};
