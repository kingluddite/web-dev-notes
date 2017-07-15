# JavaScript Aside
## ES6 Typed Arrays
* We said JavaScript didn't have good ways to deal with binary data
* ES6 is helping improve on this missing ability
* The latest version of the V8 JavaScript Engine does have a way to deal with binary data and that is through ES6 typed arrays

## A byte
* Is 8 bits
* A byte is 0s and 1s
* A byte is 8 0s and 1s
* Example:
    - 00101100

```js
// 8 bytes * 8 = 64 bytes of data
const buffer = new ArrayBuffer(8);
```

* This is not coming from Node
* This is a new feature in ES6 JavaScript

## Dealing with data using `views`
* `views` are a typed array
    - Meaning it is an array and I can deal with it as an array
    - But it really is just a way for me to deal with the binary data in the buffer

```js
// 8 bytes * 8 = 64 bytes of data
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
```

* Int32Array()
    - A number (integer) stored with 32 bits
        + `32` 0s and 1s
        + So since we are using 8 bytes for our buffer (64bits)
            * And we'll use 32 numbers to store 1 number

```js
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
view[0] = 5;
view[1] = 15;
console.log(view);
```

`Int32Array [ 5, 15 ]`

* The 0 position holds a 5
* The 1 position holds a 15

* But what is really happening is the 5 is being converted into 32 bits and 32 bits for the 15 and because the array buffer only holds 2 bytes so all I can do is store that
* But if I try to store more than 2 bytes I get this:

```js
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
view[0] = 5;
view[1] = 15;
view[2] = 22;
console.log(view);
```

* I will get the same output as before because the buffer can't hold anymore

`Int32Array [ 5, 15 ]`

## Takeaway
* The view is enabling me to work with binary data in an easier way
* Currently Node doesn't use this and it uses the Buffer that is internal on the C++ side of Node
* The Buffer was created because JavaScript couldn't deal with binary data
* But now JavaScript can deal with binary data and this will eventually work its way into Node
