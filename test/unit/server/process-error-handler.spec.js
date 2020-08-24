import { EventEmitter } from 'events';
import * as ProcessErrorHandler from 'server/process-error-handler';
import { serverLogger as logger } from 'server/util/logger.util';

jest.mock('server/util/logger.util', () => ({
    serverLogger: {
        error: jest.fn()
    }
}));

describe('Process Error Handler', () => {
    let mockProcess;

    beforeEach(() => {
        mockProcess = new EventEmitter();
        jest.spyOn(mockProcess, 'on');
        jest.spyOn(mockProcess, 'removeAllListeners');
    });

    afterEach(() => jest.clearAllMocks());

    describe('Install', () => {
        beforeEach(() => ProcessErrorHandler.install(mockProcess));

        it('Should register a notifier for `unhandledRejection` to log an error', () => {
            expect(mockProcess.on).toHaveBeenNthCalledWith(1, 'unhandledRejection', expect.any(Function));
            mockProcess.emit('unhandledRejection');
            expect(logger.error).toHaveBeenCalledWith('Unhandled promise rejection. This is usually a programming mistake. \nContinuing but server might not work as expected.', undefined);
        });

        it('Should register a notifier for `uncaughtException` to log an error', () => {
            expect(mockProcess.on).toHaveBeenNthCalledWith(2, 'uncaughtException', expect.any(Function));
            mockProcess.emit('uncaughtException');
            expect(logger.error).toHaveBeenCalledWith('FATAL: Uncaught expection. This is usually a programming mistake. \nContinuing but server might not work as expected.', undefined);
        });
    });

    describe('Uinstall', () => {
        beforeEach(() => ProcessErrorHandler.uninstall(mockProcess));

        it('Should unregister a notifier for `unhandledRejection` events', () => {
            expect(mockProcess.removeAllListeners).toHaveBeenNthCalledWith(1, 'unhandledRejection');
        });

        it('Should unregister a notifier for `uncaughtException` events', () => {
            expect(mockProcess.removeAllListeners).toHaveBeenNthCalledWith(2, 'uncaughtException');
        });
    });
});
