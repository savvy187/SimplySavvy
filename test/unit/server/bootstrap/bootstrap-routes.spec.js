import config from 'config';
import bootstrapRoutes from 'server/bootstrap/bootstrap-routes';
import mockAPIRouter from 'server/routes/mock-api.routes.js';

jest.mock('server/util/logger.util');

describe('Bootstrap Routes', () => {
    const mockUse = jest.fn();
    const app = { use: mockUse };
            
    afterEach(() => jest.clearAllMocks());

    it('Should bootstrap mock routes if configured to do so', () => {
        config.set('server.mock', true);
        bootstrapRoutes(app);
        expect(mockUse).toHaveBeenCalledTimes(1);
        expect(mockUse).toHaveBeenCalledWith('/api', mockAPIRouter);
    });

    it('Should not bootstrap mock routes if not configured to do so', () => {
        config.set('server.mock', false);
        bootstrapRoutes(app);
        expect(mockUse).not.toHaveBeenCalledWith('/api', mockAPIRouter);
    });
});
