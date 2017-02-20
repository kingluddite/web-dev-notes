# Destructuring Objects

## Starting code
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Destructuring Objects</title>
</head>
<body>
<script>
  const person = {
    first: 'John',
    last: 'Doe',
    country: 'USA',
    city: 'Hollywood',
    twitter: '@jdoe'
  };
</script>
</body>
</html>
```

## What does destructuring mean?
A JavaScript expression that allows us to extract data from arrays, objects, maps and sets into their own variable

* Allows us to extract properties from an Object or items from an Array, multiple at a time

## What problem does it solve?
Reduces repetitive code like:

```js
const first = person.first;
const last = person.last;
const country = person.country;
const city = person.city;
const twitter = person.twitter;
```

We need to make a variable from something that is inside an Array

## Destructuring Syntax
`const { }`

* This is not a block nor is it an Object, it is the destructuring syntax

```js
const {first, last, country, city, twitter} = person;
```

Make a variable of everything inside `{}` and take it from the person Object

We could also do this:

```js
const {fist, last} = person;
```

We are taking two properties from the person Object and making them two top level variables

Enter into console `first` and `last` and you will get their values of `"John"` and `"Doe"`

![console output](https://i.imgur.com/CcTGdYR.png)

## React use with destructuring
You use destructuring in React a lot because the data is so deeply nested

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Nested Data with Destructuring</title>
</head>
<body>
<script>
  const jdoe = {
    first: 'John',
    last: 'Doe',
    links: {
      social: {
        twitter: 'https://twitter.com/jdoe',
        facebook: 'https://facebook.com/jdoe'
      },
      web: {
        blog: 'https://jdoe.com'
      }
    }
  }
  const { twitter, facebook } = jdoe.links.social;
</script>
</body>
</html>
```

To get at our social media links we could:

```js
const twitter = jdoe.links.social.twitter;
const facebook = jdoe.links.social.facebook;
```

But with restructuring data we can do this:

```js
const { twitter, facebook } = jdoe.links.social;
```

And typing `twitter` in console will give you `"http://twitter.com/jdoe`

## Another Use Case: Renaming your variables
Sometimes you get data back from an API and you don't want to use the property key used

You can rename variables as you destructure them. This is useful because when working with `const` you won't be able to use a variable name that is already defined.

```js
const { twitter:tweet, facebook:fb } = jdoe.links.social;
```

Now you can type `fb` in the console and it will return `"http://facebook.com/jdoe"`

## How to set defaults
Kind of confusing at first but it makes more sense the more you use it

```js
const settings = { width: 300, color: 'black' } // height, fontSize
const { width, height, color, fontSize} = settings;
```

But we will get undefined for `height` and `fontSize` becuase we did not define them in our original `settings` variable. This will cause an error.

But we can do this to set default values:

```js
const settings = { width: 300, color: 'black' } // height, fontSize
const { width = 100, height = 100, color = 'blue', fontSize = 25} = settings;
```

And destructuring will work like this:
`width` - is it in the settings object? Yes - So `width` is `300`
`height` - is it in the settings object? No - So `height` is `100`
`color` - is it in the settings object? Yes - So `color` is `'blue'`

Check out in console and you will see this in action

![default restructing](https://i.imgur.com/mOOrsyI.png)

## Object Destructuring with variable renaming & default values
All in one example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>All in one Destructuring</title>
</head>
<body>
  <script>
    const { w: width = 400, h: height = 500 } = { w: 800 }
  </script>
</body>
</html>
```

We destructure the object on the right. If I type `width` it will give me `800` because that is in the object. If I type `height` it gives me `500` because that is not in the object in the right and we use it's default value.

This last one probably won't be used much in practical applications. Just fun to know.





