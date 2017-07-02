# More on Require
* Is require only able to grab a single JavaScript file?
* What if the module I am building is large and needs to be split into several files?
* Can I require non-js files?

`app.js`

* Create a `greet` folder
* The `require` function had a lot of code in it
    - It would look for a file with a .js extension based on path you give it
    - if it doesn't find that .js file it will do something else
* I will require greet
* But there is not greet.js so the require function will look for a greet folder and then it will look inside that greet folder for a file called `index.js`
    - But now I can have multiple files inside the greet folder that work together and are ultimately called by index.js

`/greet/english.js`

```js
const greet = () => {
  console.log('Hello');
}

module.exports = greet;
```

`/greet/spanish.js`

```js
const greet = () => {
  console.log('Hola');
}

module.exports = greet;
```

`/greet/index.js`

```js
const english = require('./english');
const spanish = require('./spanish');

module.exports = {
  english,
  spanish
};
```

`app.js`

```js
const greet = require('./greet');

greet.english(); // Hello
greet.spanish(); // Hola
```

## Add one more feature
* Use the ability that require has in node to process a JSON file

`greetings.json`

```json
{
  "en": "Hello",
  "es": "Hola"
}
```

* JavaScript can read this and convert it into an object much like it does with **object literal syntax**
* The `require` function will do this for me

## Debug
* Open in Visual Studio
* Linebreak on line 1 of `english.js`
* step over to get to greet function

![greet](https://i.imgur.com/UEVNick.png)

* Look at the greetings object

![greetings object](https://i.imgur.com/gvAFEjn.png)

* The json file was read
* It's contents were converted into a JavaScript object
* instead of having to worry about module.exports, with JSON files, the require function just returned the object it created from the file

`english.js`

```js
const greetings = require('./greetings.json');

const greet = () => {
  console.log(greetings.en);
}

module.exports = greet;
```

`spanish.js`

```js
const greetings = require('./greetings.json');

const greet = () => {
  console.log(greetings.es);
}

module.exports = greet;
```

* Run

`$ node app.js`

Same output as before

```
Hello
Hola
```

* But now we are getting the strings from the json file

## Takeaway
This is a way to help you manage your code in a nice segmented way
