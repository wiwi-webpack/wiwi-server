'use strict';

var os = require('os');
var path = require('path');

var util = require('./util');

module.exports = function(options) {
  var srcPath = util.cwdPath(options.src);
  if (options.includes) {
    srcPath = [
      srcPath
    ].concat(options.includes.map(function(include) {
      return util.cwdPath(include);
    }));
  }
  var preLoader = options.keepcss ? 'style-loader!export-css-loader?remove=false' : 'style-loader';
  var presets = util.babel('preset', [
    {
      name: 'es2015',
      options: {
        loose: !!options.loose
      }
    },
    'stage-0',
    'react'
  ]);
  var cacheDirectory = path.join(os.tmpdir(), options.loose ? 'babel-loose' : 'babel-strict');
  var plugins = [
    'add-module-exports',
    'transform-decorators-legacy',
    'transform-es3-member-expression-literals',
    'transform-es3-property-literals',
    options.loose && 'transform-proto-to-assign',
    {
      name: 'transform-runtime',
      options: {
        polyfill: !!options.polyfill,
        helpers: false,
        regenerator: true
      }
    }
  ].filter(Boolean);
  return [{
    test: /\.jsx?$/,
    use: [{
      loader: 'babel-loader',
      options: options.lazyload ? {
        plugins: util.babel('plugin', plugins),
        presets: presets,
        cacheDirectory: cacheDirectory,
        babelrc: false
      } : {
        plugins: util.babel('plugin', [
          'add-module-exports',
          'transform-decorators-legacy',
          options.loose && 'transform-proto-to-assign',
          {
            name: 'transform-runtime',
            options: {
              polyfill: !!options.polyfill,
              helpers: false,
              regenerator: true
            }
          },
          options.redbox && {
            name: 'react-transform',
            options: {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: [ 'react' ],
                  locals: [ 'module' ]
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: [ 'react', 'redbox-react' ]
                }
              ]
            }
          }
        ].filter(Boolean)),
        presets: presets,
        cacheDirectory: cacheDirectory,
        babelrc: false
      }
    }],
    include: srcPath
  }, {
    test: /\.js$/,
    use: 'es3ify-loader',
    include: function(path) {
      return ~path.indexOf('babel-runtime');
    }
  }, {
    test: /\.css$/,
    loader: preLoader + '!css-loader?sourceMap',
  }, {
    test: /\.less$/,
    loader: preLoader + '!css-loader?sourceMap!less-loader',
  }, {
    test: /\.styl$/,
    use: preLoader + '!css-loader?sourceMap!stylus-loader',
  }, {
    test: /\.svg$/,
    loader: 'babel-loader',
    query: {
      presets: presets,
      cacheDirectory: cacheDirectory,
      babelrc: false
    }
  }, {
    test: /\.svg$/,
    use: 'svg2react-loader',
  }, {
    test: /\.json$/,
    use: 'json-loader',
  }, {
    test: /\.(png|jpe?g|gif|woff|woff2|ttf|otf)$/,
    use: 'url-loader',
  },{
    test: /\.tsx?$/,
    use: [{
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }],
    include: srcPath
  }];
};
