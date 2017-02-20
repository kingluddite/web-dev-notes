# Arrow Functions intro

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Arrow functions </title>
</head>

<body>
  <script>
    const names = ['manny', 'moe', 'jack'];
    const fullNames = names.map(function(name) {
      return `${name} handy`;
    });

    console.log(fullNames);
  </script>
</body>

</html>
```

## Outputs
`["manny handy", "moe handy", "jack handy"]`

### Rewrite as an arrow function using `fat arrow`

#### What is a fat arrow?
`=>`

#### Compare the two
```js
const names = ['manny', 'moe', 'jack'];
const fullNames = names.map(function(name) {
  return `${name} handy`;
});

const fullNames2 = names.map((name) => {
  return `${name} handy`;
});

console.log(fullNames);
console.log(fullNames2);
```

View in inspector and see they do the exact same thing

#### If you have 2 parameters
```js
const fullNames2 = names.map((name, age) => {
  return `${name} handy`;
});
```

### If you only have 1 parameter
You can remove the parenthesees

```js
const fullNames3 = names.map(name => {
  return `${name} handy`;
});
```

### Use an implicit return
What is an explicit return?
When you explicitly write the word `return`

A lot of our callback functions we write in JavaScript are just one liners where we just return something immediately and we don't need to use a lot of additional lines using `return`

`const fullNames4 = names.map(name => ``${name} handy``);`

* If we put all on one line and remove `{}`, we don't have to explicitly write the `return` word

### If you have no arguments
`const fullNames5 = names.map(() => ``handy``);`

### Arrow functions are always anonymous functions
**note** May change in the future

#### What is a named function?

```js
function myName(name) {
    console.log(`Hello ${name}`);
}
```

##### What is benefit of using a named function?
If you have a stack trace and you have an error, named functions are useful because they will tell you the line number in that function where the error is

If you use an arrow function, you can not name them but you can assign them to a variable like:

```js
const sayMyName = (name) => {
  console.log(`Hello ${name}`);
}
sayMyName('John'); // Outputs: Hello John
```

The bad news is it is an anonymous function and it won't, if you are using stack traces, give you good error messages

Can put on one or multiple lines:

```js
const sayMyName = (name) => { console.log(`Hello ${name}`); }
sayMyName('John');
```
