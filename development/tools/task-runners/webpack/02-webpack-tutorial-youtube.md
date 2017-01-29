# Webpack
best for react

## Module Loaders
### Previously used
* require.js
* browserify

`./` - starting in our current directory
`../` - going up a directory

index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Some Page</title>
</head>

<body>
  <h1>My Webpack Page</h1>
  <script src="js/scripts.js"></script>
</body>

</html>
```

js/scripts.js
```js
require('./module1.js');
require('./module2.js');
```

js/module1.js
```js
console.log('hello from module 1');
```

js/module2.js
```js
console.log('hello from module 2');
```

install node.js

npm init
npm install -S webpack
npm install -g webpack (install webpack globally so you can run the webpack command)
touch webpack.config.js - tells webpack how to think and how to act

[sample webpack gist starter](https://gist.github.com/learncodeacademy/25092d8f1daf5e4a6fd3)

```js
var debug = process.env.NODE_ENV !== "production";
var webpack = require( 'webpack' );

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/scripts.js",
  output: {
    path: __dirname + "/js",
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin( { mangle: false, sourcemap: false } ),
  ],
};
```

`context: __dirname (the directory we're in)`
if you're app lived in a directory called app do this
`context: __dirname + '/app'`

`var debug = process.env.NODE_ENV !== "production";`
says if our environment is production then do minification and don't do source mapping

if it's not production we will consider that debug mode

if debug we will inline source maps, otherwise we will have no dev tool at all

our entry point is `scripts.js` (this is where we're starting off)

our output will be put in the `/js` folder and we'll create a file called `scripts.min.js`

if we are in `debug mode`, no plugins (empty array)
if we are in `production environment` we are going to dedupe (strip out duplicate code)
run uglify - get rid of sourcemaps, comments make it production ready

run webpack
`$ webpack`

`$ NODE_ENV=production webpack`

change page to min js file in html

`index.html`
```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Some Page</title>
</head>

<body>
  <h1>My Webpack Page</h1>
  <script src="js/scripts.min.js"></script>
</body>

</html>
```

install jquery and lodash with npm
`$ npm install -S lodash jquery`

update `js/module1.js`

```js
var $ = require( 'jquery' );

$( 'h1' ).html( 'new <strong>bolder</strong> text' );
console.log( 'hello from module 1' );
```
`$ webpack`

and you'll see we've updated the h1 with new text using jquery

but if you use the console and try to see if jquery is avaible in our global scope, it is not (this is cool because it is only being used where we want it to

cool - if you need jquery in another file, jquery will not be duplicated, loads just once
(you won't double the size of your javascript file by importing it twice)
it creates a module called jquery and makes sure it loads in the proper order

great thing about module loaders is they do a lot of the smarts for you

let's use lodash (underscore.js)

generate random data with [https://www.mockaroo.com/]

update `module2.js`

```js
var _ = require( 'lodash' );

var people = [ {
  "id": 1,
  "first_name": "Heather",
  "last_name": "Washington",
  "email": "hwashington0@friendfeed.com",
  "gender": "Female",
  "ip_address": "155.158.126.6"
  }, {
  "id": 2,
  "first_name": "Deborah",
  "last_name": "Reyes",
  "email": "dreyes1@yolasite.com",
  "gender": "Female",
  "ip_address": "103.183.167.0"
  }, {
  "id": 3,
  "first_name": "Helen",
  "last_name": "Hansen",
  "email": "hhansen2@about.me",
  "gender": "Female",
  "ip_address": "79.130.88.167"
  }, {
  "id": 4,
  "first_name": "Nancy",
  "last_name": "Hudson",
  "email": "nhudson3@mashable.com",
  "gender": "Female",
  "ip_address": "53.132.167.72"
  }, {
  "id": 5,
  "first_name": "Ernest",
  "last_name": "Montgomery",
  "email": "emontgomery4@i2i.jp",
  "gender": "Male",
  "ip_address": "53.186.224.132"
  }, {
  "id": 6,
  "first_name": "Annie",
  "last_name": "Bennett",
  "email": "abennett5@wikia.com",
  "gender": "Female",
  "ip_address": "88.152.118.53"
  }, {
  "id": 7,
  "first_name": "Aaron",
  "last_name": "Evans",
  "email": "aevans6@devhub.com",
  "gender": "Male",
  "ip_address": "34.248.146.136"
  }, {
  "id": 8,
  "first_name": "Henry",
  "last_name": "Welch",
  "email": "hwelch7@webnode.com",
  "gender": "Male",
  "ip_address": "96.222.169.92"
  }, {
  "id": 9,
  "first_name": "Marie",
  "last_name": "Rice",
  "email": "mrice8@statcounter.com",
  "gender": "Female",
  "ip_address": "15.88.118.209"
  }, {
  "id": 10,
  "first_name": "Wayne",
  "last_name": "Ellis",
  "email": "wellis9@histats.com",
  "gender": "Male",
  "ip_address": "82.198.76.58"
  }, {
  "id": 11,
  "first_name": "Norma",
  "last_name": "Wells",
  "email": "nwellsa@vkontakte.ru",
  "gender": "Female",
  "ip_address": "252.0.19.86"
  }, {
  "id": 12,
  "first_name": "Brian",
  "last_name": "Chavez",
  "email": "bchavezb@so-net.ne.jp",
  "gender": "Male",
  "ip_address": "17.237.213.48"
  }, {
  "id": 13,
  "first_name": "Irene",
  "last_name": "Peters",
  "email": "ipetersc@ftc.gov",
  "gender": "Female",
  "ip_address": "44.107.178.111"
  }, {
  "id": 14,
  "first_name": "Alice",
  "last_name": "Garza",
  "email": "agarzad@geocities.com",
  "gender": "Female",
  "ip_address": "0.88.26.198"
  }, {
  "id": 15,
  "first_name": "Cheryl",
  "last_name": "Clark",
  "email": "cclarke@huffingtonpost.com",
  "gender": "Female",
  "ip_address": "103.141.131.205"
  }, {
  "id": 16,
  "first_name": "Beverly",
  "last_name": "Snyder",
  "email": "bsnyderf@tripadvisor.com",
  "gender": "Female",
  "ip_address": "99.217.123.236"
  }, {
  "id": 17,
  "first_name": "Peter",
  "last_name": "Miller",
  "email": "pmillerg@kickstarter.com",
  "gender": "Male",
  "ip_address": "150.96.199.119"
  }, {
  "id": 18,
  "first_name": "Terry",
  "last_name": "Morgan",
  "email": "tmorganh@moonfruit.com",
  "gender": "Male",
  "ip_address": "188.47.30.204"
  }, {
  "id": 19,
  "first_name": "Frank",
  "last_name": "Lynch",
  "email": "flynchi@seesaa.net",
  "gender": "Male",
  "ip_address": "84.211.186.45"
  }, {
  "id": 20,
  "first_name": "Bonnie",
  "last_name": "Armstrong",
  "email": "barmstrongj@ezinearticles.com",
  "gender": "Female",
  "ip_address": "152.219.37.67"
  } ];
var femaleCount = _.filter( people, { gender: "Female" } ).length;
alert( femaleCount + 'females!');
console.log( 'hello from module 2' );

```

now modules are broken up into units that do one thing

# ES6
babeljs.io
(other is traceur - but babel is main transpiler)

// destructuring
```js
// destructuring
var foo = {
  bar: 1,
  baz: 2
};

var {bar, baz } = foo;
```

very useful if you have large objects and you just want to snatch a value or two out of it
or if you have objects with very large names

## Destructuring with Arrays
```js
// or with array you can destructure too
var tenses = [ "me", "you", "he" ];
var [ firstPerson, secondPerson, thirdPerson ] = tenses;
```
so firstPerson would be `"me"`

## Destructuring objects
```js
var foo = 2;

var obj = {
  bar: 1,
  foo
}
// same as this
var obj = {
  bar: 1,
  foo: 2
}
```

## calling functions with destructuring
```js
var name = "will";
var age = 34;

some.method({ name, age });
```
## template strings
the messy way

```js
var name = 'phil';
var thing = 'party';
var greet = 'hi, my name is ' + name + ' and I like to ' + thing + '.';
// or multi line is bad too
var name = 'phil';
var thing = 'party';
var greet = 'hi, my name is \n' +
            name + ' and I like to \n' +
            thing + '.';
// but with templating you can
var name = 'phil';
var thing = 'party';

var greet = `hi, my name is ${name}
             and I like to
             ${thing}`;
```
## block scoping
old way - function scoping

```js
var a = 1;

function() {
  var b = 2;
}

console.log(b); // undefined, not in global scope
```

### but here is block scoping
```js
var a = 1;

if (true) {
  var b = 2;
}

console.log(b); // 2
```
here b has been defined because it is hoisted, defining a variable in the scope and then changing it

block scoping allows us to use `let` and `let` defines something within a block

### two places you'll use blocks
* if/else statement
* loops (for loops)

```js
var a = 1;
for (20) {
  let b = 2;
}

console.log(b); // 2
```
* `let` creates a block scope so be is only used in that scope

good reminder - let is the new `var`
you really don't need to use `var` most of the time

## const
const is not exactly the same as `let` but is same in that it is block scope

```js
const foo = 1;

if (true) {
  const bar = 2;
}
console.log(bar); // not defined
```
* but if you used var bar = 2 (inside the if), then bar = 2

**note** const can not be overwritten

```js
const foo = 1;

if (true) {
  const bar = 2;
  bar = 3;
}
console.log(bar); // not defined
```

you would get an error because const can't be overwritten

but note: if it is an object you can't change the object but you can mutate it's inner values

```js
const foo = 1;

if (true) {
  const bar = { a: 1}
  bar.a = 2;
}
console.log(bar.a); // 2
```

use const most of the time because as a developer you tend to never want to mutate an object

but if you are going to change a value later on, don't use `const`, use `let`

## Class in JavaScript

### old way
```js
function Parent() {
  // constructor
}


Parent.prototype.foo = function() {}
Parent.prototype.bar = function() {}
```

but with classes

```js
class Parent {
  age = 34;
  constructor(){

  }

  foo() {

  }

  static bar() {

  }
}

var parent = new Parent();
parent.foo();
parent.age; // 34
Parent.foo();
```

## child class
```js
class Child extends Parent {
  constructor() {
    super();
  }

  baz() {

  }
}

var child = new Child();
child.foo();
child.baz();
```
## generator functions
add a lot of new power to javascript

[link to generators](https://www.youtube.com/watch?annotation_id=annotation_15064051&feature=iv&src_vid=LmL0Gh193M0&v=QO07THdLWQo)

## arrow functions
```js
var foo = fucntion(a, b) {
  return a + b;
};

// write as arrow function
var foo = (a, b) => {
  return a + b;
}
```
very helpful when passing variables as arguments

```js
do.something(function(a, b) {
  return a + b;  
});

// or with arrow function can make it one line and much cleaner
do.something((a,b) => { return a + b });
```

## implicit returns (only applies with one liners)
```js
// makes the above look like this
do.something((a,b) => a + b )
```

if you have a one liner and just one argument you can do this

```js
do.something(a => a + b )
// heres a cool tip
[0,1,2].map(val => val++); // [1, 2, 3]
```
## Lexical context binding
if you have a function and you want to bind it to `this`

```js
var module = {
  age: 30,
  foo: function() {
    console.log(this.age);
  }
}

module.foo(); // 30
```
but if you do this and use `this`

```js
var module = {
  age: 30,
  foo: function() {
    setTimeout(function() {
      console.log(this.age);
      }, 1000);
  }
};

module.foo(); // won't work because `this` is a completely different anonymous context
```
old way to fix it

```js
var module = {
  age: 30,
  foo: function() {
    setTimeout(function() {
      console.log(this.age);
      }.bind(this), 1000);
  }
};

module.foo();
```
* not a great fix, feels janky

but arrow functions automatically do bind `this`

```js
var module = {
  age: 30,
  foo: function() {
    setTimeout(() => {
      console.log(this.age);
      }, 1000);
  }
};

module.foo();
```
and that will work (because `this` automatically points to module (the context we are in))

use caution with jquery

```js
// whatever the value of `this` is here

$('some-thing').with().jQuery(() => {
  $(this)
});
```

## modules

```js
var myModule = require('myModule');
```

how myModule is defined inside is:

```js
module.exports.foo = function() {

};

module.exports.bar = function() {

};

module.exports = function() {

}

// to import them later in another file

var myModule = require('myModule');
var foo = myModule.foo;
```

but to do this now change it to

```js
import myModule from 'myModule';
```

imports need to be at the top of the code
they stand out and let you know they are imports and not your code

you can destructure them

```js
import { foo, bar } from 'myModule';
```

great for libraries like lodash

```js
import { each, omit } from 'lodash';
```

how to export with ES6 exports is:

```js
export default function() {

}
// or export just foo with
export function foo() {

}

// and import with
import { foo omit } from 'myModule';

// or you can export a variable value
export var foo = 3;

// and import with
import { foo as foolish, bar } from 'myModule';
console.log(foolish); // 3
```





