import readline from 'readline';
import SimplySavvyServer from 'server/server';
import { serverLogger as logger } from 'server/util/logger.util';
import { SERVER_STOP_TIMEOUT, SERVER_STATUSES } from 'server/constants';
import app from 'server/app';

/**
 * Function that bootstraps the server and starts the application
*/
export async function launchServer () {
    process.env.SERVER_STATUS = SERVER_STATUSES.STARTING;

    /**
     * New Instance of our HTTP Server
    */
    const server = new SimplySavvyServer(app);
    server.start();

    if (process.platform === 'win32') {
        logger.debug('WIN32 env detected. Creating readline interface...');

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.on('SIGINT', async () => {
            logger.debug('SIGINT signal received. Attempting shutdown...');
            await shutdownServer(server);
        });
    }    

    /**
     * Here we listen for Signal events. 
     * SIGTERM is only supported in Linux environments...
     * SIGINT is supported in all environments...
    */
    process.on('SIGINT', async () => {
        logger.debug('SIGINT signal received. Attempting server shutdown...');
        await shutdownServer(server);
    });
    process.on('SIGTERM', async () => {
        logger.debug('SIGTERM signal received. Attempting server shutdown...');
        await shutdownServer(server);
    });    
}

/**
 * Function that attempts the shutdown of the server, including
 * ensuring that the process is killed...
 * @param server - server instance
*/
export async function shutdownServer(server) {
    if (process.env.SERVER_STATUS !== SERVER_STATUSES.STOPPING) {
        process.env.SERVER_STATUS = SERVER_STATUSES.STOPPING;

        logger.info('Stopping SimplySavvy server...');

        setTimeout(() => {
            logger.debug(`Server did not stop within ${SERVER_STOP_TIMEOUT} ms. Forcing exit now...`);
            process.exit(0);
        }, SERVER_STOP_TIMEOUT);
        
        server.stop();
        process.env.SERVER_STATUS = SERVER_STATUSES.STOPPED;
        process.exit(0);
    }
}

/** 
 * Auto-launching server as this is the entrypoint for the process...
 */
launchServer();
