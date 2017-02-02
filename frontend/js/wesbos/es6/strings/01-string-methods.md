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

Stopped with 'includes' @ 3:25 of New String Methods - 17 of 66
