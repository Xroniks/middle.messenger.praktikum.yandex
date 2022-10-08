const Pug = require('pug');
const fs = require('fs');
const { JSDOM } = require('jsdom');


const { window } = new JSDOM('<div id="app"></div>', {
    url: 'http://localhost:3000'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;

require.extensions['.pug'] = function (module, filename) {
    const contents = fs.readFileSync(filename, 'utf-8');

    module.exports = () => ({});
}

require.extensions['.scss'] = function (module) {
    module.exports = () => ({});
}
