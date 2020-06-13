
export const NETWORK_ACTION_TYPES = {
    UPDATE_NETWORK_STATUS: '/simplySavvy/NETWORK/UPDATE_STATUS',
    START_NETWORK_REQUEST: '/simplySavvy/NETWORK/START_NETWORK_REQUEST',
    CANCEL_NETWORK_REQUEST: '/simplySavvy/NETWORK/CANCEL_NETWORK_REQUEST',
    NETWORK_REQUEST_SUCCESS: '/simplySavvy/NETWORK/NETWORK_REQUEST_SUCCESS',
    NETWORK_REQUEST_FAIL: '/simplySavvy/NETWORK/NETWORK_REQUEST_FAIL'
};

export const NETWORK_INITIAL_STATE = {
    online: navigator.onLine,
    loading: false,
    error: false,
    cancel: false,
    success: null,
    requests: {}
};

export default function NetworkReducer(state, action) {
    switch(action.type) {
        case NETWORK_ACTION_TYPES.UPDATE_NETWORK_STATUS:
            return { 
                ...state,
                online: action.online
            };
        case NETWORK_ACTION_TYPES.START_NETWORK_REQUEST:            
            return {
                ...state,
                loading: true                
            };
        case NETWORK_ACTION_TYPES.CANCEL_NETWORK_REQUEST: 
            return {
                ...state,                
                loading: false,
                cancel: true,
                requests: {
                    ...state.requests,
                    [action.route]: {                    
                        statusCode: action.statusCode,
                        data: null
                    }
                }                
            };
        case NETWORK_ACTION_TYPES.NETWORK_REQUEST_SUCCESS:
            return {
                ...state,                
                loading: false,
                success: true,
                requests: {
                    ...state.requests,
                    [action.route]: {
                        statusCode: action.statusCode,
                        data: action.data
                    }
                }
            };
        case NETWORK_ACTION_TYPES.NETWORK_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: true,
                reuests: {
                    ...state.requests,
                    [action.route]: {
                        statusCode: action.statusCode,
                        error: action.error,
                        data: null
                    }
                }
            };
        default:
            return state;
    }
}
