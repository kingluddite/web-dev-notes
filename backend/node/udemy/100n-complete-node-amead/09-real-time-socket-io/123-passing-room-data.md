# Passing room data
* Fill the form out and hit submit
* The answers are passing to the chat.html in the URL

## location
* Object that has tons of info inside it
* We'll use `window.location.search`
    - Has the query string
    - It is a string but we need to parse it to get the data
    - We'll use a library to do this

```
> window.location.search
```

* output: `"?name=sdf&room=asdfd"`

## jQuery can help us
`chat.js`

* `console.log(jQuery.param({ name: 'Joe', age: 22 }));`
    - `name=Joe&`
* That matches our query string
    - We just need to add the `?`
* But jquery can't take that string and convert it into an object
* We also have to decode things like spaces (+)

## Deparam (I used the npm module)
* This won't work until you scroll down and install:

`$ yarn add jquery-deparam`

* Instead of adding a bunch of script tags in the html I used npm modules and tried to incorporate them into webpack to create `bundle.js`
* I got it working but I experienced a ton of problems

`/public/js/libs/deparam.js`

```js
/**
 * jQuery.deparam - The oposite of jQuery param. Creates an object of query string parameters.
 *
 * Credits for the idea and Regex:
 * http://stevenbenner.com/2010/03/javascript-regex-trick-parse-a-query-string-into-an-object/
*/
(function($){
  $.deparam = $.deparam || function(uri){
    if(uri === undefined){
      uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
      new RegExp(
        "([^?=&]+)(=([^&#]*))?", "g"),
        function($0, $1, $2, $3) {
            queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
        }
      );
      return queryString;
    };
})(jQuery);
```

* `param` takes your object and returns a string
* `deparam` takes the string and returns an object
* Try this in the console

`> jQuery.deparam`

* You will see the function
* Now we pass our search string into that function

`> jQuery.deparam(window.location.search)`

* Will output `{name: "sdf", room: "asdfd"}`

## Add chat
```js
socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, err => {
    if (err) {
    } else {
    }
  });
});
```

### Setup listener
`server.js`

`socket.on('join', (params, callback) => {});`

* We need to make sure we validate data entered so it is not an empty string

`/server/utils/validation.js`

```js
const isRealString = str => {
  return typeof str === 'string' && str.trim().length > 0;
};

const getPathFromUrl = url => {
  return url.split('?')[1];
};

module.exports = { isRealString, getPathFromUrl };
```

* Now we use that function
* We require it up top

`server.js`

```js
// // MORE CODE
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');

// MORE CODE
socket.on('join', (params, callback) => {
  if (!isRealString(params.name) || !isRealString(room)) {
    callback('Name and room name are required');
  }

  callback();
});
// MORE CODE
```

* If we get an error generate an error and then redirect user back to home page

```js
import io from 'socket.io-client';
import jQuery from 'jquery';
import deparam from 'jquery-deparam'; // add this
import moment from 'moment';
import Mustache from 'mustache';

const { getPathFromUrl } = require('./../server/utils/validation'); // add this
```

* I added the getPathFromUrl because the deparam was not stripping out the `$` so this function manually strips out the `$` from the query string

`chat.js`

```js
socket.on('connect', () => {
  const noDollar = getPathFromUrl(window.location.search);
  const params = jQuery.deparam(noDollar);
  socket.emit('join', params, err => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});
```

* I removed all `script` tags from `index.html`
* I added `/bundle.js` because that brought the css with webpack
* Now I'll manually add a styles tag (there must be a better way to do this but for now it is a quick fix

`/public/styles/styles.css`

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  font-weight: 300;
  font-size: .95rem;
}

button {
  border: none;
  background: #265f82;
  color: white;
  cursor: pointer;
  padding: 10px;
  transition: background .3s ease;
}

button:hover {
  border: none;
  background: #1F4C69;
  color: white;
  padding: 10px;
}

button:disabled {
  cursor: default;
  background: #698ea5;
}

.centered-form {
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  background: -moz-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ff3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(49,84,129,1)), color-stop(100%, rgba(39,107,130,1))); /* safari4+,chrome */
  background: -webkit-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(125deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* ie10+ */
  background: linear-gradient(325deg, rgba(39,107,130,1) 0%, rgba(49,84,129,1) 100%); /* w3c */
}

.centered-form__form {
  background: rgba(250, 250, 250, 0.9);
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  padding: 0px 20px;
  margin: 20px;
  width: 230px;
}

.form-field {
  margin: 20px 0;
}

.form-field > * {
  width: 100%;
}

.form-field label {
  display: block;
  margin-bottom: 7px;
}

.form-field input, .form-field select {
  border: 1px solid #e1e1e1;
  padding: 10px;
}
```

`index.html`

```html
>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
  <title>Join | ChatApp</title>
  <link rel="stylesheet" href="/styles/styles.css">
</head>
<!-- MORE CODE -->
```

## Challenge
* Write tests for the validation scripts
  - Import both functions
  - isRealString
  - should reject non-string values
  - should reject string with only spaces
  - should allow string with non-space characters
* getPathFromUrl
  - You want to test to make sure it strips out the `$`
  
`validation.test.js`

```js
const expect = require('expect');

// import isRealString
const { isRealString, getPathFromUrl } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const res = isRealString(98);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const res = isRealString('     ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    const res = isRealString('   John   ');
    expect(res).toBe(true);
  });
});

describe('getPathFromUrl', () => {
  it('should strip out $', () => {
    const res = getPathFromUrl('?name=john');
    expect(res).toBe('name=john');
  });
});
```


