# Object.create and Pure Prototypal Inheritance
* This is another way to create objects that does not try to mimick other programming languages
* New browsers all have built in

```js
const person = {
  firstName: 'Default',
  lastName: 'Default',
  greet: function() {
    return `Hi ${this.firstName}`;
  }
};
```

* I have to use `this` in `this.firstName` so I am referencing the object
    - If I didn't use `this` it would look for it in this function context when executed

![function context](https://i.imgur.com/9qT7OII.png)

## How I create an object with Object.create()
```js
const person = {
  firstName: 'Default',
  lastName: 'Default',
  greet: function() {
    return `Hi ${this.firstName}`;
  }
};

const john = Object.create(person);
console.log(john);
```

### What does this construct?
![output](https://i.imgur.com/mlN1ZfB.png)

* I have an empty object
* It's prototype is the `person` object

### Takeaway
`Object.create()` creates an empty object with it's prototype pointing to the object you passed in `person` (in this case)

* input
 
`> john.greet`

* output

`< "Hi Default`

## Override default properties
* Just add them yourself like this:

```js
const person = {
  firstName: 'Default',
  lastName: 'Default',
  greet: function() {
    return `Hi ${this.firstName}`;
  }
};

const john = Object.create(person);
john.firstName = 'Bob';
john.lastName = 'Dole';

console.log(john);
```

* Now if you `> john.greet()` it will output `< "Hi Bob"` because it is now using your updated properties

### That is pure prototypal inheritance
* You make objects
* You then point objects to them
* If you want to define a new object, you create a new object
* Then you override/hide properties and methods on those created objects by setting the values on those created properties and methods themselves
* It drives people crazy because it is so simple
    - But if you use it you love it
    - It is straight forward
    - Simple
    - Easy to understand

### This is a newer browser thing
#### What if you are on a project where you need to support legacy browsers?
Use a `polyfil`

### Polyfill
Code that adds a feature which the engine may lack

#### Add a Polyfill
* We will add a polyfill for using `Object.create()`

##### Where can I find Polyfill?
* Easy. Search online
* I am looking for polyfill for object.create and I [found this link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) that provides this code:

```js
if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (!(proto === null || typeof proto === "object" || typeof proto === "function")) {
            throw TypeError('Argument must be an object, or null');
        }
        var temp = new Object();
        temp.__proto__ = proto;
        Object.defineProperties(temp, propertiesObject);
        return temp;
    };
}
```

* If checks with the first line if the browser understands `Object.create()` and if Object.create is not equal to a function, it doesn't understand and it will do all the stuff inside the curly braces
* If the browser does see Object.create() as a function, it will skip the code inside the `if` statement entirely and move onto your custom code using Object.create()
* It takes an object as an argument `proto`
    - It makes sure that there is an object passed
    - It will create an empty object
    - It sets the prototype `__proto__` to the object you passed `proto`
    - It returns the object
    - The polyfill just fills in the same functionality we would expect to see in the browser

```js
// polyfill
if (typeof Object.create !== 'function') {
    Object.create = function (proto, propertiesObject) {
        if (!(proto === null || typeof proto === 'object' || typeof proto === 'function')) {
            throw TypeError('Argument must be an object, or null');
        }
        var temp = new Object();
        temp.__proto__ = proto;
        Object.defineProperties(temp, propertiesObject);
        return temp;
    };
}

// custom code

const person = {
  firstName: 'Default',
  lastName: 'Default',
  greet: function() {
    return `Hi ${this.firstName}`;
  }
};

const john = Object.create(person);
john.firstName = 'Bob';
john.lastName = 'Dole';

console.log(john);
```

### Review
* I create an object that forms the basis of creating all other objects
* This is an object unto itself
* Then I use Object.create() other versions of it
* And then I can override/hide it's properties
* This is **Pure Prototypal Inheritance**
* It is not using syntatic sugar to appear people from other programming languages

## Power
Remember the power you have by being able to mutate the Prototype on the fly. Use it wisely!

