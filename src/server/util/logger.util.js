import config from 'config';
import { createLogger, transports, format } from 'winston';

const { combine, printf, timestamp, colorize, label } = format;


const createFormat = (formatLabel, formatter) =>  combine(    
    colorize(),        
    label({ label: formatLabel }),
    timestamp(),
    formatter
);

const ConsoleFormatter = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] - ${level}: ${message}`;
});

/* 
 * This is exported becuase it is also used in the Express logging 
 * middleware 
*/
export const consoleTransport = new transports.Console({
    format: createFormat('Express', ConsoleFormatter),
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
            format: createFormat('Server', ConsoleFormatter)
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
            format: createFormat('Express', ConsoleFormatter),    
        })
    ]
});
