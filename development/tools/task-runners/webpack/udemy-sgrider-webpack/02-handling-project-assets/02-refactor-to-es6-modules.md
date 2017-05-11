# Refactor
From CommonJS to ES6 modules

![diagram for conversion](https://i.imgur.com/F2jCTsq.png)

## `sum.js`

### Change this:

```
const sum = (a, b) => a + b;

module.exports = sum;
```

### To this:

```
const sum = (a, b) => a + b;

export default sum;
```

`index.js`

###Change this:

```
const sum = require('./sum');

const total = sum(100, 500);

console.log(total);
```

### To this:
```
import sum from './sum';

const total = sum(100, 500);

console.log(total);
```

`$ yarn build`

`$ open index.html`

* Console should show `600` like before
* `bundle.js` converts just like it did with **CommonJS**
* It should work exactly the same now

## Why the switch?
* **CommonJS** is the legacy system
* **ES6 modules** is the modern way of doing things

Good to know both but you will use **ES6 modules** for future projects
