import NetworkReducer, { NETWORK_ACTION_TYPES, NETWORK_INITIAL_STATE } from 'contexts/network/network.reducer';

describe('Network Reducer', () => {
    it('Should expose the correct action dispatchers' , () => {
        expect(NETWORK_ACTION_TYPES).toHaveProperty('UPDATE_NETWORK_STATUS');
        expect(NETWORK_ACTION_TYPES).toHaveProperty('START_NETWORK_REQUEST');
        expect(NETWORK_ACTION_TYPES).toHaveProperty('CANCEL_NETWORK_REQUEST');
        expect(NETWORK_ACTION_TYPES).toHaveProperty('NETWORK_REQUEST_SUCCESS');
        expect(NETWORK_ACTION_TYPES).toHaveProperty('NETWORK_REQUEST_FAIL');
        expect(NETWORK_ACTION_TYPES).toHaveProperty('RESET');
    });
    
    it('should have the correct initial state', () => {
        expect(NETWORK_INITIAL_STATE.online).toBe(true);
        expect(NETWORK_INITIAL_STATE.loading).toBe(false);
        expect(NETWORK_INITIAL_STATE.success).toBeNull();
        expect(NETWORK_INITIAL_STATE.error).toBe(false);
        expect(NETWORK_INITIAL_STATE.cancelled).toBe(false);
        expect(NETWORK_INITIAL_STATE.requests).toEqual(expect.any(Object));
    });

    it('Should handle UPDATE_NETWORK_STATUS', () => {
        const state = NetworkReducer(NETWORK_INITIAL_STATE, { 
            type: NETWORK_ACTION_TYPES.UPDATE_NETWORK_STATUS   ,
            online: false
        });

        expect(state).toEqual({
            ...NETWORK_INITIAL_STATE,
            online: false
        });
    });

    it('Should handle START_NETWORK_REQUEST', () => {
        const state = NetworkReducer(NETWORK_INITIAL_STATE, {
            type: NETWORK_ACTION_TYPES.START_NETWORK_REQUEST,
            route: '/twitter'
        });

        expect(state).toEqual({
            ...NETWORK_INITIAL_STATE,
            loading: true,
            requests: {
                ['/twitter']: { statusCode: null, data: null }
            }
        });
    });

    it('Should handle CANCEL_NETWORK_REQUEST', () => {
        const state = NetworkReducer(NETWORK_INITIAL_STATE, {
            type: NETWORK_ACTION_TYPES.CANCEL_NETWORK_REQUEST,
            route: '/tutorials',
            statusCode: 200
        });

        expect(state).toEqual({
            ...NETWORK_INITIAL_STATE,
            loading: false,
            cancelled: true,
            requests: {
                ['/tutorials']: { statusCode: 200, data: null }
            }
        });
    });

    it('Should handle NETWORK_REQUEST_SUCCESS', () => {
        const state = NetworkReducer(NETWORK_INITIAL_STATE, {
            type: NETWORK_ACTION_TYPES.NETWORK_REQUEST_SUCCESS,
            route: '/blog',
            statusCode: 200,
            data: ['data1', 'data2', 'data3']
        });

        expect(state).toEqual({
            ...NETWORK_INITIAL_STATE,
            loading: false,
            success: true,
            requests: {
                ['/blog']: { statusCode: 200, data: ['data1', 'data2', 'data3'] }
            }
        });
    });

    it('Should handle NETWORK_REQUEST_FAIL', () => {
        const state = NetworkReducer(NETWORK_INITIAL_STATE, {
            type: NETWORK_ACTION_TYPES.NETWORK_REQUEST_FAIL,
            route: '/blog',
            statusCode: 500,
            error: 'Internal Server Error'
        });

        expect(state).toEqual({
            ...NETWORK_INITIAL_STATE,
            loading: false,
            success: false,
            error: true,
            requests: {
                ['/blog']: { 
                    statusCode: 500, 
                    error: 'Internal Server Error',
                    data: null
                }
            }
        });
    });
});
