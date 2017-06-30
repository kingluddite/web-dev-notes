# JavaScript Aside Prototypal Inheritance and Function Constructors

## Inheritance
One object gets access to the properties and methods of another object

* The way JavaScript implements the idea of inheritance is different than the way other languages do it
* JavaScript implements **prototypal inheritance**
* Every object has a property that points to another object **proto**
    - It is the object's prototype
    - It is the thing it inherits from

![object proto design](https://i.imgur.com/TUnJ2pl.png)

* We can from our `obj` have access to another object's property (Prop 2) and this helps us act like it was directly attached to my obj

## The proto might also point to a different prop which might have a different property (Prop 3)

![more than one proto](https://i.imgur.com/TUnJ2pl.png)

## The ProtoType Chain
* having access from my object to other proto objects

![the prototype chain](https://i.imgur.com/GJxYIqr.png)

* I have access properties on any of the objects down the line without having to specify which one it is

* I could create another object and it could point to the same points as other objects do so they can share properties and methods and I could change a property or method or add a new property or method to the prototype and to every object that inherits from it every object that points to it as its prototype will instantly get access to it

![diagram proto](https://i.imgur.com/4fMZ7Lh.png)

## How do we manage building this prototype chain and instructing our objects?
* We've seen the object literal syntax to create an object in JavaScript
* There are a few more ways to create objects in JavaScript
    - That allow us to manage what the prototype will be of the object I'm creating so I can get access to its properties and methods
    - There is the new ES6 `class`
    - In Node.js we will be talking about **function constructors**
        + This is another way to create objects and manage what the prototypes are
            * What are the object I'm creating use as their prototype

## Function Constructors
A normal function that is used to construct objects

* The `this` variable points a new empty object, and that object is returned from the function automatically
* We do this by using the `new` keyword
* new + call the function
    - That will execute the function
    - It will take the `this` keyword and point it to a new empty object
    - We can then use the `this` keyword to construct our object adding properties and methods
    - The function constructor will automatically return that new object from that function call
* We using capital letters to let us know it is a constructor
    - So `person` is bad
    - And `Person` is good

```js
function Person(firstName, lastName) {

  this.firstName = firstName;
  this.lastName = lastName;

}

const john = new Person('John', 'Doe');
```

* Because I used the `new` keyword when it executes this function and it does that special thing of making the `this` variable an empty object and it automatically returns it
* So the object I just created and added properties to will be return and we store in the `john` variable
* So this will work

`console.log(john.firstName);`

`$ node app.js` ---> John

## What about the prototype?
The thing that `john`, our new object, can inherit from

* JavaScript provides a way to do this
    - But it is a bit confusing
* Remember that functions are special kinds of objects
    - So I can have properties and methods on functions as well
    - There is a build in one called **prototype** that is just an object
        + But I can attach properties and functions to this **prototype** object

* We use `this` variable so we now we are talking about the object and not some variable

```js
function Person(firstName, lastName) {

  this.firstName = firstName;
  this.lastName = lastName;

}

Person.prototype.greet = function() {
  console.log(`Hello, ${this.firstName} ${this.lastName}`);
};

const john = new Person('John', 'Doe');
```

* What happens when you use a function constructor is that any object created from the `new` function constructor, its prototype will point to the prototype property of the function that you used to construct the object
* It is a little confusing because the name is `prototype` but it isn't the prototype of Person, it is the prototype of any objects created from Person
* So now I can say:

`john.greet()`

* Now the JavaScript Engine will search down the Prototype Chain because there is no greet method on `john` itself, but there is on its prototype 

`$ node app.js` ----> Hello, John Doe

* So whenever you see this **.prototype** property in code you know we are adding some properties and methods to be available to all objects created from this particular function constructor

```js
const john = new Person('John', 'Doe');
john.greet();

const jane = new Person('Jane', 'Doe');
jane.greet();
```

* jane also has access to `greet()` method because of our use of `.prototype`

## You can use the following to see what the prototype object is 
* This code is not recommended for production

```js
console.log(john.__proto__);
console.log(jane.__proto__);
```

* Output

```
Person { greet: [Function] }
Person { greet: [Function] }
```

* The __proto__ property for these two objects should be the exact same object because they were both created from the same function constructor (new)
* We can test that with this:

`console.log(john.__proto__ === jane.__proto__);`

* That will return **true**
