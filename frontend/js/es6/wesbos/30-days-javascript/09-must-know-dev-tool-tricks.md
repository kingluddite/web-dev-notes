# 14 Must know Dev Tools Tricks

`index.html`

```html
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- <link rel="stylesheet" href="css/main.css"> -->
    </head>
    <body>
        <p onClick="makeGreen()">xBREAKxDOWNx</p>
        <script src="js/main.js"></script>
    </body>
</html>
```

`js/main.js`

```js
const dogs = [{ name: 'Peaches', age: 2 }, { name: 'Guinness', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}
```

Takes first paragraph, makes green and increases size

## How do I know where the JavaScript is that is doing stuff to my page
Find `p` in Elements tab of inspector > right click > Break On > attribute modifications > click on `p` in browser

You will be taken to the line in JavaScript that is affecting the page `Paused on attribute modifications`

### How to take `attribute modifications` off
Elements panel > right click > uncheck attribute modifications

### Console `dot` what?
 
```js
const dogs = [{ name: 'Peaches', age: 2 }, { name: 'Guinness', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log('hello');

// Interpolated
console.log('Hello I am a %s string', 'FUNNY');
// ES6 backtics and template strings is better
const funny = 'FUNNY';
console.log(`hello I am a ${funny} string`);

// Styled
console.log('%c I am some great text', 'color: blue; background: red; text-shadow: 10px 10px 0 black; font-size: 50px');

// warning!
// gives you stack trace to where it was
console.warn('Warning Will Robinson!');

// error
// gives you stack trace to where it was
// if you had a couple functions calling, it would give you entire stack trace
console.error('Houston we have a problem');

// Info
console.info('We\re gonna need a bigger boat');

// Testing if things are true
console.assert(1 === 2, 'That is wrong!'); // only fires if something is wrong

const p = document.querySelector('p');

console.assert(p.classList.contains('ouch'), 'That is wrong!');

// clear your console
console.clear(); // put at bottom of JavaScript to mess with developers

// Viewing DOM Elements
console.log(p);
// all stuff that lives on that element you can have access to
console.dir(p); // gives you dropdown

console.clear();

// Grouping together
// https://i.imgur.com/qJkrFbQ.png
dogs.forEach((dog) => {
  console.group(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// collapse them by default
dogs.forEach((dog) => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});

// counting
// will let you know how many times you used anything
console.count('Soccer');
console.count('Soccer');
console.count('Soccer');
console.count('Soccer');
console.count('Soccer');
console.count('Soccer');
console.count('Basketball');
console.count('Soccer');
console.count('Basketball');
console.count('Soccer');
console.count('Basketball');

// timing - find out how long something takes
console.time('fetching data');
fetch('https://api.github.com/users/kingluddite')
  .then(data => data.json())
  .then((data) => {
    console.timeEnd('fetching data');
  });

// performance.now()
performance.now(); // type in console

// take array of objects (assuming they all have same properties)
console.table(dogs);
```
