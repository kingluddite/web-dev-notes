# Arrow Functions

## 3 Main Benefits
1. More concise
2. Have implicit returns
    - Allows us to write one liners
3. It doesn't rebind the value of `this` when you use an arrow function inside of another function
    - Helpful when you are doing things like `click` handlers

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Arrow Functions</title>
</head>

<body>
  <script>
    const names = ['manny', 'moe', 'jack'];

    const fullNames = names.map(function(name) {
      return `${name} pep boys`;

    });

    console.log(fullNames);
  </script>
</body>

</html>
```

Will out put each item in the array and append to each of them `pep boys`

But it is not an arrow function.

## Convert above to an arrow function.

`=>` known as a "Fat Arrow"

```js
const names = ['manny', 'moe', 'jack'];

const fullNames = names.map(function(name) {
  return `${name} pep boys`;
});

const fullNames2 = names.map((name) => {
  return `${name} pep boys`;
});

// if you just have one parameter
const fullNames3 = names.map(name => {
  return `${name} pep boys`;
});

// use an implicit return
const fullNames4 = names.map(name => `${name} pep boys`);

console.log(fullNames);
console.log(fullNames2);
console.log(fullNames3);
console.log(fullNames4);
```

* What is an `explicit return`?

When you explicitly write the word `return`

example of explicit return

```js
const fullNames3 = names.map(name => {
  return `${name} pep boys`;
});
```

## Implicit return

```js
const fullNames4 = names.map(name => `${name} pep boys`);
```

* When you delete your curly brackets makes it an implicit return
* No `return` needed

## Arrow Function are always anonymous functions
* May change in future?

### Benefit of named functions

```js
function helloWorld( name ) {
    console.log( 'hello world' );
}
```

* If you do a stack trace, and find an error, the error will give you the line number of the named function
* If you use an arrow function you can not name them
* But you can store it in a variable

```js
const helloWorld = (name) => { console.log( `Hello ${name}!` ) };
helloWorld('Phil'); // Hello Phil!
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Arrow Functions Example</title>
</head>

<body>
  <script>
    const race = '100m Dash';
    const winners = ['Jane Doe', 'John Doe', 'Doe A Deer'];

    /* use an object to give us something like
     {
     name: 'John Doe',
     place: 1,
     race: race
   }
     */

    const win = winners.map((winner, i) => {
      name: winner,
      race: race,
      place: i
    });
  </script>
</body>
```

* The above example gives us an `unexpected token :` error but if we add parenthesees around the object like this:
* The parenthesees show you are going to return an object literal
* In console type `> win` and you will see all your objects

* Super cool tip: `console.table(win)` will output your data in a nice tabular format

![tabular output from console](https://i.imgur.com/fVshUVe.png)

* problem that place starts at zero so do this to fix it:

```js
const win = winners.map((winner, i) => ({
      name: winner,
      race: race,
      place: i + 1
    }));
```

**note** if your property and value are named the same like `race: race` you can just write `race` like:

```js
const win = winners.map((winner, i) => ({
      name: winner,
      race,
      place: i + 1
    }));
```

* That was an example of an implicit return with an object literal

## Filter a list
Poll some ages and only show people who are older than 65.

```js
const ages = [11, 23, 33, 41, 67, 88, 2, 90, 54, 21];
const old = ages.filter(age => age >= 60);
console.log(old); // [67, 88, 90]
```
