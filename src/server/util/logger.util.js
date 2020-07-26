import config from 'config';
import { createLogger, transports, format } from 'winston';

const { combine, printf, timestamp, colorize, label } = format;
const colorizeFormat = colorize({ all: true, colors: config.log.colors });

/* 
* Creates a shared format with dynmaic label to be used by
* all console transports...
*/
const createConsoleFormat = (formatLabel) => combine(
    colorizeFormat,        
    label({ label: formatLabel }),
    timestamp(),
    printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] - ${level}: ${message}`;
    })    
);

/* 
 * This is exported becuase it is also used in the Express logging 
 * middleware 
*/
export const consoleTransport = new transports.Console({
    format: createConsoleFormat('Request'),
    level: config.log.level || 'info'
});

/* 
 * This is a sever-specific logger to be used outside of the
 * express app
*/
export const serverLogger = createLogger({    
    transports: [
        new transports.Console({
            level: config.log.level || 'info',
            format: createConsoleFormat('Server'),
            handleExceptions: true,
            handleRejections: true
        })
    ]
});


/* 
 * This is the default logger to be used for the express app, outside of
 * request logging...
*/
export default createLogger({    
    transports: [
        new transports.Console({
            level: config.log.level || 'info',
            format: createConsoleFormat('Express'),
            handleExceptions: true,
            handleRejections: true
        })
    ]
});
