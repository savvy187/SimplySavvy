import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Links } from 'components';
import useQuery from 'hooks/query.hook';
import { ARTICLE_TYPE } from 'client/constants';

const { NavAnchor } = Links;

const NavBar = ({ className }) => {
    const query = useQuery();
    const { pathname } = useLocation();    
    return (
        <div className={className}>
            <nav>
                <NavAnchor 
                    to={{ 
                        pathname: '/articles', 
                        search: `type=${ARTICLE_TYPE.BLOG}` 
                    }}                    
                    className={query.get('type') === ARTICLE_TYPE.BLOG ? 'active' : ''}
                >
                    Blog
                </NavAnchor>
                <NavAnchor 
                    to={{ 
                        pathname: '/articles',
                        search: `type=${ARTICLE_TYPE.TUTORIAL}` 
                    }}
                    className={query.get('type') === ARTICLE_TYPE.TUTORIAL ? 'active' : ''}
                >
                    Tutorials
                </NavAnchor>
                <NavAnchor 
                    to="/twitter"                    
                    className={pathname === '/twitter' ? 'active' : ''}
                >
                    Twitter
                </NavAnchor>
                <NavAnchor 
                    to="/contact"                    
                    className={pathname === '/contact' ? 'active' : ''}
                >
                    Contact
                </NavAnchor>
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
