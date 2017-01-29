# `let` vs `const`

* `var` is function scoped only
* `let` and `const` are **block scoped**

Inside the scope you can only declare the variables once using `let` and `const`

## This will give you an error

```js
const key = 'abc123';
let points = 50;
let winner = false;
let points = 60;
```

![error already been declared](https://i.imgur.com/s7tpoyO.png)

If you can easily override your variable values (like you can with `var`), this can cause bugs in your code. That is one reason `let` and `const` were introduced.

## block scope in action

```js
const key = 'abc123';
let points = 50;
let winner = false;

if (points > 40) {
  let winner = true;
}
```

If you type `winner` in console you will get `false` because we don't have access to the winner inside the if statement because let is block scoped so we don't have access to it in the global scope

Both the `winner` variables are two completely different variables because they are scoped to two completely different scopes

## Change from `let` to `var`

```js
const key = 'abc123';
let points = 50;
var winner = false;

if (points > 40) {
  var winner = true;
}
```

Now `winner` (if you type in console) will be `true` because the second `winner` is not scoped to the `if` curly brackets

## `const` variables can not be updated

```js
const points = 50;
points = 60;
```

Will give you an error because you can not update a variable when using `const`

![update error with const](https://i.imgur.com/g28slQd.png)

## `let` variables were made to be updated

```js
let points = 50;
points = 60;
```

`points` will be updated to `60`

## const objects can't be updated
People think that `const` is immutable

Immutable means that which cannot be changed or modified

```js
const person = {
  name: 'John',
  age: 30
}
```

Typing `person` in console gives you the Object back

By trying to update the `person` Object with `person = {name: "Johnny"}`

Gives you a `TypeError: Assignment to constant variable`

![assignment constant error](https://i.imgur.com/b3InLUJ.png)

## const Object properties can be updated
That is because the entire object is not immutable, it just can not be reassigned

Way to think of it with Objects. I am not going to change but attributes about me might change

![update object attributes](https://i.imgur.com/gGHmc66.png)

## Can you freeze everything in an object?
Yes using `Object.freeze()`. (not part of ES6)

```js
const person = {
      name: 'John',
      age: 30
}

const phil = Object.freeze(person);
```

`phil.age = 300`

`phil.age` will still show you `30` because you used `freeze()`



