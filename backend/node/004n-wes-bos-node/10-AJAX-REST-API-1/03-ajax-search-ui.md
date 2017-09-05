# Creating an Ajax Search Interface
## Let's add our search Interface
`layout.pug`

* Add the following to our layout template

![search template code](https://i.imgur.com/g67Yh1B.png)

* Add our search css

`_search.scss`

```
.search {
  position: relative;
  width: 100%;
  display: flex;
  &__results {
    background: white;
    position: absolute;
    width: 100%;
    top: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 5;
    left: 0;
  }
  &__input {
    font-size: 30px;
    background: none;
    color: white;
    outline: 0;
    border: 0;
  }
  &__result {
    padding: 10px;
    display: block;
    border-bottom: 1px solid #ececec;
    &--active {
      background: #f1f1f1;
    }
  }
}
```

* Don't forget to import `_search.scss` into `style.scss`!

`style.scss`

```
// more code
@import 'partials/flashes';
@import 'partials/search'; // add this line
```

![search box](https://i.imgur.com/CDDsTlE.png)

* Here is the HTML used to make it:

![html for search form](https://i.imgur.com/6I4m4Mb.png)

```
<div class="search">
    <input class="search__input" type="text" placeholder="Coffee, beer..." name="search">
    <div class="search__results"></div>
</div>
```

## Axios Library
* Similar to `fetch` that is built into the browser
    - [fetch vs axios article](https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5)
* It has same defaults and nice ability to cancel requests

### Let's build our typeAhead function

`/public/javascripts/modules/typeAhead.js`

```js
import axios from 'axios';

function typeAhead(search) {
  console.log(search);
}

export default typeAhead;
```

## Import and run `typeAhead`
`public/javascripts/tra-app.js`

```js
import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead'; // add this line

autocomplete($('#address'), $('#lat'), $('#lng'));

typeAhead($('.search')); // add this line
```

### Test to see if `typeAhead` is working
* Run in browser and you should see this:

![search typeAhead test working](https://i.imgur.com/7XfcMVt.png)

### Our task for wiring up Search feature
* Listen when someone types in box
* We will hit our API endpoint with the value typed into the search box
* Wait for results to come back
* Populate list with dropdown values of result

`typeAhead.js`

```js
import axios from 'axios';

function typeAhead(search) {
  // if for any reason search is not on page do not run search
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  console.log(searchInput, searchResults);
}

export default typeAhead;
```

* We use `querySelector` to quickly search the DOM
* If you are wondering why I did not use `getElmentById` or `getElementsByClassName` [here is a good intro to the topic](https://stackoverflow.com/questions/26848289/javascript-queryselector-vs-getelementbyid)

### Test to see if it is working so far
* We should see the input and div we want

![input and div](https://i.imgur.com/iYmfojd.png)

* When you hover over the `search__results` **div** it will be <u>0 pixels high</u> because there is no data inside this **div** yet

![no height in `.search__results`](https://i.imgur.com/7weBT4Z.png)

* You can use the Styles diagram to see there is `0` height
* There is also a popup that shows you the height is `0`

![no heigh in `.search__results`](https://i.imgur.com/FCb2fHf.png)

### Listening for input event
* `bling.js` enables us to use `on()` instead of `addEventListener()`
* **remember** We are using `bling.js` to save us time and typing :)

`typeAhead.js`

```js
import axios from 'axios';

function typeAhead(search) {
  // if for any reason search is not on page do not run search
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');
  
  // we add the this chunk of code below
  searchInput.on('input', function () {
    console.log(this.value);
  });
}

export default typeAhead;
```

* Test in browser and type in search box and each key is registered in the console as you type it
* We use proper function because we need to bind `this`

![typeAhead is working](https://i.imgur.com/kQZQasR.png)

`typeAhead.js`

```js
import axios from 'axios';

function typeAhead(search) {
  // if for any reason search is not on page do not run search
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function () {
    // if there is no value, quit
    if (!this.value) {
      searchResults.style.display = 'none';
      return; // stop
    }

    // show the search results
    searchResults.style.display = 'block';

    axios
      .get(`/api/v1/search?q=${this.value}`)
      .then((res) => {
        console.log(res.data);
      });
  });
}

export default typeAhead;
```

* If someone types stuff in the search box and then removes it all we should get rid of any search results **div**
* And we also need to stop our function from running because there is nothing to search for
    - We hide it with CSS `searchResults.style.display = 'none'`
    - And when we `return` we stop the function from running
* We make sure to make our results **div** visible again if field input has a value
* We use Axios to fetch data from our `endpoint` and pass as our query whatever the user typed into the input
* We log to test if it is working

#### Comment
* I forgot to comment this out earlier so I did it now

`autocomplete.js`

```
// more code
function autocomplete(input, latInput, lngInput) {
  // console.log(input, latInput, lngInput); // comment this line out
// more code
```

### Super Coolness!
* When you test check out your console, each letter you type returns an empty array until you get a hit like `gymboree` and that will return 5 object

![array hits](https://i.imgur.com/XAqCQCo.png)

* If you remove the search term completely, you get nothing returned because our function is not running
* Check out one of our data points returned

![data point](https://i.imgur.com/HU5ZfYM.png)

### Only return data when we have something inside the result
`typeAhead.js`

```js
// more code
axios
      .get(`/api/v1/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          console.log('There is something to show');
        }
      });
// more code
```

## Make result HTML to display to users
* We will eventually generate a dropdown of the results that looks like this:

![dropdown results](https://i.imgur.com/0QppLvk.png)

`typeAhead.js`

```js
function searchResultsHTML(stores) {
  return stores.map((store) => {
    return `
      <a href="/store/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `;
  });
}

// more code

    axios
      .get(`/api/v1/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          console.log('There is something to show');
          const html = searchResultsHTML(res.data);
          console.log(html);
        }
      });

// more code
```

* We grab our results and put them each inside an `<a>` tag with `href` pointing to the slug URL and a class to style each link called `search__result`
* Here is the CSS

`_search.scss`

```
.search {
  position: relative;
  width: 100%;
  display: flex;
  &__results {
    background: white;
    position: absolute;
    width: 100%;
    top: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 5;
    left: 0;
  }
  &__input {
    font-size: 30px;
    background: none;
    color: white;
    outline: 0;
    border: 0;
  }
  &__result {
    padding: 10px;
    display: block;
    border-bottom: 1px solid #ececec;
    &--active {
      background: #f1f1f1;
    }
  }
}
```

* Each of the links will by styled with this:

![results style](https://i.imgur.com/td0CWTS.png)

* When you type `gymboree` in search input you get strings inside an array

![strings inside an array](https://i.imgur.com/HLTPTlX.png)

* We just want a string so we add `.join()` like this

```js
function searchResultsHTML(stores) {
  return stores.map((store) => {
    return `
      <a href="/store/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `;
  }).join('');
}
```

* And this will give us the string of HTML that we want

![string of html results](https://i.imgur.com/jglYkgT.png)

### Tie it into our template
* To make the results populate our dropdown we use:

`typeAhead.js`

```js
// more code
    axios
      .get(`/api/v1/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          const html = searchResultsHTML(res.data);
          searchResults.innerHTML = html;
        }
      });
// more code
```

![dropdown working](https://i.imgur.com/N2gkQAp.png)

## Houston we have a problem
* If we remove letters from our search it isn't finding anything
* But it doesn't remove our search terms unless the form is completely empty

### The fix is simple:

`typeAhead.js`

```js
// more code

// show the search results
searchResults.style.display = 'block';
searchResults.innerHTML = ''; // add this line

// more code
```

## Add catch error
`typeAhead.js`

```js
    axios
      .get(`/api/v1/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          const html = searchResultsHTML(res.data);
          searchResults.innerHTML = html;
        }
      })
      .catch((err) => {
        console.log(err);
      });
```

* That will log any errors to terminal
* Or if you have [Sentry support](https://docs.sentry.io/) it will send error to it

### Test it out
1. Do a search for `beer`
2. Click on one item in dropdown
3. You are taken to that page

## Add keyboard shortcuts to dropdown
* This is to make our search box a better user experience
* We want to use **up** and **down** `arrow` and enter to operate dropdown

### Find the key numbers for arrow up, arrow down and enter
* down arrow `(40)`
* up arrow `(38)`
* enter `(13)`

### This is a great web site to quickly find KeyCodes
[Find keycodes fast](http://keycode.info/)

`typeAhead.js`

```js
function typeAhead(search) {
  // more code

  searchInput.on('input', function() {
    // more code
  });
  
  // handle keyboard inputs
  searchInput.on('keyup', (event) => {
    // if they aren't pressing up, down or enter, ignore it
    if (![38, 40, 13].includes(event.keyCode)) {
      return; // leave function
    }
    console.log('Do stuff');
  });
}

export default typeAhead;
```

## Test it out
* Entery `Gymboree` in search box
* If you you click **up**, **down**, or **enter** keys you get console message
* If not, you won't
* If it is doing that it is working
* If not, troubleshoot

### Long If, else if, else
* Now we have to program the logic for each of our keys

`typeAhead.js`

```js
  // handle keyboard inputs
  searchInput.on('keyup', (event) => {
    // if they aren't pressing up, down or enter, ignore it
    if (![38, 40, 13].includes(event.keyCode)) {
      return; // leave function
    }
    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;
    // if they press down and there is a current keyCode already
    if (event.keyCode === 40 && current) {
      // then next will be the current one + 1 or if it is the last
      // one it will move to the first one
      next = current.nextElementSibling || items[0];
      // if they press down and there is no current, next is the first item
    } else if (event.keyCode === 40) {
      next = items[0];
      // if they press up and their is a keyCode get the sibling before the current one or select the last item in the list
    } else if (event.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
      // if they just press up then select the last item in the list
    } else if (event.keyCode === 38) {
      next = items[items.length - 1];
      // if they hit enter and the item has an href attribute
    } else if (event.keyCode === 13 && current.href) {
        // send them to the href value page
      window.location === current.href;
      return;
    }
    // add the activeClass to our next item
    next.classList.add(activeClass);
  });
```

* We put `search__result--active` in class to save us from typing it a lot
* We store in `current` the selector with the active class
* We store all the search results inside `items`
* We use `let` instead of `const` because we will be updating it
    - What are we currently on?
    - And if we press `down` or `up` what will be the **next** one
* This adds class but never removes class (_we'll fix this next_)

![all dropdowns will get class](https://i.imgur.com/CIKadUW.png)

### Clearing classes

* If we add a class, we need to remove it from the current item

```js
// more code
if (current) {
  current.classList.remove(activeClass);
}
next.classList.add(activeClass);
// more code
```

* If there are no results, we currently just clear it out totally

### No Results Found Yet
* We will now change the code to give the user more info like `no results found yet`
* Remove this line: `searchResults.innerHTML = '';`

```js
// more code
axios
  .get(`/api/v1/search?q=${this.value}`)
  .then((res) => {
    if (res.data.length) {
      const html = searchResultsHTML(res.data);
      searchResults.innerHTML = html;
      return;
    }
    // ADD THIS CHUNK BELOW
    // tell user no results came back
    searchResults.innerHTML = `<div class="search__result">NO results for ${this.value} found</div>`;
  })
// more code
```

![no results found for term](https://i.imgur.com/czrF0aw.png)

* Make our text black for no results found

`_search.scss`

```
// more code
&__result {
    padding: 10px;
    display: block;
    border-bottom: 1px solid #ececec;
    color: $black;
    &--active {
      background: #f1f1f1;
    }
  }
// more code
```

### Aside
`import` ES6 vs Node's `require`

#### Client Side
* We use ES6 on our **frontend** (aka **Client side**) so all will use `import MODULE from 'MODULE_LOCATION'` syntax (ie `import axios from 'axios';`)

#### Server Side
* We are using `CommonJS` modules
* Example `const passport = require('passport');`
    - The reason for this is ES6 modules are not available yet in Node.js

## XSS Attack
Cross Site Scripting Attack

### We currently are susceptible to a XSS Attack

### Test to show how we are vulnerable
1. Create a new store
2. In the `name` add `test <img src="http://localhost:7777/uploads/dd708ca7-622d-4aa1-8586-e75e0fcfdadb.png" onload="alert('u waz hacked')" />` in the name field and save it
3. Save
4. Click on 'Stores' link in navbar
5. You will get an alert with `u waz hacked`

![hacked alert](https://i.imgur.com/SqEW0Gp.png)

## Problem
* We allowed someone to put an image tag inside of their store name which in most cases `pug` will take care of it for you
* But when we are responsible for creating the HTML ourselves as we did in our search results

`typeAhead.js`

```
searchResults.innerHTML = `<div class="search__result">NO results for ${this.value} found</div>`;
```

* Search for `test`
* And you will see the `alert()` again
* And since we can do a JavaScript `alert()` anyone can load any JavaScript they want here and this is XSS and a security issue that could potentially ruin your web site

## Rule
Before you ever embed HTML into your webpage you need to **sanitize** that data

## DOMPurify
* Purify Library
* [Link](https://github.com/cure53/DOMPurify)

* import it

`typeAhead.js`

```
import axios from 'axios';
import dompurify from 'dompurify';

// more code
```

* Anywhere you are setting HTML

`typeAhead.js`

* We wrap `dompurify.sanitize()` around any embedded HTML

```js
// more code
axios
      .get(`/api/v1/search?q=${this.value}`)
      .then((res) => {
        if (res.data.length) {
          const html = dompurify.sanitize(searchResultsHTML(res.data));
          searchResults.innerHTML = html;
          return;
        }
        // tell user nothing came back
        searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">NO results for ${this.value} found</div>`);
      })
      .catch((err) => {
        console.log(err);
      });
// more code
```

## Test now
Now you can still add an image but the `onload` has been stripped out by `DOMPurify`

## Final code
`typeAhead.js`

```js
import axios from 'axios';
import dompurify from 'dompurify';

function searchResultsHTML(stores) {
  return stores.map(store => {
    return `
      <a href="/store/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `;
  }).join('');
}

function typeAhead(search) {
  if (!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function() {
    // if there is no value, quit it!
    if (!this.value) {
      searchResults.style.display = 'none';
      return; // stop!
    }

    // show the search results!
    searchResults.style.display = 'block';

    axios
      .get(`/api/v1/search?q=${this.value}`)
      .then(res => {
        if (res.data.length) {
          searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
          return;
        }
        // tell them nothing came back
        searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value}</div>`);
      })
      .catch(err => {
        console.error(err);
      });
  });

  // handle keyboard inputs
  searchInput.on('keyup', (e) => {
    // if they aren't pressing up, down or enter, who cares!
    if (![38, 40, 13].includes(e.keyCode)) {
      return; // nah
    }
    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;
    if (e.keyCode === 40 && current) {
      next = current.nextElementSibling || items[0];
    } else if (e.keyCode === 40) {
      next = items[0];
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1]
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
    } else if (e.keyCode === 13 && current.href) {
      window.location = current.href;
      return;
    }
    if (current) {
      current.classList.remove(activeClass);
    }
    next.classList.add(activeClass);
  });
}

export default typeAhead;
```

### Challenge
* Use library to prevent adding HTML to fields
* You can
    - Use other libraries to strip out images
    - Even better, when someone saves the data to Database you can strip out the images as well
        + How?
            * Go into `Store.js`
            * Add another `storeSchema.pre('save', async function(next) {`
                - We did one previously for the `slug`
                - But you could use another node library that will strip any unnecessary HTML
                - Or any HTML from specific fields
                - Maybe some HTML you want to be available in description (bold or underline?)
                - But no HTML in title then just add **a new pre save**

### Troubleshoot
* Make sure your link inside `store.pug` is this:

`store.pug`

```
extends layout

block content
    .single
      .single__hero
        img.single__image(src=`/uploads/${store.photo || 'store.png'}`)
        h2.title.title--single
          a(href=`/store/${store.slug}`) #{store.name}

    .single__details.inner
      img.single__map(src=h.staticMap(store.location.coordinates))
      p.single_location= store.location.address
      p= store.description

      if store.tags
        ul.tags
          each tag in store.tags
            li.tags
              a.tag__link(href=`/tags/${tag}`)
                span.tag__text= tag
```

* I accidentally had this:

``` 
a(href=`/stores/${store.slug}`) #{store.name}
```

* And it should be:

```
a(href=`/store/${store.slug}`) #{store.name}
```


