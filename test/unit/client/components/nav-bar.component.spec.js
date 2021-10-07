import React from 'react';
import { render, history } from 'test/test-utils';
import { fireEvent } from '@testing-library/react';
import NavBar from 'client/components/nav-bar.component';

describe('NavBar', () => {

    it('Should render the nav with the correct links', () => {
        const { getByText } = render(<NavBar />);
        expect(getByText(/Blog/)).toBeInTheDocument();
        expect(getByText(/Tutorials/)).toBeInTheDocument();
        expect(getByText(/Twitter/)).toBeInTheDocument();
        expect(getByText(/Contact/)).toBeInTheDocument();
    });

    it('Should route to the correct location when clicking a nav link', () => {
        const { getByText } = render(<NavBar />);        
        
        fireEvent.click(getByText(/Blog/));
        expect(history.location.pathname).toBe('/blog');
        
        fireEvent.click(getByText(/Tutorials/));
        expect(history.location.pathname).toBe('/tutorials');

        fireEvent.click(getByText(/Twitter/));
        expect(history.location.pathname).toBe('/twitter');

        fireEvent.click(getByText(/Contact/));
        expect(history.location.pathname).toBe('/contact');
    });

    it('Should apply an active className to the correct link', () => {
        const { getByText } = render(<NavBar />);

        const blog = getByText(/Blog/);
        const tutorials = getByText(/Tutorials/);
        const twitter = getByText(/Twitter/);
        const contact = getByText(/Contact/);

        fireEvent.click(blog);
        expect(blog.className).toEqual('active');
        expect(tutorials.className).not.toInclude('active');
        expect(twitter.className).not.toInclude('active');
        expect(contact.className).not.toInclude('active');
        
        fireEvent.click(tutorials);
        expect(blog.className).not.toInclude('active');
        expect(tutorials.className).toEqual('active');
        expect(twitter.className).not.toInclude('active');
        expect(contact.className).not.toInclude('active');

        fireEvent.click(twitter);
        expect(blog.className).not.toInclude('active');
        expect(tutorials.className).not.toInclude('active');
        expect(twitter.className).toEqual('active');
        expect(contact.className).not.toInclude('active');

        fireEvent.click(contact);
        expect(blog.className).not.toInclude('active');
        expect(tutorials.className).not.toInclude('active');
        expect(twitter.className).not.toInclude('active');
        expect(contact.className).toEqual('active');
    });

    it('Should render the search form', () => {
        const { getByPlaceholderText } = render(<NavBar />);
        expect(getByPlaceholderText(/Search/)).toBeInTheDocument();
    });
    
});
