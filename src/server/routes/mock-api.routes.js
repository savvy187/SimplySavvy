import jsonServer from 'json-server';
import articles from 'server/mocks/articles.mock.js';

/* 
 * We provide an object with keys/values of the mock files
 * for JSON server to consume as endpoints of the API... 
*/
export default jsonServer.router({
    articles
});
