# Require
## Modules inside Node
* Units of functionality
    - Create 3 functions and bundle them up
    - Then other people could use this

## Make or Use Modules

### Use Other peoples modules
* We'll use a function in node called `require`

#### Require let's us do 3 things
1. Will let us load in modules that come bundled with Node.js
    * Examples
        - http module (let's us make a web server)
        - fs module (let's us access the file system for our machine)
2. Use require to load in 3rd party libraries
    * Express
    * [Sequelize](http://docs.sequelizejs.com/)
    * Both help us write less code
3. Use `require` to require our very own files
    * Will enable us to break up our app into smaller more accessible files
    * Essential for buildng **real world apps**
