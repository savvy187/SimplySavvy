import config from 'config';
import { createLogger, transports, format } from 'winston';

const writeToFile = config.log.writeToFile || false;
const logPath = config.log.logPath || '/logs';
const { combine, printf, timestamp, colorize, json, label } = format;
const colorizeFormat = colorize({ all: true, colors: config.log.colors });
const jsonFormat = json({ space: 4 });

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
 * Creates a shared format with dynamic label to be used by
 * all file transports... 
*/
const createFileFormat = () => combine(
    timestamp(),
    jsonFormat    
);

/* 
 * This is exported becuase it is also used in the Express logging 
 * middleware 
*/
const requestTransports = [
    new transports.Console({
        format: createConsoleFormat('Request'),
        level: config.log.level || 'info'
    })
];

if (writeToFile) {
    requestTransports.push(
        new transports.File({
            filename: `${logPath}/requests.log`,
            format: createFileFormat()
        })
    );
}

/* 
 * This is a sever-specific logger to be used outside of the
 * express app
*/
const serverLogger = createLogger({    
    transports: [
        new transports.Console({
            level: config.log.level || 'info',
            format: createConsoleFormat('Server'),
            handleExceptions: true,
            handleRejections: true
        })
    ]
});

if (writeToFile) {
    serverLogger.transports.push(
        new transports.File({
            filename: `${logPath}/server.log`,
            format: createFileFormat()
        })
    );
}


/* 
 * This is the default logger to be used for the express app, outside of
 * request logging...
*/
const appLogger = createLogger({    
    transports: [
        new transports.Console({
            level: config.log.level || 'info',
            format: createConsoleFormat('Express'),
            handleExceptions: true,
            handleRejections: true
        })
    ]
});

if (writeToFile) {
    appLogger.push(
        new transports.File({
            filename: `${logPath}/express.log`
        })
    );
}

export { serverLogger, requestTransports };
export default appLogger;
