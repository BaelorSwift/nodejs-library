/**
 * Module dependencies
 */
var request = require('request');
var extend = require('deep-extend');

var PACKAGE = require('../package.json');

function Baelor(options){
  if (!(this instanceof Baelor)) return new Baelor(options);

  this.options = extend({
    api_key: null,
    request_options: {
      baseUrl: 'https://baelor.io/api/v0',
      headers: {
        'Accept': 'application/json',
        'Connection': 'close',
        'User-Agent': PACKAGE.name + '/' + PACKAGE.version
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

  var request_options = extend(this.options.request_options,{
    uri: uri,
    method: method,
    headers: headers
  });

  if(this.options.api_key && typeof(request_options.headers['Authorization'])=='undefined'){
    request_options.headers['Authorization'] = this.options.api_key;
  }
  request_options.headers['Authorization'] = "bearer " + request_options.headers['Authorization'];
  
  if(method=='POST'){
    request_options.json = true;
    request_options.body = data;
  }

  
  request(request_options,function(error,response,data){
    try {
      callback(error,response,JSON.parse(data));
    } catch(e){
      callback(error,response,data);
    }
  });
}

var objects = {
  users: require('./objects/users'),
  albums: require('./objects/albums'),
  songs: require('./objects/songs')
}

Baelor.prototype.setKey = function(apikey) {
  var apikey = apikey || "";
  this.settings.api_key = apikey;
  return this;
};

Baelor.prototype.user = objects.users.get;
Baelor.prototype.userCreate = objects.users.create;

Baelor.prototype.albums = objects.albums.list;
Baelor.prototype.album = objects.albums.get;

Baelor.prototype.songs = objects.songs.list;
Baelor.prototype.song = objects.songs.get;

module.exports = Baelor;