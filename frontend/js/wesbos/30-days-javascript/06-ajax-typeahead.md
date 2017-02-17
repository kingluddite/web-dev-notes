# Ajax Typeahead

## Start file

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Type Ahead 👀</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <form class="search-form">
    <input type="text" class="search" placeholder="City or State">
    <ul class="suggestions">
      <li>Filter for a city</li>
      <li>or a state</li>
    </ul>
  </form>
<script>
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

</script>
  </body>
</html>
```

`style.css`

```css
html {
     box-sizing: border-box;
     background:#ffc600;
     font-family:'helvetica neue';
     font-size: 20px;
     font-weight: 200;
   }
   *, *:before, *:after {
     box-sizing: inherit;
   }
   input {
     width: 100%;
     padding:20px;
   }

   .search-form {
     max-width:400px;
     margin:50px auto;
   }

   input.search {
     margin: 0;
     text-align: center;
     outline:0;
     border: 10px solid #F7F7F7;
     width: 120%;
     left: -10%;
     position: relative;
     top: 10px;
     z-index: 2;
     border-radius: 5px;
     font-size: 40px;
     box-shadow: 0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19);
   }


   .suggestions {
     margin: 0;
     padding: 0;
     position: relative;
     /*perspective:20px;*/
   }
   .suggestions li {
     background:white;
     list-style: none;
     border-bottom: 1px solid #D8D8D8;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.14);
     margin:0;
     padding:20px;
     transition:background 0.2s;
     display:flex;
     justify-content:space-between;
     text-transform: capitalize;
   }

   .suggestions li:nth-child(even) {
     transform: perspective(100px) rotateX(3deg) translateY(2px) scale(1.001);
     background: linear-gradient(to bottom,  #ffffff 0%,#EFEFEF 100%);
   }
   .suggestions li:nth-child(odd) {
     transform: perspective(100px) rotateX(-3deg) translateY(3px);
     background: linear-gradient(to top,  #ffffff 0%,#EFEFEF 100%);
   }

   span.population {
     font-size: 15px;
   }


   .details {
     text-align: center;
     font-size: 15px;
   }

   .highlight-text {
     background:#ffc600;
   }

   .love {
     text-align: center;
   }

   a {
     color:black;
     background:rgba(0,0,0,0.1);
     text-decoration: none;
   }
```

[The cities is from this github repo](https://gist.github.com/Miserlou/c5cd8364bf9b2420bb29/)

But notice our endpoint is pointing to the raw file

## Fetch data
It is a huge array

We need to wait until the data is received and then when someone types in the dropdown, we will filter it into a subarray of either the city or state name match

Fetch is new with browser (old way used `$.ajax()`)

```js
const cities = [];

fetch(endpoint, function(data) {
  console.log(data);
});
```

`fetch` will work differently then you are used to because `fetch` returns a `promise`

### Add this:

```js
const prom = fetch(endpoint);
console.log(prom);
```

View in inspector and you won't see `data` but you will see a `promise`

## .then() to the rescue
You work with `Promises` using `.then()` and it will return to us a `blob` of `data`.

```js
fetch(endpoint).then(blob => console.log(blob));
```

But it is just a `blob` of `data`.

```
Response {type: "cors", url: "https://gist.githubusercontent.com/Miserlou/c5cd83…258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json", status: 200, ok: true, statusText: "OK"…}
```

It doesn't know what kind of data it is yet so we have to tell it

If we did this:

`fetch(endpoint).then(blob => JSON.parse(blob));`

This won't work because the `blob` needs to first be converted from the `blob` form it is in, into `JSON`

If you open up `Reponse` > `body: ReadableStream` > `_proto_` > `blob: blob()` you will see `json: json()`

```js
fetch(endpoint).then(blob => blob.json()).then();
```

Above the `blob.json()` is returning another promise but we can make this line easier to read with:

```js
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => console.log(data));
```

Now we get a massive array of Objects

### How do I get this data into cities?

```js
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities = data);
```

That will give us an error `Assignment to a constant variable`. 

## We could use `let`

```js
let cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities = data);
```

So we could change our `const` to `let` and that would work. We tried to wipe out the `const` `cities` variable and reassign it to `data` which is not allowed

Or... if you like to keep your variables `const` and you don't want that array changing you could:

### push() items into cities
This will give us an array inside an array which is not what we want

```js
const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(data));
```

![array nested in an array](https://i.imgur.com/rW0YZJ5.png)

### How can we get each and every item to go inside cities?

When we use `push()` an item into cities, it will add each new item as it's own item in the array

![pushing an array](https://i.imgur.com/g0JmyIs.png)

### Using a spread
We could change this array into individual arguments using a `spread`. So we will `spread` into this `push()` method/function

```js
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));
```

Now we have when we type `cities` in the console, `Array[1000]`

## Filter data
When someone types into the input box we will filter the dataset

### How do you put a variable into a regular expression?

`return place.city.match(/wordToMatch/i)`

Like this. Create a variable and use the `new RegExp()` syntax

`const regex = new RegExp(wordToMatch, 'gi')`

**note**

* g - global (look through entire string for that specific one)
* i - insensitive (not case sensitive)

![what is place.city](https://i.imgur.com/DlsDKv7.png)

### Search for city or state

`return place.city.match(regex) || place.state.match(regex);`

```js
const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}
```

Type this in the console:

`findMatch('Phil', cities)` - you'll find 1 match
`findMatch('Bos', cities)` - you'll find 2 matches

## Create display function
### Grab the input
We need to grab the input. We use the inspector and see the input has a class of `search`

`const searchInput = document.querySelector('.search');`

### Grab the suggestions
`const suggestions = document.querySelector('.suggestions');`

### Any change to the input, call our function
`searchInut.addEventListener('change', findMatches);`

```js
function displayMatches() {
  console.log(this.value);
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
```

Type a word in input box and click outside. You will see the input inside the console. The reason is the `change` event only fires when you go off that element. In order to get the effect we want we also have to add the 'keyup' event

```js
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
```

### Update our displayMatches array
```js
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  console.log(matchArray);
}
```

Now type in the input box and it will filter out the array inside the console

**tip** Get your data first

Once you have your data, then you can focus on hooking it up to event listeners as well as creating the HTML that you will need

### displayMatches
```js
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  // loop over our array with .map()
  const html = matchArray.map(place => {
    return `
      <li>
        <span class="name">${place.city}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
```

## Highlight the word in the search of city and state names
We need to find the word they are searching with using a RegEx and replace that with `<span class="highlight-text"> + their word + </span>`

```js
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  // loop over our array with .map()
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highlight-text">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight-text">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
```

## Format the numbers of population
Do a chrome search for `format numbers with commas JavaScript` and look for a [stackoverflow](http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript) to get this:

```js
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
```

### apply this function to place.population

```js
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  // loop over our array with .map()
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highlight-text">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight-text">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
```

### Complete!
Now the city, state filter is complete

Finished html file

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Type Ahead 👀</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <form class="search-form">
    <input type="text" class="search" placeholder="City or State">
    <ul class="suggestions">
      <li>Filter for a city</li>
      <li>or a state</li>
    </ul>
  </form>
<script>
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  // loop over our array with .map()
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="highlight-text">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="highlight-text">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

</script>
  </body>
</html>
```
