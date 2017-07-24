# Understanding the Prototype
* JavaScript uses Prototypal Inheritance

## What is the prototype?
* We have an object in memory

![object in memory](https://i.imgur.com/NJi2Cdi.png)

* Objs have properties and methods
* Our `obj` has a property called **Prop1**

![obj with prop](https://i.imgur.com/35jfju4.png)

* I can access that property with `obj.prop1`
* The `.` (dot) operator goes out for a reference to prop1 in memory and gives it back to me as long as it is referenced again `obj`
* The JavaScript Engine gives us access to hidden properties and methods
* All objects, including functions have a **proto {}** property
    - The property is a reference to another object (**proto**)
    - It is an object that stands on its own
    - We could use it by itself if we wanted to
    - The object **proto** is my `obj`'s prototype
    - `obj` will be able to get **proto**s properties and methods
    - proto can have properties and in this example it has a property `Prop2`

![obj proto prop2](https://i.imgur.com/5w7g4pr.png)

* obj.prop2
    - first looks for prop2 referenced to `obj` itself
    - when it doesn't find it, it then looks to the prototype to the object named **proto** and looks for the property there
    - and if it finds it it returns it
    - it looks like prop2 is on our object but it is actually on our `obj`s prototype
    - that **proto** can point to another **proto** object

![two protos](https://i.imgur.com/SO8YnBp.png)

![three protos](https://i.imgur.com/92Ku0Es.png)

* This is the prototype chain

![prototype chain](https://i.imgur.com/eMCG76l.png)

* It is similar to the scope chain but they are different

## How is the scope chain different than the prototype chain
* The scope chain is about where we have access to a variable
* The Prototype chain is about where we have access to a property or method amongst a sequence of objects that are connected via this prototype property (we call it **proto**
* It is hidden from me
    - I don't have to go `obj.proto.proto.Prop3`, I can just say `obj.Prop3`
    - The JavaScript Engine does the work of searching the prototype chain for those properties and methods

## Other objects can point to same prototype
![two objs pointing](https://i.imgur.com/ECzeohE.png)

* obj2.prop2 will return the same prototype property as obj

![obj2 pointing to same proto](https://i.imgur.com/Fvsj9A1.png)

* This concept is very simple
    - Don't over-think it

## Some examples
* We will use a technique that you should never use in real life
* Modern browsers provide a way to directly access the prototype but you don't want to use it because it has a huge performance problem and can slow down your application dramatically
* `__proto__` - very strangely named on purpose so that you never accidentally use it

```js
var person = {
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
console.log(john.getFullName()); // John Doe
console.log(john.firstName); // John
```

* That's all I have to do to have `john` inherit all of `person`
* So if I try to access a property on `john` that is not on `john`, it will then go to `person` and if it's not on person it will got and look to what person's **proto** is (and on down the chain)
* note `this` does not refer to `person` it refers to `john`
    - whatever object originated the call

### Why does john.firstName give me `John` and not `Default`?
* Because it first looks to john for `firstName` and sees it and uses it so it doesn't need to look up the prototype chain
    - So the `john` objects **firstName** property hides the `person` objects `**firstName**` property

## Point another object to same `prototype`
```js
var person = {
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
console.log(john.getFullName());
console.log(john.firstName);

const jane = {
  firstName: 'Jane';
};

jane.__proto__ = person;
console.log(jane.getFullName()); // Jane Default
```

* The `jane` object has a firstName so that is used
* No last name, so it uses the prototype chain to get `Default` as the lastName
    - When it searches the prototype chain and comes to `this`, that `this` is pointing to `jane`
        + So it will search firstName and lastName on the `jane` object

