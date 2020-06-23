import { renderHook, act } from '@testing-library/react-hooks';
import useDocumentScroll from 'hooks/document-scroll.hook';

describe('Use Document Scroll Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(document, 'addEventListener');
        jest.spyOn(document, 'removeEventListener');
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
        jest.spyOn(window, 'cancelAnimationFrame');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('Should bind any event listeners', () => {
        const mockHandler = jest.fn();
        renderHook(() => useDocumentScroll(mockHandler));

        expect(document.addEventListener).toHaveBeenCalledTimes(1);
        expect(document.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('Should request an animation frame with supplied handler in response to a scroll event', async () => {
        let scrollEvt;
        const mockHandler = jest.fn();
        renderHook(() => useDocumentScroll(mockHandler));

        act(() => {
            scrollEvt = new Event('scroll');
            document.dispatchEvent(scrollEvt);
            return undefined;
        });

        
        expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
        expect(window.requestAnimationFrame).toHaveBeenCalledWith(expect.any(Function));        
        expect(mockHandler).toHaveBeenCalledTimes(1);
        expect(mockHandler).toHaveBeenLastCalledWith(scrollEvt);
    });

    it('Should remove any event listeners and cancel pending animation frames when unmounting', () => {
        const { unmount } = renderHook(() => useDocumentScroll());

        unmount();

        expect(document.removeEventListener).toHaveBeenCalledTimes(1);
        expect(document.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
        expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(1);
    });
});
