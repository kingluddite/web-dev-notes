# Essential Web Dev Tools

# gtmetrix.com
* Find out how your site ranks
* Cloudflare - free option speeds your site up
    -  Switch your DNS to cloudflare
    -  People visiting your site first go to cloudflare, cloudflare caches your site
    -  Tries tomake your site run faster and this is possible because of a CDN (Content Delivery Network)
        +  They have numerous servers throughout the world that your visitors can connect to to load their website
        +  Distance matters for speed
        +  30 miles (fast) vs 3000 (slower) miles vs from New York to China (very slow)
        +  Your cached site will be served to the visitor closer to where they are
        +  Make your site more secure
            *  Cloudflare controls access to your website
            *  They are able to allow and block traffic to your website
                -  based on information they know or info you give it
                -  hackers trying to hack your website
                -  spammers trying to spam your website
                -  if it sees a spambot trying to connect to the website it can block 
            * Google Analytics - don't have to put it on every page with Cloudflare, put it on one page (WordPress already has a plugin for this) but for a custom site, adding tons of pages, it would take a lot of time
            *  Go to who is hosting your website (Godaddy or DigitalOcean or AWS)
            *  Go to your DNS host (GoDaddy or Namecheap)
            *   Change the Name Servers to Cloudflare nameservers
            *   Wait 5 minutes to 5 hours  for everything to replicate out and you are good to 
semrush - compare products iterm2 vs hyper.is

[beginners guide to best command line tools](https://webdevstudios.com/2015/02/10/a-beginners-guide-to-the-best-command-line-tools/)

* homebrew (mac) install
* iterm2 (mac)
* MAMP (mac)
* Git (install on pc, old version pre-installed on Mac)
* Signup Github Account
* Download WordPress
* Local/Staging
* Install WordPress
    - root server folder
    - create DB in phpMyAdmin
* VirtualBox (install at home)
* Vagrant (install at home)
* VVV (install at home)
* VV Dashboard (install at home)
* VV (install at home)
* WordMove (install at home)

## Composer
```
$ brew install composer
```

## Useful Chrome browser extensions
Y - [Y link](https://chrome.google.com/webstore/detail/yet-another-lorem-ipsum-g/jffcmkkfbampimhpimhofhhkanhflfce)
* quick way to added html filler text to WordPress pages or anywhere.

## Symbolic Linking on Macs (sym links)
Symbolic links are awesome and they really make life easy. Here's an example of why I would use a symbolic link:
I have a notes folder in `~/Documents/dev/notes/web-dev-notes`. Inside this folder I have a git repo initialized so I can push and pull commits from my laptop, work computer, school computer and home desktop. This works great but there are some files like connection information that I keep in digital notebooks. I add these files to my .gitignore so I don't push them up to github as it is a public site people can see them. I could drag and drop them into my Dropbox folder but then I would have a duplicate of the same file and this is a big problem because it will be a pain to manually keep the files in sync. I could also just move the folder into Dropbox but that is bad too because all my files would have to be in Dropbox and I like to put certain files in certain places in my computers. The best thing to do here is to create a sym link between a folder on your Mac and the Dropbox folder. To do this you `cd ~/Dropbox` and once there you open another terminal window and browse to your notes folder. Once there type: `pwd` in the terminal to get the absolute path of where you are. Let's say it gave you this path: `ln -s /Users/philiphowley/Documents/dev/notes/web-dev-notes`

Then just (from the Dropbox root folder on your mac) type this in the terminal

```
$ ln -s ln /Users/philiphowley/Documents/dev/notes/web-dev-notes
```

```
ln -s /path/to/folder/that/you/want/to/sync/ ~/Dropbox/folder/name
```


That's it! Your folders are now linked so that when you make any changes on your file on your Mac (my notes file) it will be updated at the same time in the Dropbox folder. Since that folder will push it up to dropbox. You can easily access the file anywhere there is an internet connection.

[Here is a great video showing you how to do this](https://www.youtube.com/watch?v=yDqinsWS0lA)

## Homebrew (Free)
For Mac, you need this to install stuff you should have on your mac as a developer
* Homebrew needs Mac's XCode to be installed. It is a free install but large so when you install it, go grab a cup of coffee.

### Update Homebrew
* sometimes you will need to agree to Xcode update
* you may need to update permissions with `$ sudo chown -R $(whoami) /usr/local`
```
$ brew update
#
$ brew doctor
```

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

## How do I update node?
```
$ brew update
$ brew doctor
$ brew upgrade node
```

Now you have installed updated version of node, and it's probably not linked. If it's not, then just type: `$ brew link node` or `$ brew link --overwrite node`

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
* I like to use `cmd` + `shift` + 4 to take a quick screenshot and this shortcut let's me choose the size I want. With imgur I can take the screenshot, upload that screenshot to the imgur website and save the URL of that remote image in my clipboard. This is very handy when taking notes with markdown as I can just use markdown with `![image description](image-url-on-imgur-here)` and that screenshoot will be in my notes that I can easily email to a client using ST3's markdown packaged (markdownediting and markdown preview)

[Mac2Imgur](https://github.com/mileswd/mac2imgur)
Take a screenshot and it's uploaded to imgur.
* I like to have this running as soon as my computer starts. You can change that it is's setting. This is what it looks like ![mac2imgure icon](https://i.imgur.com/u9w88vb.png)
* If you also use Dropbox make sure this option `Share screenshots using Dropbox' is unchecked in Dropbox's settings as it will conflict with Mac2Imgur]
* I also like setting this option so that all the screenshots that I'm taking are not littering my desktop. They will be automatically deleted once they are uploaded to imgur.
![setting to auto delete uploaded imgur screenshots](https://i.imgur.com/8IH8DNj.png)

## Jumpcut (Free)
Multiple saves of stuff you copy to clipboard
This is what the icon looks like [jumpcut icon](https://i.imgur.com/M1WQH0j.png)

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

## Problems to be aware of if using Google Docs
**Note:** copy/paste [in google might give you wonky quotations](https://productforums.google.com/forum/#!topic/docs/qMlQPzQNRXY)

**Solution:** [turn off smart quotes in google docs](https://productforums.google.com/forum/#!topic/docs/qMlQPzQNRXY)

![screenshot](https://i.imgur.com/kz6wmFK.png)

## [LICEcap](http://www.cockos.com/licecap/) - simple animated screen captures (free)
Great for adding to your markdown notes

## [JSBIN](http://jsbin.com/)

Online code editor to practice your JavaScript

## [spectacle](http://jsbin.com/)
Free app for OSX window management

## RegExr
Free online way to practice regular expressions

## [Regex Golf](https://regex.alf.nu/)
Learn regular expressions the fun way

## [RegEx Testing](https://regex101.com/#javascript)

## [Interview Cake](https://www.interviewcake.com/)
Get prepared for programming interviews

## [Typing.io](https://typing.io/lesson/javascript/jquery/traversing.js/1)
Practice typing faster (specific to programmers)

## Mac-CLI
 OS X command line tools for developers – The ultimate tool to manage your Mac. It provides a huge set of command line commands that automatize the usage of your OS X system.
[link](https://github.com/guarinogabriel/mac-cli)
