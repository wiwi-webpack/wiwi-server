'use strict';

var fs = require('fs');

var util = require('./util');

module.exports = function(icon) {
  var defaultIcon = util.relPath('favicon.ico');
  var iconStream = fs.readFileSync(defaultIcon);
  if (fs.existsSync(icon)) {
    iconStream = fs.readFileSync(icon);
  }
  return function(req, res, next) {
    if (/\/favicon\.ico$/.test(req.url)) {
      res.set('Content-Type', 'image/x-icon');
      res.send(iconStream);
    } else {
      next();
    }
  }
};
