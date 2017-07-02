# Reflection and Extend
## Reflection
An object can look at itself, listing and changing its properties and methods

* We can use that to use the `extend` pattern

## For in
* Similar to the `for each`

```js
const person = {
  firstName: 'Default',
  lastName: 'Default',
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

const john = {
  firstName: 'John',
  lastName: 'Doe'
};

// don't do this EVER! for demo purposes only!!!
john.__proto__ = person;

for (const prop in john) {
  console.log(prop + ': ' + john[prop]);
}
```

### for in
`for (var prop in john) {}`

* This will loop over every `member` in the object
* kind of like using the length of an array and loop across all of its items
* We can loop across a collection and for every item we'll have a variable `prop` that will be the current item that we are looking at

#### Output of `for in`
```
firstName: John
lastName: Doe
getFullName: getFullName() {
  return `${this.firstName} ${this.lastName}`;
}
```

* We get all john's props
* But we also get the person getFullName method
* So the `for in` grabs our custom object props and methods and will also go and grab the prototypes props and methods

### What if I just want to know what is on the object itself
* `hasOwnProperty()` - sits on **base** object that JavaScript has
* `if (john.hasOwnProperty('lastName') {}`

```js
// more code
for (const prop in john) {
  if (john.hasOwnProperty(prop)) {
    console.log(prop + ': ' + john[prop]);
  }
}
```

* So I can refect on the john object
    - Look at its properties
    - Look at meta data of its properties
    - Whether it is really attached to the object or not
    - This lets us implement an idea
        + Kind of a compliment to prototypal inheritance
        + But it is not built in to JavaScript
        + Many frameworks and libraries build it themselves because it is so useful

* Grab the underscore libary with npm

`$ npm init -y`

`$ npm i underscore`

`index.html`

```html
// more code
 <script src="../node_modules/underscore/underscore.js"></script>
 <script src="app.js"></script>
</body>
</html>
```

```js
// more code
// don't do this EVER! for demo purposes only!!!
john.__proto__ = person;

for (const prop in john) {
  if (john.hasOwnProperty(prop)) {
    console.log(prop + ': ' + john[prop]);
  }
}

const jane = {
  address: '134 Elm',
  getFormalFullName() {
    return this.lastName + ', ' + this.firstName;
  }
};

const jim = {
  getFirstName() {
    return firstName;
  }
};
```

* I add two objects and I don't put them on the prototype chain
* Maybe they have a lot of properties and methods that I don't want to be in the prototype chain
* Maybe I want to use them in a different way
* They are useful individually but not as Prototypes of each other
* Underscore Library has `_.extend`

```js
// more code
_.extend(john, jane, jim);
console.log(john); // {firstName: "John", lastName: "Doe", address: "134 Elm", getFormalFullName: function, getFirstName: function}
```

* This combines these other objects
    - It takes all the properties from jane and jim and adds them to john
    - I could do this myself but this is a time saving feature
* This is different than what we did with the prototype chain
* This physically placed the other props and methods onto the john object

## How does this work
* Open `underscore.js`
* Search for `_.extend`

![extend](https://i.imgur.com/73IDzYZ.png)

* It is calling createAssigner() so look for that

![createAssigner](https://i.imgur.com/x9m80SF.png)

* It takes some keys and returns a function itself
    - So this is creating a closure
    - This is the function that is getting run when we call `extend`
    - It uses arguments
        + `var length = arguments.length;`
            * That is all the arguments passed in
            * If the length of the arguments is less than 2, then just give me back the object
            * `if (length < 2 || obj == null) return obj;`
                - That makes sense because If I call `_.extend(john)` (less than 2 arguments), I am not adding any other objects so just give me my object back
            * Then we skip first argument and loop (loop starts at 1) and loops through all the parameters (jane and jim)
            * keys are property names
            * so grabs all the properties and methods of all jane and all of jim
            * Uses a nested loop
                - one across all the objects
                    + one across all those objects properties and methods
            
`if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];`

* That puts inside `john` the new properties and methods from jane and jim
* It does this using `refection`
* extend is useful, you don't always have to use the prototype chain
    - Viewing the underscore source code I can learn
    - I can take their functions out and use them on their own if I wanted
* ES6 has `extends` and that will be used to set the prototype
