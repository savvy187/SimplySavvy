import config from 'config';
import http from 'http';
import https from 'https';
import fs from 'fs';
import _ from 'lodash';
import figlet from 'figlet';
import { serverLogger as logger } from 'server/util/logger.util';
import { BANNER_DIVIDER } from 'server/constants';
import { version } from '../../package.json';

/**
 * Creates a server configuration obhect from
 * a slice of the application config
 * 
 * @param {object} appConfig - application config
 * @returns {object} - server configuration
*/
const createServerConfig = (appConfig) => {
    return {
        ...appConfig.get('server'),
        port: process.env.PORT,
        hostname: process.env.HOSTNAME || 'localhost'
    };
};

/** 
 * @param {server} server - HTTP(S) server
 * @param {object} env - Environment
 * @param {string} hostname 
 * @param {boolean} useSSL - whether to server connects via HTTPS
 * @returns {string} - formatted string contents of banner
 */
const createBanner = (server, env, hostname, useSSL) => {    
    const { address, port } = server.address();
    const protocol = useSSL ? 'https' : 'http';    
    const host = address === '::' ? hostname : address;
    const url = `${protocol}://${host}:${port}`;
    
    return `
    ${BANNER_DIVIDER}
        version: ${version}
        address: ${url}
        node env: ${env.NODE_ENV}
    ${BANNER_DIVIDER}
    `;
};

/** 
 * Creates either an HTTP or HTTPS server to host
 * the Express application
 * 
 * @param {Express} app - Express application
 * @param {object} serverConfig - server configuration
 * @returns {Server} - HTTP(S) server 
*/
const createHTTPServer = (app, serverConfig) => {
    const { useSSL, keyFile = '', certFile = '' } = serverConfig;
    let httpServer;

    if (useSSL) {
        if (_.isEmpty(keyFile)) {
            throw new Error('Key File required');
        }

        if (_.isEmpty(certFile)) {
            throw new Error('Cert File required');
        }

        const httpsOptions = {
            key: fs.readFileSync(keyFile, 'utf-8'),            
            cert: fs.readFileSync(certFile, 'utf-8')
        };

        logger.info('Server protocol: HTTPS');
        httpServer = https.createServer(httpsOptions, app);
    } else {
        logger.info('Server protocol: HTTP');
        httpServer = http.createServer(app);
    }

    return httpServer;
};

export default class SimplySavvyServer {

    constructor(app) {
        logger.debug('Initializing SimplySavvy Server...');

        if (_.isNil(app)) {
            throw new Error('App is required');
        }

        this.app = app;
        this.env = process.env;
        this.serverConfig = createServerConfig(config);
        this.httpServer = createHTTPServer(this.app, this.serverConfig);
    }

    start() {
        logger.debug('Attempting server startup...');

        const {
            useSSL,
            hostname,
            port
        } = this.serverConfig;
        
        this.httpServer.listen({ port }, (error) => {
            
            if (error) {
                logger.error('Failed to start server', error);
                throw error;
            }

            figlet.text('SimplySavvy', {
                font: 'Standard',
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted',                
            }, (error, data) => {
                if (error) {
                    logger.error('Failed to create ascii banner', error);
                    return;
                }
                
                console.log(data);
                
                console.info(createBanner(
                    this.httpServer, 
                    this.env,
                    hostname,
                    useSSL
                ));
            });
        });
    }

    stop() {
        logger.debug('Attempting server shutdown...');

        this.httpServer.close((error) => {
            if (error) {
                logger.error('Failed to stop server', error);
                throw error;
            }

            logger.info('Server successfully shutdown...');
        });
    }
}
