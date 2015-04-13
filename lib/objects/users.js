exports.get = function(values,callback) {
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

exports.create = function(values,callback) {
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