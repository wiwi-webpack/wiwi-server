'use stric';

var pkg = require('../package.json');

module.exports = {
    description: pkg.description,
    options: [
        [ '-s, --src <dir>', 'source directory, default to `src`', 'src' ],
        [ '-d, --dist <dir>', 'build directory, default to `dist`', 'dist' ],
        [ '    --host <host>', 'server host default to first private ip'],
        [ '-p, --port <port>', 'server port, default to `3000`', 3000 ],
        [ '-e  --entry <file>', 'app entry, default to `app/app.js`', 'app/app.js' ],
        [ '    --pages [pages]', 'add multi-page entries' ],
        [ '    --vars', 'runtime context varibles' ],
        [ '    --buildvars', 'build varibles' ],
        [ '-r, --proxy <proxy>', 'dev proxy hostname or mappings' ],
        [ '-k, --keepcss', 'keep flush css files' ],
        [ '-l, --lazyload', 'disable hot reload' ],
        [ '-h, --https', 'start https server' ],
        [ '    --externals', 'webpack external varibles' ],
        [ '-o, --open', 'open url in default browser' ],
        [ '    --loose', 'use babel es2015 loose mode to transform codes' ],
        [ '    --historyApiFallback', 'history api fallback mappings' ],
        [ '    --mockapi', 'mock data api mappings' ],
        [ '    --includes', 'loader should include paths' ],
        [ '    --polyfill', 'use core-js to do polyfills' ],
        [ '    --alias', 'path alias' ],
        [ '    --injects', 'inject js into html' ],
        [ '    --no-sourcemap', 'don\'t use the `SourceMapDevToolPlugin` of plugins to debug' ],
        [ '    --no-redbox', 'don\'t use the `RedBox` to capture React errors' ],
    ],
    action: function(options) {
        console.log('options', options);
    }
};