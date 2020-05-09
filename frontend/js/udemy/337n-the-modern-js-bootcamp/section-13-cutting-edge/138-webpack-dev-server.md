# Webpack Dev Server
* Let's improve our local development workflow

## Currently we develop our app this way
* Currently if we're working our app and changing our JavaScript files we have to manually switch over to the Terminal and re-run the build script in order to see our changes reflected
    - That is annoying
    - That slows us down

## We are going to improve our workflow
* So we never have to go into the terminal as we're developing our app
* We work in either VS code or the browser and the Terminal sits in the background (and we never need to touch it)
    - This will be similar to what we did with babel
    - We configured babel to watch our files for changes and rerun babel when any of the files changed
    - We are going to use the same technique for Webpack

## There are 2 solutions for getting this done
1. The 5 second solution (easier)
2. The 5 minute solution (more complex to set up but has some distinct advantages)

### The 5 second solution
`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server public",
    "build": "webpack --watch"
  },

// MORE CODE
```

* We just add a simple `--watch` onto our webpack build script

## What does the --watch flag do?
* This will run webpack like it did before but webpack will stay up and running
* It will watch any of the files that make up the bundle for changes
    - It will watch `index.js`
    - But also the files that `index.js` imports
        + greeting.js
        + utilities.js
* When any of those files change, it will cause webpack to generate a new `bundle.js`
    - This will cause live-server to refresh the browser

### Let's take --watch for a test drive
`$ npm run build`

* You will see `webpack is watching the files` in the Terminal
* **note** We are not brought back to the command line as webpack is "watching" for changes

`utilities.js`

```
console.log('utilities.js');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const cube = x => x * x * x; // adding this

const square = x => x * x;

export { add, subtract, cube, square as default }; // don't forget to update!
```

`index.js`

```
import square, { add, subtract, cube } from './utilities';
// import greeting from './greeting';

// console.log('index.js');
// console.log(add(1, 2));
// console.log(subtract(10, 5));
// console.log(greeting('Phil'));
// console.log(square(4));
console.log(cube(2)); // 8
```

* You make the changes above and you'll see `8` in the client console
* The great news is your dev workflow just sped up!

## Webpack Dev Server (the 5 minute solution)
* The Webpack Dev Server does everything we are doing but in one tool
* So instead of having to run `webpack` with the `--watch` flag and `live-server` in separate tabs...
    - Webpack Dev Server gives us a single process to do both

### Installing webpack dev server
* `ctrl` + `c` to shut down live-server

`$ npm i webpack-dev-server`

## Change our webpack.config.js file
* We need to tell webpack dev server where it can find the content it is supposed to serve up (much like we tell live-server to serve up the content in t a `public` directory)
    - `devServer`
        + `contentBase`
            * Needs to be an absolute path that lets the dev server know where the folder you're trying to serve up lives
            * With `live-server` it was that **public** directory
            * With `Webpack dev server` it will still be that `public` directory (the only difference is how we specify it)
                - We have to provide an absolute path (like we did above or the `output` path)

`webpack.config.js`

```
// MORE CODE

  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  }
};

// MORE CODE
```

### publicPath
* This is the next property we need to provide
* The value for public path is a string
* This is where we tell the devServer (relative to the public folder) where webpack puts our assets (in our case this is the `scripts` folder)
    - Yes this is a bit redundant since we provided this above but we'll talk about the advantages of doing it this way in a moment

`webpack.config.js`

```
// MORE CODE

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/'
  }
};

// MORE CODE
```

* Don't forget the beginning `/` and ending `/` in `/scripts/`

## Now we just need to change our `scripts` command in package.json
`package.json`

* Before:

```
// MORE CODE

  "scripts": {
    "serve": "live-server public",
    "build": "webpack --watch"
  },

// MORE CODE
```

* After

```
// MORE CODE

  "scripts": {
    "dev-server": "webpack-dev-server"
  },

// MORE CODE
```

## Run Webpack dev server
`$ npm run dev-server`

* You only need one tab to run dev-server

### Let's look at all the output of dev-server
* Project is running at http://localhost:8080/ * we know where we need to open the browser to see our app
* Webpack works as it did before
    - Change something in one of your src files

`index.js`

```
// MORE CODE

import square, { add, subtract, cube } from './utilities';
// import greeting from './greeting';

// console.log('index.js');
console.log(add(33, 332));

// MORE CODE
```

* And we see it update in the browser super fast

## Warnings
* You can ignore this warning as it pops up from time to time
    - The browser will automatically re-connect itself so feel free to ignore this warning

`sockjs.js:2999 WebSocket connection to 'ws://localhost:8080/sockjs-node/425/cfxa4m2n/websocket' failed: WebSocket is closed before the connection is established.`

## Why is dev-server so much faster?
* It doesn't actually write files to the scripts directory
    - If you see `bundle.js` it is left over from when we last generated it with webpack
    - Delete it, refresh the browser and things work just as they did before even though we no longer have a bundle.js
    - That is why we needed to provide the `publicPath` in `devServer` so the devServer knows where to serve up those "virtual" files (only in memory)
    - This is done to keep the dev-server to be fast and lean as possible
    - There is a problem with this if we want to take that public folder and put it on a server (like we did previously or if we want to deploy our app because we need all of the assets) - no problem we'll arrive at a solution to this dilemma shortly
        + This solution will be similar to what we had before
        + The big difference is we'll either optimize for development which we're doing now or for production when we want to deploy our application

## path to JavaScript
* I dynamically created my `bundle.js` with a hash for cache busting, this means I didn't need to hard code my `script` with a src pointing to my JavaScript bundle. It was automatically injected
  - When I hard coded it I was getting a 404
  - I also had problems pushing images to production so I had to just bulk copy them automatically, not sure if this is the optimum solution but it works

#
* Comment out the hard coded path as it it no longer needed

```
// MORE CODE

       
<!-- <script src="/dist/assets/js/bundle.js"></script> -->
</body>
</html>

// MORE CODE
```

* View page source and you'll see it was auto injected

```
// MORE CODE

<!-- <script src="/dist/assets/js/bundle.js"></script> -->
<script src="bundle.js?bde2f130eb7f9862fab0"></script></body>
</html>
// MORE CODE
```



