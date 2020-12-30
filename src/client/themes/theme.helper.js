const getRGBA = (color, opacity) => {
    const value =  opacity ? [...color, opacity].join(',') : color.join(',');
    return `rgba(${value})`;
};

const COLORS = {
    WHITE: (opacity) => getRGBA([255, 255, 255], opacity),
    LIGHT_BLUE: (opacity) => getRGBA([145, 168, 213], opacity),
    DARK_BLUE: (opacity) => getRGBA([58, 95, 171], opacity),
    GREY: (opacity) => getRGBA([108, 122, 137], opacity),
    DARK_GREY: (opacity) => getRGBA([46, 49, 49], opacity),
    BLACK: (opacity) => getRGBA([0, 0, 0], opacity)
};

const FONT_WEIGHTS = {
    XX_LIGHT: 100,
    X_LIGHT: 200,
    LIGHT: 300,
    DEFAULT: 400,
    BOLD: 500,
    X_BOLD: 600,
    XX_BOLD: 700,
    JUMBO: 900
};

const FONT_SIZES = {
    XX_SMALL: '0.625rem',
    X_SMALL: '0.75rem',
    SMALL: '0.875rem',
    DEFAULT: '1rem',
    LARGE: '1.125rem',
    X_LARGE: '1.25rem',
    XX_LARGE: '1.5rem',
    JUMBO: '2rem'
};

export { 
    COLORS, 
    FONT_WEIGHTS, 
    FONT_SIZES 
};
