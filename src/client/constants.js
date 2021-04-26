export const ROUTES = {
    HOME: { pathname: '/', re: /^\/$/ },
    ARTICLES: { pathname: '/articles', re: /^\/articles$/ },
    ARTICLE: { pathname: '/articles/:id', re: /^\/articles\/\d+$/ },
    TWITTER: { pathname: '/twitter', re: /^\/twitter$/ }
};

export const MAX_SCROLL_PROGRESS = 100;

export const ARTICLE_TYPE = {
    BLOG: 'blog',
    TUTORIAL: 'tutorial'
};

export const STORAGE_TYPE = {
    LOCAL_STORAGE: 'localStorage',
    SESSION_STORAGE: 'sessionStorage'
};

export const DIRECTION_TYPE = {
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right'
};

export const AXIS_TYPE = {
    X: 'x',
    Y: 'y'
};
