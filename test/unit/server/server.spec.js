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

    it('Should start', () => {});
});
