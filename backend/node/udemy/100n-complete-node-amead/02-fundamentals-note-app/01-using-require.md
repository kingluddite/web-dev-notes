# Using Require
## Modules
* Inside node
* modules are units of functionality
* app.js in root of project
    - This is the initialization file for our app

[nodejs.org/api](https://nodejs.org/api/)

* This is where you get all the stuff built into Node
* OS module
    - Let us fetch things like the username for the currently logged in user
* FileSystem module
    - We will create a file and append to it
    - Dive in and you'll see methods
    - We'll use fs.appendFile()
        + We'll pass it filename and data to append to file

## require
* available to you in any node files
* You don't need to call it
* Just pass in one string to require

`const fs = require('fs');`

* Says "Get all the files in the `fs` module and store them inside the fs variable"
* Run file
* `$ node app.js`
* You will get deprecation warning about calling async functions without a callback
* Fix with either

```js
// option one
fs.appendFile('greetings.txt', 'Yo', err => {
  if (err) {
    console.log('Unable to write to file');
  }
});

// option two
fs.appendFileSync('greetings.txt', 'Yo');
```

## New file!
* Running the code created a file and put `Yo` text inside it
* Everytime you run it, `Yo` will be appended to file

## Greet user using their OS
```js
console.log('starting app');

const fs = require('fs');
const os = require('os');

const user = os.userInfo();
console.log(user);
```

* Will output when you `$ node app.js` something like:

```
starting app
{ uid: 51965098,
  gid: 247736210,
  username: 'john',
  homedir: '/Users/doe',
  shell: '/bin/zsh' }
```

* Add name into our text file with:

```js
console.log('starting app');

const fs = require('fs');
const os = require('os');

const user = os.userInfo();

fs.appendFileSync('greetings.txt', `Hello ${user.username}`);
```


