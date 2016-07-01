var zetta = require('zetta');
var Skittles = require('../index');
var argv = require('minimist')(process.argv.slice(2));

var increment = argv['i'];

zetta()
  .use(Skittles, {increment: increment})
  .link('http://testing-analytics.iot.apigee.net')
  .listen(1337);
