import { renderHook, history } from 'test/test-utils';
import useResource from 'hooks/resource.hook';
import * as ApiClient from 'utils/api-client';

describe('Use Resource Hook', () => {        
    beforeEach(() => {
        jest.spyOn(ApiClient.CancelToken, 'source')
            .mockImplementation(jest.fn(() => ({
                token: 'MOCK_CANCEL_TOKEN',
                cancel: jest.fn()
            })));
        
        jest.spyOn(ApiClient, 'default')
            .mockImplementation(jest.fn(() => new Promise(() => ({
                data: ['res1', 'res2', 'res3'],
                status: 200
            }))));        
    });

    afterEach(() => {
        jest.clearAllMocks();        
    });

    
    it('Should generate a new Cancel Token', () => {        
        const { result } = renderHook(() => useResource({
            resourceRoute: '/blog'
        }));
        
        expect(ApiClient.CancelToken.source).toHaveBeenCalledTimes(1);
        expect(result.current.cancelToken).toEqual(expect.objectContaining({ 
            token: 'MOCK_CANCEL_TOKEN',
            cancel: expect.any(Function)
        }));
    });

    it('Should make an network request', () => {    
        renderHook(() => useResource({
            resourceRoute: '/blog'
        }));

        expect(ApiClient.default).toHaveBeenCalledTimes(1);
        expect(ApiClient.default).toHaveBeenCalledWith({
            url: '/blog',
            id: undefined,
            query: '',
            CancelToken: 'MOCK_CANCEL_TOKEN'
        });
    });

    it.skip('Should infer the resource id when making a network request', () => {
        history.push('/tutorials/123');
        
        renderHook(() => useResource({
            resourceRoute: '/tutorials'
        }));

        expect(ApiClient.default).toHaveBeenCalledTimes(1);
        expect(ApiClient.default).toHaveBeenCalledWith({
            url: '/tutorias/123',
            id: '123',
            query: '',
            CancelToken: 'MOCK_CANCEL_TOKEN'
        });
    });
    
    
    describe('Network Actions', () => {
        it('Should dispatch an action to kick off a request', () => {
            const { result } = renderHook(() => useResource({
                resourceRoute: '/blog'
            }));
                        
            expect(result.current.loading).toBe(true);
            expect(result.current.cancelled).toBe(false);
            expect(result.current.success).toBeNull();
            expect(result.current.error).toBe(false);
            expect(result.current.statusCode).toBeNull();
            expect(result.current.resource).toBeNull();
        });

        it('Should dispatch an action to mark a successful request', async () => {
            ApiClient.default.mockResolvedValueOnce({                
                data: ['data1', 'data2', 'data3'],
                status: 200
            });
    
            const { result, waitForNextUpdate } = renderHook(() => useResource({
                resourceRoute: '/tutorials'
            }));
    
            await waitForNextUpdate();
            
            expect(result.current.loading).toBe(false);
            expect(result.current.cancelled).toBe(false);
            expect(result.current.success).toBe(true);
            expect(result.current.error).toBe(false);            
            expect(result.current.statusCode).toEqual(200);
            expect(result.current.resource).toEqual(expect.arrayContaining(
                ['data1', 'data2', 'data3']
            ));            
        });

        /* 
        * TODO: Need to add cancel error tests...
        */

        it('Should dispatch an action to mark a failed request', async () => {
            ApiClient.default.mockRejectedValueOnce({                
                status: 500,
                message: 'Internal Server Error'                
            });

            const { result, waitForNextUpdate } = renderHook(() => useResource({
                resourceRoute: '/twitter'
            }));
            
            await waitForNextUpdate();
            
            expect(result.current.loading).toBe(false);
            expect(result.current.cancelled).toBe(false);
            expect(result.current.success).toBe(false);
            expect(result.current.error).toBe(true);
            expect(result.current.statusCode).toEqual(500);
            expect(result.current.resource).toBeNull();
                                    
        });    
    });

    it('Should return the correct shape', async () => {
        ApiClient.default.mockResolvedValueOnce({                
            data: ['data1', 'data2', 'data3'],
            status: 200
        });
        
        const { result, waitForNextUpdate } = renderHook(() => useResource({
            resourceRoute: '/blog'
        }));

        await waitForNextUpdate();

        expect(result.current).toHaveProperty('loading');
        expect(result.current).toHaveProperty('cancelled');
        expect(result.current).toHaveProperty('success');
        expect(result.current).toHaveProperty('error');
        expect(result.current).toHaveProperty('statusCode');
        expect(result.current).toHaveProperty('resource');
        expect(result.current).toHaveProperty('resourceOptions');
        expect(result.current).toHaveProperty('cancelToken');
        expect(result.current).toHaveProperty('updateResourceOptions');
    });
});
