# Essential Web Dev Tools

## Homebrew (Free)
For Mac, you need this to install stuff you should have on your mac as a developer
* Homebrew needs Mac's XCode to be installed. It is a free install but large so when you install it, go grab a cup of coffee.

### Install Homebrew (Free)
[homebrew link](http://brew.sh/)

```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Update Git (Free)
_Install using homebrew so you are using the latest and greatest git, the git on most macs out of box is way outdated_

### Get the most updated version of Git

```
$ brew install git
```

## Tree (Free)

### Use brew to install `tree` command

On PCs you have the `command prompt`. It is what PC users use instead of the Terminal. It has a native `tree` command. Macs do not have this command. Homebrew makes it easy to install. It just quickly shows you what is recursively inside folders.

```
$ brew install tree
```

#### Use tree command
* browse to directory you want to examine

```
$ tree
```

* Install stuff with brew

```
$ brew install (whatever you want to install)
```

## imagemagick
* free software to create, edit, compose or convert bitmap images

```
$ brew update && brew upgrade && brew install imagemagick
```

* **Note:** I am chaining 3 brew commands together

## Fixing Homebrew problems
Every day you work with homebrew make sure you to update and upgrade. Many of the homebrew problems you encounter will be fixed updating and upgrading.


### Hub [hub link](https://hub.github.com/)
* Command line wrapper for git that makes you better at GitHub
* Say you want to create a github repo from your Terminal. It's easy with Hub!

## Imgur Screenshot app (Free)
* I like to use `cmd` + `shift` + 4 to take a quick screenshot and this shortcut let's me choose the size I want. With imgur I can take the screenshot, upload that screenshot to the imgur website and save the URL of that remote image in my clipboard. This is very handy when taking notes with markdown as I can just use ![image description](image-url-on-imgur-here) and that screenshoot will be in my notes that I can easily email to a client using ST3's markdown packaged (markdownediting and markdown preview)

[Mac2Imgur](https://github.com/mileswd/mac2imgur)
Take a screenshot and it's uploaded to imgur

## Jumpcut (Free)
Multiple saves of stuff you copy to clipboard 

## BetterSnapTool
Browser Window Management
* Spectacle
* Moom
* Divvy
* [all others](http://apple.stackexchange.com/questions/9659/what-window-management-options-exist-for-os-x)

## Chrome Dev Tools
* set up so Chrome points to Sass source file
* set up so change in dev tool makes change to original source scss file

## Auto refresh browser
### LiveReload
### BrowserSync
### CodeKit

## Browserstack [link](https://www.browserstack.com/)
* Instant access to all real mobile and desktop browsers.
[Check many browser](https://www.browserstack.com/)

## Bower [link](http://bower.io/)
* A package manager for the web

## Gulp  [link](http://gulpjs.com/)
* automate and enchange your workflow
* I like Gulp better than Grunt

## Grunt [link](http://gruntjs.com/)
* JavaScript Task Runner

## Toggl [link](https://toggl.com/)
* Track your project time

##iTerm2 [link](https://www.iterm2.com/)i
* This is superior to using just the Terminal. Lots of benefits.

## Modernizr
[Modernizr](https://modernizr.com/) - use modern stuff and fall back to old stuff if browser sucks

## HTML5 boilerplate




