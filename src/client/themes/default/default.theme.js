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
        
    },
    backgrounds: {
        primary_nav: COLORS.DARK_BLUE(1)
    },
    fonts: {
        primary_nav_link: 'bold 0.8rem/1 Tahoma,Helvetica,sans-serif'
    },
    shadows: {    
        primary_nav: `-2px 2px 10px ${COLORS.DARK_GREY(1)}`,
        search_input: `-1px 1px 4px inset ${COLORS.DARK_GREY(0.1)}`
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
