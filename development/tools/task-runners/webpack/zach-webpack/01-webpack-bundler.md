# Intro to Webpack Bundler Development Tool

## What is [Webpack](https://webpack.js.org/)
A build tool that follows import rules in your code to bundle files

[Compare Webpack to other bundlers](https://webpack.js.org/guides/comparison/)

### Supports different kinds of bundling

* JavaScript - We'll focus on this now
* HTML
* CSS
* Image Assets

### Getting started with Webpack
* Created after Grunt and Gulp
* Not a task runner, but a bundler
    - What is the difference?
        + A task runner does not determine what it can do it is determined by what plugs into it
**note** Webpack is an opinionated piece of software that focuses specifically on bundlinga

* Supports CommonJS, ES6 Modules and AMD (Grunt and Gulp do not). How we require files. Webpack can call files as needed rather than loading them all via a configuration file either manually or into our HTML files as we did in the past
* `webpack.config.js` (_name of Webpack config file_)
    - Like grunt and gulp, Webpack does run off a centralized configuration file
* Webpack versions - now in version 2

