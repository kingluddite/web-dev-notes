# Understanding Sets with Brunch

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Brunch with Sets</title>
</head>
<body>
<script>

</script>
</body>
</html>
```

```js
const brunch = new Set();
// as people start coming in
brunch.add('john');
brunch.add('rick');
brunch.add('jane');
brunch.add('michelle');
// ready to open!
const line = brunch.values();
// ok who's up ?
console.log(line.next().value); // john
console.log(line.next().value); // rick
// where are we now
console.log(line); // SetIterator {"jane", "michelle"}
```

**note** When you call `line.next().value` it will remove that item from the set and move onto the next item in the set


