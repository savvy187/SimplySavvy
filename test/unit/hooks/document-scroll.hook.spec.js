import { renderHook, act } from '@testing-library/react-hooks';
import useDocumentScroll from 'hooks/document-scroll.hook';

describe('Use Document Scroll Hook', () => {
    beforeEach(() => {
        jest.spyOn(document, 'addEventListener');
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
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
});
