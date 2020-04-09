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

export { COLORS };
