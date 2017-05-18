# Deployment Options
By default webpack pumps out static assets only

![static assets only](https://i.imgur.com/hZnGhp9.png)

## What is a static asset?
Anything that is not served by a dynamic server

* Make an API request and get back info from a Database
* WYSIWYG - With a webpack project
* The entire app is running inside of the user's browser
    - There is no corresponding backend to make any type of request to

## Alternative
An app that has our static assets and a custom server

![custom server and static assets](https://i.imgur.com/eSkNVFw.png)

* We have a server like `node` that interacts with a Database our app and the browser

### Think about our webpack deployment
Front end or Front end + Back end (full stack)

## General list of providers
![static and server providers](https://i.imgur.com/leTLtcQ.png)

### Static Asset Providers
* Github Pages (free)
* Amazon S3 and MS Azure are competing products
* surge (easiest)

### Server-based Providers
If you have an express app with mongo Database behind it you'll want a server-based provider

* Amazon EC2 (very low level)
* Amazon ELB (elastic bean stalk - sits on top of EC2 but ELB is easier for handling deployments)
* Digital Ocean (very flexible)
* Heroku (cheap/free) easy deployment
* MS Azure (similar to AWS)

### Restructure our app for deployment
#### Update `plugins`
`webpack.config.js`

```
// more code
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
// more code
```

* Several modules we installed in our project
    - Chief of which is React.js
    - They make use of NODE_ENV flag
    - Whenever node runs it looks for a window scoped variable `process.env.NODE_ENV`
        + Literally in your browser when React boots up it will look for this variable on window scope
            * If it finds this variable and it is equal to the string **production** then React will behave differently
                - React won't do as many error checking procedures while it runs and renders your Application
                - This is good because in production you don't want so much error checking (that's what development is for to catch the errors)
                - error checking takes time and degrades performance so we want to remove it if we can
                - This variable helps make sure we can turn off error checking in production
                - `webpack.DefinePlugin` is used to define window scoped variables that will be defined with our `bundle.js`

`'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)`

* left hand side is variable we want to define
* right hand side is value for that variable
* `process.env.NODE_ENV` - This is talking about the NODE_ENV variable that is running on our machine
    - The assumption is that we, the developer will set the correct value for this variable whenever we build our project
    - We want to set NODE_ENV to the value of `production` during our build and this is how we do it:

`package.json`

```
// more code
"scripts": {
    "clean": "rimraf dist",
    "build": "NODE_ENV=production npm run clean && webpack",
    "serve": "webpack-dev-server"
  }, 
// more code
```

* If we don't do this, webpack will assume we are NOT running in production
* We just ensure that when React runs it is running in the correct environment

## Add a production version of our output
We do this by changing this:

`  "build": "NODE_ENV=production npm run clean && webpack",`

To this (_we add `-p` at the end_):

`  "build": "NODE_ENV=production npm run clean && webpack -p",`

* When webpack runs in production mode it will automatically minify all of our JavaScript code
* It will rename some of our variables
* It will compact our code into the minimum amount of code possible
    - all extraneous spaces, tabs, comments get extracted out of our codebase
* All of this will make our production version of our app significantly smaller (20 - 30% smaller than if we build webpack in development mode)

`$ npm run build`

* This time it will take longer to build your project
* That -p flag makes your code significantly smaller
