# JSON and JavaScript

**index.html**

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>JSON Like Object</title>
</head>

<body>

  <script src="app.js"></script>
</body>

</html>
```

**app.js**

```js
var postObj = {
  "id": 1,
  "title": "Hello world!",
  "content": "Welcome to WordPress",
};

console.log( postObj );
console.log( postObj.title );
```

* You will see that `Object` is output to the console
* And you can access the title property of the `postObj` object.

This looks like JSON but it is just a JavaScript object

You will see that when we work with JSON we can not call out properties inside objects. And we have to convert it (or parse it) from a JSON object back into a true JavaScript object

* **note** JSON is technically a big string

If we try this we will get an error:

```js
var notValidJSON = '{
 "id" : 1,
  "title" : "Hello World",
  "content" : "Welcome to WordPress"
}
';
```

The reason is JavaScript does not like us breaking up string onto multiple lines

```js
var validJSON = '{\
  "id":1,\
  "title":"hello world",\ "content":"Welcome to WordPress"\
}',
  oneLineJSON = '{ "id":1, "title":"hello world","content":"Welcome to WordPress" }';

console.log( validJSON );
console.log( oneLineJSON );

console.log( validJSON.title );
console.log( oneLineJSON.title );
```

* `\` lets us go to the next line of a string in JavaScript
* if you use the console and grab the section of code it will be valid JSON
    - but if you try and copy the pure JavaScript code with backslashes you will get an error in the JSONLint (it doesn't like the backslashes)
* the second line is valid JSON in the JavaScript. to write valid JSON inside JavaScript you must do it on one line
* How do you pull in external JSON files? (later we will tackle that topic as it adds some more complexity)

Let's look at the last two lines again:

```js
console.log( validJSON.title );
console.log( oneLineJSON.title );
```

They both return `undefined`. This let's us know that JavaScript can not use dot notation on a JavaScript object.

How do we take a JSON object, convert it into a JavaScript object so that we can use dot syntax and access nested properties of our objects.

## Why are we going through all this trouble with JSON?
Because we are going to be getting lots of JSON objects and we need to know how to convert them into native JavaScript objects and arrays in order to work with them.

## JSON
Native object in JavaScript

### Has two methods built in
1. `JSON.parse()`

Allows us to take a JSON object and convert it (aka parse it) into
a native JavaScript object.

2. `JSON.stringify()`

Take a native JavaScript object and convert it (aka stringify it) into a JSON string or a JSON object

With these two methods we can easily do the things we want to do with JSON whether we're generating it and pushing it out (using `JSON.stringify()`) or we're parsing it and bringing it into our application (using `JSON.parse()` )

## The JSON object

`console.log( JSON );`

Outputs the following to the console:

`JSON {Symbol(Symbol.toStringTag): "JSON"}`

If you click on the arrow in the inspector you will see the JSON object has a parse method and a stringify method

```js
var oneLineJSON = '{ "id":1, "title":"hello world","content":"Welcome to WordPress" }',
  parsedJSON;

console.log( oneLineJSON.title );

parsedJSON = JSON.parse( oneLineJSON );

console.log( parsedJSON );
console.log( parsedJSON.title );
```

* when we first try to access title, we can't
* But when we use JSON.parse() and pass it `oneLineJSON`
    - we can convert to a JSON object
    - we can access the title property

## revivor

`JSON.parse( JSONobj, revivor )`

JSON takes 2 parameters
1. is the JSON object
2. is the `revivor`
    * this is a function that allows you to modify the object as it is being parsed.
    * at one time you will want to modify your object before you pull it in so you don't have to do it in a second step

```js
var oneLineJSON = '{ "id":1, "title":"hello world","content":"Welcome to WordPress" }',
  parsedJSON;

function revivor( key, value ) {
  if ( typeof value === "number" ) {
    return ( value + 1 ) * 2;
  }
  return value;
}

parsedJSON = JSON.parse( oneLineJSON, revivor );

console.log( parsedJSON );
console.log( parsedJSON.title );
```

* We could call `revivor` whatever we want but the documentation calls it `revivor`
* `revivor` needs to be mapped to a function and it takes the `key` and `value` from the JSON (we don't have to pass in the key and value - that will happen automatically but you need to have the key, value arguments in the revivor function)
* this function will look for a number in the value and if it finds it it will add 1 to it and multiply that by 2 (will give us an id=4)
* if revivor doesn't return anything, you will get an error

## eval()
Do not use `eval()` for parsing JSON
* you may see older code using eval()
* it has potential security risks so don't use it
* instead of eval() use JSON.parse()

## JSON.stringify()

```js
var postObj = {
    "id": 1,
    "title": "hello world",
    "content": "welcome to WordPress",
  },
  JSONObj;

console.log( postObj.title );

JSONObj = JSON.stringify( postObj );

console.log( JSONObj );
console.log( JSONObj.title );
```

**note** JSON uses doublequotes but it is a JavaScript recommendation to use single quotes when writing JavaScript

* I can tell from the inspector that I am working with an object
    - `hello world` is the output
    - if I remove the `title` property and refresh the page
        + `console.log( postObj );`
            * I will get:
                - `Object {id: 1, title: "hello world", content: "welcome to WordPress"}`

But now when I run these lines:

```js
JSONObj = JSON.stringify( postObj );

console.log( JSONObj );
console.log( JSONObj.title );
```

I see I turn my JavaScript object into JSON. It is valid JSON. I could copy it into the JSONLint and see it is valid JSON.

* also see that I know longer can access the `title` property which let's me know this is now JSON.

## replacer

`JSON.stringify` has more parameters

`JSON.stringify( obj, replacer, space )`

```js
var postObj = {
    "id": 1,
    "title": "hello world",
    "content": "welcome to WordPress"
  },
  JSONObj;

function replacer( key, value ) {
  if ( typeof value === "number" ) {
    return undefined;
  }
  return value;
}

JSONObj = JSON.stringify( postObj, replacer, ' ' );

console.log( JSONObj );
```

* So this will remove the `id` if it is a number. So `replacer` gives you the value to remove items from JSON if you need to before converting it into a JSON object.
* the `' '` is a space and just helps format your JSON
    - you may also use `'\t'` for tabs

## JSON and JavaScript Review
* Can convert JavaScript objects to and from JSON
* JSON object, JSON.parse(), JSON.stringify()
* Further reading
    - [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
    - [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
    - [More on JSON](http://speakingjs.com/es5/ch22.html)

### Practice
* Create a JSON object for a page
    + page id, title, content, featured image, link to featured image
* Parse the JSON object into a native JS object
* Add the title and content to an HTML page
* Final Result: Start with a JSON file and end up with a web page using JS based content. 

 

