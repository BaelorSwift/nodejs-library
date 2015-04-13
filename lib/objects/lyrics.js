exports.get = function(values,callback) {
  var callback = callback || function(){};
  var values = values || {};
  var slug = values.slug || "";

  this.__request({
    uri: "/songs/" + encodeURIComponent(slug) + "/lyrics",
    method: "GET"
  },function(error,response,data){
    if(data.result==null){
      var lyrics = null
    } else {
      var lyrics = data.result.lyrics;
    }
    callback(data.error,lyrics);
  });
  return this;
};