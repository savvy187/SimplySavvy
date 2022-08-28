import _ from 'lodash';
import faker from 'faker';

const categories = [
    'React',
    'Javascript',
    'GoLang',
    'Python',
    'Arduino',
    'CSS',
    'Angular'
];

const generateImage = (size='') => ({
    src: `https://source.unsplash.com/random${!_.isEmpty(size) ? `/${size}` : ''}`,
    alt: faker.lorem.words()
});

const generateSectionContent = (index) => ({
    id: index,
    images: _.times(_.random(0, 5), () => generateImage()),
    pullQuote: faker.lorem.sentence(),
    text: _.times(_.random(5, 10), () => faker.lorem.paragraph()) 
});

const generateArticle = (index) => {
    return {
        id: index,
        type: faker.random.boolean ? 'blog' : 'tutorial',
        title: faker.lorem.sentence(),
        timestamp: faker.date.past(),
        summary: faker.lorem.sentences(),
        summaryImage: generateImage(),
        sections: _.times(_.random(5, 15), (index) => {
            const title = faker.lorem.words();
            return {
                id: index,
                hash: _.snakeCase(title),
                title,
                content: generateSectionContent(index)
            };            
        }),        
        categories: _.times(_.random(1, 3), () => faker.random.arrayElement(categories)),
        similarArticles: _.times(_.random(1, 10), () => faker.lorem.sentence())
    };
};

export default _.times(100, (index) => generateArticle(index));
