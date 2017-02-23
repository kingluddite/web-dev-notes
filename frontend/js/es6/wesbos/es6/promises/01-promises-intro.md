# Promises Intro
Often used when fetching JSON API and doing AJAX work

[Let's use this API](https://kingluddite.com/wp-json/wp/v2/posts)

Make the API more readible [with this Chrome Extension](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc)

# Fetch
Built into the browser and also returns a promise

## What is Fetch?
Similar to [`$.getJSON`](http://api.jquery.com/jquery.getjson/) or [`$.ajax()`](http://api.jquery.com/jquery.ajax/) - if you used jQuery before

The benefit of Fetch is rather than have to load an external library (like jQuery), it is built directly into the browser

## What is a promise?
Something that will happen between now and the end of time or something that will happen in the future but most likely not immediately

Keep in mind that JavaScript is almost entirely asynchronous.

[What does asynchronous JavaScript mean?](https://www.youtube.com/watch?v=YxWMxJONp7E)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Promises</title>
</head>
<body>
<script>
 console.log('Getting in the car and going to fetch some post from the kingluddite blog. Oh Yeah!');
 const posts = fetch('http://kingluddite.com/wp-json/wp/v2/posts');
 console.log('All Done!');
 console.log(posts);
</script>
</body>
</html>
```

Our log and `fetch()` line happen immediately and if it can't grab it at that time it will queue it up but it does not store them in your `posts` variable (different than PHP where you stop everything from running).

When it is queued up, it doesn't put the posts inside the `posts` variable, it puts in a `promise`

Think of the promise like ('Hey I don't have the data just yet, but here's an IOU that shows you I'm good for it.. and when they do come back, I'll let you know')

[This of this guy for promises](https://www.youtube.com/watch?v=NJ6xBaZ92uA)

```js
const postsPromise = fetch('http://kingluddite.com/wp-json/wp/v2/posts');
postsPromise.then()
```

## then()
Think of `then()` like a callback

```js
$('a').on('click', function() {
    alert('yo');
});
```

That callback (above's second parameter) will only run when someone clicks so `then()` will only function when the data comes back from the promise

```js
const postsPromise = fetch('https://kingluddite.com/wp-json/wp/v2/posts');
postsPromise.then(data => {
  console.log(data);
});
```

## API cannot load
Use a server and install `$ npm i -g http-server`

### Run server in folder
`$ http-server` and make sure you are viewing the current HTML file

URL should be something like: `http://127.0.0.1:8080/promises-intro.html`

### Is data returned?
If you get status 200, ok, Then we are getting the right info and we are ready to return it

```js
const postsPromise = fetch('https://kingluddite.com/wp-json/wp/v2/posts');
postsPromise.then(data => {
  return data.json();
});
```

### Refactor with implicit return
```js
const postsPromise = fetch('https://kingluddite.com/wp-json/wp/v2/posts');
postsPromise.then( data => data.json() );
```

### call in the json data
```js
const postsPromise = fetch('https://kingluddite.com/wp-json/wp/v2/posts');
postsPromise.then( data => data.json() ).then(data => { console.log(data) });
```

Output: `[Object, Object, Object, Object, Object, Object, Object, Object, Object, Object]`

And open one of the Objects to see:

![one post](https://i.imgur.com/0qCGOcG.png)

### Chaining - better readability
```js
const postsPromise = fetch('https://kingluddite.com/wp-json/wp/v2/posts');

postsPromise
  .then( data => data.json() )
  .then(data => { console.log(data) });
```

### Listen to a `catch`
`then()` fires when we have a successful call but what if there is an error? That is wath `.catch()` is for. 

You can chain as many `.then()` as you need and at the end add your `.catch()`. These will alert you to any errors that happen along the way

```js
const postsPromise = fetch('https://kingluddite.com/wp-json/wp/v2/posts');

postsPromise
  .then(data => data.json())
  .then(data => { console.log(data) })
  .catch((err) => {
    console.error(err);
});
```

Refresh and it is working. No errors. But if you change

`const postsPromise = fetch('https://kingluddite.com/wp-jsan/wp/v2/posts');`

And hit refresh, you'll get this error:

![error](https://i.imgur.com/Q07vEnl.png)

But you can see this error: `TypeError: Failed to fetch` That error is coming from our `.catch()`

**note** We did use `console.error()`. That shows errors in the console

That is fetch at a 10,000 foot view. Let's dive deeper.
