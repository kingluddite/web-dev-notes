## Installing Grunt
1. Grunt as dev dependency
2. Install Grunt CLI installed globally
    * Will enable us to type in grunt commands in our command line to call methods
    * Since we install this globally it won't get registered in our NPM package
    * Since global we can use Grunt for any project if there is a working grunt config file set up

### Install Grunt globally
`$ npm i -g grunt-cli`

### Create a blank package
`$ npm init -y`

### Install Grunt as a dev dependency
`$ npm i -D grunt`

### Add package
* platformio-ide-terminal
  - Gives you a terminal inside Atom
  - Keyboard Shortcuts
    + Open new terminal tab
      * `cmd` + `shift` + `t`
    + Navigate tabs
      * `cmd` + `shift` + `k` (or `j`)
        - navigate to right `k` or left `j`
    + Toggle open/closed
      * `ctrl` + `~`
    + Close a specific terminal
      * `cmd` + `shift` + `x`

### gruntfile.js
* required named

`$ touch gruntfile.js`

```js
module.exports = function exports( grunt ) {
  const defaults = {};

  grunt.initConfig({
    pck: grunt.file.readJSON( 'package.json' ),
  });

  grunt.loadNpmTasks('');

  grunt.registerTask('default', ['']);

}
```

* `module.exports` is node
* We pass in the `grunt` object to our

## Reading files
`grunt.file.readJSON()`
Because we are in the node environment node has the ability to read and write to files.

When working with our JavaScript we had to set up a server, which would then serve us the JSON files, so we could read them.

## Loading tasks
We pull in `package.json` and then we load all tasks with `loadNpmTasks('')`

## npm
1. We first install all tools we use with `npm`
2. We then call them referencing their name

## registerTask()
The default at startup. Will hold an array of all tasks.

Each time we load an npm task, we add it to our array of tasks
