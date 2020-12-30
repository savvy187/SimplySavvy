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
        primary_nav_link: {
            default: PALETTE.TERTIARY,
            hover: PALETTE.PRIMARY
        },
        search_input: {
            default: PALETTE.TERTIARY,
            hover: PALETTE.PRIMARY
        },
        search_input_placeholder: PALETTE.TERTIARY,
        approximate_time: {
            default: PALETTE.SECONDARY,
            selected: PALETTE.TERTIARY
        },
        summary_title: {
            default: PALETTE.DEFAULT,
            selected: PALETTE.TERTIARY
        },
        summary: {
            default: PALETTE.DEFAULT,
            selected: PALETTE.TERTIARY
        },
        summary_link: {
            default: PALETTE.PRIMARY,
            hover: PALETTE.TERTIARY
        },
        definition_term: {            
            default: PALETTE.TERTIARY,
            hover: PALETTE.PRIMARY
        },
        definition_definition: {
            default: PALETTE.SECONDARY
        }
    },
    backgrounds: {
        primary_nav: PALETTE.PRIMARY,
        primary_nav_link: {
            hover: PALETTE.SECONDARY
        },
        search_input: {
            default: COLORS.LIGHT_BLUE(0.5),
            hover: PALETTE.SECONDARY
        },
        approximate_time: {
            selected: PALETTE.SECONDARY
        },
        summary_title: {
            selected: PALETTE.SECONDARY
        },
        summary: {
            selected: PALETTE.DEFAULT
        },
        summary_link: PALETTE.SECONDARY,
        definition_term: PALETTE.PRIMARY
    },
    fonts: {
        primary_nav_link: `${FONT_WEIGHTS.X_BOLD} ${FONT_SIZES.SMALL} ${FONT_FAMILIES.SANS_SERIF}`,
        summary_title: '26px/1 Gerogia, Times, "Times New Roman", Serif',
        summary: '14px/20px Tahoma, Helvetica, sans-serif',
        summary_link: '${FONT_SIZES.X_SMALL} ${FONT_FAMILIES.SANS_SERIF}',
        definition_term: `${FONT_WEIGHTS.X_BOLD} ${FONT_SIZES.SMALL} ${FONT_FAMILIES.SANS_SERIF}`
    },
    borders: {
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
