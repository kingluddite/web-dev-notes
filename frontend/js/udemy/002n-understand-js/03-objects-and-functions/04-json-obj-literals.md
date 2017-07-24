# JSON and Object Literals
## JSON
`J`ava`S`cript
`O`bject
`N`otation

* It is inspired by object literal syntax in JavaScript
* It looks a lot like object literal syntax
* A common misconception is to think they are the exact same thing

```
var objectLiteral = {
  firstName: 'John',
  isAProgrammer: true
}

console.log(objectLiteral);
```

* All good here
* Just creates and object
* Using object literal syntax
* With two property keys and values

### Past history of internet
* Data was sent over the internet in various formats
* XML was the king format used for data transfer

```xml
<object>
    <firstname>John</firstname>
    <isAProgrammer>true</isAProgrammer>
</object>
```

* That data would be sent over the internet and a server would be able to parse it out
* That was all fine and dandy but download time became an issue, how much data you are using
    - Lots of extra characters you are sending which makes the data larger than it really needs to be
* People saw the object literal notation and thought that would be a better way to send data across the internet
    - Why not just make a string that looks like this:

```js
{
    firstname: 'John',
    isAProgrammer: true
}
```

* It is just a string of data
* But it looks like an object literal

### But with some obvious differences
* Properties must be wrapped in double quotes

```
{
    "firstname": "John",
    "isAProgrammer": true
}
```

* **Note** - in object literal syntax, properties can be wrapped in quotes but they MUST be wrapped in quotes in `JSON`
* `JSON` - technically a subset of the object literal notation
    - Anything that is `JSON` valid is also valid JavaScript object literal syntax
    - But not all object literal syntax is valid `JSON`
    - `JSON` has stricter formatting rules

### JSON.stringify(objectLiteral)
Built in feature in JavaScript

* We can use this on any objectLiteral and this built-in JavaScript Object JSON has a method stringify that will convert an object literal into a JSON object

### converting back and forth between JSON and JavaScript object literals
```
var objectLiteral = {
  firstName: 'John',
  isAProgrammer: true
}

console.log('using JSON.stringify', JSON.stringify(objectLiteral));

var jsonValue = JSON.parse('{ "firstname": "John", "isAProgrammer": true }');
console.log('using JSON.parse()', jsonValue);
```

![JSON conversion](https://i.imgur.com/RIW5Dih.png)

JSON is great from pushing data from the client to the browser or if you are using Node.js on the server accepting data in the JSON format

