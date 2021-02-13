import { renderHook } from '@testing-library/react-hooks';
import useMediaQuery from 'client/hooks/media-query.hook';

const MEDIA_QUERY = '(max-width: 1000px)';
const mockAddEventListner = jest.fn();
const mockRemoveEventListner = jest.fn();

describe('Use Media Query Hook', () => {    
        
    beforeEach(() => {
        jest.spyOn(window, 'matchMedia').mockImplementation(
            jest.fn(() => ({
                addEventListener: mockAddEventListner,
                removeEventListner: mockRemoveEventListner,
                media: '(max-width: 1000px)',
                matches: true
            }))
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should instantiate a mediaQueryList from a matchMedia Call', () => {
        const { result } = renderHook(() => useMediaQuery(MEDIA_QUERY));
        expect(window.matchMedia).toHaveBeenCalledWith(MEDIA_QUERY);
        expect(result.current).toEqual(expect.arrayContaining([
            true,
            MEDIA_QUERY
        ]));
    });

    it('Should attach a change event listener from the returned matchMedia object', () => {
        renderHook(() => useMediaQuery(MEDIA_QUERY));                
        expect(mockAddEventListner).toHaveBeenCalledWith('change', expect.any(
            Function
        ));
    });

    it('Should remove a change event listener when unmounting', () => {
        const { unmount } = renderHook(() => useMediaQuery(MEDIA_QUERY));        
        unmount();
        expect(mockRemoveEventListner).toHaveBeenCalledWith('change', expect.any(
            Function
        ));
    });
});
