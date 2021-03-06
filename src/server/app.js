import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import expressRequiestId from 'express-request-id';
//import favicon from 'serve-favicon';
import CatchallErrorHandler, { clientErrorHandler } from 'server/middleware/error-handling.middleware';
import bootstrapRoutes from 'server/bootstrap/bootstrap-routes';
import logging, { errorLogging } from 'server/middleware/logging.middleware';
import logger from 'server/util/logger.util';

logger.debug('Initializing Express app...');
const app = express();

app.disable('etag');

/* 
    *** MIDDLEWARE ***
*/
logger.debug('Registering Express middleware...');

/** 
 * Collection of security middlewares. Most of the default config looks good,
 * but the CSP is needed...
*/ 
app.use(helmet(JSON.stringify({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ['self'],
            scriptSrc: ['self'],
            styleSrc: ['self']
        }
    }
})));

app.use(cors());
app.use(compression());

/**
 * Parses req.body into a json object
*/
app.use(bodyParser.json({ limit: '20MB' }));
    

/**
 * Parses URL-encoded req.body into a json object via QS
*/
app.use(bodyParser.urlencoded({ extended: true, limit: '20MB' }));

/**
 * Populates req.cookie with an object of cookie keys/values
*/
app.use(cookieParser());

app.use(expressRequiestId({ headerName: 'X-request-id' }));
app.use(logging);

/* 
    *** ROUTERS ***
*/
logger.debug('Bootstrapping Express Routes...');
bootstrapRoutes(app);

/* 
    *** ERROR HANDLING ***
*/
logger.debug('Registering Error handlers...');
app.use(errorLogging);
app.use(clientErrorHandler);
app.use(CatchallErrorHandler);

export default app;
