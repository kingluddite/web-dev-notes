# ES6 and classes
* New way to create objects and set the prototype

## ES6 class
`Greet.js`

```js
class Person {

  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  greet() {
    return `Hi ${firstName}`;
  }

}
```

* The constructor acts similar to our constructor function
    - In that you can preset its values
    - When you use the `new` keyword to create a new Person

`var john = new Person('John', 'Doe');`

We can also have methods sitting inside the class `greet()` and it is available

### This causes a problem
* People coming from other programming languages thing oh this is great, this is a class
* But in other programming languages class is not an object, it is just a definition, like a template, it tells you what objects should look like, you don't actually get an object until you use that `new` keyword
* But JavaScript, even though it is adding the class keyword, still does not have classes because **this is an object**

![this is an object](https://i.imgur.com/JS9p1U7.png)

* The `Person` is actually an object that is created and then you are creating new objects from that object
* The problem is people may start to design programs as they do in C# or Java
* The `new` keyword is still a bad idea, it is meant to appease people from other languages

## How do you set the prototype?
```js
class InformalPerson extends Person {

  constructor(firstName, lastName) {
    super(firstName, lastName);
  }

  greet() {
    return `Yo ${firstName}`;
  }
}

joey = new InformalPerson('Joey');
console.log(joey);
```

![output of extends](https://i.imgur.com/mqKIYFs.png)

* `extends` sets the Prototype (__proto__) for any of my objects created with this class
* In my `constructor` I can call the keyword **super** which simply will call the constructor of the object that is my prototype, so I can pass my initial values down the chain
* function constructors and `object.create()` are doing the same thing
* syntactic sugar

## Syntactic Sugar
A different way to type something that doesn't change how it works under the hood

