import _ from 'lodash';
import testConfig from '../../config/test';

class MockAppConfig {
    #originalConfig = {};

    constructor(mockConfig = {}) {
        this.#originalConfig = { ...mockConfig };
        _.merge(this, { ...mockConfig });
    }

    get(path) {
        return _.get(this, path);
    }

    has(path) {
        return _.has(this, path);
    }

    set(path, value) {
        _.set(this, path, value);
    }

    mockClear() {
        _.merge(this, _.cloneDeep(this.#originalConfig));
    }
}

export default new MockAppConfig(testConfig);
