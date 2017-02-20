# The for of Loop
Used to loop over any type of data that is iterable

## What is an `iterable`?
Anything that can be looped over

* Array
* String
* Map
* Set
* Generator

## Starter file

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>The for of Loop</title>
</head>
<body>
  <script>
    const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];
  </script>
</body>
</html>
```

## The regular `for loop`

```js
const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

for (let i = 0; i < cuts.length; i++) {
  console.log(cuts[i]);
}
```

### The console Output:
```
Chuck
Brisket
Shank
Short Rib
```

What is the downside of the `for loop` syntax?

* Confusing syntax
* Scares dev newbies
* Doesn't read well

## the forEach() array method
```js
cuts.forEach((cut) => {
  console.log(cut);
});
```

### The console Output:
```
Chuck
Brisket
Shank
Short Rib
```

That works well. What's the downside of using `forEach()`

* You can not abort the loop
* We can not skip one of the loops

**Example:** How would we stop once we hit the word `Brisket`?

```js
cuts.forEach((cut) => {
  console.log(cut);
  if (cut === 'Brisket') {
    break;
  }
});
```

But when we run we get `SyntaxError: Illegal break statement`

Why? You can't use a `break` inside a `forEach()`

### Can't use `continue`
```js
cuts.forEach((cut) => {
  console.log(cut);
  if (cut === 'Brisket') {
    continue;
  }
});
```

## The `for in` Loop
```js
for (const cut in cuts) {
  console.log(cut);
}
// 0 1 2 3
```

It gives us the index so we have to do it this way:

```js
for (const index in cuts) {
  console.log(cuts[index]);
}
```

### The console Output:
```
Chuck
Brisket
Shank
Short Rib
```

Any problems? If people add things to the prototype of the Array

### Add shuffle method to Array prototype

```js
Array.prototype.shuffle = function () {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
    j = Math.floor( Math.random() * ( i + 1 ) );
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
}
```

We just added a `shuffle()` method to all Arrays. In the browser console we can type:

`cuts.shuffle()` and it will shuffle our array to something like:

![shuffled arrays](https://i.imgur.com/Xr1rbdJ.png)

Different every time!

Cool but we now have a problem.

```js
for (const index in cuts) {
  console.log(cuts[index]);
}
```

![Output from adding to Array prototype](https://i.imgur.com/H7khlEX.png)

`for in` Loops iterate over absolutely everything in the Array including things that have been added to the prototype. It doesn't just iterate over the items of the Array but it also iterates over additional things that have been added

If I add a property to `cuts` with:

```js
cuts.shop = 'MM Eats';

for (const index in cuts) {
  console.log(cuts[index]);
}
```

You will see it is added to our Array

![item added](https://i.imgur.com/8grw5JI.png)

**note** You would not see it added if it came after the `for in` Loop like this:

```js
for (const index in cuts) {
  console.log(cuts[index]);
}

cuts.shop = 'MM Eats';
```

But even if you don't modify the protoype 3rd party libraries (like MooTools)

Visit [mootools.net](https://mootools.net)

And in the console type:

```js
var names = ['one', 'two'];
for (name in names) { console.log(name) }
```

You will get a lot of stuff you didn't think you had

![Moo Tools and for in](https://i.imgur.com/nPazflg.png)

The reason this happens is MooTools has modified the prototype and that's what shows up when you use a `for in` loop

## The `for of` Loop
Gives us the best of all the other Loops

You can use the `for of` Loop for any type of data **except Objects**

```js
for (cut of cuts) {
  console.log(cut);
}
```

**note* Above is not correct because you didn't use `const` and `cut` will leak into the global namespace (if you run in the browser you will see your list of 4 items in your `cuts` array but if you then type `cut` you will see `Short Rib`). This is a better way

```js
for (const cut of cuts) {
  console.log(cut);
}
```

And if you type `cut` you will get a `ReferenceError: cut is not defined`

Even though I still have messed with the prototype and added a property to the `cuts` array, it works with no side effects

## We can use `break` with it
Once it hits `'Brisket'` it stops the entire loop from going any further

```js
for (const cut of cuts) {
  console.log(cut);
  if (cut === 'Brisket') {
    break;
  }
}
```

Output

```
Chuck
Brisket
```

## We can use `continue`
If we want to skip a whole bunch of stuff. It doesn't break the entire loop but it just skips over one iteration

```js
for (const cut of cuts) {
  if (cut === 'Brisket') {
    continue;
  }
  console.log(cut);
}
```

Output

```
Chuck
Shank
Short Rib
```
