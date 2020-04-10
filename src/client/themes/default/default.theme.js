import { COLORS } from 'themes/theme.helper';

export default {
    dimensions: {
        primary_nav: {
            width: '980px',
            width_expanded: '990px',
            height: '30px'
        }
    },
    colors: {
        primary_nav_link: {
            default: COLORS.WHITE(),
            hover: COLORS.DARK_BLUE(1)
        },
        search_input: {
            default: COLORS.WHITE(1),
            hover: COLORS.DARK_BLUE(0.75)
        },
        search_input_placeholder: COLORS.WHITE(0.75),
        approximate_time: {
            default: COLORS.LIGHT_BLUE(),
            selected: COLORS.WHITE()
        },
        summary_title: {
            default: COLORS.DARK_GREY(),
            selected: COLORS.WHITE()
        },
        summary: {
            default: COLORS.DARK_GREY(0.9),
            selected: COLORS.WHITE()
        },
        summary_link: {
            default: COLORS.DARK_BLUE(1),
            hover: COLORS.WHITE(1)
        }
    },
    backgrounds: {
        primary_nav: COLORS.DARK_BLUE(1),
        primary_nav_link: {
            hover: COLORS.LIGHT_BLUE(1)
        },
        search_input: {
            default: COLORS.LIGHT_BLUE(0.5),
            hover: COLORS.LIGHT_BLUE(1)
        },
        approximate_time: {
            selected: COLORS.LIGHT_BLUE()
        },
        summary_title: {
            selected: COLORS.LIGHT_BLUE()
        },
        summary: {
            selected: COLORS.GREY(0.75)
        },
        summary_link: COLORS.LIGHT_BLUE(1)
    },
    fonts: {
        primary_nav_link: 'bold 0.8rem/1 Tahoma,Helvetica,sans-serif',
        summary_title: '26px/1 Gerogia, Times, "Times New Roman", Serif',
        summary: '14px/20px Tahoma, Helvetica, sans-serif',
        summary_link: '12px/13px Tahoma,Helvetica,sans-serif'
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
        primary_nav: '999999999'
    }
};
