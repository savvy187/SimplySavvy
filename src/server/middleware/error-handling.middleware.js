
import config from 'config';

const getErrorStatusCode = (err) => err.status || err.statusCode || 500;

const getErrorMessage = (err, defaultMsg) => err.message || defaultMsg;

/* 
 * Responsible for XHR request errors. Sends both status
 * and JSON for client to consume. 
*/
export const clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        const status = getErrorStatusCode(err);
        const message = getErrorMessage(err, config.get('server.err.message.xhr'));
        return res.status(status).send({ error: message });
    }
    
    next(err);
};

/* 
 * Last middleware to run, catches any unhandled errors
 * and sends back this template...
*/
export default  (err, req, res) => {
    const status = getErrorStatusCode(err);
    const message = getErrorMessage(err, config.get('server.err.message.default'));
    res.status(status);
    res.render('Error', { error: message });
};
