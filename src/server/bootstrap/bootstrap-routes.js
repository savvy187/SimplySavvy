import config from 'config';
import mockAPIRouter from 'server/routes/mock-api.routes.js';
import logger from 'server/util/logger.util';

export default (app) => {
    if (config.get('server.mock')) {
        logger.info('Bootstrapping mock routes...');
        app.use('/api', mockAPIRouter);
    } else {
        logger.warn('No API Router as of yet!');
    }
};
