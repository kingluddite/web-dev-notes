# Streams
* A sequence of pieces of data
    - Data that is broken up into `chunks`

## Chunk
* A piece of data being sent through a stream
* Data is split into `chunks` and streamed
    - We take our data, split it into chunks of some particular size and send them down the `pipeline` between whatever two points of communication we're trying to send the data between
    - Developers often use the variable `chunk` in code that deals with streams

## Take a peak at stream.js inside NodeJS core
`node/lib/stream.js`

* It first exports the `Stream` constructor

`const Stream = module.exports`

* There is an `EventEmitter` and `Stream` inherits from `EventEmitter`

```js
const EE = require('events');
const util = require('util');

function Stream() {
  EE.call(this);
}
util.inherits(Stream, EE);
```

* Streams are EventEmitters
    - Many events in node are built on top of the EventEmitter

## There are different types of Streams

```js
Stream.Readable = require('_stream_readable');
Stream.Writable = require('_stream_writable');
Stream.Duplex = require('_stream_duplex');
Stream.Transform = require('_stream_transform');
Stream.PassThrough = require('_stream_passthrough');
```

* Duplex lets you read and write
* Let's you change the data as it moves through the stream 

## Let's look at one type of stream
`/node/lib/_stream_readable.js`

* This Readable constructor inherits from Stream
    - So readable is a type of Stream and also a type of EventEmitter

`util.inherits(Readable, Stream);`

## Streams are a base/abstract class
### Abstract (Base) class
* A type of constructor you never work directly with, but inherit from
* We create new custom objects which inherit from the abstract base class
* In other words when we create new objects of this type we never say directly "give me a new Stream", we always build some custom version of it, inherit from it and then we make objects from that
    - Streams don't implement certain methods that are needed in order to actually use them
    - They implement the `base` of the idea of a Stream and then it is up to us to decide how we are actually dealing with reading and writing information
        + This is very powerful to build our own Streams if we want
        + But there are plenty of 3rd party Streams out there including within the NodeJS core itself

![diagram of proto chain of streams](https://i.imgur.com/meKosqY.png)

## Writable and Readable Streams
* It is important to note that this is writable and readable from Node's perspective

### In Client/Server relationship
![diagram client server Streams](https://i.imgur.com/uqPujV0.png)
* Request is readable
* Response is writable

## fs.createReadStream()
```js
fs.createReadStream = function(path, options) {
  return new ReadStream(path, options);
};

util.inherits(ReadStream, Readable);
```

* Takes a path and an options object
* It returns a new ReadStream which inherits from Readable
    - So ReadStream inherits from Readable
        + Readable inherits from Stream
            * Stream inherits from EventEmitter

## Generate large text file
`$ touch lots-of-text.txt`

[lorem ipsum](http://www.lipsum.com/)

* Create a text file that is 62000 bytes
* Copy and paste the text into `lots-of-text.txt`

![62000 bytes](https://i.imgur.com/6Ci1xWR.png)

* Kilobyte is `1024` bytes
    - A byte is 8 bits
* We need a file big enough to work with streaming

![62 bytes](https://i.imgur.com/YrE3y8h.png)

`app.js`

```js
const fs = require('fs');

const readable = fs.createReadStream(__dirname + '/lots-of-text.txt');

// use prototype chain to use .on of EventEmitter
// data is an event that is emitted by the event stream
readable.on('data', function(chunk) {
  console.log(chunk);
});
```

* The output
    - We get 1 Buffer
    - The default for text is 64kb so it all fits into 1 buffer
    - But if you copy and paste the same text to double up the file size of your text file, and run `$ node app.js` again, you'll see two buffers

![two buffers](https://i.imgur.com/LPIzyJW.png)

* What happens
    - The Stream will fill a buffer
        + It will begin to read the file and fill up the buffer with the contents
        + If the contents or same size or smaller than the buffer then you'll just get all the data
        + But if the text size is bigger than the buffer size you get chunks (pieces of the text file) at a time
        + It will read some of the file fill the buffer, emit the data event, run all the listeners then rinse and repeat until the entire file is read
        + Every time it emits the event and runs the listeners it will pass the data that was in the buffer to the listener

## How do I get strings instead of buffers?
* Use options parameter and set our `character encoding` to determine what every character should be

```js
const fs = require('fs');

const readable = fs.createReadStream(__dirname + '/lots-of-text.txt', { encoding: 'utf8' });

// use prototype chain to use .on of EventEmitter
// data is an event that is emitted by the event stream
readable.on('data', function(chunk) {
  console.log(chunk);
});
```

* Run again `$ node app.js`
    - You will get all the text returned

## Determine the string length
```js
// more code
readable.on('data', function(chunk) {
  console.log(chunk.length);
});
```

* Output

```
65536
58854
```

## highWaterMark
* The number of bytes we want our buffer to be
* 1024 is a byte and we want 32kb so we `(1024 * 32)`

```js
// more code
const readable = fs.createReadStream(__dirname + '/lots-of-text.txt', { encoding: 'utf8',
  highWaterMark: 32 * 1024
});
// more code
```

* Run `$ node app.js`

```
32768
32768
32768
26086
```

### Create a writable stream
`$ touch lots-of-text-copy.txt`

`app.js`

```js
// more code
const writable = fs.createWriteStream(__dirname + '/lots-of-text-copy.txt');

// use prototype chain to use .on of EventEmitter
// data is an event that is emitted by the event stream
readable.on('data', function(chunk) {
  console.log(chunk.length);
  writable.write('YOOOOOOO!' + chunk);
});
```

* Now you write each chunk to copy of file
* I add `Yooooo!` so you can see it was called 4 times

## Next
There is even a faster and better way to do what we just did in Node

