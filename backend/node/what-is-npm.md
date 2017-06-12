# Getting Started with NPM
Node Package Manager (npm)

* A tool and service for sharing code, largely JavaScript. Supports a practice 3rd party packages in your projects.

Many npm packages are hosted at [npm packages](https://www.npmjs.com/)

At that site you can:

* Search for packages
* See instructions for installing packages
* Configuring
* Basic Intro to getting started

`$ npm install [PUT THE NAME OF THE PACKAGE YOU ARE INSTALLING HERE`

[npm documentation](https://docs.npmjs.com/)

## Installing NPM
* Need Node Installed
    - Started off primarily being used for transferring node packages. Now it has evolved into supporting all different types of packages
    - When you install Node on your computer it comes bundled with NPM
        + So when you install Node, you also install NPM
* Installer at nodejs.org
    - Recommended for Windows
    - Mac - use [Homebrew](http://brew.sh/)
        + Makes removing it way easier

## Do I have Node installed or if I do what version is it?
For node:

`$ node -v`

For npm:

`$ npm -v`

## If you don't have it installed (the above commands return `Command not recognized`)

### First if you don't have it, install Homebrew

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

* **note** You will have to enter your Mac computer password to install Homebrew.

### Test if Homebrew was installed

`$ brew help`

If a bunch of info appears, you have just installed Homebrew.

### Install Node

`$ brew install node`

**note** If you have node installed and you want to upgrade to latest version:

`$ brew upgrade node`

**note** This upgrade will also upgrade your current version of NPM

**note** Important to have [Xcode](https://idmsa.apple.com/IDMSWebAuth/login?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Fdownload%2F&rv=1) installed on your Mac.
Xcode is an IDE for making apps for IOS and Mac OS

# NPM basics

* `$ npm init`
    - We run this in our project folder to get started
* `$ npm install`
    - We use to install packages from [npmjs.com](http://npmjs.com)
* `$ npm update`
    - When we need to update our packages to new versions
* `$ npm uninstall`
    - When we want to remove packages from our project

## npm init
* Launches a series of questions that will help us build out a `package.json` file that serves as the configuration file for npm for this project
    - It is important that you are in the proper project directory when you run `$ npm init`

* name
    - first question
        + follow URL syntax (lowercase, no spaces)
* version
    - example: `0.0.1`
* description
    - example: a practice project working with npm
* entry point:
    - depending on how you create your app, you might have a starting point, for our app we can just hit enter here
* test command:
    - not using that for our app so will just hit enter
* git repository:
    - not using one, just press enter
* keywords:
    - press enter
* author
    - kingluddite
* license: (ISC)
    - this is the default license
    - you can copy it but you have to give credit back
* Finally, it shows you the output of the `package.json` and asks if it is OK. Just type `y` and press enter.

`$ npm init -y` - shortcut to create `package.json` without having to answer all the questions

After doing that you will now see `package.json` in your project root directory.

Open it in atom:

`$ atom package.json`

## npm install
Three options when installing packages with NPM

### 1. We can install our package globally
`$ npm install --global package`

* `npm` - first always
* `install` - what we are going to do
* `--global` - the option
* `package` - the package name we are going to install

#### shorthand for the same command

`$ npm i -g package`

### 2. Install a package just to our package folder
`$ npm install --save package`

* This will create a `node_modules` folder and save the package to the actual project we are working in and not globally for our entire computer to access.

#### shorthand for the same command
`npm i -S package`

### 3. Install a pack just to our local package but this is not for production, this is just for development, just need this tool or tools to work locally
`$ npm install --save-dev package`

#### shorthand for the same command
`$ npm i -D package`

### npm install Options
* Global
    - Available in all projects
    - Installs to /usr/local/lib/node_modules
    - This user logged into Mac can then has access to these packages
    - Would be difficult to push to production so keep that in mind so you will know when to make it global
    - Things that you would install globally might be tools that you would use on different applications like:
        + Bower
        + Gulp
    - You would never make install a package globally that is necessary for your site to run.
* Save
    - For stuff that you need to make your site run, you would use Save
    - Saves in current project
    - This is the code that is deployed and essential for developing our project
    - So if we are building a `backbone` app then we want to save backbone to our current project, using `save`
    - If we are building a `react` app then we want to be using the `save` option.
        + If we installed React globally and then deployed the site, the site would be broken because React is on our computer not on our package.
            * People will not be able to access that folder where it was stored on our computer
* Save Dev
    - Saves in current project
    - For packages not included in production
    - This is the same as `Save` as it saves it in the current project
    - It will also create a `node_modules` folder (if it didn't already exist) and it will save all the package code into that `node_modules` folder
    - But these packages WILL NOT BE INCLUDED IN PRODUCTION
        + This is where would store our development tools
            * Gulp
            * Grunt
            * WebPack

### Practice
Find out what is installed globally

`$ npm list -g`

* It will also tell us where they are installed

But the list is massive. To make it smaller you can use

`$ npm list -g --depth=0`

You will see the list of all the stuff you installed globally but it also tells you were they are all stored:

`/usr/local/lib`

You should see `node_modules` there.

`$ cd node_modules`

And you will see all your packages.

## Install and save locally to your project

`$ npm i -S backbone`

* You will see backbone is installed but also `underscore` because that is a dependency of backbone.
* If you open up `package.json` you will see that `backbone` has been added to the file under `dependencies`
    - It's current version is also captured

## Install a dev dependency
`$ npm i -D webpack`

* You will see that `webpack` is not inside `package.json` as a `devDependency`

We can update all our packages globally and locally

`$ npm update`

We can also update a specific package saved where to be updated with:

`$ npm update -S package`

### Find any packages that are outdated

`$ npm outdated`

### Uninstall a package

`$ npm uninstall -g package`

`$ npm uninstall -S package` 

`$ npm uninstall -D package`

### Install a particular version of a package
`$ npm i -S backbone@1.3.1`

### Check for outdated packages
`$ npm outdated`

If location is empty then you did not put that package in a project

Go to the root of your project.
(that project needs a `package.json` file)

Install an older version of backbone:

`$ npm i -S backbone@1.3.1`

Check if anything is outdated
`$ npm outdated` and you'll see something like:

```
Package        Current  Wanted  Latest  Location
backbone         1.3.1   1.3.3   1.3.3  nico
```

* Notice backbone is not up to date.
* It also lets us know the location of where it is (the folder `nice`)

That to update backbone:

`$ npm update -S backbone`

And if you run `$ npm outdated` again you will see nothing because nothing is outdated.

Be careful with blanket npm updates because you may break code if they haven't been tested with the most recent updates of the packages.

## Practice on your own
* Practice initializing npm
* Practice installing packages globally
* Navigate and view global packages via command line
* Practice installing with -S and -D
* Practice installing old versions and updating them
* Practice uninstalling packages

# Installing NPM packages for a Project

[liveblog wordpress REST app with REACT](https://github.com/humanmade/liveblog)
* Notice no `node_modules` folder
    - keeps apps lightweight when sharing
    - and when we pull it down, we can just quickly install them all with `$ npm install`

## Create a folder somewhere that will hold your project. name It `liveblog`
`$ cd liveblog`

### Clone the repo into your folder
If you created a liveblog folder you then just use this:
`$ git clone https://github.com/humanmade/liveblog .`

The `.` just puts the contents of the repo in the folder you created without adding the containing folder.

**note** The following clones the repo but names the containing project folder `liveblog`: (_You can use whatever way you like better_)

`$ git clone https://github.com/humanmade/liveblog`

### Install all the packages and their dependencies
`$ npm install`

### List all your dependencies
`$ npm list -S --depth=0`

Look in `node_modules` and you will see a whole lot of packages. This is because it is not only the packages you installed but all of their dependencies as well.

## Practice
* Look for package.json projects on Github
* Clone them and run `$ npm install`
* Research why you would need Git
* Research what `.gitignore` is used for with Git
* Practice again with Liveblog app




