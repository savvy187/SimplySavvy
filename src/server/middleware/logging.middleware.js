import config from 'config';
import expressWinston from 'express-winston';
import { requestTransports } from 'server/util/logger.util';

export default expressWinston.logger({
    transports: requestTransports,
    expressFormat: true,
    meta: false,
    colorize: config.log.colorize || false,
    ignoredRoutes: ['/favicon.ico']
});

export const errorLogging = expressWinston.errorLogger({
    transports: requestTransports,
    expressFormat: true,
    meta: false,
    dumpExceptions: true,
    showStack: true,
    colorize: config.log.colorize || false,
    json: config.log.json || false
});
