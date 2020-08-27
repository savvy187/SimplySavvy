import { serverLogger as logger } from 'server/util/logger.util';

/* 
 * Registers handlers for `unhandledRejection` and 
 * `uncaughtException` events for this Node process
*/
export const install = (process) => {
    process.on('unhandledRejection', (error) => {
        logger.error('Unhandled promise rejection. This is usually a programming mistake. \nContinuing but server might not work as expected.', error);
    });

    process.on('uncaughtException', (error) => {
        logger.error('FATAL: Uncaught expection. This is usually a programming mistake. \nContinuing but server might not work as expected.', error);
    });
};

/* 
 * Unregisters handlers for `unhandledRejection` and
 * `uncaughtException` events for this Node process
*/
export const uninstall = (process) => {
    process.removeAllListeners('unhandledRejection');
    process.removeAllListeners('uncaughtException');
};
