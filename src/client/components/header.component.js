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

    .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: ${({ theme }) => theme.dimensions.primary_nav.height};
        padding: 0 20px;

        a {
            padding: 4px;
            margin-right: 12px;
            color: ${({ theme }) => theme.colors.primary_nav_link.default};
            font: ${({ theme }) => theme.fonts.primary_nav_link};
            text-decoration: none;
            letter-spacing: 1.25px;
            border-radius: 4px;
            border: 1px solid transparent;
            transition: ${({ theme }) => theme.transitions.ease_in};

            &:hover,
            &:focus {
                color: ${({ theme }) => theme.colors.primary_nav_link.hover};
                background-color: ${({ theme }) => theme.backgrounds.primary_nav_link.hover};
                outline: none;
            }

            &:focus {
                border: ${({ theme }) => theme.borders.primary_nav_link.focus};
            }
        }
    }

    #search {
        min-width: 200px;
        padding: 4px 8px;
        color: ${({ theme }) => theme.colors.search_input.default};
        background-color: ${({ theme }) => theme.backgrounds.search_input.default};
        border-radius: 4px;
        border: none;
        transition: ${({ theme }) => theme.transitions.ease_in};

        &::-webkit-input-placeholder {
            font-style: italic;
            font-weight: bold;
            color: ${({ theme }) => theme.colors.search_input_placeholder};
        }

        &:hover,
        &:focus {
            color: ${({ theme }) => theme.colors.search_input.hover};
            background-color: ${({ theme }) => theme.backgrounds.search_input.hover};
            border: ${({ theme }) => theme.borders.search_input.hover};
            box-shadow: ${({ theme }) => theme.shadows.search_input};
            outline: none;
        }
    }
`;
