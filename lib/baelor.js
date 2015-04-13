/**
 * Module dependencies
 */
var request = require('request');
var extend = require('deep-extend');

var VERSION = require('../package.json').version;

function Baelor(options){
  if (!(this instanceof Baelor)) return new Baelor(options);

  this.VERSION = VERSION;

  this.options = extend({
    api_key: null,
    request_options: {
      baseUrl: 'https://baelor.io/api/v0',
      headers: {
        'Accept': 'application/json',
        'Connection': 'close',
        'User-Agent': 'baelor-node/' + VERSION
      }
    }
  }, options);
}

Baelor.prototype.__request = function(values,callback){
  var values = values || {};
  var uri = values.uri || "";
  var method = values.method || "";
  var headers = values.headers || {};
  var data = values.data || {};
  var callback = callback || function(){};

  var options = extend({
    uri: uri,
    method: method,
    headers: headers
  }, this.options.request_options);

  if(this.api_key && options.headers['Authorization']!='undefined'){
    options.headers['Authorization'] = this.api_key;
  }

  if(method=='POST'){
    options.json = true;
    options.body = data;
  }

  request(options,callback);
}

Baelor.prototype.setKey = function(apikey) {
  var apikey = apikey || "";
  this.settings.api_key = apikey;
  return this;
};

Baelor.prototype.user = function(values,callback) {
  var callback = callback || function(){};
  var values = values || {};
  var apikey = values.apikey || "";

  this.__request({
    uri: "/users",
    method: "GET"
  },function(error,response,data){
    callback(data.error,data.result);
  });
  return this;
};

Baelor.prototype.userCreate = function(values,callback) {
  var callback = callback || function(){};
  var values = values || {};
  var username = values.username || "";
  var email = values.email || "";
  var password = values.password || "";

  this.__request({
    uri: "/users",
    method: "POST",
    data: {
      username: username,
      email_address: email,
      password: password,
      password_confirm: password
    }
  },function(error,response,data){
    callback(data.error,data.result);
  });
  return this;
};

module.exports = Baelor;