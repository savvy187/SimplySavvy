import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useDocumentScroll from 'hooks/document-scroll.hook';

const Header = ({ className }) => {
    const navRef = useRef(null);
    useDocumentScroll(() => {
        console.log('scrolling');
    });

    return (
        <header className={className}>
            <div className="logo-container"></div>
            <div ref={navRef} className="primary-nav">
                <div className="nav-container">
                    <div className="nav-bar">
                        <nav>
                            <Link to="/blog">Blog</Link>
                            <Link to="/tutorials">Tutorials</Link>
                            <Link to="/twitter">Twitter</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>
                        <form>
                            <input 
                                id="search" 
                                type="search"
                                name="q"
                                placeholder="Search"
                                aria-label="Search for articles and tutorials"
                            />
                        </form>
                    </div>
                </div>
            </div>
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
            border-radius: 0 0 4px 4px;
            box-shadow: ${({ theme }) => theme.shadows.primary_nav};
        }
    }
`;
