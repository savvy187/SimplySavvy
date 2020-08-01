import React from 'react';
import { render, history } from 'test/test-utils';
import { fireEvent, waitFor } from '@testing-library/react';
import Header from 'client/components/header.component';

describe('Header', () => {
    it('Should container the correct markup structure', () => {
        const { getByTestId } = render(<Header />);
        const header = getByTestId('header-component');
        
        expect(header).toBeInTheDocument();
        expect(header.nodeName.toLowerCase()).toBe('header');
        
        const logoContainer = header.firstChild;
        expect(logoContainer.nodeName.toLowerCase()).toBe('div');
        expect(logoContainer.className).toBe('logo-container');
        
        const primaryNav = header.childNodes[1];
        expect(primaryNav.nodeName.toLowerCase()).toBe('div');
        expect(primaryNav.className).toBe('primary-nav');

        const navContainer = primaryNav.firstChild;
        expect(navContainer.nodeName.toLowerCase()).toBe('div');
        expect(navContainer.className).toBe('nav-container');
        
        const navBar = navContainer.firstChild;
        expect(navBar.nodeName.toLowerCase()).toBe('div');
        expect(navBar.className).toBe('nav-bar');
    });

    it('Should render the nav with the correct links', () => {
        const { getByTestId } = render(<Header />);
        const header = getByTestId('header-component');
        const nav = header.querySelector('.nav-bar nav');

        expect(nav.childNodes.length).toEqual(4);
        expect(nav.firstChild.textContent).toBe('Blog');        
        expect(nav.childNodes[1].textContent).toBe('Tutorials');
        expect(nav.childNodes[2].textContent).toBe('Twitter');
        expect(nav.childNodes[3].textContent).toBe('Contact');
    });

    it('Should route to the correct location when clicking a nav link', () => {
        const { getByTestId } = render(<Header />);
        const header = getByTestId('header-component');
        const nav = header.querySelector('.nav-bar nav');

        fireEvent.click(nav.firstChild);
        expect(history.location.pathname).toBe('/blog');

        fireEvent.click(nav.childNodes[1]);
        expect(history.location.pathname).toBe('/tutorials');

        fireEvent.click(nav.childNodes[2]);
        expect(history.location.pathname).toBe('/twitter');

        fireEvent.click(nav.childNodes[3]);
        expect(history.location.pathname).toBe('/contact');
    });

    it('Should render the search form', () => {
        const { getByTestId } = render(<Header />);
        const header = getByTestId('header-component');
        const navBar = header.querySelector('.nav-bar');

        const searchForm = navBar.childNodes[1];
        expect(searchForm.nodeName.toLowerCase()).toBe('form');

        const search = searchForm.firstChild;
        expect(search.nodeName.toLowerCase()).toBe('input');
        expect(search.getAttribute('id')).toEqual('search');
        expect(search.getAttribute('type')).toEqual('search');
        expect(search.getAttribute('name')).toEqual('q');
        expect(search.getAttribute('placeholder')).toEqual('Search');
        expect(search.getAttribute('aria-label')).toEqual('Search for articles and tutorials');
    });

    it('should append a scrolling class when scrolled past its threshold', async () => {
        const { getByTestId } = render(<Header />);
        const header = getByTestId('header-component');
        const primaryNav = header.querySelector('.primary-nav');

        fireEvent.scroll(document);

        await waitFor(() => {        
            expect(primaryNav.classList.contains('scrolling')).toBe(true);
        });
    });    
});
