# NPM
`N`ode
`P`ackage
`M`anager

## What is NPM?
* Centralized place where developers share their code with the world
* Oh, and it is all free
* This saves us time
    - We don't have to reinvent the wheel
    - We can share code with each other
    - Create better stuff

NPM is like Grocery Store
Instead of food it contains code

Bake a cake (flow, sugar, vanilla extract, baking powder)
How do we get those ingredients

Do we grow wheat and turn it into flower ourselves? No
We go to grocery store and buy flower

For our website we could go to the Code Store and get (for free)

* jQuery
* Picturefill
* Auto compile CSS
* Auto concat JS

### What is package management? And why would we use packagement?
You may have to go to 3 stores for all your supplies

Or Google, jQuery, Bootstrap, Lightbox...

#### With Package management
* Create a grocery list (aka code list)
* Share list with your personal assistant robot
* Robot fetches all ingredients for you

##### Food can expire
Code can become outdated/bugs

The 3rd party developer fixes the bug or updates their code base after we already downloaded it and are using it in our site

With package management we can run a single command and our robot will automatically grab all fresh copies of all our ingredients/code list
It will check every single ingredient and see if it expired and if so, it will grab the most recent code


## What types of files/packages are on NPM?
1. Node packages
    * Automation
    * Build tools
    * Server tasks
2. Other things
    * Have nothing to do with Node
        - jQuery
        - Lodash
        - Bootstrap
        - Normalize.css

* NPM is not just for node
* It can be our one-stop-shop for all code we need

## Demo
`$ cd travel-site`

`$ npm install jquery`

* created 
    - `node_modules` (folder)
    - `package.json` (file)

But we should first create `package.json` with `$ npm init -y`

### this creates our grocery list/code list
`package.json`

* You will create `package.json` for each of your projects

#### Add jquery

`$ npm install jquery --save`

or

`$ npm i jquery -S`

That will add `node_modules` with **jQuery** to our folder but also **jQuery** inside our `package.json`

#### Add Normalize

`$ npm i normalize.css -S`

### Backing up
That grocery list is great to have because if you delete node_modules you can easily remember all your ingredients and just use `$ npm install` to re-install all your packages

### How do I know what the exact name of the package is to install?
Google with a search like `npm THEPACKAGENAMEYOUARELOOKINGFOR`

### How do we actually use the package JS and CSS files that are inside `node_modules`?
* Do we manually move them outside of `node_modules` (that would take a long time and it would suck)
    - Leave the files inside of node_modules
    - We will learn elegant ways to import node_moduels code into our projects

### Why can't we see our new packages in `node_modules` when we `$ git status`?
* .gitignore - hides `node_modules`

### Why do we ignore node_modules?
* Best practice
* Not our code
* We don't want to add it to git/github/bitbucket

We just clone and use `$ npm install` to grab all our most recent packages

`$ git add -A`
`$ git commit -m 'add jquery and normalize`
`$ git push origin master`


