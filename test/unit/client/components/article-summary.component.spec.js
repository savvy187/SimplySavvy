import React from 'react';
import { render, history } from 'test/test-utils';
import { fireEvent } from '@testing-library/react';
import { ArticleSummary } from 'components';

const mockObserve = jest.fn();
const mockUnobserve = jest.fn();

describe('Article Summary', () => {
    let props;

    beforeEach(() => {
        props = {
            id: 123,
            summaryImage: {
                src: 'images.test.com/123.jpg',
                alt: 'test image'
            },
            title: 'test title',
            summary: 'test summary',
            timestamp: new Date('1996-10-26').toISOString(),
            similarArticlesCount: 50,
            commentsCount: 100,
            observe: mockObserve,
            unobserve: mockUnobserve
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });    

    it('Should display the summary image', () => {
        const { container } = render(<ArticleSummary {...props} />);
        const image = container.querySelector('img');
        expect(image).not.toBeNull();
        expect(image.src).toContain('images.test.com/123.jpg');
        expect(image.alt).toEqual('test image');
    });

    it('Should route correctly when clicking the heading anchor', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        fireEvent.click(getByText('test title'));
        expect(history.location.pathname).toEqual('/articles/123');
    });

    it('Should display the title', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        expect(getByText('test title')).toBeInTheDocument();
    });

    it('Should display the approximate time', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        expect(getByText(/Written ...uh how is this still up here?/)).toBeInTheDocument();
    });

    it('Should display the summary', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        expect(getByText('test summary')).toBeInTheDocument();
    });

    it('Should display the similar articles count', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        expect(getByText(/Similar Articles \(50\)/)).toBeInTheDocument();
    });

    it('Should append the correct query when clicking the similar articles count', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        fireEvent.click(getByText(/Similar Articles \(50\)/));
        expect(history.location.search).toContain('similarArticles=123');
    });

    it('Should display the article comments count', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        expect(getByText(/Comments \(100\)/)).toBeInTheDocument();
    });

    it('Should append the correct query when clicking the article comments count', () => {
        const { getByText } = render(<ArticleSummary {...props} />);
        fireEvent.click(getByText(/Comments \(100\)/));
        expect(history.location.search).toContain('articleComments=123');
    });
});
