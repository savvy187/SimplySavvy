import _ from 'lodash';
import faker from 'faker';
import { CONTENT_TYPE, ANCHOR_TYPE } from 'client-constants';

const categories = [
    'React',
    'Javascript',
    'GoLang',
    'Python',
    'Arduino',
    'CSS',
    'Angular'
];

const anchors = [
    ANCHOR_TYPE.LEFT,
    ANCHOR_TYPE.RIGHT
];

const generateAnchor = () => faker.random.arrayElement(anchors);

const generateImage = (size='') => ({
    type: CONTENT_TYPE.IMAGE,
    src: `https://source.unsplash.com/random${!_.isEmpty(size) ? `/${size}` : ''}`,
    alt: faker.lorem.words(),
    anchor: generateAnchor()
});

const generateText = () => ({
    type: CONTENT_TYPE.TEXT,
    text: _.times(_.random(5, 10), () => faker.lorem.paragraph())
});
    
const generatePullQuote = () => ({
    type: CONTENT_TYPE.PULL_QUOTE,
    text: faker.lorem.sentence(),
    anchor: generateAnchor()
});

const generateSectionContent = () => {
    const contentTypes = [
        generateImage,
        generateText,
        generatePullQuote
    ];
    
    return _.times(_.random(3, 10), () => {
        return faker.random.arrayElement(contentTypes)();
    });    
};

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
