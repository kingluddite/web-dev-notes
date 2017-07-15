# Files and fs
* Let's checkout a concrete example
* libuv, buffers, callback

`greet.txt`

```
Yo, what's up?
```

* `readFileSync(path, options)`
* `__dirname`
    - This is one of the parameters passed to me when this code is wrapped in that function and it gives me the path to the directory that the code I'm running lives in

`const greet = fs.readFileSync(__dirname + '/greet.txt');`

* This will be the full path on my hard drive to `greet.txt`
* We can also specify the encoding but not necessary since the default is `utf8`

`const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');`

1. It looks at the file
2. It reads the binary data
3. Then it uses the encoding to determine what those 0s and 1s mean
    * What do they ultimately map to as characters
    * This wraps in the concept of Buffers

`node/lib/fs.js/`

![readSync](https://i.imgur.com/Aq9O4sk.png)

* Node when readSync is called it is given a buffer
* It loads the contents of the file into the buffer
    - It needs to because the buffer can deal with binary data
    - When my file is read it loads the contents of the file into the buffer first and then uses the encoding to get the string back
    - So now
        + I can use my variable which now has the string
        + The file is read off of my hard drive
        + It used the proper encoding to get me back the proper characters from the binary data
        + And then I can output it

```js
// grab the built-in fs module
// fs.js on the node side of JavaScript core
// and fs.js deals with the file system
// that wraps up with the C++ system that allows me to get lower level
// and deal directly with files
const fs = require('fs');

const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);
```

* Will output it:

`Yo, what's up?`

## Notice the `Sync` in readFileSync
* Node is letting us know very clearly that this is a synchronous method when reading the file
    - This means when this line of code is executed by the JavaScript Engine

`const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);`

* It will wait until the buffer is filled and it has the string back before the V8 JavaScript Engine moves on to the next line
* This can be useful
    - Maybe you have a configuration file that you need to load up before the rest of your code runs
    - That is a valid reason to wait before the code moves on
    - But in most cases you don't want this to be synchronous because you might have many people requesting information from your Node Application and if you have many simultaneous users they'll all end up **blocked** because JavaScript is synchronous even though Node is asynchronous
        + But telling JavaScript to run this syncrhonously means that JavaScript will run this line by line means others using same code will end up waiting a long time because all those users are waiting for the file to be read
            * It the file is large and our buffer is large it could end up taking a very long time relatively in computer terms
            * So you Application could slow down the more people that request this code to be run because every time it runs it stops and waits for the long process to finish

## So to counter this I can just use `readFile`
* In node's `fs.js` the `readFile` takes a callback
* Then it goes off and says "C++, go do your thing"
* libuv will ask the OS to do the work and then when the event is complete (when it has finished reading the file), it will run the JavaScript code in the callback function
    - This is the event loop
    - It might take a long time for this file to be read and that's OK because the JavaScript code will keep running and the event loop will keep checking and when the file is finished reading and I have my string, it will say you can now run this callback
    - and as soon as the JavaScript Engine is finished running whatever code it is running it will invoke this function
    - And when it invokes this function, if there is an error, it will pass it as the first parameter and if there if no error `err` will be null
        + This is a popular pattern in node called **error first callbacks**

## Error-First Callback
* callbacks take an error object as their first parameter
    - `null` if no error, otherwise will contain an object defining the error
    - This is a standard so we know in what order to place our parameters for our callbacks
    - This may show up in a technical question in an interview for a job
        + It sounds really complicated but it isn't
        + It just means by default/by standard if you give me a function for a callback the first parameter I will pass you is an error and if there was no error, I'll just give you a null in that first parameter
        + This helps because maybe you have different orders of parameters but you can always rely on the fact that the first parameter is an error and that helps me in structuring my functions

```js
const fs = require('fs');

const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);

// this is an asynchronous
const greet2 = fs.readFile(__dirname + '/greet.txt', function(err, data) {
  console.log(data);
});
```

* Now I get back a buffer from greet2
* It is loading binary data so it gave me a buffer filled with binary data, a buffer filled with the contents of that text file
* I could convert this using `buffer.toString()`
* Or I could add a parameter of the encoding that I'm expecting this to be

```js
const greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
  console.log(data);
});
```

* Now I get back `Yo, what's up`
* But in this case, it was asynchronous

![func delay](https://i.imgur.com/oFr77VE.png)

* Our function above ran only after the V8 JavaScript Engine was complete with it's event loop
* We can prove this with:

```js
const fs = require('fs');

const greet = fs.readFileSync(__dirname + '/greet.txt', 'utf8');
console.log(greet);

// this is an asynchronous
const greet2 = fs.readFile(__dirname + '/greet.txt', 'utf8', function(err, data) {
  console.log(data);
});

console.log('done!');
```

* And our output shows the `done` line before our callback

```
Yo, what's up?

done!
Yo, what's up?
```

* Try to use async code anytime you can because it will make you application code perform better

## We have a slight problem
* We are using a buffer to load the file contents
* The buffer is just data sitting in memory
* It sits on what's called **the heap** in V8
    - So it's just a spot where the data sits in memory
    - If that file is large and many people are running this program you'll end up with many buffers large in size and then you'll have problems in your application using a lot of memory
    - This is a huge problem and it could cause you lots of grief

## Next - Find a way to minimize the data we are using inside the buffer 





