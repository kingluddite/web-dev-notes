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
* It has sane defaults and nice ability to cancel requests

`/public/javascripts/modules/typeAhead.js`

```
import axios from 'axios';

function typeAhead(search) {

}

export default typeAhead;
```

## Import and run `typeAhead`
`public/javascripts/delicious-app.js`

```
import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';
import typeAhead from './modules/typeAhead'; // add this line

autocomplete($('#address'), $('#lat'), $('#lng'));

typeAhead($('.search')); // add this line
```

### Test to see if `typeAhead` is working
* Run in browser and you should see this:

![search typeAhead test working](https://i.imgur.com/afGa3na.png)

### Our task for wiring up Search feature
* Listen when someone types in box
* We will hit our API endpoint with value typed into search box
* Wait for results to come back
* Populate list with dropdown values of result

`typeAhead.js`

```
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

### Test to see if it is working so far
* We should see the input and div we want

![input and div](https://i.imgur.com/bgDfZqh.png)

* When you hover over the `search__results` **div** it will be <u>0 pixels high</u> because there is no data inside this **div** yet

### Listening for input event
* `bling.js` enables us to use `on()` instead of `addEventListener()`

`typeAhead.js`

```
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
* We use proper function because we need `this` bind

`typeAhead.js`

```
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
      .get(`/api/search?q=${this.value}`)
      .then((res) => {
        console.log(res.data);
      });
  });
}

export default typeAhead;
```

* If someone types stuff in and then removes it all we should get rid of any search results **div** (and we also need to stop our function from running because there is nothing to search for)
    - We hide it with CSS `searchResults.style.display = 'none'`
    - And when we `return` we stop the function from running
* We make sure to make our results **div** visible again if field input has a value
* We use Axios to fetch data from our endpoint and pass as our query whatever the user typed into the input
* We log to test if it is working

### Super Coolness!
* When you test check out your console, each letter you type returns an empty array until you get a hit like `coffee` and that will return 3 object

![array hits](https://i.imgur.com/XAqCQCo.png)

* If you remove the search term completely, you get nothing returned because our function is not running
* Check out one of our data points returned

![data point](https://i.imgur.com/cHaaZnu.png)

### Only return data when we have something inside the result
`typeAhead`

```
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
We will generate a dropdown of the results

![dropdown results](https://i.imgur.com/MID529v.png)

`typeAhead.js`

```
function searchResultsHTML(stores) {
  return stores.map((store) => {
    return `
      <a href="/stores/${store.slug}" class="search__result">
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

* When you type `beer` in search input you get strings inside an array

![strings inside an array](https://i.imgur.com/TwSerKC.png)

* We just want a string so we add `.join()` like this

```
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

And this will give us the string of HTML that we want

![string of html results](https://i.imgur.com/mXW8KTo.png)

### Tie it into our template
To make the results populate our dropdown we use:

`typeAhead.js`

```
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

![dropdown working](https://i.imgur.com/2pVCh1W.png)

## Houston we have a problem
* If we remove letters from our search it isn't finding anything but it doesn't remove our search terms unless the form is completely empty
* The fix is simple:

`typeAhead.js`

```
// more code

// show the search results
searchResults.style.display = 'block';
searchResults.innerHTML = ''; // add this line

// more code
```

## Add catch error
`typeAhead.js`

```
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
We want to use up and down arrow and enter to operate dropdown

* First, find the key numbers for arrow up, arrow down and enter
* down arrow (40)
* up arrow (38)
* enter (13)

`typeAhead.js`

```
// more code

// handle keyboard inputs
  searchInput.on('keyup', (e) => {
    // if they aren't pressing up, down or enter, ignore it
    if (![38, 40, 13].includes(e.keyCode)) {
      return; // leave function
    }
    console.log('Do stuff');
  });
}

export default typeAhead;
```

### Long If, Elseif, else
`typeAhead.js`

```
  // handle keyboard inputs
  searchInput.on('keyup', (e) => {
    // if they aren't pressing up, down or enter, ignore it
    if (![38, 40, 13].includes(e.keyCode)) {
      return; // leave function
    }
    const activeClass = 'search__result--active';
    const current = search.querySelector(`.${activeClass}`);
    const items = search.querySelectorAll('.search__result');
    let next;
    // if they press down and their is a current keyCode already
    if (e.keyCode === 40 && current) {
      // then next will be the current one + 1 or if it is the last
      // one it will move to the first one
      next = current.nextElementSibling || items[0];
      // if they press down and their is no current, next is the first item
    } else if (e.keyCode === 40) {
      next = items[0];
      // if they press up and their is a keyCode get the sibling before the current one or select the last item in the list
    } else if (e.keyCode === 38 && current) {
      next = current.previousElementSibling || items[items.length - 1];
      // if they just press up then select the last item in the list
    } else if (e.keyCode === 38) {
      next = items[items.length - 1];
      // if they hit enter and the item has an href attribute
    } else if (e.keycode === 13 && current.href) {
        // send them to the href value page
      window.location === current.href;
    }
    // add the activeClass to our next item
    next.classList.add(activeClass);
  });
```

* we put `search__result--active` in class to save us from typing it a lot
* we store in current the selector with the active class
* we store all the search results inside `items`
* we use `let` because we will be updating it
    - what are we currently on and if we press down or up what will be the **next** one
* This adds class but never removes class

![all dropdowns will get class](https://i.imgur.com/ZDGDXnE.png)

* If we add a class, we need to remove it from the current item

```
// more code
if (current) {
  current.classList.remove(activeClass);
}
next.classList.add(activeClass);
// more code
```

* If there are no results, we currently just clear it out totally
* We will now change the code to give the user more info like `no results found yet`
* Remove this line: `searchResults.innerHTML = '';`

```
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
    // tell user nothing came back
    searchResults.innerHTML = `<div class="search__result">NO results for ${this.value} found</div>`;
  })
// more code
```

![no results found for term](https://i.imgur.com/HH3H11a.png)

### This is a great web site to quickly find KeyCodes
[Find keycodes fast](http://keycode.info/)


### Aside
Imports ES6 vs 

#### Client Side
* We use ES6 on our **frontend** (aka **Client side**) so all will use `import MODULE from 'MODULE_LOCATION'` syntax (ie `import axios from 'axios';`)

#### Server Side
* We are using CommonJS modules
* example `const passport = require('passport');`
    - The reason for this is ES6 modules are not available yet in node

## XSS Attack
Cross Site Scripting Attack

### We currently are susceptible to a XSS Attack

### Test to show how we are vulnerable
1. Create a new store
2. In the name add `test <img src="http://localhost:7777/uploads/dd708ca7-622d-4aa1-8586-e75e0fcfdadb.png" onload="alert('u waz hacked')" />` in the name field and save it
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

Anywhere you are setting HTML

`typeAhead.js`

* We wrap `dompurify.sanitize()` around any embedded HTML

```
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
Now you can still add an image but the `onload` has been stripped out by DOMPurify

### Challenge
* Use library to prevent adding HTML to fields
* You can
    - Use other libraries to strip out images
    - Even better, when someone saves the data to Database you can strip out the images as well
        + How?
            * Go into Store.js
            * Add another `storeSchema.pre('save', async function(next) {`
                we did one previously for the `slug`
                but you could use another node library that will strip any unnecessary HTML or any HTML from specific fields
                Maybe some HTML you want to be available in description (bold or underline?) but no HTML in title then just add a new pre save
