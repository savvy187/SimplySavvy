import { renderHook, act } from '@testing-library/react-hooks';
import usePersistentStore from 'hooks/persistent-store.hook';
import { 
    LOCAL_STORAGE,
    REDUCER,
    INITIAL_STATE,
    ACTION_TYPES
} from '../../fixtures/persistent-store.fixtures';

describe('Persistent Store Hook', () => {        
    const LOCAL_STORAGE_KEY = 'testStore';

    beforeEach(() => {
        localStorage.setItem('testStore', JSON.stringify(LOCAL_STORAGE));
        jest.spyOn(localStorage, 'getItem');
        jest.spyOn(localStorage, 'setItem');
        jest.spyOn(localStorage, 'removeItem');
        jest.spyOn(JSON, 'parse');
        jest.spyOn(JSON, 'stringify');                
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Initializing', () => {
        it('Should initialize the store with any values saved in local storage', () => {
            const { result } = renderHook(() => usePersistentStore(LOCAL_STORAGE_KEY, REDUCER, INITIAL_STATE));
            const selector = result.current[0];
            
            expect(JSON.parse).toHaveBeenCalledTimes(1);
            expect(localStorage.getItem).toHaveBeenCalledTimes(1);
            expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
            expect(localStorage.removeItem).not.toHaveBeenCalled();
            expect(selector()).toEqual(LOCAL_STORAGE);
        });

        it('Should remove any corrupted local storage and return the supplied inital state', () => {
            localStorage.getItem.mockImplementationOnce(() => {
                throw new Error();
            });

            const { result } = renderHook(() => usePersistentStore(LOCAL_STORAGE_KEY, REDUCER, INITIAL_STATE));
            const selector = result.current[0];

            expect(JSON.parse).not.toHaveBeenCalled();
            expect(localStorage.getItem).toHaveBeenCalledTimes(1);
            expect(localStorage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
            expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
            expect(localStorage.removeItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
            expect(selector()).toEqual(INITIAL_STATE);
        });
    });

    describe('Reducer', () => {
        it('Should provide a selector to grab pieces of state', () => {
            const { result } = renderHook(() => usePersistentStore(LOCAL_STORAGE_KEY, REDUCER, INITIAL_STATE));
            const selector = result.current[0];

            expect(selector()).toEqual(LOCAL_STORAGE); // Returns the entirety of state...
            expect(selector('initialzed')).toBe(true);
            expect(selector('user')).toEqual(expect.objectContaining({
                firstName: 'John',
                lastName: 'Savarino'
            }));
            expect(selector('articles')).toEqual(expect.arrayContaining([
                'article1',
                'article2',
                'article3'
            ]));
        });

        it('Should provide an action dispatcher to update state', () => {
            const { result } = renderHook(() => usePersistentStore(LOCAL_STORAGE_KEY, REDUCER, INITIAL_STATE));
            let selector = result.current[0];
            const dispatch = result.current[1];

            expect(selector('user')).toEqual(expect.objectContaining({
                firstName: 'John',
                lastName: 'Savarino'
            }));
            expect(selector('articles')).toEqual(expect.arrayContaining([
                'article1',
                'article2',
                'article3'
            ]));

            act(() => {
                dispatch({
                    type: ACTION_TYPES.SET_USER,
                    user: { firstName: 'Nilsa', lastName: 'Savarino' }
                });
                dispatch({
                    type: ACTION_TYPES.ADD_ARTICLE,
                    articles: ['article4', 'article5']
                });
            });
            
            selector = result.current[0];

            expect(selector('user')).toEqual(expect.objectContaining({
                firstName: 'Nilsa',
                lastName: 'Savarino'
            }));            
            expect(selector('articles')).toEqual(expect.arrayContaining([
                'article1',
                'article2',
                'article3',
                'article4',
                'article5'
            ]));
        });      
    });

    describe('Syncing with Local Storage', () => {
        
        it('Should sync local storage with the state on each update', () => {
            const { result } = renderHook(() => usePersistentStore(LOCAL_STORAGE_KEY, REDUCER, INITIAL_STATE));
            const dispatch = result.current[1];
            let selector = result.current[0];            
            let user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).user;

            expect(selector('user')).toEqual(expect.objectContaining({
                firstName: 'John',
                lastName: 'Savarino'
            }));
            expect(user).toEqual(expect.objectContaining({
                firstName: 'John',
                lastName: 'Savarino'
            }));

            act(() => {
                dispatch({
                    type: ACTION_TYPES.SET_USER,
                    user: { firstName: 'Nilsa', lastName: 'Savarino' }
                });
            });
            
            selector = result.current[0];
            user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).user;

            expect(selector('user')).toEqual(expect.objectContaining({
                firstName: 'Nilsa',
                lastName: 'Savarino'
            }));
            expect(user).toEqual(expect.objectContaining({
                firstName: 'Nilsa',
                lastName: 'Savarino'
            }));
            /* 
             * I am unsure of why there are two calls to sync state with 
             * the initial values, but here we are...
            */
            expect(JSON.stringify).toHaveBeenCalledTimes(3);
            expect(localStorage.setItem).toHaveBeenCalledTimes(3);
            expect(localStorage.setItem).toHaveBeenLastCalledWith(LOCAL_STORAGE_KEY, JSON.stringify({
                ...LOCAL_STORAGE,
                user: { firstName: 'Nilsa', lastName: 'Savarino' }
            }));
        });

        it('Should not corrupt locaal storage if unable to sync with an update', () => {
            const { result } = renderHook(() => usePersistentStore(LOCAL_STORAGE_KEY, REDUCER, INITIAL_STATE));
            const dispatch = result.current[1];
            let selector = result.current[0];
            let user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).user;

            expect(selector('user')).toEqual(expect.objectContaining({
                firstName: 'John',
                lastName: 'Savarino'
            }));
            expect(user).toEqual(expect.objectContaining({
                firstName: 'John',
                lastName: 'Savarino'
            }));

            act(() => {
                localStorage.setItem.mockImplementationOnce(() => {
                    throw new Error();
                });
                dispatch({
                    type: ACTION_TYPES.SET_USER,
                    user: { firstName: 'Nilsa', lastName: 'Savarino' }
                });
            });

            selector = result.current[0];
            user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)).user;

            expect(selector('user')).toEqual(expect.objectContaining({
                firstName: 'Nilsa',
                lastName: 'Savarino'
            }));
            expect(user).toEqual(expect.objectContaining({
                firstName: 'John',
                lastName: 'Savarino'
            }));
            /* 
             * I am unsure of why there are two calls to sync state with 
             * the initial values, but here we are...
            */
            expect(JSON.stringify).toHaveBeenCalledTimes(3);
            expect(localStorage.setItem).toHaveBeenCalledTimes(3);
            expect(localStorage.setItem).toHaveBeenLastCalledWith(LOCAL_STORAGE_KEY, JSON.stringify({
                ...LOCAL_STORAGE,
                user: { firstName: 'Nilsa', lastName: 'Savarino' }
            }));
        });
    });
});
