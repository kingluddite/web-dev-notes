# More Arrow Function examples

Starter file

`index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>More Arrow Function examples</title>
</head>

<body>
  <script>
    const race = '100m Dash';
    const winners = ['John Doe', 'Bob Doe', 'Peter Doe'];
  </script>
</body>

</html>
```

You are building an app and you don't have the data in the format that you want

Ideally we'd like an object to be created... something like this:

```js
{
    name: 'John Doe',
    place: 1,
    race: race
}
```

We could use `map()` again

**note** `map()` is not the only function that arrow functions work with. Arrow functions work with anything and are particularly useful as a callback situations

```js
const win = winners.map(winner => {name: })
```

**note** We want to return an Object from each so we use `{}`

```js
const win = winners.map(winner, i => {
  name: winner,
  place: i,
  race: race
});
```

**note** Since we are using 2 arguments we need to use parenthesees

```js
const win = winners.map((winner, i) => {
  name: winner,
  place: i,
  race: race
});
```

This gives us an `Unexpected token :` error. Earlier we learned that removing the curly brackets means you have an implicit return. But if you are working with an Object `{}`, how do you implicitly return curly brackets when you mean for it to be an Object literal, not the actual function block?

You use parenthesees around the object like this:

```js
const win = winners.map((winner, i) => ({
  name: winner,
  place: i,
  race: race
}));
```

These parenthesees show that you are returning an Object literal (and the nested curly brackets `{}` are not for the function block)

Type `win` in the console and you will see all your Objects

![3 objects](https://i.imgur.com/mTDrxTJ.png)

But then you have to work hard to open all 3 objects up in console

## Super tip!
Type this instead `console.table(win)`

![console.table() is cool](https://i.imgur.com/0CCz1wH.png)

Problem: place is 0 based. Just change the code to this:

```js
const win = winners.map((winner, i) => ({
  name: winner,
  place: i + 1, // adding 1 here
  race: race
}));
```

![correct place](https://i.imgur.com/qm26qNs.png)

## Clearing up redundancy
Inside our object we use `race: race`. This is redundant so in ES6 we can just use one `race` like this:

```js
const win = winners.map((winner, i) => ({
  name: winner,
  place: i + 1,
  race // just using race by itself
}));
```

## Filter a list of numbers
Only show users who are older then 21

`const ages = [18, 17, 33, 14, 7, 99, 80, 20, 21, 22, 55];`

### Old Way
`const old = ages.filter(age => if(age > 50)) { return true; }`

In `filter()` will return true if true and won't return if it is false

```js
const ages = [18, 17, 33, 14, 7, 99, 80, 20, 21, 22, 55];
const old = ages.filter(age => age >= 21);
console.log(old);
```


