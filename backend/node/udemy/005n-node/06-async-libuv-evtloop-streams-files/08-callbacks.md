# Callbacks
* A function passed to some other function, which we assume will be invoked at some point
* The function 'calls back' invoking the function you give it when it is done doing its work

## Let's look at how we do that in JavaScript
`app.js`

```js
function greet(callback) {
  console.log('Yo');
  callback();
}

greet(function() {
  console.log('The callback was invoked');
});
```

* Will output

```
Yo
The callback was invoked
```

* So my function was invoked
    - And then it invoked the callback

## Call again with different callback
```js
function greet(callback) {
  console.log('Yo');
  callback();
}

greet(function() {
  console.log('The callback was invoked');
});

greet(function() {
  console.log('This time the callback is different');
});
```

* And this time the output will look like this:

```
Yo
The callback was invoked
Yo
This time the callback is different
```

## We could say my callback will always take some parameter
```js
function greet(callback) {
  console.log('Yo');
  const data = {
    name: 'John Doe'
  };

  callback(data);
}

greet(function(data) {
  console.log('The callback was invoked');
  console.log(data);
});

greet(function(data) {
  console.log('This time the callback is different');
  console.log(data.name);
});
```

* Lots you can do with the **callback pattern**
    - You could have a function that goes out and gets data from the Database
        + Then you might call that function different ways at different times and want to do different things with that data
            * So just give it a callback, give it the data, and then do what you want with the data

## Takeaway
* When we see ourselves passing a function to a function in this pattern it is known as a **callback**
* The function I invoke will invoke later the function that I give it 
