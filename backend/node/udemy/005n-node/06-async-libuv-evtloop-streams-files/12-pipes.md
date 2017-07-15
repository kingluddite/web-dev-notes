# Pipes
* NodeJS implemented a method called `pipe` that is available on a readable stream

## What does pipe do?
`/node/lib/_stream_readable.js`

`Readable.prototype.pipe = function(dest, pipeOpts) {`

* This makes it available to all Readable streams
* It takes a destination parameter
    - Where do we want to send this chunk to
    - It should be a writable stream
        + src is a readable stream and dest is a writable stream

```js
// more code 
src.on('data', ondata);
function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
// more code
}
```

* This is where it reads `src` chunk and writes chunk to `destination`
* Later on we see that `dest` is returned

![return dest](https://i.imgur.com/9DbVfcv.png)

### Take it for a test drive
* Delete all text inside `lots-of-text-copy.txt`

`app.js`

```js
const fs = require('fs');

const readable = fs.createReadStream(__dirname + '/lots-of-text.txt');

const writable = fs.createWriteStream(__dirname + '/lots-of-text-copy.txt');

readable.pipe(writable);
```

* Run `$ node app.js`
    - Output is the file is written to `lots-of-text-copy.txt`
    - Same as before but easier and faster
    - It gets even better because the `pipe()` function returns the destination
    - If the new line is writable we can run pipe on the dest
    - And as long as the chunk is readable and writable I can pass the chunk through multiple streams

## zlib
* Part of Node core
* This allows us to implement a gzip
    - gzip is just a compressed file
* A very common algorithm for compressing files
* Node has a built in component to compress and uncompress files
* Empty copy text file, let's rename it as the name was way too long `latin-copy-txt`

```js
const fs = require('fs');
const zlib = require('zlib');

const readable = fs.createReadStream(__dirname + '/latin.txt');

const writable = fs.createWriteStream(__dirname + '/latin-copy.txt');

const compress = fs.createWriteStream(__dirname + '/latin.txt.g');

// this will create a transform stream
// means it is readable and writable
const gzip = zlib.createGzip();

readable.pipe(writable);

// here we are going from stream to stream to stream (chaining)
readable.pipe(gzip).pipe(compressed);
```

* Means it is readable and writable
* Every time a chunk is sent to it, it compresses that chunk
* I can also pipe it's output to another writable stream

## Method Chaining
* A method returns an object so we can keep calling more methods
* Sometimes it returns the parent object (called 'cascading') and sometimes some other object

`$ touch latin.txt.gz`

### File sizes are different
![file sizes](https://i.imgur.com/rmjtvPE.png)

* This is the node way of thinking about data
* Node likes it when we use streams because it enables Node to be performant 
* Try to use async methods and streams
    - If you choose sync or not to use streams that should be a conscious thought in your mind as a developer
