# Multiple Promises

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Multiple Promises</title>
</head>
<body>
<script>
const weather = new Promise((resolve) => {
  setTimeout(() => {
    resolve({ temp: 29, conditions: 'Sunny with Clouds'});
  }, 2000);
});

const tweets = new Promise((resolve) => {
  setTimeout(() => {
    resolve(['I like cake', 'Peanut M&M\'s are my favorite!']);
  }, 500);
});

</script>
</body>
</html>
```

In some cases you want to fire off all your promises off at the same time because they are not dependent on each other and you want to get these things back as soon as possible

## Promise.all() vs .then()
If you are chaining `promises` together you use `.then()` but if you are sending the `promises` all out together (one is not dependent on the other) you use `.all()`

### Promise.all(array of promises)
Pass it an array of promises

```js
Promise
    .all([weather, tweets])
    .then(responses => {
      console.log(responses);
    });
```

Output:

![Promises.all](https://i.imgur.com/zi6C1sD.png)

One `promise` takes `500` milliseconds, one `promise` takes `2` seconds. It will take 2 seconds because we have to wait until all the `promises` in our array have come back before we run the `.then()`. The rule of thumb is the slowest `promise` is how long it will take

## Manipulating data
How would we take that and put it into 2 separate variables?

Use destructuring

```js
Promise
    .all([weather, tweets])
    .then(responses => {
      const [weather, tweets] = responses;
      console.log(weather, tweets);
    });
```

One has our weather, one has our tweets

**tip** Don't name Promises and variables the same

```js
Promise
    .all([weather, tweets])
    .then(responses => {
      const [weatherInfo, tweetInfo] = responses;
      console.log(weatherInfo, tweetInfo);
    });
```

## Promises using real data with API

```js
const postsPromise = fetch('https://kingluddite.com/wp-json/wp/w2/posts');
const streetCarsPromise = fetch('http://data.ratp.fr/api/datasets/1.0/search/?q=paris');

Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    console.log(responses);
  });
```

In order for Fetch to work you need to run it through some sort of server. Let's use `http-server` which we installed before. Run that server

## Install browser-sync globally
Or let's install another one - browser-sync

`$ npm i -g browser-sync`

`browser-sync start --directory --server --directory --files "*.js, *.html, *.css"`

![what we get back](https://i.imgur.com/JeKIPxt.png)

Looks like our promises return two things but they are 'ReadableStream' (if you click on the `...` you will see ReadableStream appear)

But no data. How do we convert ReadableStreams to data? We did this before with one Promise but now we have multiple promises. We can use `.map()` to map over each one like this:

```js
Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    return Promise.all(responses.map(res => res.json()));
  });
```

Why `res`?

It could come back: [MDN info on Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

* arrayBuffer()
* blob()
* json()
* text()
* formData()

Glean from this: Don't always assume that your APIs are always going to be JSON, they could be any of the above

```js
Promise
  .all([postsPromise, streetCarsPromise])
  .then(responses => {
    return Promise.all(responses.map(res => res.json()));
  });
```

* responses in an array
  - map() takes every item out of an array, does something to it, and then returns a new array

 So we are taking an array of responses and taking each one and calling res.json on it

```js
 Promise
   .all([postsPromise, streetCarsPromise])
   .then(responses => {
     return Promise.all(responses.map(res => res.json()));
   })
   .then(responses => {
     console.log(responses);
   });
```

We use another `.then()` to take those responses

And that will give us data back. One from my blog the other from the french transit system
