# Using Generators for Ajax Flow Control

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Generators</title>
</head>
<body>
<script>

/search/my-site -> /user/123 -> /photo/456
</script>
</body>
</html>
```

## Use Case for Generators
The ability to do waterfall like AJAX requests

### Example of waterfall AJAX requests
We need information from the previous one in order to do the next request

**note** This can lead to `callback hell` where you have nested code inside of each other

* There are libraries like [`async`](https://caolan.github.io/async/) that are really good for dealing with that but now the browser is getting much better at doing this natively

* You first use an AJAX request where you search for something `/search/my-site`
    - When that search comes back maybe it gives you a user id `/user/123`
        + Then you need a second AJAX request based on that user ID
            * Then when that comes back Maybe you get a list of photos by that user
                - And then you need specific information about the first photo based on that photo ID

```js
function* steps() {
  // grab beer info
  const beers = yield ajax('http://api.react.beer/v2/search?q=hops&type=beer');
  // grab my github info
  const king = yield ajax('https://api.github.com/users/kingluddite');
  // grab a band I like
  const sawDoctors = yield ajax('https://api.discogs.com/artists/544713');
}
```

* Assume these 3 rely on each other (they don't) but we want the first one to occur, then the second and finally the third

## Imagine if we could write this line in one line of code
Where we would execute, stop, execute stop and finally execute, stop

We will write a `ajax()` function and only when that `ajax()` function executes will the next one begin

### Benefit of this
We will be able to write lots of clean code without having to worry about callbacks or promises

On page load we will create a brand new Generator called `dataGen`

`const dataGen = steps()`

We need to call the first one or it won't start

`dataGen.next()`

### kick off
Once you kick it off the first request will happen `beers` (inside our `steps()` function) and it will request `ajax()`, it will `fetch` the url we pass it `http://api.react.beer/v2/search?q=hops&type=beer`

When the data comes back, it returns a promise, we use `.then()` to turn it to `json()` and that returns another promise that we use `.then()` and when the data comes back to us, that is when we call `.next()` (and `.next()` is on the Generator that we created). The cool thing is whatever we pass to `.next(data)` will go back to the Generator and get store in `beers` (our initial variable)

So you create the variable `beers` and even if the yield call to ajax() takes 10 minutes or 10 hours the results of this yield will get put back into the `beers` variable.

Then `.next()` will run and it will go to our `king` variable and that may take 5 minutes or 5 seconds or however long but when it comes back we store it inside `king` and move on to the `sawDoctors` ajax() call

```js
function ajax(url) {
  fetch(url).then(data => data.json()).then(data => dataGen.next(data));
}
function* steps() {
  // grab beer info
  console.log('grabbing some brewskies');
  const beers = yield ajax('http://api.react.beer/v2/search?q=hops&type=beer');
  console.log(beers);

  // grab my github info
  console.log('grabbing some github');
  const king = yield ajax('https://api.github.com/users/kingluddite');
  console.log(king);

  // grab a band I like
  console.log('going to find some great musak!');
  const sawDoctors = yield ajax('https://api.discogs.com/artists/544713');
  console.log(sawDoctors);
}

const dataGen = steps();
dataGen.next(); // kick it off
```

And that will show you when it starts and comes back and stores it in the variable for all 3

![all 3 with Generators](https://i.imgur.com/4rmb9W0.png)
