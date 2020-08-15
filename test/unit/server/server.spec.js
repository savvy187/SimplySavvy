import http from 'http';
import https from 'https';
import config from 'config';
import express from 'express';
import SavvyServer from 'server/server';
import { serverLogger as logger } from 'server/util/logger.util';

jest.mock('server/util/logger.util', () => ({
    serverLogger: {
        info: jest.fn(),
        debug: jest.fn(),
        error: jest.fn()
    }
}));

describe('Simply Savvy Server', () => {
    class MockHttpsServer {}

    class MockHttpServer {

        constructor() {
            this.address = () => 'localhost';
            this.listen = jest.fn((port, listener) => listener());
            this.close = jest.fn((listener) => listener());
        }
    }

    let app;
    let server;

    beforeEach(() => {
        config.set('server.useSSL', false);

        jest.spyOn(http, 'createServer').mockReturnValue(new MockHttpServer());
        jest.spyOn(https, 'createServer').mockReturnValue(new MockHttpsServer());

        app = express();
        server = new SavvyServer(app);
    });

    afterEach(() => {
        config.mockClear();
        jest.clearAllMocks();

        http.createServer.mockRestore();
        https.createServer.mockRestore();
    });

    describe('Constructor', () => {
        it('Should throw an Error when attempting to start without an App', () => {
            expect(() => new SavvyServer()).toThrow('An app is required to start the server');
        });

        it('Should instatiate a SavvyServer with the correct values', () => {
            const server = new SavvyServer(app);

            expect(server).toHaveProperty('app', app);
            expect(server).toHaveProperty('env', process.env);
            expect(server).toHaveProperty('serverConfig', expect.objectContaining({
                port: process.env.PORT,
                hostname: 'localhost',
                mock: true,
                useSSL: false,
                error: {
                    messages: {
                        xhr: 'Server Error encountered. Please try again.',
                        'default': 'Server Error encountered. Please refresh and try again.'
                    }
                }
            }));
            expect(server).toHaveProperty('httpServer');
            expect(server.httpServer).toBeInstanceOf(MockHttpServer);
            expect(http.createServer).toHaveBeenCalledWith(app);
        });
    });

    describe('Start', () => {

    });
});
