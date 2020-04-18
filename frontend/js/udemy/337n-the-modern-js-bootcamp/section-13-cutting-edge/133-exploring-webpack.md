# Exploring Webpack
## Our current build process
1. index.js (code we write)
2. babel (Convert modern JS to work everywhere)
3. bundle.js (code browser runs)

![diagram of current build process](https://i.imgur.com/YrVCzcG.png)

## Now our build process when we use webpack
1. index.js (code we write)
2. Webpack
    1. Enable modules
    2. Run Babel
3. bundle.js (Code browser runs)

![diagram of process using Webpack](https://i.imgur.com/0hzpjBV.png)

* Webpack can do way more than Babel
    - Makes us more flexible
    - We get to use the JavaScript modules system

## JavaScript modules system
* This gives us a brand new way to setup and structure our JavaScript code

### We want to limit our JavaScript file requests from 3 to 1
![limit http requests](https://i.imgur.com/1o9nYWF.png)

* This will speed us up as we have less HTTP hits
* We'll reduce all JavaScript to just a single JavaScript file that contains everything

### Code load order problem
* Currently we need to load files in a specific order
* This makes it very hard to share files
* This order is wrong could expose variables we don't want to other files and may cause conflicts
* Webpack will resolve both those issues

## Webpack
* Now we'll have:
* A `public` folder
    - Will house our `index.html` file (same as before)
* A `src` folder
    - Will contain all the JavaScript code that we write
* A `node_modules` folder 
    - Will contain all of the 3rd party code that we don't write
    - uuid

### Our new folder/file structure using Webpack
* Diagram

![with webpack file/folder structure](https://i.imgur.com/JwVaBYl.png)

## Files still need to communicate with each other
* With the module system in place any file can try to import something from another file
* And any given file can try to export something specific
* We can export the full file or just one function
* Other files can import the entire file or just specific functions

### How does all this work?
* It works because of Webpack
* Webpack will take all of our files and bundle them up into one file `bundle.js` and that is what gives us access to this modules system
* At end of day with webpack we can just point to one file `bundle.js`
* This will make our app faster
* We won't have to worry about the order of our JavaScript files
* And with the new import/export system we'll have a much better way to structure things
