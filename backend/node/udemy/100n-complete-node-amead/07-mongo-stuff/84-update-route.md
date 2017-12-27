# Updating a resource PATCH /todos/:id
* Install lodash

`$ npm i --save lodash`

## Import lodash
`server.js`

```js
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
```
