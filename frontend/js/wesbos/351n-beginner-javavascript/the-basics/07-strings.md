# Strings in JavaScript
* Create a basic html page called `types.html`
* Create a `types.js` page
* Add a simple console log to print `JavaScript in types.js is working`
* Add a script tag inside `types.html` that points to `types.js`
* Check if eslint and prettier are working
* Install live-server globally

`types.html`

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Types in JavaScript</title>
  </head>
  <body>
    <h1>Types in JavaScript</h1>
    <div class="container">
      <header>header</header>
      <nav>nav</nav>
      <main>main</main>
      <footer>footer</footer>
    </div>
    <script src="types.js"></script>
  </body>
</html>
```

`types.js`

```
console.log('JavaScript is working inside types.js');
```

* You will see log in client console

```
console.log('JavaScript is working inside types.js');

/* eslint-disable */
// 3 types of comments in JavaScript
const singleQuotes = 'single quotes';
const doubleQuotes = "double quotes";
const backticks = `backticks`;
```

## RULE - What you open the string with you need to close the string with
* You can use multiple types of ("", '', ``) just make sure you open and close them properly

```
const sentence = 'you're in trouble' // ERROR
```

* Uncaught SyntaxError: Unexpected identifier
* Gives you line number to debug

## You can escape
* Use a backslash `\` (because the slash leans backwards)

```
const sentence = 'you\'re in trouble';
```

* Type sentence in client console
    - Output also shown below

```
> sentence
< "you're in trouble"
```

## How do you escape a back slash?
```
const sentence = 'you\'re in trouble\\';
console.log(sentence);
```

## To avoid escaping just mix and match
```
const sentence = "you're in trouble";
console.log(sentence);
```

## backticks
```
const sentence = `backticks are so "cool"`;
console.log(sentence);
```

## Multi-line string
```
const multiLineString = `this

is

a

multi-line

string`;
console.log(multiLineString);
```

* It will maintain your lines
* This helps greatly with building html
* Without it you have to do lots of concatenating

### What is concatenation?
* When 2 or more strings are combined into one

### What is interpolation?
* When you put a variable inside of a string

```
// concatenation and interpolation
const name = "Phil";
const greeting = "Hello " + name;
console.log(greeting);

// template strings and interpolation
const backticksGreeting = `Hello ${name}!`;
console.log(backticksGreeting);
```

### Problems with concatenation
* verbose
* Easy to make mistakes
* concatenated numbers with one number as a string
* `"1"` + 1 (returns `"11"`)

## You can put math inside interpolation
```
const someMath = `I can add two numbers like this ${100 + 200}`;
console.log(someMath);
```

## String literals make creating html sooooo easy
```
const html = `
<div className="container">
  <h2>${name}</h2>
  <p>${someMath}</p>
  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique debitis earum hic modi. Asperiores unde reiciendis reprehenderit, magni libero ducimus, molestiae eaque maiores tenetur sunt non repellendus earum ea assumenda?</p>
</div>
`;

document.body.innerHTML = html;
```

* `innerHTML` is not the best DOM to use, we'll talk about security issues later
