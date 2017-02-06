# Destructuring Arrays

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Destructuring Arrays</title>
</head>
<body>
  <script>
    const details = ['John Doe', 123, 'jdoe.com'];
  </script>
</body>
</html>
```

To access the Array data we would do something like:

```js
const details = ['John Doe', 123, 'jdoe.com'];
const name = details[0];
const id = details[1];
const email = details[2];
```

**note** When you pull from an Array to destructure you use square brackets `[]` and when you pull from an Object you use curly brackets `{}`

**note** When you pull from a Map you use curley brackets `{}`. When you pull from a set you use square brackets `[]`

```js
const details = ['John Doe', 123, 'jdoe.com'];
const [name, id, website] = details;
console.log(name, id, website); // John Doe 123 jdoe.com
```

## Helpful when given a comma separated data in a string

```js
const data = 'AI, North Hollywood, California, USA';
```

We could create an Array of those Strings because they all have a comma using the String `split()` method

```js
const data = 'AI, North Hollywood, Los Angeles, California, USA';
console.log(data.split(',')); // ["AI", " North Hollywood", " California", " USA"]
```

We can restructure that data with:

```js
const data = 'AI, North Hollywood, California, USA';
const [school, city, state, country] = data.split(',');
```

The second line above will immediately return an array when using `data.split(',')` and then we restructure that array

Now we can `console.log()` those variables

```js
const data = 'AI, North Hollywood, California, USA';
const [school, city, state, country] = data.split(',');
console.log(school, city, state, country); // AI  North Hollywood  California  USA
```

## The rest operator `...` with restructuring
It gives you the `rest` of something

Here is your team:

`const team = ['Bob', 'Rick', 'Jerry', 'Mike', 'Tony'];`

But Bob is your captain.
Rick is assistant captain.
And then you have the rest of the team.

`const [captain, assistant, ...players] = team;`

Will give you this output in console:

![team restructured with rest operator](https://i.imgur.com/wdPAZBa.png)

