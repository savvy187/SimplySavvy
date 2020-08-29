import React from 'react';
import { render } from 'test/test-utils';
import { fireEvent, waitFor } from '@testing-library/react';
import Header from 'client/components/header.component';

describe('Header', () => {

    it('should append a scrolling class when scrolled past its threshold', async () => {
        const { container } = render(<Header />);        
        const primaryNav = container.querySelector('.nav-container');

        fireEvent.scroll(document, { y: 600 });

        /* 
         * This is required because the callback in wrapped
         * with a `requestAnimtionEvent`
        */
        setTimeout(async () => {
            await waitFor(() => {            
                expect(primaryNav.classList.contains('scrolling')).toBe(true);
            });
        }, 0);
        
    });    
});
