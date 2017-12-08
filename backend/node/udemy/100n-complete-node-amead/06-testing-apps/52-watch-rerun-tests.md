# Watch and rerun tests
* nodemon will help us with this
* We can specify any command in the world we want to run when our app changes
* `nodemon --exec`
    - This flag tells nodemon that we are going to specify a command to run and it may not necessarily be a node file

`$ nodemon --exec 'npm test'`

* Now if you change you code, the test will rerun

## Add script for watch scripting to package.json

`package.json`

```json
"scripts": {
    "test": "mocha **/*.test.js",
    "test-watch": "nodemon --exec \"npm test\""
}
```

* Run it with `$ npm test-watch`
