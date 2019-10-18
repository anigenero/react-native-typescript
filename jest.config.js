module.exports = {
    coveragePathIgnorePatterns: [
        '\\.(gql|graphql)$',
        '<rootDir>/test',
        '<rootDir>/src/assets/locale'
    ],
    coverageReporters: [
        'lcov',
        'html'
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/file.transformer.ts'
    },
    preset: 'react-native',
    setupFiles: [
        '<rootDir>/jest.setup.ts',
    ],
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '^.+\\.tsx?$': 'ts-jest',
        '\\.(gql|graphql)$': '<rootDir>/jest.graphql.js'
    },
    transformIgnorePatterns: [
        "node_modules/(?!(jest-)?react-native|react-navigation)",
    ],
};
