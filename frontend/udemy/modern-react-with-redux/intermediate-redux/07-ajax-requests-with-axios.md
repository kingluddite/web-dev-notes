# Ajax requests with Axios
Middleware has the ability to block, modify or pass through `actions` as they are created before they hit a `reducer`

**food for thought** Think of Middleware as a **gate keeper**

* We installed a piece of Middle called `redux-promise`
    - Will help us with our **Ajax** request

* We will wait a bit before we talk about Middleware and `redux-promise`

## Create the Ajax Request
* Our Application `state` holds all the data of our app
    - That will include weather data in this app
    - We only change our Application `state` through our `reducers` and our `actions`

To load our weather data and change our Application state we need to **dispatch** an `action`, call an `Action Creator` which will be responsible for making that **Ajax** request

`src/actions/index.js`

* Inside this file we will create our `Action Creator` that will be responsible for calling our API request to go and fetch our weather data

**notes**

* `Action Creators` ALWAYS must return an **action**
* An `action` is an **object** with ALWAYS has to have a **type**

```
export function fetchWeather() {
   return {
     type:
   };
}
```

The last time we created an `action` it had a **type** that was a `string` like this:

```
export function fetchWeather() {
   return {
     type: 'FETCH_WEATHER'
   };
}
```

* This time we won't use a `string` and instead we will extract it as a separate **variable** and `export` it

```
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather() {
   return {
     type: FETCH_WEATHER
   };
}
```

### What is the purpose of doing it this way? 
Why not just make it a string?

#### Answer
To keep our `action` **types** consistent between our `Action Creator`s and our `reducers`

If they are consistent it will prevent a problem like this:

* Our `reducers` and `Action Creator`s are using the same types and if we were using **strings** and our team member accidentally misspelled our **type**

Where instead of this:

```
export function fetchWeather() {
   return {
     type: 'FETCH_WEATHER'
   };
}
```

That removed the `R` of `'FETCH_WEATHER'` and typed this:

```
export function fetchWeather() {
   return {
     type: 'FETCH_WEATHE'
   };
}
```

Then that small oversight would be a huge bug that would be difficult to troubleshoot and until we did fix it, none of our `actions` would then be recognized by that `reducer`

### Common Convention that will eliminate those unneeded errors is:
* Make a single variable that holds our `action` **type** and we use it here:

```
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather() {
   return {
     type: FETCH_WEATHER
   };
}
```

And later on we're going to `import` it into our `reducer` as well so that we don't ever have to be referencing or copy pasting **strings** between different files and instead we just have this single canonical source of action type right here `export const FETCH_WEATHER = 'FETCH_WEATHER';`

`type: FETCH_WEATHER`

And then later on if I came back and change this value of the FETCH_WEATHER variable to anything else, I would have not issues because both my `Action Creator` and reducer are using the same variable

### Time to make our API request
To do this we need to assemble our **request URL**

* Similar to jQuery and GET requests

* We're going to make a URL
* We're going to make an Ajax GET request to it
* And that will return our data for us

So it is essential that we assemble the correct URL

Let's reference the OpenWeatherMap API documentation a little more

### Add our request URL
`src/actions/index.js`

```
const API_KEY = '4bdc423659b58443ad1676fe261eeac5';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
   const url = `${ROOT_URL}&q=${city},us`;
   return {
     type: FETCH_WEATHER
   };
}
```

### Make the actual request
We could use jQuery but that Library adds a ton of functionality but all we need to do is just make a simple Ajax request

### [Axios Library](https://github.com/mzabriskie/axios) to the rescue
Axios is a Library that is solely made for making Ajax requests from the browser

Axios works almost identically to jQuery

#### Install Axios
`$ npm install --save axios`

### After checking out the [Axios documentation](https://github.com/mzabriskie/axios) you can see an example:

```
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
```

* Use `axios.get('pass-in-some-url')`
    - And that returns a **promise** `.then()`
        + the `.then()` has a function inside it that will handle the **response** for us
* We won't have to work with `promises` because that is what `redux-promise` will do for us

## Import axios
`src/actions/index.js`

Put this at the top of our code:

`import axios from 'axios';`

### Now we make our request using axios

```
export function fetchWeather(city) {
   const url = `${ROOT_URL}&q=${city},us`;
   const request = axios.get(url); // add this line
   
   return {
     type: FETCH_WEATHER
   };
}
```

* **note** This will return a **Promise** `axios.get(url);` and we just set it equal to the variable `request`

## Pass our request into our `action` as the `payload`
```
export function fetchWeather(city) {
   const url = `${ROOT_URL}&q=${city},us`;
   const request = axios.get(url);
   
   return {
     type: FETCH_WEATHER,
     payload: request
   };
}
```

**note** The **payload** is an optional property that goes along with `actions` that can contain some additional data that describes this particular `action`

## Final code
`src/actions/index.js`

```
import axios from 'axios';

const API_KEY = '4bdc423659b58443ad1676fe261eeac5';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
   const url = `${ROOT_URL}&q=${city},us`;
   const request = axios.get(url);

   return {
     type: FETCH_WEATHER,
     payload: request
   };
}
```

## Next Challenge
Review of all the stuff we just did. Not a lot of code but a lot of concepts to understand and wrap our heads around

