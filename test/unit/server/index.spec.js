import SavvyServer from 'server/server';
import app from 'server/app';
import { launchServer, shutdownServer } from 'server/index';
import { SERVER_STOP_TIMEOUT } from 'server/constants';

jest.mock('server/app', () => ({ expressApp: true }));
jest.mock('server/server');

describe('Launching/Shuttingdown Server', () => {
    beforeEach(() => {
        jest.spyOn(SavvyServer.prototype, 'start');
        jest.spyOn(SavvyServer.prototype, 'stop');
        jest.spyOn(SavvyServer.prototype, 'constructor');

        jest.spyOn(process, 'on');
        jest.spyOn(process, 'exit');
        jest.spyOn(global, 'setTimeout');
    });

    afterEach(() => {
        process.exit.mockRestore();
        jest.clearAllMocks();
    });

    describe('Launch Server', () => {
        beforeEach(async () => {
            await launchServer();
        });

        it('Should instantiate the server with the express application', () => {
            expect(SavvyServer.prototype.constructor).toHaveBeenCalledWith(({ expressApp: true }));
        });

        it('Should start the server', () => {
            expect(SavvyServer.prototype.start).toHaveBeenCalled();
        });

        it('Should register SIGINT and SIGTERM event handlers to shutdown the server', () => {
            expect(process.on).toHaveBeenNthCalledWith(1, 'SIGINT', expect.any(Function));
            expect(process.on).toHaveBeenNthCalledWith(2, 'SIGTERM', expect.any(Function));
        });
    });

    describe('Shutdown Server', () => {
        let server;

        beforeEach(async () => {
            process.exit.mockImplementation(() => jest.fn());

            server = new SavvyServer(app);
            jest.spyOn(server, 'stop');

            await shutdownServer(server);
        });

        it('Should register a callback via a timeout to shutdown the server in case of failure', () => {
            expect(global.setTimeout).toHaveBeenCalledWith(expect.any(Function), SERVER_STOP_TIMEOUT);
        });

        it('Should stop the server', () => {
            expect(server.stop).toHaveBeenCalled();
        });

        it('Should exit the process', () => {
            expect(process.exit).toHaveBeenCalledWith(0);
        });
    });
});
