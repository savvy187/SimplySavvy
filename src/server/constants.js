import _ from 'lodash';

/**  
 * Timeout (in seconds) after shutdown command
 * is given to server before it forces the process to quit
 * 
 * @type {number}
*/
export const SERVER_STOP_TIMEOUT = 5 * 1000; // 5 seconds


const DIVIDER_LENGTH = 50;
/**
 * Prints out a divider string in the server startup banner...
 * 
 * @type {string}
*/
export const BANNER_DIVIDER = _.repeat('*', DIVIDER_LENGTH);
