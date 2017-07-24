# Init, nodemon and package.json Part 2
* `package.json` is not used by node itself
* It is used by `npm`

## Development Dependencies (_devDependencies_)
* These dependencies will be used only during development
* My Application will run without them but I need them during my development process

## jasmine-node
* Tool to help us write automated tests

`$ npm install jasmine-node --save-dev`

* Now I have a devDependencies part of `package.json`

```js
// more code
"dependencies": {
    "moment": "^2.18.1",
    "node": "^0.0.0"
  },
  "devDependencies": {
    "jasmine-node": "^1.14.5"
  },
// more code
```

## Deployment
* You normally don't push `node_modules` up to production
* There are server utilities that are built in and they'll look at your package.json and it will run the `$ npm install` on the production server after you push up your code
    - So ultimately the production server will do the same thing we just did
    - It will ignore the devDependencies and just install the dependencies

## Global npm package
* We won't just use this on one of our Node Projects
* But we'll use this on all of our Node projects

### -g (_Means globally install this package_)

### nodemon
`$ npm install -g nodemon`

### Global install troubleshooting issues
* Having problems installing `nodemon` (or any other global install), use this link

[https://docs.npmjs.com/getting-started/fixing-npm-permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

### Where was this global package installed?
`$ npm root -g`

* My Mac shows this path: `/usr/local/lib/node_modules`
* You may have a local `node_modules` or a global `node_modules` and these are places where node can look for your required modules
* If you go into the global `nodemon`

`/usr/local/lib/node_modules/nodemon`

* You will see that it has its own `node_modules` folder
* And if you go into jasmine, you'll see that some of it's dependencies has their own `node_modules` folder

## NPM con
* Some people criticize npm for having every package contain it's own dependencies
* And this means things will be duplicated in the `node_modules` folder
* That's why we don't push this to our code repositories
    - They made this choice to remove lots of thinking of which packages depend on other packages
    - Just have each package include its own dependencies and it works and works well

## How do I update my npm modules?
`$ npm update` 

* This is a great way to make sure that I am always using the latest version of other people's code that I am using in my app
* It will just overwrite the exiting module that I currently have installed inside `node_modules`

`app.js`

* Replace what is currently in our `app.js` with this server and router code from before

```js
const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {

  if (req.url === '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
  }
  else if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const obj = {
      firstName: 'John',
      lastName: 'Doe'
    }
    res.end(JSON.stringify(obj));
  }
  else {
    res.writeHead(404);
    res.end();
  }

}).listen(1337, '127.0.0.1');
```

## Run nodemon
* Now that I globally installed `nodemon`, I will run it
* Since nodemon comes with a CLI (CommandLine Interface Utility) so I can run it with just `nodemon`

`$ nodemon app.js`

* It will start the command `node app.js`

![nodemon running](https://i.imgur.com/DxD6GLf.png)

* nodemon watches the files in my app using built-in functionality of the `fs` module within node
    - And it watches these files and waits for them to change
    - And if any files changes `nodemon` automatically
        + Cancels node
        + And then runs that `$ node app.js` again
* We know we can change the HTML file and not have to restart the server
    - Because that wasn't part of the code that was converted to machine language
    - But if we change our `app.js` we now don't have to stop and restart our server because `nodemon` will do it for me

## Testing nodemon out
* Run our code with nodemon

`$ nodemon app.js`

* Make sure the routes worked as they did before
    - `/` (html stuff)
    - `/api` (JSON stuff)
    - `/anything` 404
* So if we change our route from `/api` to `/json` inside `app.js`
    - And browse to `localhost:1337/json` it works as it did before without us having to stop and restart the server manually
* All nodemon did for us was **automate** the process and save us time from having to do it manually every time

## The nodemon cli
* If you open the nodemon global folder and open `lib` you will see a `cli` folder and inside that is all the stuff for the CLI
    - If you see files with `-cli` they most likely are utilities for the CLI

## Other Peoples Code
* Dig in and check out the code
* It is just other people's code
* They may not follow the semver standards
* They may may mistakes
* Be judicious and don't just throw anything in your site
* Test it and make sure other people use it
* Test out packages before you use them heavily in your software 
