import _ from 'lodash';
import faker from 'faker';

const generateArticle = (index) => {
    return {
        id: index,
        type: faker.random.boolean ? 'blog' : 'tutorial',
        title: faker.lorem.sentence(),
        timestamp: faker.date.past(),
        summary: faker.lorem.sentences(),
        summaryImage: {
            src: faker.image.imageUrl(),
            alt: faker.lorem.words()
        },
        content: faker.lorem.paragraphs(),
        categories: _.times(_.random(1, 10), faker.lorem.word),
        similarArticles: _.times(_.random(1, 10), faker.lorem.sentence)
    };
};

export default _.times(100, (index) => generateArticle(index));
