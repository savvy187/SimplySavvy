import _ from 'lodash';

export const UI_ACTION_TYPES = {
    UPDATE_ARTICLE_META: '/simplySavvy/UI/UPDATE_ARTICLE_META',
    RESET: '/simplySavvy/UI/RESET'
};

export const UI_INITIAL_STATE = {
    routes: {}
};

export default function UIReducer(state, action) {
    switch (action.type) {
        case UI_ACTION_TYPES.UPDATE_ARTICLE_META:
            return {
                ...state,
                routes: {
                    ...state.routes,
                    [action.route]: {
                        scrollPosition: action.scrollPosition
                    }
                }
            };
        case UI_ACTION_TYPES.RESET:
            return UI_INITIAL_STATE;
        default:
            return state;
    }
}
