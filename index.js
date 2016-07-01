var Device = require('zetta-device');
var util = require('util');

var TIMEOUT = 3000;
function degToRad(x) {
  return x * ( Math.PI / 180 );
}

var Skittles = module.exports = function(opts) {
  Device.call(this);
  this.opts = opts || {};
  this.number = 0;
  this.numberOfReds = 7;
  this._increment = this.opts['increment'] || 15;
  this._timeOut = null;
  this._counter = 0;
};
util.inherits(Skittles, Device);

Skittles.prototype.init = function(config) {
  var name = this.opts.name || 'Skittles';

  config
    .name(name)
    .type('skittles')
    .state('ready')
    .when('ready', {allow: ['make-not-ready']})
    .when('not-ready', {allow: ['make-ready']})
    .map('make-not-ready', this.makeNotReady)
    .map('make-ready', this.makeReady)
    .monitor('number')
    .monitor('numberOfReds');

  this._startMockData();
};

Skittles.prototype.makeReady = function(cb) {
  this.state = 'ready';
  this._startMockData();
  cb();
}

Skittles.prototype.makeNotReady = function(cb) {
  this.state = 'not-ready'
  this._stopMockData();
  cb();
}

Skittles.prototype._startMockData = function(cb) {
  var self = this;
  this._timeOut = setInterval(function() {
    self.number = Math.floor(Math.sin(degToRad(self._counter)) + 1.0);
    self.numberOfReds = 7;
    self._counter += self._increment;
  }, 100);
}

Skittles.prototype._stopMockData = function(cb) {
  clearTimeout(this._timeOut);
}

