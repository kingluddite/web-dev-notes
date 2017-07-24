# Adding a Front-End in Angular 2 (Part 1)
## Angular 2 website
[link to Angular 2](https://angular.io/)

### Install Angular CLI globally
`$ npm i -g @angular/cli`

* We will have two package.json files and two node_modules
    - One for Express Stuff
    - One for Angular 2 stuff

### Update public folder
`app.js`

```js
// more code
app.use('/assets', express.static(__dirname + '/public'));
// more code
```

* And update to:

```js
// more code
app.use('/', express.static(__dirname + '/public'));
// more code
```

### Pure frontend without `pug` server side templates
`public/node-todo/src/index.html`

* We could change this to `index.pug` but we will build a pure web front-end that only uses the API

## Typscript vs JavaScript
* You will see `.ts` which is typescript
* I will write in typescript and it will transpile to JavaScript for the browser

## Transpile
* Convert one programming language into another
* The programming language you write in might not really ever run
* [Typescript](https://www.typescriptlang.org/)

## Why did Google add TypeScript?
* Because it gave us the ability to add features to JavaScript that were missing
* We can type ES6 and future features now and it will transpile for us
* Other parts from other languages can be used in Typescript that helps us scale our code especially when working with teams
* TypeScript is from Microsoft

## ReactiveX
* [link to website](http://reactivex.io/)
* This is a giant library that makes it easier to deal with events occurring simultaneously, events that you may have to wait for
* Remember the whole idea of the Event Loop is fundamentally important
* What RXJS does is this and more and brings them to the browser
    - promises
    - observables
    - Basically when we go get data we want the stream to keep running, we don't want it to pause so we have to wait for that data
    - Instead we say go get that data and emit an event when you're done and then I'll come back and run a callback


