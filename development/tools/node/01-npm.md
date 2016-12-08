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

