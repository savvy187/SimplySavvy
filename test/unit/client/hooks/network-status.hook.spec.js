import { renderHook } from 'test/test-utils';
import { act } from '@testing-library/react-hooks';
import useNetworkStatus from 'client/hooks/network-status.hook';

describe('Use Network Status Hook', () => {
    let onLineSpy;

    beforeEach(() => {
        jest.spyOn(window, 'addEventListener');
        jest.spyOn(window, 'removeEventListener');
        onLineSpy = jest.spyOn(navigator, 'onLine', 'get');
    });

    afterEach(() => {
        jest.clearAllMocks();        
    });

    it('Should register the proper event handlers', async () => {
        renderHook(() => useNetworkStatus());
        /* 
         * It seems as though Jest is getting error and popstate events
         * being dispatched, but I cannot figure out why or what is triggering
         * them, atm...
        */        
        expect(window.addEventListener.mock.calls).toEqual(expect.arrayContaining([
            ['offline', expect.any(Function)],
            ['online', expect.any(Function)]
        ]));
    });

    it('Should handle an offline event by updating state', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current).toBe(true);
        
        act(() => {
            const offlineEvt = new Event('offline');
            onLineSpy.mockReturnValueOnce(false);
            window.dispatchEvent(offlineEvt);
            return undefined;
        });

        expect(result.current).toBe(false);
    });

    it('Should handle an online event by updating state', () => {        
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current).toBe(false);

        act(() => {
            const onlineEvt = new Event('online');
            onLineSpy.mockReturnValueOnce(true);
            window.dispatchEvent(onlineEvt);
            return undefined;
        });

        expect(result.current).toBe(true);
    });

    it('Should unregister the proper event handlers when unmounting', () => {
        const { unmount } = renderHook(() => useNetworkStatus());
        
        unmount();
        /* 
         * It seems as though Jest is getting error and popstate events
         * being dispatched, but I cannot figure out why or what is triggering
         * them, atm...
        */        
        expect(window.removeEventListener.mock.calls).toEqual(expect.arrayContaining([
            ['offline', expect.any(Function)],
            ['online', expect.any(Function)]
        ]));
    });
});
