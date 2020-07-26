import expressWinston from 'express-winston';
import { requestTransports } from 'server/util/logger.util';

export default expressWinston.logger({
    transports: requestTransports,
    expressFormat: true,
    meta: false,    
    ignoredRoutes: ['/favicon.ico']
});

export const errorLogging = expressWinston.errorLogger({
    transports: requestTransports,
    expressFormat: true,
    meta: false,
    dumpExceptions: true,
    showStack: true    
});
