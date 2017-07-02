# Function Constructors and `.prototype`
## How do we set the prototype?
* When you use the function constructor the JavaScript Engine already sets the prototype for you

```js
function Person(firstName, lastName) {

  console.log(this);
  this.firstName = firstName;
  this.lastName = lastName;
  console.log('This function is being invoked');
}

const john = new Person('John', 'Doe');
console.log(john);

const jane = new Person('Jane', 'Doe');
console.log(jane);
```

### Open Console
`> john.__proto__`

* You will see it points to an empty Person object
* Anytime you create a function property it creates special properties
    - name
    - code
    - prototype ---- is another property that **all functions get** that is completely visible to you and that you CAN and SHOULD use when you are using a function constructor

![function properties](https://i.imgur.com/wz2GcMv.png)

* Unless you are using a function constructor, prototype hangs out and never gets used
* It is only used by the `new` **operator**

## prototype is a confusing name
* The name makes you think that you are setting the prototype of this object
* __proto__ gives us access to the prototype
* The prototype property on a function is not the prototype property of the function, it is the prototype of any objects created if you are using the function as a function constructor

## prototype
### What is it?
* It starts its life as an empty object
* It is always there
* You can add on to it

```js
function Person(firstName, lastName) {

  console.log(this);
  this.firstName = firstName;
  this.lastName = lastName;
  console.log('This function is being invoked');
}

Person.prototype.getFullName = function() {
   return this.firstName + ' ' + this.lastName;
};

const john = new Person('John', 'Doe');
console.log(john);

const jane = new Person('Jane', 'Doe');
console.log(jane);
```

* Regarding the prototype chain, every object has this special property that points to another object that is its prototype so it looks for properties and methods down that chain
* When you call the `new` keyword it creates an empty object and it sets the **prototype** of that empty object to the **prototype** property of the function you then call
    - So any objects you create using this function `Person()` as a function constructor specifically using the `new` keyword and not returning a value, letting the JavaScript Engine automatically return that value means the object therefore created not only has whatever properties and methods you attached to it inside the function but it has a prototype which is `.prototype` property of that function
        + That's where it gets weird
        + It is terribly named
        + this `.prototype` property of all functions is where the prototype chain points and the objects created using that function as a constructor

* So `john` points to Person.prototype as its **prototype** (ala it's __proto__)
* And so does `jane`
* So they both get access to this method that I just added `getFullName()` because Person is their prototype
* View in browser and you'll see this:

![getFullName on proto](https://i.imgur.com/vg7S8oD.png)

`> john.getFullName()` will return **"John Doe"**

### Check this out
If I add to the prototype later:

```js
Person.prototype.getFullName = function() {
   return this.lastName + ',' + this.firstName;
};
console.log(john.getFormalFullName());
console.log(jane.getFormalFullName());
```

* Both john and jane have access to that new method
* Remember:
    - The JavaScript Engine first looks to john and doesn't find getFormalFullName()
    - Then it looks down the prototype chain
    - So it searches proto, it's own prototype and that's where it finds getFullName
    - It then calls it
    - The `this` keyword is set up property and points to that object

### Coolness
Any object I create with this contructor function I can add features to all of those objects at once by using the `.prototype` of the function constructor

### Real Word Libraries
* You will often seen properties will be set up in the constructor
* But methods will be set up using the prototype

## Why would you not add `getFullName` method inside the Person object?
* You could but there is a problem when you do that
    - Functions in JavaScript are objects
    - They take up memory space
    - Anything you add to them takes up memory space
    - So if I add `getFullName()` to every object that means every object gets it's own copy of getFullName and takes up more memory space
        + If you have 1000 Person objects, you will have 1000 getFullName() methods
    - But if you add it to the prototype you only have one
    - From an efficiency standpoint it is better to place methods on the prototype
