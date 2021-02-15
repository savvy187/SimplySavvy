import React from 'react';
import { render, act, history } from 'test/test-utils';
import { fireEvent } from '@testing-library/react';
import ArticleSummary from 'client/components/article-summary.component';
import * as useApproximateTime from 'hooks/approximate-time.hook';

describe('Article Summary', () => {
    const timestamp = new Date('1996-10-26').toISOString();
    const props = {
        id: 123,
        summaryImage: {
            src: 'images.test.com/123.jpg',
            alt: 'test image'
        },
        title: 'test title',
        summary: 'test summary',
        timestamp,
        similarArticlesCount: 50,
        commentsCount: 100
    };

    beforeEach(() => {
        jest.spyOn(useApproximateTime, 'default').mockImplementation(
            jest.fn(() => 'Many Moons Ago...')
        );
    });
        

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should render the title and timestamp', () => {
        const { getByText } = render(
            <ArticleSummary {...props} />
        );

        expect(getByText('test title')).toBeInTheDocument();
        expect(getByText('Written Many Moons Ago...')).toBeInTheDocument();
    });

    it('Should navigate to the corresponding article when clicking the title', () => {

    });
});
