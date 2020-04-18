# Setting up our boilerplate
* Now we convert our current code to a web app we can view in the browser

## .gitignore
* `node_modules` is something we never code
* We don't want to share our app with team members as it is huge
* We can easily generate it with `$ npm install` (`$ npm i` - shortcut)
* So when you pull github projects you'll never see `node_modules`
* So you need to create a `.gitignore` file with `node_modules` inside it
    - This keeps node_modules in your project locally but makes sure git ignores it and when you push your files to github, node_modules doesn't go with the other files
    - When team members clone your project and pull the latest files, they won't see `node_modules`
    - To get it in their repo, they just `$ npm install` and all the dependencies listed in `package.json` will be installed on your team member's local machine
    - You don't need to specify the version numbers because all of that info lives in `package.json`
    - This saves us and our team a ton of time passing our project around

## Test it out
* Delete `package-lock.json` and `node_modules`
* Type `$ npm install`
* You will see your `node_modules` directory is created as well as a fresh new copy of `package-lock.json`

## Create a `public` folder
* In root of project
* This `public` folder is going to contain everything we want to serve up to our web server
* `public` will hold all the converted code that was processed by babel
    - Everything our app uses will be in `public`
* We'll create a `scripts` folder inside `public` (this is we're we'll dump our generated `output.js` file)

## Create a `src` folder
* Short for `source`
* This will hold all the modern code (pre the babel conversion)

## Now we'll move `input.js` inside `src`
* We'll delete `output.js`
* We need to write a script that will automatically run the babel conversion

## `src/index.js`
* We won't name our file `input.js` as in the real world most developers name their entry file `index.js`
* `index.js` will be the starting point for our app

## tree structure
![our file structure for our simple boilerplate](https://i.imgur.com/BLkuXuf.png)

## Add CLI command
* We'll set up our command like this
* It is common to name our compiled js file `bundle.js`

`$ babel src/index.js --out-file public/scripts/bundle.js --presets env`

## View generated code
* You'll see our compiled "dummer" JavaScript code is now inside `public/scripts/bundle.js`

## A better way to run scripts
* Typing this command all the time will quickly become tedious
* A better way and you'll see this all the time is to add the command inside your `package.json` "scripts" property
* We'll not be using `test` in scripts so we'll delete that
* We'll set up key/value pairs
    - The `key` will be what we are doing
        + Since we are "building" our code we'll call this `build`
    - The `value` is the long form script

`package.json`

```
{
  "name": "babel-boilerplate",
  "version": "1.0.0",
  "description": "",
  "main": "input.js",
  "scripts": {
    "build": "babel src/index.js --out-file public/scripts/bundle.js --presets env"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-preset-env": "^1.7.0"
  }
}
```

## Run the new command
* To run use `npm` + `run` + `THE_SCRIPT_NAME`

### Here is how we can run our build command 
`$ npm run build`

## Set up our HTML file
* We'll add this in public
* Now we can run the code that babel spits out
* When we provide scripts inside HTML it is relative to the web server's root
    - We will serve up `public` as the root so our path will be `/scripts/bundle.js`
    - We could also make the path relative with `./scripts/bundle.js`

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Boilerplate App</title>
</head>
<body>
<h1>Boilerplate App</h1>  
<script src="/scripts/bundle.js"></script>
</body>
</html>
```

## Let's update our script to run some code in console
* Just we see that it is working in the UI

`src/index.js`

```
const name = 'John';
console.log(name);

class Hangman {
  myMethod() {
    return 'yo';
  }
}

const hangman = new Hangman();
console.log(hangman.myMethod());
```

## Regenerat our build
`$ npm run build`

## Now run our server

* If you got back a folder with `cd ../` and run `$ live-server babel-boilerplate` you will see this:

![listing directory](https://i.imgur.com/kcwuiQZ.png)

* That is a listing directory
* The problem is we need to serve up our public folder as the root of our server and we do that with

`$ cd babel-boilerplate`

* And then

`$ live-server public`

## View UI
* You'll see the site open `http://127.0.0.1:8080` and you'll see `Boilerplate App`
* You'll see the client console show:

```
John
yo
```

## Make babel watch for changes
* We will have 2 terminal windows open

1. One terminal window will be running our server
2. The other one will allow us to run other things

## Watch with babel
* We will set up babel to listen/watch for changes and make them on the fly so we don't have to keep regenerating all our changes and keep the benefits of live-server

`package.json`

```
// MORE CODE

  "scripts": {
    "build": "babel src/index.js --out-file public/scripts/bundle.js --presets env --watch"
  },

// MORE CODE
```

* Now babel will "watch" for any changes to our `index.js` and automatically regenerate our babel converted `public/scripts/bundle.js`

## Open new terminal tab (you now have 2 open)
* The other one is still running your server

`$ npm run build`

### Update script
* Change the Name from `Mike` to `Tom` in `index.js`
* View the client console and see it was automatically updated to `Tom`




