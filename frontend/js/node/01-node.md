# Node.js

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

