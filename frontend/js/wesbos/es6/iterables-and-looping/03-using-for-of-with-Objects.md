# for of Loops with Objects
You can not iterate over objects with `for of` Loops

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>For Of with Objects</title>
</head>
<body>
<script>
  const apple = {
    color: 'Red',
    size: 'Medium',
    weight: 50,
    sugar: 10
  };

  for (const prop of apple) {
    console.log(prop);
  }
</script>
</body>
</html>
```

Will give you this error: `TypeError: apple[Symbol.iterator] is not a function`

## What are some of our options?
```js
for (const prop of apple.entries()) {
  console.log(prop);
}
```

That will cause an Error now but [this spec](https://github.com/tc39/proposal-object-values-entries) says it will soon be released and available

Currently in Stage 4. You could polyfill it.

If you can't polyfill, you can use:

```js
for (const prop of Object.keys(apple)) {
  console.log(prop);
}
```

Object.keys(apple) - will take in an Object and it will return to us an array of all of the keys. So we don't have values yet and we don't have entries yet

Output:

```
color
size
weight
sugar
```

How can we get the values?

```js
for (const prop of Object.keys(apple)) {
  const value = apple[prop];
  console.log(value, prop);
}
```

![values and props](https://i.imgur.com/L0IvqTl.png)

## for in Loop will give you something similar
```js
for (const prop in apple) {
  const value = apple[prop];
  console.log(value, prop);
}
```

```
Red color
Medium size
50 "weight"
10 "sugar"
```

Recommendation. Use `for in` loops until TC39 is released


