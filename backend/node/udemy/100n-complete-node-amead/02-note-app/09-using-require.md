# Using Require
## Modules
* Inside node
* `modules` are units of functionality
* `app.js` in root of project
    - This is the initialization file for our app
+ `console.log()` is available globally and we can just use it
  * Other modules will require us to "load" them into our projects in order to be able to use them

[nodejs.org/api](https://nodejs.org/api/)

* This is where you get all the stuff built into Node
* OS module
    - Let us fetch things like the `username` for the currently logged in user

## FileSystem module
* [docs](https://nodejs.org/api/fs.html)
* Will enable us to access the file systems Operating System (OS)
  - We'll be able to:
    + Read
    + Write
    + append files
      + We'll use `fs.appendFile()`
    - Determine if a given directory exists
* And lots of other `utilities` related to the file system
* You will see a lot of `fs.` + other stuff

### fs.writeFile()
* [docs](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
* This will allow us to write some data to a file on our file system from the Node JS application
  - There are 2 versions of this
    + fs.writeFile()
      * asynchronous version
    + fs.writeFileSync() - (We'll focus on this first)
      * synchronous version
      * [docs](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

### fs.writeFileSync()
* Takes in 2 arguments
  1. The name of the file you want to write to
  2. The data you want to write

`app.js`

```
fs.writeFileSync('simple-notes.txt', 'This file was created by Node.js');
```

* Run it

`$ node app.js`

* You'll get an error because you need to require `fs`
* You just need to require `fs` at the top of your file
* **note** You do not need to import this npm module it is built into Node Js but it must be required in your file or you will get the error we say stating:

```
ReferenceError: fs is not defined
```

## require
* Available to you in any node files
* You don't need to call it
* Just pass in one string to `require`

`const fs = require('fs');`

* Says "Get all the files in the `fs` module and store them inside the fs variable"
  - Let's break down the code line above:
    1. We are calling `require` which is going to load in the `fs` module
    2. The `fs` module is built right into Node so this will work for any Node script
    3. We take the `return` value and store it on the `fs` variable

```
const fs = require('fs');
fs.writeFileSync('simple-notes.txt', 'This file was created by Node.js');
```

* Then we call `fs.writeFileSync()` pass our 2 arguments (the file we want to create and what content we want to place inside the newly created file

## Run file
`$ node app.js`

* You will see no feedback from the Terminal

## But we have a new file!
* But if you look at your site you will see that you created a new file `simple-notes.txt` and it has the content you specified in the 2nd argument inside it
* Change the text in your 2nd argument and run again and you'll see your old text is replaced with your new text

## How can we determine what we need to load in
* Scroll to bottom of File System and you will see how to use the module
* It will show you how to require `fs` and how to use it
* **note** You don't have to name the variable `fs` but it is a common name to use and it is recommended to use it

## Challenge - Append a message to the text file we just created
1. Use `appendFileSync()` to append to the file
2. Run the script
3. Check your work by opening the file and viewing that your text was in fact appended to the text file

```
const fs = require('fs');
// fs.writeFileSync('simple-notes.txt', 'Hello again');
fs.appendFileSync('simple-notes.txt', 'I just called to say hello again');
```

* Run code

`$ node app.js`

* Output

`simple-notes.txt`

```
Hello againI just called to say hello again
```

* **tip** Add a space at the beginning of the string you are appending
