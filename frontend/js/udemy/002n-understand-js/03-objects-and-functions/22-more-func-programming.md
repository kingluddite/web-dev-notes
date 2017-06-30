# Functional Programming - Part 2
## underscore.js Library
[Link to site](http://underscorejs.org/)

* Famous JavaScript Library
* Helps you work with arrays, collections and objects
* It also made an effort to show how it implemented what it did
    - "Open Source Education"
    - Massive amounts of JavaScript open source code
    - Their documentation is excellent
    - You can read the source code of these libraries and learn things for free
    - The challenge is understanding advanced concepts
    - Write good javascript, learn from good JavaScript by being able to read good JavaScript
* You can download the development source with comments
* Or you can read the [annotated source](http://underscorejs.org/docs/underscore.html)
* Underscore.js implements a lot of functional programming concepts
    - They are almose always passing a function (they call it an iteratee or a predicate)

## lodash
[lodash website](https://lodash.com/)

* Works very much the same on the outside as underscore
* Some people prefer lodash over underscore
* underscore was first and lodash came later
* lodash recently made their code perform better and faster

## Practice with underscore.js
Download the underscore library

* Clone this [repo](https://github.com/kingluddite/peh2-js-es6-babel-boilerplate)

`/src/assets/scripts/App.js`

```js
import _ from 'underscore';
```

* Run `$ yarn install`
* Then `$ yarn scripts`
* Then `$ gulp watch`
* Open `src/temp/scripts/App.js`
* Do a file search for `underscore`

![underscore code](https://i.imgur.com/mc8DFiC.png)

* You will see it starts off with an IIFE function
* This ensures all the code inside underscore won't collide with the code you write
* This will include underscore before our custom code
* The Global Object we will use for underscore is the actual underscore `_`
    - `_` is the name of the object
    - `_` is a valid name in JavaScript
    - note: if you use an editor like VS you can open the file and once you type `_` you will get a dropdown of all the available properties and methods inside the underscore library

## Let's user underscore to replicate the map we used before 
```js
import _ from 'underscore';

const arr1 = [1, 2, 3];
const arr6 = _.map(arr1, item => item * 3);
console.log(arr6);
```

* Underscore's map is better the the `map()` we wrote because it covers way more scenarios
* Run `$ gulp scripts` and `$ gulp watch`
* View the console and you'll see 3,6,9

## Use underscore to scan an array of numbers and only return numbers that are divisible by 2 (even numbers)

```js
var arr7 = _.filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], function(item) {
  return item % 2 === 0;
});
console.log(arr7); // [0, 2, 4, 6, 8]
```

* We filter out items from one list and create a sublist
* Study underscore's source code and you will learn a lot
