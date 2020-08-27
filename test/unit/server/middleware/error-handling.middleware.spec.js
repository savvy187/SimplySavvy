import errorHandler, { clientErrorHandler } from 'server/middleware/error-handling.middleware';
import config from 'config';

describe('Error Handling Middleware', () => {
    
    describe('Client Error Handler', () => {
        const mockSend = jest.fn((err) => err);
        const mockStatus = jest.fn(() => ({ send: mockSend }));                    
        const mockNext = jest.fn();

        let err;         
        let req;
        let res;

        beforeEach(() => {
            err = new Error('something went wrong');
            req = {};
            res = { status: mockStatus };
        });

        afterEach(() => jest.clearAllMocks());

        it('Should simply call next on non-xhr request', () => {
            const response = clientErrorHandler(err, req, res, mockNext);
            expect(mockStatus).not.toHaveBeenCalled();
            expect(mockSend).not.toHaveBeenCalled();
            expect(response).toBeUndefined();
            expect(mockNext).toHaveBeenCalledWith(err);
        });

        it('Should send the errors status property for an xhr request', () => {
            req.xhr = true;
            err.status = 400;            

            const response = clientErrorHandler(err, req, res, mockNext);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockSend).toHaveBeenCalledWith({ error: 'something went wrong' });
            expect(response).toEqual(expect.objectContaining({
                error: 'something went wrong'
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('Should send the errors statusCode property for an xhr request', () => {
            req.xhr = true;
            err.statusCode = 400;            

            const response = clientErrorHandler(err, req, res, mockNext);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockSend).toHaveBeenCalledWith({ error: 'something went wrong' });
            expect(response).toEqual(expect.objectContaining({
                error: 'something went wrong'
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('Should send a default status of 500 for an xhr request', () => {
            req.xhr = true;

            const response = clientErrorHandler(err, req, res, mockNext);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockSend).toHaveBeenCalledWith({ error: 'something went wrong' });
            expect(response).toEqual(expect.objectContaining({
                error: 'something went wrong'
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('Should send the errors message when present', () => {
            req.xhr = true;

            const response = clientErrorHandler(err, req, res, mockNext);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockSend).toHaveBeenCalledWith({ error: 'something went wrong' });
            expect(response).toEqual(expect.objectContaining({
                error: 'something went wrong'
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('Should send a supplied message when the error was thrown without one', () => {
            req.xhr = true;
            const noMessageError = new Error();
            config.set('server.err.message.xhr', 'default xhr message');

            const response = clientErrorHandler(noMessageError, req, res, mockNext);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockSend).toHaveBeenCalledWith({ error: 'default xhr message' });
            expect(response).toEqual(expect.objectContaining({
                error: 'default xhr message'
            }));
            expect(mockNext).not.toHaveBeenCalled();
        });
    });

    describe('Error Handler', () => {
        const mockStatus = jest.fn();
        const mockRender = jest.fn();
        
        let err;
        let req;
        let res;

        beforeEach(() => {
            err = new Error('something bad happened');
            req = {};
            res = { status: mockStatus, render: mockRender };
        });

        afterEach(() => jest.clearAllMocks());

        it('Should send the errors status property when present', () => {
            err.status = 400;
            errorHandler(err, req, res);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockRender).toHaveBeenCalledWith('Error', expect.objectContaining({
                error: 'something bad happened'
            }));
        });

        it('Should send the errors statusCode property when present', () => {
            err.statusCode = 400;
            errorHandler(err, req, res);
            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockRender).toHaveBeenCalledWith('Error', expect.objectContaining({
                error: 'something bad happened'
            }));
        });

        it('Should send a default status of 500', () => {
            errorHandler(err, req, res);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockRender).toHaveBeenCalledWith('Error', expect.objectContaining({
                error: 'something bad happened'
            }));
        });

        it('Should send the errors message if present', () => {
            errorHandler(err, req, res);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockRender).toHaveBeenCalledWith('Error', expect.objectContaining({
                error: 'something bad happened'
            }));
        });

        it('Should send a supplied message when the error was thrown without one', () => {
            const noMessageError = new Error();
            config.set('server.err.message.default', 'default error message');

            errorHandler(noMessageError, req, res);
            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockRender).toHaveBeenCalledWith('Error', expect.objectContaining({
                error: 'default error message'
            }));
        });
    });
});
