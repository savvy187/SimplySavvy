
export const LOCAL_STORAGE = {
    initialzed: true,
    user: {
        firstName: 'John',
        lastName: 'Savarino'
    },
    articles: ['article1', 'article2', 'article3']
};

export const INITIAL_STATE = {
    intialized: false,
    user: null,
    articles: []
};

export const ACTION_TYPES = {
    SET_INITIALZED: 'initialized',
    SET_USER: 'user',
    ADD_ARTICLE: 'article'
};

export const REDUCER = (state, action) => {
    switch(action.type) {
        case ACTION_TYPES.SET_INITIALZED:
            return {
                ...state,
                innitialized: action.initialized
            };
        case ACTION_TYPES.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case ACTION_TYPES.ADD_ARTICLE:
            return {
                ...state,
                articles: state.articles.concat(action.articles)
            };
        default:
            return state;
    }
};
