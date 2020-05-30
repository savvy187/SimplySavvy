import { renderHook, act } from '@testing-library/react-hooks';
import useQuery from 'hooks/query.hook';
import * as reactRouter from 'react-router';

jest.mock('react-router');

describe('query.hook', () => {    
    
    beforeEach(() => {        
        jest.spyOn(reactRouter, 'useLocation');        
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('Should return a url search params object which is feed from react routers search', () => {        
        reactRouter.useLocation.mockImplementation(jest.fn(() => '?q=test+search&foo=bar'));
        const { current } = renderHook(() => useQuery());
        console.log(current);
    });
});
