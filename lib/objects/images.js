exports.get = function(values,callback) {
  var callback = callback || function(){};
  var values = values || {};
  var image_id = values.image_id || "";

  this.__request({
    uri: "/images/" + encodeURIComponent(image_id),
    method: "GET"
  },function(error,response,data){
    var image = {
      data: data,
      type: response.headers['content-type']
    }
    callback(data.error,image);
  });
  return this;
};