# First Webpack app
## Tasks
1. Make a new NPM project in the terminal
2. Create two JS modules
3. Install and configure webpack
4. Run webpack

### Step 1 - Make a new NPM project
* Make a project folder and cd into it
* `$ yarn init -y`

### Step 2 - Two JS modules
* `src` - Holds all code for your JavaScript project
    - `sum.js`
        + Utility functions for working with mathematical
    - index.js
        + Calls functions from `sum.js`, then prints result

* So `index.js` has `sum.js` as a dependency
* `index.js` needs to import or require `sum.js`

![dependent files](https://i.imgur.com/QXawdxd.png)

* Each module file has its own separate scope
* So code we write in one file is not inherently accessible from any other file
* To give files access to each other we need to define an explicit link between the two files

## Modules Systems in use
![module systems](https://i.imgur.com/EmWRyNO.png)

* CommonJS
    - Implemented by **Node.js**
        + You will see **require** statements and **module.exports** statements
* AMD (_Asynchronous Module Definition_)
    - Used in **Front-End** apps
    - Where different modules of code can be loaded up asynchronously
        + You will see **define** and **require**
* ES6 (_ES2015_) - This is where JavaScript is headed (_especially in module world_)
    - Uses **export** and **import** statements

