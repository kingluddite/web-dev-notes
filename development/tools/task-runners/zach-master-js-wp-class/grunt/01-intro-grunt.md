# Grunt
A task runner built with Node and JavaScript to help us manage and run command
line tools.

## Getting Started
* Oldest in the group
* Stable, good resources available
* Lots of plugins for other tools

## Technical Side of Grunt
* `gruntfile.js`
* Main configuration file
* Has JSON format
* Inside will have access to main Grunt Object and Methods and properties
    - How we tie into the tool we are using into Grunt itself
        + example: `Grunt.methodCall()`
* You will see Node `module.export`
    - This comes out of Node which is a runtime JavaScript environment
        + Allows you to export pieces of your code and/or import into other ones
            * This is a little bit different than the ES6 JavaScript import and export

## [Grunt Object](http://gruntjs.com/api/grunt)

![The Grunt Object](https://i.imgur.com/k1mt3ZH.png)

Grunt can get complicated so if you run into a complicated Grunt workflow use this page to figure out what is going on under the hood.
