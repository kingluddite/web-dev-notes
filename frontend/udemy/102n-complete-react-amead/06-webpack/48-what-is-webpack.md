# What is Webpack?
![high level webpack overview](https://i.imgur.com/ZXW9Qkr.png)

## Tooling
* Asset bundler
    - Take all the stuff that makes up our app
    - Combine it with 3rd party libraries
    - And when that's all done, spit out a single JavaScript file

## Pros
* We can break up our app into smaller files
* "The bundle"
* Single script tag in our HTML instead of many
* If we have lots of HTTP requests it can take a lot of time to run our app
* Gulp and Grunt have been the build tools of choice for years
* Webpack breaks up all our files into little islands that can communicate with each other using ES6 import and export syntax
    - Currently our app is in a single file
    - This is not good
    - We'll break it up into several small files of self contained info
    - Great for scaling
* Yarn/Npm
    - We can now install 3rd party dependencies and use them in our partials by importing them

## Diagram
* Your js order is essential
* Out of order and errors result
    - very annoying to manage those dependencies
* We are relying on the global namespace
