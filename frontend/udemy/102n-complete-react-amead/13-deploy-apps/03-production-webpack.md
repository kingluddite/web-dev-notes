# Production Webpack
* Currently --- zero optimization
* `$ yarn run build` (note total size of bundle)
    - Mine is almost 6MB
    - That is horrible
    - Most is source maps
* We will try to get as much as possible outside of bundle.js and into other files that can optionally load

## How can we run Webpack in production mode?
* [guides - big picture stuff](https://webpack.js.org/guides/)
* [production docs](https://webpack.js.org/guides/production/)

## webpack -p
`package.json`

```
// // MORE CODE
"build:dev": "webpack --watch",
"build:prod": "webpack -p",
// // MORE CODE
```

`$ yarn run build:prod`

* This will shave off approx 1mb


