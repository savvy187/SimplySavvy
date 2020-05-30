import { renderHook } from '@testing-library/react-hooks';
import useResource from 'hooks/resource.hook';
import * as Axios from 'axios';
import { act } from '@testing-library/react-hooks';

jest.mock('axios');

xdescribe('resource.hook', () => {    
    
    beforeEach(() => {        
        jest.spyOn(Axios, 'default').mockResolvedValue({
            sucess: true
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should make a request with the correct parameters', () => {        
        const { result } = renderHook(() => {            
            return useResource({
                method: 'GET',
                resourceRoute: '/blog'
            });
        });        
        
        expect(result.current).toEqual([
            null, // resource
            { // resource options
                method: 'GET',
                resourceRoute: '/blog'
            },
            expect.any(Function) //set resource options
        ]);        
        
        expect(Axios.default).toHaveBeenCalledWith({
            method: 'GET',
            url: '/blog',
            query: ''
        });
    });

    it('Should provide a setter to update the options', async () => {
        const { result, rerender, waitForNextUpdate, wait } = renderHook(() => {            
            return useResource({
                method: 'GET',
                resourceRoute: '/blog'
            });
        });

        const setResourceOptions = result.current[2];
        
        act(() => setResourceOptions({
            method: 'POST',
            resourceRoute: '/blog',
            data: {
                title: 'update, yo'
            }
        }));        

        const resourceOptions = result.current[1];
        
        expect(result.current[1]).toEqual({
            method: 'POST',
            resourceRoute: '/blog',
            data: {
                title: 'update, yo'
            }
        });
        
        expect(Axios.default).toHaveBeenCalledWith({
            method: 'POST',
            url: '/blog',
            data: {
                title: 'update, yo'
            }
        });
    });
});
