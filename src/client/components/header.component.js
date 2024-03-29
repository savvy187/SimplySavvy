import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { useDocumentScroll, usePinToScroll, useMediaQuery, useDirectionalElement } from 'hooks';
import { NavBar, FilterBar, ProgressBar } from 'components';
import { DIRECTION_TYPE, ROUTES } from 'client/constants';

const Header = ({ className }) => {
    const navRef = useRef(null);
    const { media_queries: { nav_bar } } = useContext(ThemeContext);
    const [matches] = useMediaQuery(nav_bar);

    useDocumentScroll({
        scrollHandler: usePinToScroll(navRef, 'scrolling'),
        eventOptions: {
            passive: false
        }
    });
    
    const HeaderBar = useDirectionalElement({
        ref: navRef,
        directions: {
            y: [
                {
                    type: DIRECTION_TYPE.UP,
                    component: NavBar,
                },
                {
                    type: DIRECTION_TYPE.DOWN,
                    component: FilterBar,                
                    routes: [
                        ROUTES.HOME.pathname,
                        ROUTES.ARTICLES.pathname
                    ]
                },
                {
                    type: DIRECTION_TYPE.DOWN,
                    component: ProgressBar,
                    routes: [
                        ROUTES.ARTICLE.pathname
                    ]
                }
            ]
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
                                { HeaderBar }
                            </div>
                        </div>
                    )
                    : null
            }
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string.isRequired
};

export default styled(Header)`
    .logo-container {
        height: ${({ theme }) => theme.dimensions.logo_container.height};
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
