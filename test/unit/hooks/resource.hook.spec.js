import { renderHook, act } from 'test/test-utils';
import useResource from 'hooks/resource.hook';
import NetworkReducer, { NETWORK_ACTION_TYPES, NETWORK_INITIAL_STATE } from 'contexts/network/network.reducer';
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

    it('Should dispatch an action to kick off a request', () => {
        const { result } = renderHook(() => useResource({
            resourceRoute: '/blog'
        }));
        
        const type = NETWORK_ACTION_TYPES.START_NETWORK_REQUEST;
        const state = NetworkReducer(NETWORK_INITIAL_STATE, { type });                
        expect(result.current.selector()).toEqual(expect.objectContaining({
            ...state
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

    it('Should dispatch an action to mark a successful request', async () => {
        ApiClient.default.mockImplementationOnce(
            () => Promise.resolve({
                data: ['data1', 'data2', 'data3'],
                status: 200
            })
        );

        const { result, waitForNextUpdate } = renderHook(() => useResource({
            resourceRoute: '/tutorials'
        }));

        await waitForNextUpdate();

        const type = NETWORK_ACTION_TYPES.NETWORK_REQUEST_SUCCESS;
        const state = NetworkReducer(NETWORK_INITIAL_STATE, { 
            type,
            route: '/tutorials',
            data: ['data1', 'data2', 'data3'],
            statusCode: 200
        });
        expect(result.current.selector()).toEqual(expect.objectContaining({
            ...state
        }));
    });

    /* 
     * TODO: Need to add error tests...
    */

});
