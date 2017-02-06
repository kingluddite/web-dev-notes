# String Methods
Strings in ES6 come with 4 new methods

* .startsWith()
* .endsWith()
* .includes()
* .repeat()

These new string methods are handy and help us write more readible code and reduce us always using RegEx for every little thing

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Strings</title>
</head>
<body>
<script>
  const course = 'RFB2';
  const flightNumber = '20-AC2018-jz';
  const accountNumber = '825242631RT0001';

  const make = 'BMW';
  const model = 'x5';
  const color = 'Royal Blue';
</script>
</body>
</html>
```

## Run in browser and use inspector and type:

```js
course.startsWith('RFB'); // true
course.startsWith('rfb'); // false
```

No way to make this case insensitive. If you need this, use RegEx

### Skipping characters
```js
flightNumber.startsWith('AC'); // false
```

But if you want to find out what the code starts with after a certain amount of characters, you can pass the 2nd parameter

```js
flightNumber.startsWith('AC', 3); // true
```

### endsWith() works similarly
With obvious difference

```js
flightNumber.endsWith(`-jz`)
```

### Just take first x number of characters and ignore the rest

```js
accountNumber.endsWith('RT', 11);
```

## `includes()`
Checks if that string is anywhere inside it

Search for `242` in accountNumber

Type in console:
`accountNumber.includes('242'); // true`

* It is not case sensative
* It was supposed to be called `.contains()` but was changed to `.includes()`

## `repeat()`
Allows you to take a string and repeat it `n` times

`Snake.repeat(20);`

Outputs:

`"SnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnakeSnake"`

## Align different length string to align to right
```js
const make = 'BMW';
const model = 'x5BMW';
const color = 'Royal Blue';

function leftPad(str, length = 20) {
  return `▶️ ${' '.repeat(length - str.length)}${str}`;
}

console.log(leftPad(make));
console.log(leftPad(model));
console.log(leftPad(color));
```

![left padding in console](https://i.imgur.com/5Rntlvo.png)

[Where did I get that emoji?](http://matthewpalmer.net/rocket/)

Batman joke
Type in console

``${'some string' * 5}`.repeat(10) + ' Batman!';``

![Batman joke](https://i.imgur.com/03Tm9Qq.png)
