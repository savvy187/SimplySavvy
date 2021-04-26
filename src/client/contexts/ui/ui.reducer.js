
export const UI_ACTION_TYPES = {
    UPDATE_SCROLL_DIRECTION: '/simplySavvy/UI/UPDATE_SCROLL_DIRECTION',
    UPDATE_SCROLL_PROGRESS: '/simplySavvy/UI/UPDATE_SCROLL_PROGRESS',
    RESET: '/simplySavvy/UI/RESET'
};

export const UI_INITIAL_STATE = {
    routes: {}
};

export default function UIReducer(state, action) {
    switch (action.type) {
        case UI_ACTION_TYPES.UPDATE_SCROLL_PROGRESS:
            return {
                ...state,
                routes: {
                    ...state.routes,
                    [action.route]: {
                        scrollProgress: action.scrollProgress
                    }
                }
            };
        case UI_ACTION_TYPES.UPDATE_SCROLL_DIRECTION:
            return {
                ...state,
                scrollDirection: action.scrollDirection
            };
        case UI_ACTION_TYPES.RESET:
            return UI_INITIAL_STATE;
        default:
            return state;
    }
}
