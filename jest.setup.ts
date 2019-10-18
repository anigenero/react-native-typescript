import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

const nodeFetch = jest.requireActual('node-fetch');
const fetchMock = require('fetch-mock').sandbox();

Object.assign(fetchMock.config, nodeFetch, {
    fetch: nodeFetch
});

(global as any).fetch = fetchMock;

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const {JSDOM} = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {window} = jsdom;

function copyProps(src: any, target: any) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
    userAgent: 'node.js',
};

copyProps(window, global);

Enzyme.configure({adapter: new Adapter()});

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error;
console.error = (message) => {
    if (message.startsWith('Warning:')) {
        return;
    }

    originalConsoleError(message);
};
