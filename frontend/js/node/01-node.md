# Node.js

## Upgrade node with homebrew
* I was getting mega errors using node 14.4.0 and needed to upgrade. It wouldn't until I did the following 2 commands:

### Fix for upgrading node to latest version

`$ brew update`

* and then

`$ brew upgrade node`

### Other important node stuff

* To see your current node version

`$ node --version`

* To see available node versions

`$ brew search node`

* To unlink from current version

`$ brew unlink node`

* Install any version e.g. 6

`$ brew install node@6`
* To link installed version

`$ brew link node@6`

* To see your current node version (again)

`$ node --version`

### Bonus
* To revert to current node version (7.5 ATM)

#### Gotcha
`$ brew link --overwrite node`

Linking /usr/local/Cellar/node/7.5.0...
Error: Could not symlink share/doc/node/gdbinit

##### Solution
```
$ sudo chown -R $USER /usr/local
$ brew link --overwrite node
```

* [source for above info](https://medium.com/@katopz/how-to-install-specific-nodejs-version-c6e1cec8aa11)
* [upgrade node](https://appdividend.com/2019/12/06/how-to-update-node-version-in-mac/)

## dunder
* If you see this: `__dirname` (aka dunder dirname)

show/hide hidden files

Terminal is a default Apple application which you will find in the Launchpad. Terminal allows you to make different operations on Mac using special commands. To show hidden files on Mac using command line, follow these 2 steps:

Open the Terminal application from Launchpad.
Copy and paste the following command into the Terminal window:

`$ defaults write com.apple.finder AppleShowAllFiles -bool true`

`$ killall Finder`
`
This command will restart the Finder and then you will see hidden files and folders on your Mac.

If you want to hide files back, then repeat the operation but change the last word in the command to “false”.

defaults write com.apple.finder AppleShowAllFiles -bool false

killall Finder

## You may have to relaunch
* If found my brew install of node and saw a ton of previous versions of node
* I removed them all from the folder except for the most recent

Had the same problem, solved it this way:

open finder and manually copy /usr/local/n/versions/node/<version>/bin/node to /usr/local/bin
open firewall options in system preferences and remove any existing entries for node
add a firewall option for /usr/local/bin/node
Now, no matter how many times n switches versions, the firewall entry is intact, and no more 'Deny ... Allow' prompts.

Root Cause: Not really sure, but it appears n does an incomplete copy into /usr/local/bin. Unlike a manual copy with Finder, the n copy exhibits the following 'weirdness':

Firewall options cannot add /user/local/bin/node... it causes a program failure in System Preferences
If the firewall option is added in response to the 'Deny .. Allow' prompt, then Firewall Options cannot show the Finder for that entry... Finder briefly flashes a window, then reloads.
the copied file shows a created date of the last time n did the copy, not the original date on the node distribution
It seems n just doesn't copy all the meta information about the node executable. Also, the latest version of n (as of this writing) takes a very long time to switch versions... which along with the created date being reset might imply that n is doing its own byte copy instead of letting the OS do the work. The source for the n script indicates otherwise (issues a cp command), but it's not clear why it takes so long for the copy.

But... once Firewall Options adds at least one good entry for /usr/local/bin/node (e.g. a manually-copied node), then the 'bad' copies n puts there continue to work.

When I could see the node folder (inside my hidden usr folder) I made a shortcut in finder
Then I opened mac preferences and browsed to that node app

I then set VS studio to autosave (that was the whole reason I went down this time suck rabbit hole in the first place)

## Security
* **Question** If i run node js on my computer do I have a chance of DOS security vulnerability?
    - **Answer** `So the first thing to say is that the "DOS security vulnerability" will only affect you if you actually use Node.js to run a webserver. It won't affect you just because it's on your system. And the actual "vulnerability" is that an attacker could make your webserver really slow. But again, you don't care, you're not going to run a webserver.`

* **Question** Why can't I see node on my mac OS
    - **Answer** `the reason it doesn't show up is that Apple wants to "protect you" from having to see a lot of the files in the computer, so it hides them. If it wasn't hidden you could go to the Macintosh HD folder and find it at /usr/local/bin like so:`'

![view node on mac os if not hidden](https://user-images.githubusercontent.com/15943089/31913747-ff8eb850-b83f-11e7-9e16-2d75b5c750c9.png)

* I enabled the "show hidden files" option (instructions here: https://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/), but you probably don't want to do that just to delete one file.

## remove node
`$ sudo rm /usr/local/bin/node` and enter password (when it prompts you for a password just type it in (it won't show up on the screen). It should be the password you use to log into the computer.)

## remove npm
* If that works, you need to do the same thing for npm:

`$ sudo rm /usr/local/bin/npm`

## remove node_moodules folder
* Then you need to get rid of your `node_modules` folder with:


`$ sudo rm -rf /usr/local/lib/node_modules`

## Install nodejs with homebrew
### Why use Homebrew to install NodeJS?
* If you are installing NodeJS via the installer from `https://nodejs.org/` then you have to use sudo to make sure that it installs correctly
* After that you have to make changes in your system `$PATH` by adding the path of the node executable
* And if you want to uninstall node then you have track all the files that were created and get rid of them
* Long story short - It's a longgggggg process

That's why Homebrew is used. It makes the job easy. It will install/uninstall Node easily.

If everything installed successfully then you can type in the following command in the terminal to check the Node and NPM version.

$ node -v
v7.7.2
$ npm -v
4.1.2

## install and update node with brew
`$ brew install node`
`$ brew update`
`$ brew upgrade node`

## PATH issues
`$ npm bin -g` will tell you the path for npm

* If it is not in your PATH 

```
/Users/PUTYOURUSERNAMEHERE/.npm-packages/bin
(not in PATH env variable)
```

add it like this to your `.zshrc` (if you are using zsh like me)

`export PATH=$PATH:/Users/PUTYOURUSERNAMEHERE/.npm-packages/bin`

[Why Now is the Best Time to Learn JavaScript](http://blog.teamtreehouse.com/learn-javascript)

[Things Built with Node.js](http://blog.teamtreehouse.com/7-awesome-things-can-build-node-js)

## Node is a console application

### What version of node is running?

```
$ node -v
```

## What should I name my starter file?
some name it app.js or index.js but it doesn't matter

## How do I run my file?
```
$ node app.js
```

## Clear console

```
$ clear
```

## Run first application

app.js

```js
console.log( 'hello human' );
```

in console

```
$ node app.js
```

* up arrow in console will save you from tying it again

## REPL
Read Evaluate Print Loop
* allows you to type JavaScript code and experiment

![node REPL](https://i.imgur.com/GyaJAyh.png)
* exit with `ctrl` + `c` twice

* we just created a JavaScript program outside of the browser and running it on its own

## JavaScript Engine

#### Native Objects
* String
* Array
* Date
* Math

Native Objects can be used in any environment, not just the browser

#### Host Objects
* Window
* Document
* History
* XMLHttpRequest

Host Objects can **only** be used in the browser

JavaScript started being used to create all types of applications, not just browser applications

Chrome began dominating performance benchmarks
* V8 - it's JavaScript engine was open source and helped spread JavaScript
* That's where node.js came from
    - [Ryan Dahl](https://blog.risingstack.com/history-of-node-js/) created node.js
        + built from V8
            * left Host Object behind and added new objects
                - http
                - https
                - fs
                - url (and lots more)

coupling of `V8 engine` with the `APIs` is what is known as `the node.js platform` (aka `the node.js environment`)
* now node programs can run on a pc or even on the internet on a server

## Why use node.js?
* non-blocking

## Documentation
[Node.js Documentation Site](https://nodejs.org/en/docs/)

