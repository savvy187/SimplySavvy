import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavBar = ({ className }) => {
    return (
        <div className={className}>
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
    );
};

NavBar.propTypes = {
    className: PropTypes.string.isRequired
};

export default styled(NavBar)`    
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
