# baelorjs
  node.js libary for the [Baelor API](https://baelor.io).
  
## Contents
* **[Installation](#installation)**
* **[Introduction](#introduction)**
* **[Examples](#examples)**
  * [Getting a list of album names](#getting-a-list-of-album-names)
  * [Find the longest line in a song](#find-the-longest-line-in-a-song)
* **[Object Types](#object-types)**
  * [Album Object](#album-object)
  * [Song Object](#song-object)
  * [Image Object](#image-object)
  * [User Object](#user-object)
  * [Error Object](#error-object)
* **[Supported APIs](#supported-apis)**
  * [.setKey()](#setkeyapikey)
  * [.albums()](#albumsvaluescallback)
  * [.album()](#albumvaluescallback)
  * [.songs()](#songsvaluescallback)
  * [.song()](#songvaluescallback)
  * [.songLyrics()](#songlyricsvaluescallback)
  * [.image(values,callback)](#imagevaluescallback)
  * [.user(values,callback)](#uservaluescallback)
  * [.userCreate(values,callback)](#usercreatevaluescallback)
* **[Credz](#credz)**

## Installation
    $ npm install baelorjs


 
## Introduction
  baelorjs is a simple node.js libary for the [Baelor API](https://baelor.io). Below is a simple example which shows it fetching a list of albums.
  
```javascript
var Baelor = require('baelorjs'); // Include the node libary
var client = new Baelor({ // Create a new client
  api_key: "xxx" // Set the api_key, can be done later with .setKey()
});

client.albums({ // Lets try get a list of albums
  // We dont need to pass in anything for this API
},function(error,albums) { // Error and Albums returned as parameters
  if(error){console.log(error);} // Check if there were any errors
  else {
    console.log(albums); // Do something with the albums
  }
});
```



## Examples
  Here are some of the examples of the libary in use

### Getting a list of album names
```javascript
var Baelor = require('baelorjs'); // Include the node libary
var client = new Baelor({ // Create a new client
  api_key: "xxx" // Set the api_key
});

client.albums({},function(error,albums) {
  if(error){console.log(error);} // Check if there were any errors
  else {
    var names = albums.map(function(album){
      return album.name;
    });
    console.log(names);
  }
});
```

### Find the longest line in a song
```javascript
var Baelor = require('baelorjs'); // Include the node libary
var client = new Baelor({ // Create a new client
  api_key: "xxx" // Set the api_key
});

client.songLyrics({
  slug: "style" // We want to get the lyrics from the song Style (its slug is "style")
},function(error,lyrics) {
  if(error){console.log(error);} // Check if there were any errors
  else {
    var lines = lyrics.split('\n'); // The lyrics are sent as one string with \n markers, so lets split it up
    
    var longest_length = 0;
    var longest_i = 0;
    
    for (var i in lines) {
      var current = lines[i].length
      if(current>longest_length){
        longest_length = current;
        longest_i = i;
      }
    };

    console.log("The longest line is line %s, and it says: %s",longest_i+1,lines[longest_i]);
  }
});
```



## Object Types
  There are multiple different object types that get returned by the APIs. To keep this doc clean, they will all be described up here instead of at each occurance.

### Album Object
##### Description
  An object that describes an album

##### Example
```javascript
{
  slug: "xxx", // Slug of the album
  name: "xxx", // Name of the album
  released_at: "xxxx-xx-xxTxx:xx:xx", // Release date
  length: "xx:xx:xx",
  label: "xxx",
  genres: [], // Array of genre keywords
  producers: [], // Array of producer names
  songs: [], // Array of Song Objects
  album_cover:{
    image_id: "xxx" // image_id of Image Object
  }
}
```

### Song Object
##### Description
  An object that describes a song

##### Example
```javascript
{
  slug: "xxx", // Slug of song
  title: "xxx", // Name of song
  length: "xx:xx:xx", // Length of song (time)
  writers: [], // Array of writer names
  producers: [], // Array of producer names
  album: {} // Album Objects
}
```

### Image Object
##### Description
  An object that describes an image

##### Example
```javascript
{
  data: "xxx", // String of image data (warning: raw data string)
  type: "xxx", // Mime type of image (eg image/png)
}
```

### User Object
##### Description
  An object that describes an api user

##### Example
```javascript
{
  username: "xxx", // Username
  email_address: "xxx", // Email address
  api_key: "xxx" // API key,
  is_admin: false // Has API admin rights
}
```

### Error Object
##### Description
  An object that describes an error

##### Example
```javascript
{
  status_code: 0, // Integer error description
  description: "xxx", // String representation of error
  details: [] // This holds additional error details. This can be null.
}
```



## Supported APIs

### .setKey(apikey)
##### Description
  Sets the api key of the Baelor client to use in API requests. Not needed if you pass in the api_key at init.
  
##### Arguments
  * `apikey` is your Baelor API key. You would acquire this calling .userCreate()
    * Required

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `albums`
      * returns an array of <a href="#album-object">`Album Object`</a>s

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `album`
      * returns an <a href="#album-object">`Album Object`</a>

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `songs`
      * returns an array of <a href="#song-object">`Song Object`</a>s

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `song`
      * returns a <a href="#song-object">`Song Object`</a>

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `lyrics`
      * returns a string of lyrics

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `song`
      * returns an <a href="#image-object">`Image Object`</a>

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `user`
      * returns a <a href="#user-object">`User Object`</a>

##### Example
```javascript
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
      * if error occurs, returns an <a href="#error-object">`Error Object`</a>
      * else returns null
    * `user`
      * returns a <a href="#user-object">`User Object`</a>

##### Example
```javascript
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



## Credz
  [Baelor API](http://baelor.io) created by [Alex Forbes-Reed](https://github.com/0xdeafcafe) [@0xdeafcafe](http://twitter.com/0xdeafcafe)
  
  [baelorjs libary](https://www.npmjs.com/package/baelorjs) created by [Jamie Davies](https://github.com/viralpickaxe) [@viralpickaxe](http://twitter.com/viralpickaxe)