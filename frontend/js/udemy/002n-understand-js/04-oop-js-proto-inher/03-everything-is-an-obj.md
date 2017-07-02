# Everything is an object
(_or a primitive_)

* All objects in JavaScript have a prototype
    - Except for one thing
        + The base object in JavaScript
        + It is just called Object {}
            * It is the very bottom of the prototype chain always
            * Everything eventually leads to the base object

```js
const a = {};
const b = function() { };
const c = [];
```

## In Chrome console
`> a.__proto__`

Returns

`< Object {}`

## What properties and methods are on base object
Lots

![list of base object props and methods](https://i.imgur.com/fVOay9B.png)

* Some examples
    - toString - all objects have access to `toString`

## What about function?
`> b.__proto__` has an empty `function object`

Returns

`function () { [native code] }`

* That is the prototype of all functions
* There are methods on it like:

![function base methods and props](https://i.imgur.com/ZrOCdmb.png)

* Examples
    - apply()
    - call()
    - bind()
    - We learned that all functions get access to those methods
        + This is why
        + All functions in JavaScript are automatically have their prototype property set to this built-in object that has these methods on it (apply, bind, call...)
        + I have access to these methods because it is on the protype of a function object
            * When I call `apply()` it looks for it on my function and when it can't find it it goes up the prototype chain

## Arrays
`> c.__proto__` - returns an empty array

![array prototype props and methods](https://i.imgur.com/FeAz3iX.png)

* Examples
    - indexOf
    - length
    - push
        + So all arrays in JavaScript I can do `.push()`
        + It looks on my object, doesn't find it, goes up the prototype chain and finds it
        + That's why we automatically have access to it because the JavaScript Engine set it for us

## What is the prototype of the prototype?
`> c.__proto__.__proto__`

* Returns Object {}

`> c.__proto__.__proto__.__proto` --> null

* If I create my own simple object, it's prototype is Object {}
* `a.__proto__`
