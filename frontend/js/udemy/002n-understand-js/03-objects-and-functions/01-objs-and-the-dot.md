# Objects and functions
* Object and functions are VERY much related in JavaScript!
* In many ways they are the same subject

## Objects and the Dot
* Objects are collections of name/value pairs
    - And those values can be other collections of name value pairs

![objs Collections of name/value pairs](https://i.imgur.com/xC5czQg.png)

## Objects - From a different perspective
How are objects held in memory?

### An object can have properties and methods
![Object properties and methods](https://i.imgur.com/E14vYSZ.png)

* Object can have primitives set off of it - we call that a `Primitive 'property'`
    - Boolean
    - Number
    - String
* An Object can have another object (this is also considered a 'property')
* An Object can also contain a Function ('method')

### Objects have properties and methods
These sit in memory

![obj address and references](https://i.imgur.com/WtjGvyC.png)

* The Core object will have some an address in your computers memory
    - And it will have references to these different properties and methods

### How we access Objects slots in memory
```js
// better ways to create an object
// we use this way to make it overly obvious
// this object will sit in memory
var person = new Object();

// adding properties
person['firstname'] = 'Tony';
// adding methods
```

To access those properties and functions of an object

#### Computer Member Access Operator

* `person[]` (the brackets are teh computer member access operator)
* Inside the brackets I put the name I am trying to locate in memory
* `person['firstname'] = 'Tony';`
    - It doesn't exist yet in memory so it creates its spot and gives it the name `['firstname']` and the `person` object will get a reference to the `['firstname']` location in memory so it will know where `['firstname']` in memory
    - 'Tony' is a primitive String - so it is called a property
* This is one way to **set** and **access** properties
* Remember Order of Operator Precedence?

**Computed Member Access** is close to the top of this list

* Has left-to-right Associativity
* Individual operators `[ ... ]`
* This **operator** takes the object `person` and the property or method name `'firstname'` and it looks for it on this object

![computed member access](https://i.imgur.com/ISpGygB.png)

### set string as property
```js
var person = new Object();

// adding properties
person['firstname'] = 'Tony';
person['lastname'] = 'BaBoney';

var firstNameProperty = 'firstname';

console.log(person); // Object
console.log(person[firstNameProperty]); // Tony
```

* We could set a string
* And then use that string to access that property

## The Dot Operator `.`
```js
console.log(person);
console.log(person.firstname);
console.log(person.lastname);
```

The `.` is a function

`person.firstname`

![dot operator precedence](https://i.imgur.com/qNgLnN4.png)

* It is second in the list of Operator Precedence
* Second only to `( ... )` for grouping
    - left to right Associativity
    - takes two parameters
       1. Object you're looking at
       2. And name of property
       3. You don't have to use name in quotes `person.'firstname'`
            + But that is essentially what it is doing
            + It takes the object and passes the String that represents the name of the value that you are looking for
            + You don't type the quotes, the parser will understand that is what you typed
            + This is a lot faster way to to type
            + It will give you the same output as the brackets operator `Tony`
* brackets is called `Computed Member Access Operator`
* dot is called `Member Access Operator`
    - fingers and toes are `members` of your body
    - so brackets and dots are looking for `members` of your object

## Make a member another object
`person.address = new Object();`

* This is an Object sitting inside an Object
* We can add properties on that nested object

`person.address.street = '111 Main Street';`

* How do we know which **operator** gets run first?
    - We use the Operator Precedence and see **Member Access** precedence is left-to-right
* It first looks for `person.address` in memory
    - Then it looks for `.street`

```js
var person = new Object();
person['firstname'] = 'Tony';
person['lastname'] = 'BaBoney';

person.address = new Object();
person.address.street = '111 Main St';
person.address.city = 'New York';
person.address.state = 'NY';
```

And to access those properties

```js
console.log(person.address.street)
console.log(person.address.city)
console.log(person['address']['state'])
```

* Two different ways but both are accessing the same memory locations by the same names just using two different operators which are just two different functions `[ ... ]` and `.`

### Preferred Approach - Use the `.` (Dot) Operator
* It is clean
* It makes it clear
* It makes it easier to debug and solve problems

You would, generally speaking, only use `brackets` (person['address']) when you need to access a property or properties using a **dynamic string**
