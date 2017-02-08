# Chaining Promises & Flow Control

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Chaining Promises & Flow Control</title>
</head>
<body>
<script>
const posts = [
   { title: 'I want candy!', author: 'John Doe', id: 1 },
   { title: 'I want kittens!', author: 'Jane Doe', id: 2 },
   { title: 'I want laughs!', author: 'Steven Wright', id: 3 },
];
const authors = [
  { name: 'John Doe', twitter: '@jdoe', bio: 'Average Guy'},
  { name: 'Jane Doe', twitter: '@janedoe', bio: 'Average Gal'},
  { name: 'Steven Wright', twitter: '@swright', bio: 'Funny Guy'},
];
</script>
</body>
</html>
```

We are going to create to functions creating Promises and we will chain them together

```js
function getPostById(id) {
  return new Promise((resolve, reject) => {
    const post = posts.find(post => post.id === id);
  });
}
```

Go through all our posts and when the `id` matches the `id` passed to the function

```js
function getPostById(id) {
  // create a new promise
  return new Promise((resolve, reject) => {
    // simulate it taking 2 seconds
    // mimic a database
    setTimeout(() => {
      // find the post we want
      const post = posts.find(post => post.id === id);
      if(post) {
        resolve(post); // send the post back
      } else {
        reject(Error('No Post Was Found'));
      }
    }, 1000);
  });
}

getPostById(2)
  .then(post => {
    console.log(post);
  });
```

### Output in console
```js
Object
author: "Jane Doe"
id: 2
title: "I want kittens!"
```

## Hydrating
Currently, our author is hard coded to the posts but how can we replace it with the author object?

```js
function hydrateAuthor(post) {
  // create a new promise
  return new Promise((resolve, reject) => {
    // find the author
    const authorDetails = authors.find(person => person.name === post.name);
    if(authorDetails) {
      // "hydrate" the post object with the author object
      post.author = authorDetails;
      resolve(post);
    } else {
      reject(Error('Can not find the author'))
    }
  });
}

getPostById(2)
  .then(post => {
    return hydrateAuthor(post);
  })
  .then(post => {
    console.log(post);
  })
  .catch(err => {
    console.error(err);
  });
```

We get an error: `Error: Can not find the author`

**note** See difference between `console.log()` and `console.error()`. The latter gives us a little more info to debug

### Time to debug with `debugger`
```js
function hydrateAuthor(post) {
  // create a new promise
  return new Promise((resolve, reject) => {
    // find the author
    debugger; // add this line to debug
    const authorDetails = authors.find(person => person.name === post.name);
    if(authorDetails) {
      // "hydrate" the post object with the author object
      post.author = authorDetails;
      resolve(post);
    } else {
      reject(Error('Can not find the author'))
    }
  });
}
```

Refresh browser

![debug error](https://i.imgur.com/QMpq2zy.png)

The problem is was not `post.name` it was `post.author`

Change this:

`const authorDetails = authors.find(person => person.name === post.name);`

To this:

`const authorDetails = authors.find(person => person.name === post.author);`

Remove the `debugger` and Refresh and you will see:

![Object with property with Object](https://i.imgur.com/0dG9bty.png)

If you use `getPostById(1)`, you'll get the first post but if you pass a post that doesn't exist like `getPostById(200)` our `.catch()` will alert us that that post does not exist

![No Post Found](https://i.imgur.com/q1gsdaC.png)

We needed the posts to come back first before we searched for the author.
