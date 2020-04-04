# Environment and Sourcemaps
* Babel and Webpack allow us to code using cutting edge technologies
* We are building a boilerplate for future products

## We will create a webpack.config.js boilerplate for all new projects
* Then make tweaks to it when we need to

## Production vs Development
* Most of the time we are in the development environment
* We switch to production when we want to build that one file and use that for our remote server

### Production Mode
* Webpack takes way longer (almost 10x as long for development webpack)
* That's ok because we only run production every so often
* The bundle.js is smaller and more efficient and that's what we want and need for production mode

### Development Mode
* Way faster

### When to use which environment?
* We'll use development mode when we run the development server (webpack dev server) and we'll use production when we run our other script

### There used to be a warning about environments
* We can remove that easily with a script in `package.json`

#### Before
`package.json`

```
// MORE CODE

  "scripts": {
    "dev-server": "webpack-dev-server"
  },

// MORE CODE
```

#### After
`package.json`

```
// MORE CODE

  "scripts": {
    "dev-server": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },

// MORE CODE
```

### Run dev-server for development
`$ npm run dev-server`

### Run build for production
* We only run this when we are ready to deploy

`$ npm run build`

* Now you just take everything in public and put it in your webserver and you are ready to run your app on the Internet

## Sourcemaps
* Add a log to your code

`index.js`

```
import square, { add, subtract, cube } from './utilities';
// import greeting from './greeting';

// console.log('index.js');
console.log('yo I am a test log');

// MORE CODE
```

![bad file links](https://i.imgur.com/97xgnzw.png)

* You see the log but if you click on `index.js:6` you won't see the log on line 6, it doesn't match up
* It doesn't match up because the code you are looking at is the compiled code not the source code (after babel runs through it)
* We need a better way to see our source code in the client console and that is where sourcemaps come in

## sourcemaps
* We will enable a sourcemap

### What is a sourcemap?
* A source map allows the browser to map the compiled code to the original source code
* We can easily add this with one line of code

`webpack.config.js`

```
// MORE CODE

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/',
  },
  devtool: 'source-map',
};

// MORE CODE
```

* **IMPORTANT** Anytime you change your `webpack.config.js` you must restart your dev server to make sure your changes to the config file take affect

## Restart
`$ npm run dev-server`

* Manually refresh the browser
* Click on log link in client console and you will be taken to the exact spot in the original source code
* Sourcemaps make the client console still useful even though we are using webpack and babel behind the scenes
