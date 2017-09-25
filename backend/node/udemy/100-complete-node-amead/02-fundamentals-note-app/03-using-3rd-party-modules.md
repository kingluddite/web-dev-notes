# Using 3rd party modules
* `$ npm -v`
* `$ npm init`
    - Asks you a series of questions
    - `name` (no spaces or strange charcters)
    - can leave most at default value
    - Entry point should be `app.js`
    - Bypass all question with `npm init -y`
* Nothing magical about `package.json`
    - It is just a file
    - All 3rd party npm modules will be added here

## Install lodash
`$ npm i lodash -S`

* Search internet for `npm lodash`
* Click `lodash` link
* Click `Documentation` button to get to API
* Search for `_isString`
    - [isString](https://lodash.com/docs/4.17.4#isString)
    - It returns true if a string
    - It returns false if not a string

`app.js`

```js
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

console.log(_.isString(true));
console.log(_.isString('yo'));
```

* Outputs

```
false
true
```

* The first value is not a **string** but rather a **boolean**
* Search for `uniq`
* [uniq](https://lodash.com/docs/4.17.4#uniq)

```js
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

const filteredArray = _.uniq(['one', 1, 'two', 'one', 1, 2, 3, 4]);

console.log(filteredArray);
```

* Will output

```
[ 'one', 1, 'two', 2, 3, 4 ]
```

* You will see all duplicates removed

## npm install
* Delete `node_modules`
* Reinstall it with `$npm install`
* Add `node_modules` to your `.gitignore` file

