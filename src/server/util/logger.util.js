import config from 'config';
import { transports, createLogger } from 'winston';

const createTransportOptions = (label, options = {}) => ({
    ...config.log.useLabels && { label },
    json: config.log.json || false,
    colorize: config.log.colorize || false,
    humanReadableUnhandledException: true,
    ...options
});

const createLoggerOptions = (transport, options = {}) => ({
    level: config.log.level || 'info',
    transports: [transport],
    exceptionHandlers: [transport],
    ...options
});

/* 
 * Creates a new transport to be used exclusively for logging 
 * server-related items, outside of the express app...
*/
export const serverTransport = new transports.Console(createTransportOptions('server'));

export const serverLogger = createLogger(createLoggerOptions(serverTransport));

/* 
 * This is exported becuase it is also used in the Express logging 
 * middleware 
*/
export const consoleTransport = new transports.Console(createTransportOptions());

/* 
 * This is the default logger to be used for the express app, outside of
 * request logging...
*/
export default createLogger(createLoggerOptions(consoleTransport));
