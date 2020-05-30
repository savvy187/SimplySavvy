module.exports = {
    moduleNameMapper: {
        '\\.css': '<rootDir>/jest/style.mock.js',
        'test-utils': '<rootDir>/test/test-utils.js',
        'styled-components': '<rootDir>/node_modules/styled-components',
        "^components(.*)$": "<rootDir>/src/client/components/$1",
        "^containers(.*)$": "<rootDir>/src/client/containers/$1",
        "^hooks(.*)$": "<rootDir>/src/client/hooks/$1",
        "^themes(.*)$": "<rootDir>/src/client/themes/$1",
        "^contexts(.*)$": "<rootDir>/src/client/contexts/$1",
    },
    moduleDirectories: [
        'node_modules'
    ],
    modulePaths: [
        '<rootDir>/src/',
        '<rootDir>/test/'
    ],
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    testURL: 'http://localhost',
    transformIgnorePatterns: [
        '/node_modules'    
    ],
    testEnvironment: 'jest-environment-jsdom-sixteen',
    testMatch: [
        '<rootDir>/test/**/*.spec.js'
    ],
    roots: [
        '<rootDir>/src/',
        '<rootDir>/test/'
    ],
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
    ],
    setupFiles: [
        '<rootDir>/jest/shim.js'
    ],
    setupFilesAfterEnv: [
        '<rootDir>/jest/jest.setup.js'
    ]
};
