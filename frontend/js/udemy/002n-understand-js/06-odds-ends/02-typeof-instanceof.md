# `typeof`, `instanceof` and figuring out what something is
## You have a variable and you want to know what type it is programmatically

## JavaScript has utilities baked in to help with that
* But they are not perfect

## typeof
* Obvious
* Tells you what type of object you are looking at

## Checking for Number primitives

```js
const a = 3;
console.log(typeof a);
```

* Will return `number`
* Note that it is not capitalized
* Capital letters designate that we are working with a function constructor and we generally want to avoid using capital letters unless we intentionally are using them
* `typeof` is an **operator** and it returns a `string`
    - In this case it returns the string `number`

## Checking for String primitives
```js
const b = 'Hello';
console.log(typeof b);
```

* Will return the string `string`

## Checking for Objects
```js
const c = {};
console.log(typeof c);
```

* Will return the string `object`

## Arrays are a bit strange
* Arrays are objects

```js
const d = []
console.log(typeof d); // strange behavior!
```

* I know it is an array but it tells me it is an object
* That is not helpful
* There are a couple ways around this:
    - One way it to use the prototype concept and the `call()` concept
* I could try this:

```js
const d = []
console.log(d.toString);
```

* But that isn't helpful because it will just give me back an empty string
    - Because it tries to take the contents of the array and convert it to a string
    - But on the base object there is a `toString` property on its function constructor's prototype (which is the base object called Object) but if I use `.call()` to invoke this function but I tell it what the `this` variable should point to, and if I pass it the array I am looking at, it will return to me `[object Array]`

## new Objects
```js
function Person(name) {
  this.name = name;
}

const e = new Person('Jane');
console.log(typeof e);
console.log(e instanceof Person);
```

* That will return the string `object` which is expected

## instanceof
Tells me if any objects down the prototype chain, anywhere down the entire chain, proto to proto to proto, that I find this type of object `Person`, if I do, than the first parameter is an instance of the last parameter

`e instanceof Person`

* If we can find an instance of Person we return `true`
* If not we return false

## Check for undefined
```js
console.log(typeof undefined); // makes sense
```

## Check for null
* This has always been a bug
* So many libraries depend on it they never fixed it

```js
console.log(typeof null); // a big since, like, forever...
```

It returns the string of `object`

## Check for function
```js
const z = function() {};
console.log(typeof z);
```

* Will return the string `function`
* I can check the type of a variable to see if it is a function because functions in JavaScript are objects
    - Since it is a first class function (that is really an object)
    - I can also see if a variable is a function
