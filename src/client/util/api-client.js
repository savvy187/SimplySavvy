import axios, { CancelToken, isCancel } from 'axios';
import { v1 as uuidv1 } from 'uuid';

const ApiClient = axios.create({
    transformRequest: (data, headers) => {
        headers['X-request-id'] = uuidv1();

        return data;
    }
});

export { CancelToken, isCancel };
export default ApiClient;
