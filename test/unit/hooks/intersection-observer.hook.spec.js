import { renderHook, act } from '@testing-library/react-hooks';
import useIntersectionObserver from 'hooks/intersection-observer.hook';


describe('Use Intersection Observer Hook', () => {
    let mockDisconnect = jest.fn();
    let mockObserve = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        window.IntersectionObserver.mockReturnValue({
            disconnect: mockDisconnect,
            observe: mockObserve
        });
    });
    

    it('Should initialize an observer', () => {
        renderHook(() => useIntersectionObserver({
            rootMargin: '0px'
        }));

        expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
        expect(window.IntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            { root: null, rootMargin: '0px', threshhold: 0 }
        );
        
        expect(mockDisconnect).not.toHaveBeenCalled();
        expect(mockObserve).not.toHaveBeenCalled();
    });

    it('Should have the correct return values', () => {
        const { result } = renderHook(() => useIntersectionObserver({
            rootMargin: '0px'
        }));

        expect(result.current.length).toEqual(2);
        expect(result.current[0]).toEqual(expect.any(Object));
        expect(result.current[1]).toEqual(expect.any(Function));
    });

    it('Should disconnect any previously observing observers', () => {
        const { result } = renderHook(() => useIntersectionObserver({
            rootMargin: '0px'
        }));

        expect(mockDisconnect).not.toHaveBeenCalled();

        act(() => result.current[1]({}));
        
        /* 
         * Each turn of the wheel, here. That's why it's being
         * called twice, because the setting of the node is triggering
         * an entire new turn of the wheel...
        */
        expect(mockDisconnect).toHaveBeenCalledTimes(2);
    });

    it('Should not observe until a node has been set', () => {
        const { result } = renderHook(() => useIntersectionObserver({
            rootMargin: '0px'
        }));

        expect(mockObserve).not.toHaveBeenCalled();

        act(() => result.current[1]({}));

        expect(mockObserve).toHaveBeenCalledTimes(1);
        expect(mockObserve).toHaveBeenCalledWith(expect.any(Object));
    });

    it('Should disconnect any observer when unmounting', () => {
        const { unmount } = renderHook(() => useIntersectionObserver({
            rootMargin: '0px'
        }));
        
        unmount();
        
        expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });
});
