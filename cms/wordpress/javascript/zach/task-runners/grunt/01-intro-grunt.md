# Grunt
A task runner built with Node and JavaScript to help us manage and run command
line tools.

## Getting Started
* Oldest in the group
* Stable, good resources available
* Lots of plugins for other tools

Technical Side of Grunt
* Gruntfile.js
    - Main configuration file
    - Has JSON format
    - Inside will have access to main Grunt Object and Methods and properties
        + How we tie into the tool we are using into Grunt itself
            * example: Grunt.methodCall()
    - You will see Node `module.export`
        + This comes out of Node which is a runtime JavaScript environment
            * Allows you to easily export pieces of your code or your entire files to be imported into other ones
                - This is a little bit different than the ES6 JavaScript import and export

## [Grunt Object](http://gruntjs.com/api/grunt)

![The Grunt Object](https://i.imgur.com/k1mt3ZH.png)

Grunt can get very complicated so if you run into a complicated Grunt workflow use this page to figure out what is going on under the hood.

## Installing Grunt
1. Grunt as dev dependency
2. Install Grunt CLI installed globally
    * Will enable us to type in grunt commands in our command line to call things and get everything kicked off that we can figure in our main grunt file
    * Since we install this globally it won't get registered in our NPM package
    * So since it is global we can use Grunt for any project if there is a grunt config file set up and it is all working

### Install Grunt as a dev dependency
`$ npm i -D grunt`

### Install Grunt globally
`$ npm i -g grunt-cli`





