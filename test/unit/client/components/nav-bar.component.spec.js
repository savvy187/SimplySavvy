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

    it('Should render the search form', () => {
        const { getByPlaceholderText } = render(<NavBar />);
        expect(getByPlaceholderText(/Search/)).toBeInTheDocument();
    });

    
});
