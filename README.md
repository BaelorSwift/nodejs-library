# baelorjs
  node.js libary for the [Baelor API](https://baelor.io).
  
## Installation
    $ npm install baelorjs
    
## Introduction
  baelorjs is a simple node.js libary for the [Baelor API](https://baelor.io). Below is a simple example which shows it fetching a list of albums.
  
```js
var Baelor = require('baelorjs'); // Include the node libary
var client = new Baelor({
  api_key: "xxx" // Set the api_key, can be done later with .setKey()
});

client.albums({ // Lets try get a list of albums
},function(error,albums) { // Error and Albums returned as parameters
  if(error){console.log(error);} // Check if there were any errors
  else {
    console.log(albums); // Do something with the albums
  }
});
```

## Supported APIs

### .setKey(apikey)
##### Description
  Sets the api key of the Baelor client to use in API requests.
  
##### Arguments
  * `apikey` is your Baelor API key. You would acquire this calling .userCreate()
    * Required

##### Example
```js
client.setKey("xxx");
```



### .albums(values,callback)
##### Description
  Gets a list of albums. Requires a client with an api key.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * Has no arguments
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `albums`
      * returns an array of `album object`s

##### Example
```js
client.albums({},function(error,albums) {
  if(error){console.log(error);}
  else {
    console.log(albums);
  }
});
```


### .album(values,callback)
##### Description
  Gets an album. Requires a client with an api key.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * `slug` is the slug of the album
      * Required
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `album`
      * returns an `album object`

##### Example
```js
client.album({
  slug: "xxx"
},function(error,album) {
  if(error){console.log(error);}
  else {
    console.log(album);
  }
});
```



### .songs(values,callback)
##### Description
  Gets a list of songs. Requires a client with an api key.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * Has no arguments
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `songs`
      * returns an array of `song object`s

##### Example
```js
client.songs({},function(error,songs) {
  if(error){console.log(error);}
  else {
    console.log(songs);
  }
});
```


### .song(values,callback)
##### Description
  Gets an song. Requires a client with an api key.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * `slug` is the slug of the song
      * Required
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `song`
      * returns a `song object`

##### Example
```js
client.song({
  slug: "xxx"
},function(error,song) {
  if(error){console.log(error);}
  else {
    console.log(song);
  }
});
```


### .songLyrics(values,callback)
##### Description
  Gets an songs lyrics. Requires a client with an api key.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * `slug` is the slug of the song
      * Required
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `lyrics`
      * returns a string of lyrics

##### Example
```js
client.songLyrics({
  slug: "xxx"
},function(error,lyrics) {
  if(error){console.log(error);}
  else {
    console.log(lyrics);
  }
});
```



### .image(values,callback)
##### Description
  Gets an image (To-Improve). Requires a client with an api key.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * `image_id` is the id of an image. For example album artwork
      * Required
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `song`
      * returns an `image object`

##### Example
```js
client.image({
  image_id: "xxx"
},function(error,image) {
  if(error){console.log(error);}
  else {
    // Do something with image
  }
});
```



### .user(values,callback)
##### Description
  Gets an API user.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * Has no arguments
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `user`
      * returns a `user object`

##### Example
```js
client.user({},function(error,user) {
  if(error){console.log(error);}
  else {
    console.log(user);
  }
});
```


### .userCreate(values,callback)
##### Description
  Creates a new API user.
  
##### Arguments
  * `values` is an object containing values that are required by the API
    * `username` is your desired username.
      * Required
      * Must be between 1 and 25 characters long
      * Must match `(?![\s])(?!.*[_-]{2})[a-zA-Z0-9-_]+(?`
    * `email` is your email address.
      * Required
      * Must be a valid email address.
    * `password` is your desired password.
      * Required
      * Must be longer than 8 characters
      * Must contain at least two of the following; number, lowercase letter, uppercase letter
  * `callback` is called when the request completes
    * `error`
      * if error occurs, returns an `error object`
      * else returns null
    * `user`
      * returns a `user object`

##### Example
```js
client.createUser({
  username: "xxx",
  email: "xxx",
  password: "xxx"
},function(error,user) {
  if(error){console.log(error);}
  else {
    console.log(user);
  }
});
```