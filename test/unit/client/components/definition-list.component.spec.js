import React from 'react';
import { render } from 'test/test-utils';
import { DefinitionList } from 'components';

describe('Definition List', () => {
    let props;

    beforeEach(() => {
        props = {
            listHeading: 'test definition list'            
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should only render if children are passed', () => {
        const { container, rerender } = render(<DefinitionList {...props} />);
        expect(container.children.length).toEqual(0);
        
        rerender(
            <DefinitionList {...props}>
                child
            </DefinitionList>
        );

        expect(container.children.length).not.toEqual(0);
    });

    it('Should decorate each passed child with a definition definition element', () => {
        const { getByText } = render(
            <DefinitionList {...props}>
                <span>child 1</span>
                <span>child 2</span>
                <span>child 3</span>
            </DefinitionList>
        );

        const child1 = getByText('child 1');
        expect(child1).toBeInTheDocument();
        expect(child1.parentNode.nodeName).toEqual('DD');

        const child2 = getByText('child 2');
        expect(child2).toBeInTheDocument();
        expect(child2.parentNode.nodeName).toEqual('DD');

        const child3 = getByText('child 3');
        expect(child3).toBeInTheDocument();
        expect(child3.parentNode.nodeName).toEqual('DD');
    });
});
