/**
 * Module dependencies
 */
var request = require('request');
var extend = require('deep-extend');

function Baelor(options){
  if (!(this instanceof Baelor)) return new Baelor(options);

  this.VERSION = VERSION;

  this.options = extend({
    api_key: null,
    rest_base: 'https://baelor.io',
    request_options: {
      headers: {
        'Accept': 'application/json',
        'Connection': 'close',
        'User-Agent': 'baelor-node/' + VERSION
      }
    }
  }, options);
}