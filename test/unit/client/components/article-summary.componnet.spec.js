import React from 'react';
import { render, act, history } from 'test/test-utils';
import { fireEvent } from '@testing-library/react';
import ArticleSummary from 'client/components/article-summary.component';

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

    it('Should container the correct markup structure', () => {
        const { getByTestId } = render(<ArticleSummary {...props} />);
        const summary = getByTestId('article-summary-component');
        
        expect(summary).toBeInTheDocument();
        expect(summary.nodeName.toLowerCase()).toBe('div');

        const summaryImage = summary.firstChild;
        expect(summaryImage.nodeName.toLowerCase()).toBe('picture');
        expect(summaryImage.firstChild.nodeName.toLowerCase()).toBe('img');
        expect(summaryImage.firstChild.getAttribute('src')).toEqual('images.test.com/123.jpg');
        expect(summaryImage.firstChild.getAttribute('alt')).toEqual('test image');

        const article = summary.childNodes[1];
        expect(article.nodeName.toLowerCase()).toEqual('article');

        const titleContainer = article.firstChild;
        expect(titleContainer.nodeName.toLowerCase()).toBe('div');
        
        const title = titleContainer.firstChild;
        expect(title.nodeName.toLowerCase()).toBe('h2');
        expect(title.className).toBe('summary-title');
        expect(title.textContent).toBe('test title');

        const time = titleContainer.childNodes[1];
        expect(time.nodeName.toLowerCase()).toEqual('time');        
        expect(time.getAttribute('datetime')).toEqual(timestamp);
        expect(time.textContent).toEqual('written ...uh how is this still up here?');

        const summaryP = article.childNodes[1];
        expect(summaryP.nodeName.toLowerCase()).toBe('p');
        expect(summaryP.textContent).toBe('test summary');

        const summaryNav = article.childNodes[2];
        expect(summaryNav.nodeName.toLowerCase()).toBe('nav');
    });

    it('Should append the correct query string when clicking a nav link', () => {
        const { getByTestId } = render(<ArticleSummary {...props} />);
        const summary = getByTestId('article-summary-component');
        const nav = summary.querySelector('nav');

        expect(nav.childNodes.length).toEqual(2);

        expect(nav.firstChild.className).toBe('summary-link');
        expect(nav.firstChild.textContent).toBe('Similar Articles (50)');

        fireEvent.click(nav.firstChild);
        expect(history.location.search).toBe('?similarArticles=123');

        expect(nav.childNodes[1].className).toBe('summary-link');
        expect(nav.childNodes[1].textContent).toBe('Comments (100)');

        fireEvent.click(nav.childNodes[1]);
        expect(history.location.search).toBe('?articleComments=123');
    });
});
