var WebkitBrowser = require('webkit-server').Browser
  , read = require('fs').readFileSync
  , jQueryCore = read('./jquery-1.7.1.min.js')

exports.createBrowser = function createBrowser (callback) {
  return new Browser(callback);
};

function Browser (callback) {
  var self = this;
  this._browser = new WebkitBrowser(function () {
    callback(self);
  });
}

Browser.prototype = {
  get: function (url, callback) {
    var wkBrowser = this._browser;
    wkBrowser.visit(url, function () {
      wkBrowser.evaluate(jQuery, function () {
      });
    });
  }
};

function createJquery (wkBrowser) {
  return function (selector, context) {
    var cmd = 'jQuery("' + selector + '"';
    if (context)
      cmd += ', ' + JSON.stringify(context);
    cmd += ')';
    wkBrowser.evaluate(cmd, function (res) {
    });
  };
}
