# Time and Moment
* How time works inside node
* epoch (0 time)
* -1000 (1 second from past from unix epoch)
* always use milliseconds
* timestamp is easy
    - `new Date().getTime()`

## Hardpart with time in JavaScript
* Formatting it to be human readable
    - 5 minutes ago
    - actual date
    - human readable
    - [date documentation MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

```js
// Jan 1st 1970 00:00:00 am

const date = new Date(); // 2018-01-04T21:21:13.469Z
console.log(date.getMonth()); // 0
```

* December == 11
* January == 0
* February == 1
* To actually get the string month like "Jan" you would have to create an array with string names and write code to match the getMonth to that array
* Day of the month is easy but adding cardinal numbers like 1st, or 3rd is a lot harder
* 3 minutes ago or 3 hours ago is not easy to code
* We could write utility methods to work with time but moment is a great, free library that does all of the above and more for us

# Moment
* [documentation](http://momentjs.com/docs/)
* [display moment](http://momentjs.com/docs/#/displaying/)

## Install Moment

`$ yarn add moment `

```js
const moment = require('moment');

const date = moment();
console.log(date.format()); // 2018-01-04T13:30:19-08:00
```

* Not much of a help yet
* But check this out when we pass it a string

```js
const date = moment();
console.log(date.format('MMM')); // Jan 
```

* Month
* How about month and year?

```js
const date = moment();
console.log(date.format('MMM YYYY')); // Jan 2018
```

* Add cardinal numbers

```js
const date = moment();
console.log(date.format('MMM Do, YYYY')); // Jan 4th, 2018
```

* Manipulate time with MomentJS
* [momentjs time manipulation docs](http://momentjs.com/docs/#/manipulating/)
    - Add 1 year to the current date
```js
const date = moment();
date.add(1, 'year');
console.log(date.format('MMM Do, YYYY')); // Jan 2019
```

* Add 100 years and subtract 9 months

```js
const date = moment();
date.add(100, 'year').substract(9, 'months');
console.log(date.format('MMM Do, YYYY')); // Jan 2019
```

```js
const date = moment();
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY')); // Apr 4th 2117
```

## Challenge
* format `10:35 am`

### Solution
```js
const date = moment();
console.log(date.format('h:mm a')); // 1:51 pm 
```
