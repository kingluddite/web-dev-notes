# Spread into function

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Spread into a function</title>
</head>
<body>
<script>
const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];
</script>
</body>
</html>
```

## Task
Take `newInventors` array items and place them in the `inventors` array without creating a new array

What about this?

```js
const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];
inventors.push(newInventors);
console.log(inventors);
```

![not what we wanted](https://i.imgur.com/Uj94ZpX.png)

That just stuffs a complete array as an item inside our `inventors` array. Not what we wanted

The old way to solve this problem

```js
const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];
inventors.push.apply(inventors, newInventors);
console.log(inventors); // ["Einstein", "Newton", "Galileo", "Musk", "Jobs"]
```

That works. How? When you call `apply()` it runs the function that you called `apply()` against (`push()`) but with every single item in the array as an argument

So it takes the two items and essentially does this `inventors.push('Musk', 'Jobs')` which is what we want. You can't push an array into an array but using this technique worked well in the past and works well now

But the problem with that syntax is that it is hard to understand

## A better E6 way with spread
```js
const inventors = ['Einstein', 'Newton', 'Galileo'];
const newInventors = ['Musk', 'Jobs'];
inventors.push(...newInventors);
console.log(inventors); // ["Einstein", "Newton", "Galileo", "Musk", "Jobs"]
```

It works and it's easier to understand

## Review
We've used spread to spread into arrays but you can also spread into a function

## Other Use: Spread the array to a function

```js
const name = ['John', 'Doe'];

function sayHi(first, last) {
  alert(`Hey there ${first} ${last}`);
}

sayHi(name[0], name[1]);
```

Alerts `Hey there John Doe`

### A better way with spreads
```js
const name = ['John', 'Doe', 'III'];

function sayHi(first, last, suffix) {
  alert(`Hey there ${first} ${last} ${suffix}`);
}

sayHi(...name);
```

Gives you all the values `Hey there John Doe III`
