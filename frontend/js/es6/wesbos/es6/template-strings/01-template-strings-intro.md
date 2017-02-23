# Intro to Template Strings
In JavaScript when you want to put a variable inside a string it is cumbersome.

Many other languages have the ability to drop your variable inside a string and it will interpolate it.

Problem in JavaScript arrive all the time when people forget to add spaces or forget their `+` operator. There has to be a better way!

`template-strings.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>Template Strings</title>
</head>

<body>
  <script>
    var name = 'Peaches';
    var age = 2;

    var sentence = 'My dog ' + name + ' is ' + age * 7 + ' years old.';
  </script>

</body>
</html>
```

Type `sentence` into the console and it will spit out `"My dog Peaches is 14 years old."`

But if you forget an operator like:

```js
var name = 'Peaches';
    var age = 2;

    var sentence = 'My dog ' + name + ' is ' + age * 7 ' years old.';
```

You'll get a `SyntaxError: Unpected string` error. The error gives you a line number but the string is long it is hard to find where the missing operator is on that line. There has to be a better way.

## The better way - Template Strings
In JavaScript there were two ways to make a String, double quotes ("") and single quotes (''). Now there is a third way. A Template String (``)

Template strings use backticks (` `). The same key as the tilde `~` on your keyboard

![the backtick](https://i.imgur.com/vnUjhKc.png)

Template Strings are new with ES6. Let's convert our previous string using ES6 and Template Strings

```js
const name = 'Peaches';
const age = 2;
const sentence = `My dog ${name} is ${age * 7} years old.`;
```

View in the inspector, type `sentence` and you'll see it is just like it was before. Take note of our syntax for multipling a variable with static number

#### Inside the `{}` you can:

`${age * 7}`

* Run JavaScript
* Insert a variable
* Run a function



