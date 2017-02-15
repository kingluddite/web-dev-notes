# Intro Maps
If Sets are to Arrays then Maps are to Objects

A Map works very similar to a Set but it has a `key` and a `value` instead of just a `value`

**note** keys and values can be anything

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Maps</title>
</head>
<body>
<script>
const pepBoys = new Map();

pepBoys.set('Manny', 3);
pepBoys.set('Mo', 2);
pepBoys.set('Jack', 10);
</script>
</body>
</html>
```

### In console
```
> pepBoys
< Map {"Manny" => 3, "Mo" => 2, "Jack" => 10}
> pepBoys.has('Manny')
< true
> pepBoys.get('Mo')
< 2
> pepBoys.delete('Jack')
< true
> pepBoys
< Map {"Manny" => 3, "Mo" => 2}
```

### We can loop over Maps in 2 ways
1. `for each` 
2. `for of`

#### for each loop

```js
const pepBoys = new Map();

pepBoys.set('Manny', 3);
pepBoys.set('Mo', 2);
pepBoys.set('Jack', 10);

pepBoys.forEach((val, key) => console.log(val, key));
```

#### Output

```
3 "Manny"
2 "Mo"
10 "Jack"
```

#### for of loop
```js
for (const boy of pepBoys) {
  console.log(boy);
}
```

That will give us each item in an array

```
["Manny", 3]
["Mo", 2]
["Jack", 10]
```

So we could use destructuring to get the values we want

```js
const pepBoys = new Map();

pepBoys.set('Manny', 3);
pepBoys.set('Mo', 2);
pepBoys.set('Jack', 10);

// pepBoys.forEach((val, key) => console.log(val, key));

for (const [key, val] of pepBoys) {
  console.log(key, val);
}
```

Output

```
Manny 3
Mo 2
Jack 10
```

**tip** - You can use `pepBoys.clear()` to remove all or individually delete the items with `pepBoys.delete('Mo')`
