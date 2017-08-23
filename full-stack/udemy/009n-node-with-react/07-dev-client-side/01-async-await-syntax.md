# Aync Await Syntax
* Released with JavaScript ES2017
* This is how we used Passport to create our Google Strategy
* It uses Promises with requests to our Database to handle the asynchronous nature of our code
* We will use this new syntax on both the backend and frontend of our app

## To see how it works
* We'll write a small test snippet of code
* Write a function to retrieve a blob of json
* Make an Ajax request! Use the 'fetch' function
* `fetch` function is available with default JavaScript as part of the standard library as of ES2015
* We can use the fetch function to make Ajax requests to arbitrary endpoints from any webserver out in existance
* I want to make an Ajax request to receive some amount of information and internally I want to use the fetch function
* To make an Ajax request I need a URL to make the request to `http://rallycoding.herokuapp.com/api/music_albums`
    - That returns some JSON

`test.js`

```js
function fetchAlbums() {
  fetch('http://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}
```

* Whenever you make a request with `fetch`, fetch returns a Promise
    - That Promise is resolved with an object that represents the underlying request
    - Anytime you work with a Promise to get a little notification or a little callback that the promise has been resolved we chain on a `.then()` statement
    - This .then() will be called with the request coming from the original fetch call
        + We usually receive that as an argument called `res` (response)
        + And then to read the JSON data that we retrieve from this API (this route - `http://rallycoding.herokuapp.com/api/music_albums` we call res.json())
            - `res.json()` returns a promise of it's own that is resolved after the JSON in the request is ready for us to work with
                + That is why we chain on another `.then()` and pass it the json data we cara about
                + And then we can do whatever we want with the info that is returned
* We will test in Chrome
* You need a relatively modern browser that has support for fetch

![fetch working in browser](https://i.imgur.com/EkUNOi2.png)

### How fetch() works
![fetch() diagram](https://i.imgur.com/PNVXd6z.png)

## Refactor with new ES2017 syntax
* The whole purpose of this new syntax is to make working with Promises a little bit easier and a little bit more staight forward
* Behind the scenes we are still working with Promises
* `fetch()` still returns a `Promises`
* We are still defining a function that will only be executed after this request is resolved
* This new code makes it look like we are writing something that is more synchronous in nature

## Now we will refactor this code using async-await
* This is specifically designed to handle asynchronous code in type of any type of function

### Steps
1. Identify the function inside our codebase that contains some type of asynchronous request

* Found it!

```js
function fetchAlbums() {
  fetch('http://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}
```

2. Put the `async` keyword in front of that asynchronous function keyword

```js
async function fetchAlbums() {
  fetch('http://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json));
}
```

* This tells our JavaScript interpreter that this JavaScript contains some asynchronous code

3. Identify all the different `Promises` that are created within that function

* We have two
    - The one that is created when we call `fetch()`
        + `fetch('http://rallycoding.herokuapp.com/api/music_albums')`
    - The one that is created when we call `res.json()`
        + `... res.json())`

4. Add the `await` keyword in front of each of those `Promises`

```js
function fetchAlbums() {
  await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  await res.json()
    .then(json => console.log(json));
}
```

* Notice we remove the `.then()` code before the second await

5. Assign the resolved value of `fetch()` and `res.json()` to some intermediate values

```js
function fetchAlbums() {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json()
    .then(json => console.log(json));
}
```

6. Remove the remaining `.then`

```js
function fetchAlbums() {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json();
}
```

7. Log out your JSON
```js
async function fetchAlbums() {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums')
  const json = await res.json();

  console.log(json);
}

fetchAlbums();
```

## Compare the two pieces of code to see which is more readable
```js
// function fetchAlbums() {
//   fetch('http://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => res.json())
//     .then(json => console.log(json));
// }

async function fetchAlbums() {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
}

fetchAlbums();
```

* Obviously the latter function is more intuitive
* Behind the scenes all the same Promise stuff is still going on
* The interpreter is still going to make the fetch request to the API
* And then it won't execute any other code inside the function
* The interpreter will go off and do some other work
    - It won't pause an execution
    - It is not `await` like sleeping
    - Everything is still working the way it was before
    - We are just using a slightly different more intuitive syntax

### Test it out
Past this snippet into Chrome

```js
async function fetchAlbums() {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
}

fetchAlbums();
```

![async-await](https://i.imgur.com/w9QL32m.png)

* Works the same way as before but just a different syntax
* **note** We can also use arrow functions with async-await syntax

## Async-await with ES6 arrow functions
```js
const fetchAlbums = async () => {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
};

fetchAlbums();
```

* Paste in Chrome console and test
* You will get an error because we are using ES6 `const` and you are only allowed to declare the variable once when using `const`
* Just **refresh the page** and then paste and it will work the same as it did before

## Cool Experiment
* Let's see what is really happening behind the scenes of this cosmetic improvement in JavaScript syntax
* Visit [Babel](http://babeljs.io/)
* Click on Try it out
* Paste our snipped of code in the left
* It transpiles the code into ES2015 JavaScript code
* Uncheck `Evaluate` checkbox to prevent the code from also executing
* Look at long first line and see that Promises are still being created and used

![babel and async-await](https://i.imgur.com/25p1j18.png)

* Look how much code is needed to accomplish this fancy syntax
* At the end of the day we are just using some syntactic sugar
* We are not changing the way JavaScript works
