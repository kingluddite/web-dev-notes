# Buffers
[buffer node documentation](https://nodejs.org/api/buffer.html)

* The buffer is created on the C++ side of Node core
    - And then made available to the JavaScript side
    - It stores binary data
        + It has lots of methods to deal with binary data
            * example
                - We can convert between buffers and strings - We can store strings as binary data in a buffer with a particular character encoding (like utf8)
                - We could also encode using base64
                    + This is sometimes used for encoding various things for security purposes
* Ultimately the `buffer` holds raw, binary data (0s and 1s) but it does let us figure out how to switch between those 0s and 1s and strings (assuming we are storing string information)
* Buffer is so integral to Node that they made it global so when we use it we don't even have to require it
* Buffers need to know a size for the buffer
    - Buffers are intended to be a particular finite size of memory
* You can specify the encoding (if you leave it off, utf8 is the default)

## Take a string and convert it to binary data

`app.js`

```js
var buff = new Buffer('hello', 'utf8');
console.log(buff);
```

* Run with `$ node app.js`
    - Outputs:

```
<Buffer 68 65 6c 6c 6f>
```

* This is an object and it contains 5 characters
* 5 pieces of binary data
    - It is outputting in hexadecimal notation
        + To make it shorter and easier to read

## Convert Binary data back to into a string
```js
var buff = new Buffer('hello', 'utf8');
console.log(buff);
console.log(buff.toString()); // hello
```

## We can even convert our buffer to JSON
```js
var buff = new Buffer('hello', 'utf8');
console.log(buff);
console.log(buff.toString());
console.log(buff.toJSON());
```

* Outputs

`{ type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }`

* Notice the array of 5 numbers
    - That is unicode character set
    - It was converted to base 10 instead of pure binary

## Takeaway
* The buffer contains raw binary data
* Buffers are supposed to be a finite piece of data that things will be coming in and leaving
* I can pull that out and convert it to other formats
* The buffer reacts like an array so I can grab pieces of it like this:

```js
var buff = new Buffer('hello', 'utf8');
console.log(buff[2]); // 108
```

## I can write data to the buffer
```js
var buff = new Buffer('hello', 'utf8');
buff.write('Zo');
console.log(buff.toString()); // Zollo
```

* The `Zo` overwrote the `he` in **hello**
* Since buffers are finite pieces of data we won't expand the data but just overwrite existing memory space

## Practical Buffering
* In reality you may not have to deal with buffers directly
* Most of the times buffers are coming back from some utility or some other object, some other feature within NodeJS
    - But it helps knowing what they are and the various things you can do with them since you will be getting them by other features within node
