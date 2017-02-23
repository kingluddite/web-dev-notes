# Creating Promises
Create a new variable and store a new promise inside of it

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Creating Promises</title>
</head>
<body>
<script>
const p = new Promise();
</script>
</body>
</html>
```

## resolve
The JSON comes back

## reject
The data doesn't come back because of an error or data was malformed or whatever reason you want to reject the data

```js
const p = new Promise((resolve, reject) => {
  
});
```

We will call `resolve` or `reject` when we are ready to finish this promise

```js
const p = new Promise((resolve, reject) => {
  resolve('I love candy!');
});

p
  .then(data => {
    console.log(data);
  });
```

Run in browser and the console will show immediately `I love candy!`

**Why?** We created a promise and immediately resolved it

## Not useful but
If we want to resolve something after some time:

* After some processing has been done
* Maybe do an AJAX request in the background and when it comes back do something with it
* Lots of use cases for when you would want to use a Promise
* Bottom line: You don't want to stop JavaScript from running, I just want to start this thing and when it comes back, I'll deal with it

### After 5 seconds deal with this Promise
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('I love candy!');
  }, 5000);
});

p
  .then(data => {
    console.log(data);
  });
```

## Can also call reject
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Candy gives you cavities!');
  }, 5000);
});
```

After 5 seconds: `Uncaught (in promise) Candy gives you cavities!`

### Why is it uncaught (in promise)?
Because we didn't `catch()` it

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Candy gives you cavities!');
  }, 5000);
});

p
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
```

Output error from `.catch()`: `Candy gives you cavities!`

![Catch error](https://i.imgur.com/Tms4gb1.png)

Why does the error tell us it is on line `20` when it is really on line `11`

## Error Object
You need to pass it to the error object

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error('Candy gives you cavities!'));
  }, 5000);
});
```

And that will tell you the real line number of the error: 
`Error: Candy gives you cavities! at setTimeout (creating-promises.html:11)`






