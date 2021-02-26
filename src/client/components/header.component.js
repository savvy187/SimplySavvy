import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { 
    useDocumentScroll,
    usePinToScroll,
    useMediaQuery
} from 'hooks';

const Header = ({ children, className }) => {
    const navRef = useRef(null);
    const { media_queries: { nav_bar } } = useContext(ThemeContext);
    const [matches] = useMediaQuery(nav_bar);

    useDocumentScroll({
        scrollHandler: usePinToScroll(navRef, 'scrolling'),
        eventOptions: {
            passive: true
        }
    });

    return (
        <header
            data-testid="header-component"
            className={className}
        >
            <div className="logo-container"></div>
            {
                matches
                    ? (
                        <div className="primary-nav">
                            <div ref={navRef} className="nav-container">
                                { children }
                            </div>
                        </div>
                    )
                    : null
            }
        </header>
    );
};

Header.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired
};

export default styled(Header)`
    .logo-container {
        height: 100px;
    }

    .primary-nav {
        position: static;
        width: ${({ theme }) => theme.dimensions.primary_nav.width};
    }

    .nav-container {
        position: relative;
        top: initial;
        left: initial;
        width: ${({ theme }) => theme.dimensions.primary_nav.width};
        height: ${({ theme }) => theme.dimensions.primary_nav.height};
        background-color: ${({ theme }) => theme.backgrounds.primary_nav};
        border-radius: initial;
        box-shadow: initial;
        z-index: ${({ theme }) => theme.stacking_order.primary_nav};

        &.scrolling {
            position: fixed;
            top: 0;
            left: calc(50% - (${({ theme }) => theme.dimensions.primary_nav.width_expanded}/2));
            width: ${({ theme }) => theme.dimensions.primary_nav.width_expanded};
            border-radius: 0 0 4px 4px;
            box-shadow: ${({ theme }) => theme.shadows.primary_nav};
        }
    }
`;
