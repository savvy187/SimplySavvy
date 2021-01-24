import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavBar } from 'components';
import { 
    useDocumentScroll,
    usePinToScroll,
    useMediaQuery
} from 'hooks';

const Header = ({ className }) => {    
    const navRef = useRef(null);
    const [matches] = useMediaQuery('(min-width: 965px)');

    useDocumentScroll(
        usePinToScroll(navRef, 'scrolling')
    );

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
                                <NavBar />
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
