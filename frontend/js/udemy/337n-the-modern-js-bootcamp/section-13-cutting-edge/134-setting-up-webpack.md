# Setting up Webpack
* [webpack docs](https://webpack.js.org/concepts/)

## Install webpack
`$ npm i webpack webpack-cli`

## web pack config file
* We need to set this up
* We run webpack with a script inside our `package.json`

`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public",
    "webpack": "webpack",
    "build": "babel src/index.js --out-file public/scripts/bundle.js --presets env --watch"
  },

// MORE CODE
```

* **note** We run webpack but it doesn't have any arguments like our build script
    - Webpack allows us to define a separate config file so we don't have to define a super long command inside `package.json`
        + Instead we can create a separate JavaScript file and we can set up an object that defines all the things like:
            * Where the code lives that we want to process
            * Where we want to save the processed code

## Create the webpack config file - `webpack.config.js`
* It needs to live in the root of your project
* And it's name needs to match up with `webpack.config.js`
    - This file is where we configure webpack and we specify the details of our project
    - The code we put in this file will eventually be processed via `Node JS`
    - We can take advantage of a couple Node features

### Let's create our configuration object
* We do that on:

```
module.exports = {

}
```

* `module.exports` is specific to Node JS
* This is how we can expose something from a given file
    - We will be "exposing" the configuration object
        + Inside of the object we'll provide our configuration details


### Basic webpack configuration
* We need to specify:

1. The input
2. The output

## The input (aka "entry") gets defined first
* The `entry` is where our code lives

`webpack.config.js`

```
module.exports = {
  entry: './src/index.js'
}
```

## Now we need to specify where we need to save the processed code
* We don't set output to a string but rather we set it equal to an object because we have lots of items to configure for this output
    - We'll just use `path` to point to where our output file resides

```
module.exports = {
  entry: './src/index.js',
  output: {
    path: '/public/scripts/bundle.js',
  },
};
```

## Houston we have a problem!
* Our path won't work because there is a catch!
    - What goes inside of the `path` value needs to be an `absolute path` (unlike `entry` which can be a **relative path**)
    - An absolute path needs to start from the root of our hard drive and navigate all the way to the correct location
    - This is the absolute path to this file on my computer

`/Users/me/Documents/dev/javascript-stuff/amead/udemy/337e-the-modern-js-bootcamp/babel-boilerplate/public/scripts`

* But that above path could easily change
    - If I move the app project folder somewhere else, everything breaks
    - If I share this config with this path with my team, the same path won't work on their local machines
    - This is a problem because an absolute path isn't flexible and it will break any time we share it with others or we move stuff around

## Solution: Provide an absolute path that is more flexible
* Node JS gives us a way to do this

### The Node global variable `__dirname`
* This variable provides the absolute path to the root of your project
* So this will give us this path:

`/Users/me/Documents/dev/javascript-stuff/amead/udemy/337e-the-modern-js-bootcamp/babel-boilerplate/`

* So we get the full path up to the root of our project
* Then we just add on `public/scripts` which is never going to change because it is part of the project structure
    - This part won't change if I move my project around or I share my project with my team

### We can't do this:
`wepback.config.js`

```
// MORE CODE

  output: {
    path: __dirname + '/public/scripts
  },

// MORE CODE
```

* The above won't work because of cross OS problems with paths
    - Windows, Linux and Macs have different systems for working with paths
* We need a universal way to get this done and Node JS gives us a few functions that allow us to get this done

## path
* Node JS gives us a whole utility library for working with paths
* We can combine 2 paths in a universal way
* `path` is just an object with a bunch of methods on it

```
const path = require('path'); // Add this line

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + 'public/scripts
  },
};
```

* `path.resolve`
    - Will allow us to combine our previous 2 pieces to come up with the final absolute path

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
  },
};
```

* **note** don't use this path:

`path: path.resolve(__dirname, 'public/scripts'),`

* If you do you'll get this annoying error:

![wrong path error](https://i.imgur.com/DLYSwO0.png)

* `Error: EROFS: read-only file system, mkdir '/public'`

## We have our absolute path!
* Now we have an absolute path that will work on all operating systems

## Run our new webpack script
`$ npm run webpack`

1. That will go inside `package.json`
2. It will run our `webpack` script

`package.json`

```
// MORE CODE

  "scripts": {

    // MORE CODE

    "webpack": "webpack",

    // MORE CODE
  },

// MORE CODE
```

3. When we run our `webpack` command it will grab our `webpack.config.js` file (because it is in the root of the project - and it has the specific name webpack is looking for)
4. It will then be able to access the configuration object inside `webpack.config.js` and run everything successfully

## Webpack gives us lots of info after it runs
* After Webpack runs it creates a new file by default `public/scripts/main.js`
  - We can configure (and we will) to be `bundle.js`

## Let's look at the output from webpack
* Hash
* Version
* Time (1/10th of a second - 62ms)
* Built date
* Assets created: main.js, the size of the asset
* Where main.js got its code from `./src/index.js `

### We do also get a configuration warning
* We'll address this in a moment

### Let's look at main.js
* This is the file webpack created for us
* Webpack has minifed the file for us
  - It is harder to read but makes our app faster 
  - This is the code we'll run from the browser to run our app
  - With this code we now have access to the "Modules System"

## Change name of file that is created
* We will change from the default `main.js` to `bundle.js`

`webpack.config.js`

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js',
  },
};
```

* Delete `bundle.js` and `main.js` and rerun `$ npm run webpack`
* Now you should have `public/scripts/bundle.js`
