# Running Webpack
`package.json`

```
{
  "name": "js-modules",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^2.5.1"
  },
  "scripts": {
    "build": "webpack"
  }
}
```

* Now we can run

`$ npm run build`

### Why are we running a script instead of just calling `webpack` ourselves?

![webpack script](https://i.imgur.com/HtSNaNZ.png)

You could install webpack globally `$ yarn add -g webpack` and then later you could just run webpack with `$ webpack`

#### That is a bad approach to take
* When you install webpack globally and then run it
  - Your computer will then look at all your globally installed modules it will find one called webpack and run it

* But if you install it per project you get benefits

If you install globally you can only install one version of webpack at a time
If you want two different projects running two different versions of webpack our second way is superior

`$ npm run build`

* We get in the output:
    - Version of webpack we used
    - The time it took to build
    - Stats on files
    - The build is far larger than the sum of the two files we put into it

## Why is bundle.js so large?
* Open `dist/bundle.js` in your text editor
* Lots of stuff
* Here is a summary of what webpack is doing

![webpack](https://i.imgur.com/oCeSesg.png)

* We have an array that will contain two functions and each function wraps the code that was in each of our files
* We have an **entryPointIndex** variable pointing to which file is the entry point
* Since that is `index` and the second function in the array we have an entry point of 1 (_arrays are zero indexed_)
* webpack uses that index to pass to the array and then executes it
`myModules[entryPointIndex]();`

The we can see inside the **index.js** function that it references the function that was imported via `myModules[0]()`

## Takeaway
* Webpack takes all our modules code
* Stuffs it into individual functions
* Stuffs those functions into an array
* Then calls those different functions in that array

There is no big magic going on. It is all plain vanilla javascript code that webpack is spitting out
* remember everything webpack does will run on older browsers

## Run our app inside the browser
By convention SPA's have one `index.html`

`index.html`

```
<head>

</head>
<body>
  <script src="dist/bundle.js"></script>
</body>
```

`$ open index.html`

Check the console and you should see `> 600`
