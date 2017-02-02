# Tagged Template Santize

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tagged Templates</title>

  <style>
    abbr {
      border-bottom:1px dotted grey;
    }
  </style>
</head>
<body>

  <div class="bio">

  </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/0.8.2/purify.min.js"></script>
<script>
  
  const first = 'Wes';
  const aboutMe = `I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;
  const html = `
    <h3>${first}</h3>
    <p>${aboutMe}</p>
  `;
  const bio = document.querySelector('.bio');
  bio.innerHTML = html;
</script>
</body>
</html>
```

Whenever you create HTML and insert into DOM, you must sanitize that data.

What does `sanitize data` mean?
When you get data from a user or displaying data from a user you must make sure the user isn't doing bad stuff

Examples of bad stuff:

* Insert an iframe
* Insert an image (XSS - Cross Site Scripting)

Above example. User updates their profile on your site. They add an image but they use `onload='alert('you got hacked');"`

So when that images loads it will run the JavaScript. And that is bad. You can not let your users run JavaScript on your page.

Why? What could go wrong?

* They could drain your bank account
* Post as you
* Delete stuff
* If Facebook let JavaScript run, scripts could be added to an unknowing Facebook user to unfriend everyone, or bad peopel could look at all of their messages, or bad people could send bad messages on that unknowning facebook user's behalf

## Solution: Sanitize our data
Right now, our code takes data and inserts it into the DOM

### DOMPurify
Script that helps you sanitize your code

Links:
* [DOMPurify](https://github.com/cure53/DOMPurify)
* [CDN of DOMPurify](https://cdnjs.com/libraries/dompurify)

#### reduce(fn, what we start with)
* Our function will be an arrow function that takes
    - prev (what was the previous iteration)
    - next (what is the current iteration)
    - i (index)
    - We then return a string that tacks all of those strings together

#### Update our JavaScript

```js
function sanitize(strings, ...values) {
    const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
    return DOMPurify.sanitize(dirty);
  }
const first = 'Wes';
const aboutMe = santize`I love to do evil <img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');" />`;
const html = `
    <h3>${first}</h3>
    <p>${aboutMe}</p>
  `;
const bio = document.querySelector('.bio');
bio.innerHTML = html;
```

### Before
Using inspector we see our HTML looks like this

`<img src="http://unsplash.it/100/100?random" onload="alert('you got hacked');">`

### After
After we update our JavaScript with the above code we see this in the inspector

`<p>I love to do evil <img src="http://unsplash.it/100/100?random"></p>`

The bad XSS (`onload="alert('you got hacked');"`) has been stripped from our code.

### Other ways to use this
You could do it with a function as well

`bio.innerHTML = DOMPurify.sanitize(html)`

The example we used above is to show you how you could create a tagged template anytime you are creating HTML

We could also put the sanitize here instead

```js
const html = sanitize`
    <h3>${first}</h3>
    <p>${aboutMe}</p>
  `;
```

You can put it wherever you need to quickly sanitize something. Even if you are using variables or not it will sanitize it for you
