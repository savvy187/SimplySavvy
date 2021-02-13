import 'jest-extended';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import 'jest-localstorage-mock';
import mockConfig from '../test/helpers/mock-config.helper';

global.navigator = {
    onLine: true
};

global.IntersectionObserver = jest.fn();

global.matchMedia = jest.fn();

jest.mock('config', () => mockConfig);
