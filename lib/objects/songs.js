exports.list = function(values,callback) {
  var callback = callback || function(){};
  var values = values || {};

  this.__request({
    uri: "/songs",
    method: "GET"
  },function(error,response,data){
    callback(data.error,data.result);
  });
  return this;
};

exports.get = function(values,callback) {
  var callback = callback || function(){};
  var values = values || {};
  var slug = values.slug || "";

  this.__request({
    uri: "/songs/" + encodeURIComponent(slug),
    method: "GET"
  },function(error,response,data){
    callback(data.error,data.result);
  });
  return this;
};