import config from 'config';
import http from 'http';
import https from 'https';
import fs from 'fs';
import _ from 'lodash';
import figlet from 'figlet';
import { serverLogger as logger } from 'server/utils/logger.util';

export const createServerConfig = (appConfig) => {
    return {
        ...appConfig.get('server'),
        port: config.util.getEnv('PORT'),
        hostname: config.util.getEnv('HOSTNAME') || 'localhost'
    };
};

export const createHTTPServer = (app, serverConfig) => {
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

        this.httpServer.listen(port, (error) => {
            
            if (error) {
                logger.error('Failed to start server', error);
                throw error;
            }

            figlet.text('SimplySavvy', {
                font: 'Standard',
                horizontalLayout: 'fitted',
                verticalLayout: 'fitted'
            }, (error, data) => {
                if (error) {
                    logger.error('Failed to create ascii banner', error);
                    return;
                }

                logger.info(data);
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
