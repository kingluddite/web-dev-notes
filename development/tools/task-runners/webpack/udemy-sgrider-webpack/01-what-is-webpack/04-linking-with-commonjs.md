# Linking with CommonJS
![common js diagram](https://i.imgur.com/chPPL8j.png)

* Traditionally
    - **imports** go at the top of a file
    - **exports** go at the bottom of a file

`src/sum.js`

```
const sum = (a, b) => a + b;

module.exports = sum;
```

`index.js`

```
const sum = require('./sum');
```

`./` - Look in the current directory (_this is a relative file reference_)

`index.js`

```
const sum = require('./sum');
const total = sum(100, 500);
console.log(total);
```
