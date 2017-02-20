# Tagged Template Literals

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Tagged Templates</title>
</head>

<body>
  <script>
    const name = 'Peaches';
    const age = 100;
    const sentence = `My dog's name is ${name} and he is ${age} years old`;
    console.log(sentence);
  </script>

</body>

</html>
```

## How you tag with a function name

```js
function highlight() {
      
}
const name = 'Peaches';
const age = 100;
const sentence = highlight`My dog's name is ${name} and he is ${age} years old`;
console.log(sentence);
```

You create a function and put that function name in front of your Template String.

### What happens
1. The browser runs the function
2. The browser will provide it with all the information about the String (all the pieces the person typed and all the variables that get passed in)
3. And whatever we return from our function is what `sentence` is going to be

It is kind of like a `step inbetween`. Tagging Templates give us the ability to modify a string anyway we want before it is processed by the browser

## Let's return `awesome`

```js
function highlight() {
  return 'awesome';
}
const name = 'Peaches';
const age = 100;
const sentence = highlight `My dog's name is ${name} and he is ${age} years old`;
console.log(sentence);
```

Not very useful but cool.

### arguments
```js
function highlight(strings, ...values) {
  return 'awesome';
}
```

`...values` - takes the rest of our arguments and puts them in an array for us

## debugger
Let's analyze how tagged templates work

Modify your `highlight()` function to look like:

```js
function highlight(strings, ...values) {
  debugger;
}
```

Run in browser and it will stop the function from running and it will stop on that `debugger` statement so we can analyze what is happening

Look inside the `Scope` of your inspector

![scope in inspector](https://i.imgur.com/AKjTrO3.png)

The local scope of the window has:
* `this` (Window)
* strings
* values

`strings` and `values` are what we passed into it (can be named anything)

### Array of `strings`
Strings is an array of 3 things. It breaks up the one string based on where the variables were (it breaks them up into the biggest pieces it can until a variable has interupted it)

### Array of `values`
We get an array of the values we passed in ("Peaches" and 100)

Our Array of `strings` is ALWAYS going to be 1 bigger than the `values` array

To show that add a `gender` variable

```js
function highlight(strings, ...values) {
    debugger;
  }
  const name = 'Peaches';
  const age = 100;
  const gender = 'male';

  const sentence = highlight `My dog's name is ${name} and he is ${age} years old ${gender}`;
  console.log(sentence);
```

![output of 1 more string than value](https://i.imgur.com/Nl7ZQ9A.png)

Why? Because we can use the function to build the string ourself rather than relying on the browser to do it

Update to:

```js
function highlight(strings, ...values) {
    let str = '';
    strings.forEach((string, i) => {
      str += string + values[i];
    });
    return str;
  }
  const name = 'Peaches';
  const age = 100;

  const sentence = highlight `My dog's name is ${name} and he is ${age} years old`;
  console.log(sentence);
```

* We are using `let` because we will be changing the value of the variable. If you change it to `const` you will get an error

We loop through each of the strings and add them to `str` and we get:

`My dog's name is Peaches and he is 100 years oldundefined`

Why `undefined?`
Because the strings array is always going to be one more that the values array so when we hit the last one it will be a string and it will have no value attached to it

A trick to remove the undefined

```js
function highlight(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += string + (values[i] || '');
  });
  return str;
}
```

## Use Template Strings to improve our code
Old

`str += string + (values[i] || '');`

New
`str += ``${string} <span class="highlight">${values[i] || ''}</span>``;`

View the output and you'll see:

```
My dog's name is  <span class="highlight">Peaches</span> and he is  <span class="highlight">100</span> years old <span class="highlight"></span>
```

Our **span** with our new **class** is wrapped around each of our **strings**

Add our CSS

```html
<head>
  <meta charset="UTF-8" />
  <title>Tagged Templates</title>
  <style>
    .highlight {
      background: #ffc600;
    }
  </style>
</head>
```

Add it to our body

```js
document.body.innerHTML = sentence;
```

Gives us this:

![output of highlights](https://i.imgur.com/aGZ6uD0.png)

### Editable Content
Make the content editable with:

```js
strings.forEach((string, i) => {
  str += `${string} <span contenteditable class="highlight">${values[i] || ''}</span>`;
});
```

Refresh and now the user can update the highlighted text

