import { renderHook, history } from 'test/test-utils';
import useQuery from 'hooks/query.hook';


describe('Use Query Hook', () => {
    
    it('Should retun a URLSearchParams instance with whatever the current search is', () => {
        history.push('?result=true&otherResult=false');
        const { result } = renderHook(() => useQuery());

        expect(result.current).toBeInstanceOf(URLSearchParams);
        expect(result.current.toString()).toEqual('result=true&otherResult=false');        
    });
});
