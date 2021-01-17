import { COLORS, FONT_WEIGHTS, FONT_SIZES } from 'themes/theme.helper';

const PALETTE = {
    PRIMARY: COLORS.DARK_BLUE(),
    SECONDARY: COLORS.LIGHT_BLUE(),
    TERTIARY: COLORS.WHITE(),
    DEFAULT: COLORS.DARK_GREY()
};

const FONT_FAMILIES = {
    SERIF: 'Gerogia, Times, "Times New Roman", Serif',
    SANS_SERIF: 'Tahoma, Helvetica, sans-serif'
};


export default {
    dimensions: {
        primary_nav: {
            width: '945px',
            width_expanded: '955px',
            height: '30px'
        },
        aside: {
            width: '200px',
            offset: '20px'
        }
    },
    colors: {
        approximate_time: {
            default: PALETTE.SECONDARY,
            selected: PALETTE.TERTIARY
        },
        definition_term: {            
            default: PALETTE.TERTIARY,
            hover: PALETTE.PRIMARY
        },
        definition_definition: {
            default: PALETTE.SECONDARY
        },
        primary_nav_link: {
            default: PALETTE.TERTIARY,
            hover: PALETTE.PRIMARY
        },
        search_input: {
            default: PALETTE.TERTIARY,
            hover: PALETTE.PRIMARY
        },
        search_input_placeholder: PALETTE.TERTIARY,
        summary_link: {
            default: PALETTE.PRIMARY,
            hover: PALETTE.TERTIARY
        },
        typography: {
            headings: {
                default: PALETTE.DEFAULT,
                selected: PALETTE.TERTIARY
            },
            p: {
                default: PALETTE.DEFAULT,
                selected: PALETTE.TERTIARY
            }
        }
    },
    backgrounds: {
        approximate_time: {
            selected: PALETTE.SECONDARY
        },
        definition_term: PALETTE.PRIMARY,
        primary_nav: PALETTE.PRIMARY,
        primary_nav_link: {
            hover: PALETTE.SECONDARY
        },
        search_input: {
            default: COLORS.LIGHT_BLUE(0.5),
            hover: PALETTE.SECONDARY
        },
        summary: {
            selected: PALETTE.DEFAULT
        },
        summary_link: PALETTE.SECONDARY,
        typography: {
            p: {
                selected: PALETTE.DEFAULT
            },
            headings: {
                selected: PALETTE.SECONDARY
            }
        }
    },
    fonts: {
        definition_term: `${FONT_WEIGHTS.X_BOLD} ${FONT_SIZES.SMALL} ${FONT_FAMILIES.SANS_SERIF}`,
        definition_definition: `${FONT_WEIGHTS.DEFAULT} ${FONT_SIZES.X_SMALL} ${FONT_FAMILIES.SERIF}`,
        primary_nav_link: `${FONT_WEIGHTS.X_BOLD} ${FONT_SIZES.SMALL} ${FONT_FAMILIES.SANS_SERIF}`,
        summary_link: '${FONT_SIZES.X_SMALL} ${FONT_FAMILIES.SANS_SERIF}',
        typography: {
            p: `${FONT_WEIGHTS.DEFAULT} ${FONT_SIZES.SMALL} ${FONT_FAMILIES.SANS_SERIF}`,
            h1: `${FONT_WEIGHTS.X_BOLD} ${FONT_SIZES.XXX_LARGE} ${FONT_FAMILIES.SERIF}`,
            h2: `${FONT_WEIGHTS.BOLD} ${FONT_SIZES.XX_LARGE} ${FONT_FAMILIES.SERIF}`,
            h3: `${FONT_WEIGHTS.BOLD} ${FONT_SIZES.X_LARGE} ${FONT_FAMILIES.SERIF}`,
            h4: `${FONT_WEIGHTS.BOLD} ${FONT_SIZES.LARGE} ${FONT_FAMILIES.SERIF}`
        }
    },
    borders: {
        definition_definition: {
            default: `1px solid ${COLORS.DARK_GREY(0.25)}`
        },
        primary_nav_link: {
            focus: `1px solid ${COLORS.DARK_GREY(0.75)}`
        },
        search_input: {
            hover: `1px solid ${COLORS.DARK_GREY(1)}`
        },
        summary_link: {
            focus: `1px solid ${COLORS.DARK_GREY(0.75)}`
        }
    },
    shadows: {
        root: `0px 0px 40px ${COLORS.BLACK()}`,
        primary_nav: `-2px 2px 10px ${COLORS.DARK_GREY(1)}`,
        search_input: `-1px 1px 4px inset ${COLORS.DARK_GREY(0.1)}`,
        summary_image: `1px 2px 4px  ${COLORS.GREY()}`
    },
    transitions: {
        ease_in: 'all 0.3s ease-in'
    },
    filters: {
        blur_1: 'blur(1.5px)'
    },
    stacking_order: {
        primary_nav: '999'
    }
};
