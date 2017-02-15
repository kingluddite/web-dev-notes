# Weak Sets
Just like Sets except there are a number of limitations/benefits to using a Weak Set

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Weak sets</title>
</head>
<body>
<script>
let dog1 = { name: 'Peaches', age: 3 };
let dog2 = { name: 'Buttons', age: 1 };
</script>
</body>
</html>
```

## Two ways to add to the Set
1. `const weakSauce = new WeakSet([dog1, dog2]);`
2. `weakSauce.add(dog2);`

```js
let dog1 = { name: 'Peaches', age: 3 };
let dog2 = { name: 'Buttons', age: 1 };

const weakSauce = new WeakSet([dog1, dog2]);
```

### Type in console
`weaksauce` - `WeakSet {Object {name: "Peaches", age: 3}, Object {name: "Buttons", age: 1}}`

`weakSauce.has(dog1)` - true

## Weak Sets Only Contain Objects
**note** - A Weak Set **can only contain** _Objects_

## Can't Loop over Weak Sets
**note** - You can not innumerate (aka loop over) Weak Sets

```js
let dog1 = { name: 'Peaches', age: 3 };
let dog2 = { name: 'Buttons', age: 1 };

const weakSauce = new WeakSet([dog1, dog2]);

for (const dog of weakSauce) {
  console.log(dog);
}
```

Will give you this error - `Uncaught TypeError: weakSauce[Symbol.iterator] is not a function`

### Why? There is not Iterator on a Weak set

### There is no `.clear()` method
Why? Weak Sets clean themselves up. This has to do with Garbage collection in memory. Which means that when we remove a reference it is autmatically sent to Garbage collection so it will remove itself

## When does Garbage collection happen?
No way to know. It depends on your browser and your computer. There is no way to force it.

### Testing if Garbage collection is working on Weak Sets

```js
let dog1 = { name: 'Peaches', age: 3 };
let dog2 = { name: 'Buttons', age: 1 };

const weakSauce = new WeakSet([dog1, dog2]);

console.log(weakSauce);
dog1 = null
console.log(weakSauce);
```

You should see both dogs. But if you wait 10 seconds and type `weakSauce` you will only see 1 dog


