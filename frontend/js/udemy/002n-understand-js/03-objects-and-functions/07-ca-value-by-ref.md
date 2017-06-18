# By Value vs By Reference

## By Value
![copy prim value](https://i.imgur.com/6OPnPbr.png)

* I'm passing/referrencing/setting equal one value to another by copying the value
* We copy the value into two separate spots in memory

## By Reference
![by reference](https://i.imgur.com/8v7xJhn.png)

* When we set a variable equal to an object we still get a location/address in memory that it knows where that object lives
* Now when you set b = a, both `b` and `a` will be pointing to the same location in memory of the object
    - No new object is created
    - No copy of the object is created
    - Both a and b have the same value because when you ask them what their value is they both look at the same spot in memory

By reference behaves quite differently than by value
All objects interact by reference when setting them equal to each other by passing to a function

### Examples
```
// by value (primitives)
var a = 3;
var b;

b = a;
```

* What should happen?
    - a = 3
    - b = 3
* But remember this is `by value` and 3 is a primitive type (a number)
* Because of this, when `b = a`, the equals operator, seeing that these are primitive types, creates a new spot of memory for `b`, copies that value from `a` and sets it to that value that `b` is looking at
    - So `b` will be **3**
    - And `a` will be **3**
    - But they will be COPIES OF EACH OTHER
        + Sitting in two spots in memory
* This means that after the fact, we could change `a` and `b` would not change becuase they are two different spots in memory

To test this try this out

```
// by value (primitives)
var a = 3;
var b;

b = 3;
a = 2;

console.log(a); // 2
console.log(b); // 3
```

* After learning how it works, we see how this can be
* That is `By Value`

## By Reference
```
// by reference (all objects (including function))
var c = { greeting: 'hi' };
var d;

d = c;
```

* The `=` operator sees that `d` and `c` are **objects** so it does not set `d` up with a new memory space, it simply points `d` to same memory location as `c` points to
* If you out both of these you would see they both point to the same value but THEY ARE NOT COPIES OF EACH OTHER, they are just pointing to the same spot in memory
* That means if you mutate `c` you will also mutate `d`!

## What does `mutate` mean?
* To change something
* Instead of using the normal word `change` computer scientists wanted to sound smart and use the word `mutate`
    * **Immutable** means it can't be changed
    * You will see `mutate` and `immutable` all the time in modern JavaScript
        - Just remember it means 'can be changed` (mutable) or can't be changed (immutable)

```
// by reference (all objects (including function))
var c = { greeting: 'hi' };
var d;

d = c;
c .greeting = 'yo'; // mutate

console.log(c); // {greeting: "yo"}
console.log(d); // {greeting: "yo"}
```

* This happens because they are both pointing to the same location in memory

## Takeaway
With object, with **pass by reference** once you change one, you change the other

## By Reference (even as parameters)
```
// by reference (all objects (including function))
var c = { greeting: 'hi' };
var d;

d = c;
c .greeting = 'yo'; // mutate

console.log(c);
console.log(d);

// by reference (even as parameters)
function changeGreeting(obj) {
  obj.greeting = 'Hello'; // mutate
}

changeGreeting(c);
console.log(c); // {greeting: "Hello"}
console.log(d); // {greeting: "Hello"}
```

* So we pass our object as a parameter and then mutate the property of that object and when we log both objects, the property was changed for both of them because they both point to the same spot in memory

### Special Case = The equals operator
The equals operator sets up new memory space (new address)

* So if you do this:

```
c = { greeting: 'hiya' };
console.log(c); {greeting: "hiya"}
console.log(d); {greeting: "Hello"}
```

* We are setting `c` = to a new value
    - So `c` gets a brand new memory space and puts that value in
    - But `d` is still pointing to the original memory space
    - Now `d` and `c` are no longer pointing to the same space in memory
* This is a special case where `by reference` doesn't apply because the equals operator saw that { greeting: 'hiya' } isn't a preexisting location in memory, this is a brand new object being created on the fly by this object literal syntax so since it saw that the second parameter wasn't an object that already existed in memory, it had to set up a spot in memory for this to live and after setting up that spot in memory it pointed `c` at it

* Earlier we did this `d = c`
* We used the equals operator there but in that case `c` already existed
* and when the equals operator saw `c` it new it already existed in memory, so "I'll just point `d` to that same location"

* In some languages you can decide whether something is passed by value or reference
* In JavaScript you DO NOT HAVE THAT OPTION
    - All Primitive types are passed by value
    - All Objects are passed by reference
* This causes all kinds of problems (errors/bugs/hard to track down) for people who don't understand what's going on under the hood
* If you understand
    - when you are using objects, they are being mutated then all the variables that point to that same object are going to get that change because they are all pointing to the same memory space

## Code Review
```js
// by value (primitives)
var a = 3;
var b;

b = 3;
a = 2;

console.log(a);
console.log(b);

// by reference (all objects (including function))
var c = { greeting: 'hi' };
var d;

d = c;
c .greeting = 'yo'; // mutate

console.log(c);
console.log(d);

// by reference (even as parameters)
function changeGreeting(obj) {
  obj.greeting = 'Hello'; // mutate
}

changeGreeting(c);
console.log(c); // {greeting: "Hello"}
console.log(d); // {greeting: "Hello"}

// equals operator sets up new memory space (new address)
c = { greeting: 'hiya' };
console.log(c);
console.log(d);
```
