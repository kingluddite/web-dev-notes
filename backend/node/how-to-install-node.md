# Node

# How do I install node and npm?
* Type `npm` in terminal

```
$ npm
```

* You will get `command not found` error which just means you don't have `node.js` installed.

## One way to install node
[Download Node](https://nodejs.org/en/)

* Download latest `stable` version

* After installing if you type `npm` into iTerm you will get output letting you know you now have node and `node package manager` (aka `npm`) on your mac OS.

## A better way to install node

### Do I have Node installed or if I do what version is it?
It should be noted that when you install node you also install npm.

Check if you have node installed. This will tell you what version is installed of node.

`$ node -v`

Check if npm is installed and if it is, what version of npm is installed

`$ npm -v`

## If you don't have it installed (the above commands return `Command not recognized`)

### First if you don't have it, install Homebrew
Add the following to your Terminal and press enter. It will install homebrew.

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
