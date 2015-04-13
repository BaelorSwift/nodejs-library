# baelorjs
  node.js libary for the [Baelor API](https://baelor.io).
  
## Installation
    $ npm install baelorjs
    
## Introduction
  baelorjs is a simple node.js wrapper around the [Baelor API](https://baelor.io). Below is a simple example which show it creating an API user.
  
```js
var Baelor = require('baelorjs'); // Include the node libary
var client = new Baelor({
  api_key: "<<API KEY>>" // Optional: set the api_key, can be done later with .authorize()
});

client.userCreate({ // Lets try create a user
  username: "username",
  email: "email",
  password: "password"
},function(error,user) { // Returns an error or user argument
  if(error) throw error;
  console.log(user);
});
```

## Supported APIs

### .authorize(values,callback)
  Authorizes the Baelor client. You must call this before you call most APIs, unless you provide an `api_key` on init.
  
  * `values` is an object containing values that are required by the API
    * `api_key` (required) is your Baelor API key. You would acquire this calling .userCreate()
  * `callback` is called when the request completes, it returns `callback(error,user)`
    * `error` returns a [Baelor API error object](https://baelor.io/Docs#errors) or null
    * `user` if is authed successfully, will return the user object (it will also save the `api_key` to the Baelor client)

### .userCreate(values,callback)
  Creates a new API user.
  
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
    * `error` if error occurs, returns a [Baelor API error object](https://baelor.io/Docs#errors) or null
    * `user` if is authed successfully, returns the user object