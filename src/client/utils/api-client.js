import axios, { CancelToken, isCancel } from 'axios';

const ApiClient = axios.create();

export { CancelToken, isCancel };
export default ApiClient;
