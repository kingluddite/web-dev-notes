# Add Development workflow script
`package.json`

```json
// more code
"scripts": {
  "start": "node ./bin/www",
  "build": "del public/js/app && webpack --config webpack.config.dev.js --progress --profile --watch"
},
// more code
```

## `npm run build`
* `del public/js/app`
    - We first delete all files in this folder to get rid of all old bundled files
    - `&&` combines commands
    - We run the dev webpack config file `webpack.config.dev.js`
    - We --progress and --profile make our output and errors look nice
    - We add --watch so that we continue to watch for any changes to recompile

## Test
`$ npm run build`
