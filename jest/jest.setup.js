import 'jest-extended';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import 'jest-localstorage-mock';

global.navigator = {
    onLine: true
};

