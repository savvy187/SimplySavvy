import React from 'react';
import { render } from 'test/test-utils';
import { ApproximateTime } from 'components';
import * as useApproximateTime from 'hooks/approximate-time.hook';

describe('Approximate Time', () => {
    
    beforeEach(() => {
        jest.spyOn(useApproximateTime, 'default').mockImplementation(
            jest.fn(() => 'Many Moons Ago...')
        );
    });
        

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should embed the response from the hook', () => {
        const timestamp = new Date('1996-10-26').toISOString();

        const { getByText } = render(
            <ApproximateTime timestamp={timestamp} />
        );
        
        expect(useApproximateTime.default).toHaveBeenCalledWith(timestamp);
        expect(getByText('Written Many Moons Ago...')).toBeInTheDocument();
    });
});
