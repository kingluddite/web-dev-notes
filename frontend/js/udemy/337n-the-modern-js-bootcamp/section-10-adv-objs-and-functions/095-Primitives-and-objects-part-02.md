# Primitives and Objects: Part 2
* Objects are not the only type in JavaScript that are taking advantage of Prototypal inheritance
* All of the other types in JavaScript are as well
    - This is why on all of our arrays have access to the `filter()` method
    - This is why on all of our strings we have access to methods like `inclues()`

## What is a "Primitive value"?
* A Primitive value is a value that does not have properties
* A Primitive value is a "non object"

## There are 5 Primitive values in JavaScript
* string
* number
* boolean
* null
* undefined

(everything not in the above list is an object)

* So this means `arrays` and `functions` are also objects

## Let's see how arrays and functions use prototypal inheritance
* To allow us to access that shared set of functionality

```
// Primitive value: string, number, boolean, null, undefined

// Object: myObject --> Object.prototype --> null
// Array: myArray

const team = ['Mo', 'Chris'];
console.log(team);
```

* View the client console and expand the `__proto__`

![Array.prototype object](https://i.imgur.com/vKYz8rI.png)

* You can see how we get access to `pop` and `slice`
* This is evidence showing you how all of our arrays have shared access to all those methods we use with arrays
* **note** Just like with Objects we could create arrays using the `new` operator and the constructor function but we won't and we'll do the same thing we are doing for Objects by using the "literal syntax"

## Slightly different with arrays
* In Objects we saw myObject --> Object.prototype --> null
* But Arrays are different because when you go up again you won't get `null` but you'll get the Object and all the properties and methods we have with Object

![show how arrays are also objects](https://i.imgur.com/ieuSVcJ.png)

```
// Object: myObject --> Object.prototype --> null
// Array: myArray --> Array.prototype --> Object.prototype --> null
```

* When someone says that Arrays are technically an object (looking at the above diagram) is how this is possible
    - The Array is nothing more than a customized version of the object
    - We can prove this by trying to access something that is only on objects which is `hasOwnProperty`

```
const team = ['Mo', 'Chris'];
console.log(team.hasOwnProperty('length')); // true
```

* So above says do Arrays have a length property? (yes they do so ---> true)
* Do Arrays have `filter` method?

```
const team = ['Mo', 'Chris'];
console.log(team.hasOwnProperty('filter'));
```

* No Arrays do not have a `filter` method because they are not on the Array object but they are on the Object prototype

## What does the constructor function look like for Arrays?
```
const team = new Array(['Mo', 'Chris']);
```

* We will never use the constructor function when creating Arrays and only use the literal syntax

## Now let's explore functions
```
const getScore = () => 1;
console.log(getScore);
```

* We don't care what getScore returns because we'll never call it
* And we are printing the function itself we are not "calling" the function
* **note** Using Chrome doesn't give us the same info as Firefox
    - Firefox is better

### Chrome
* We just see the function but not the properties or prototype

![bad chrome](https://i.imgur.com/sgmAjDS.png)

### Firefox
* Firefox plays nicer

![good firefox](https://i.imgur.com/Rjd3LNP.png)

### Prototype chain for a function
```
Function: myFunc --> Function.prototype --> Object.prototype --> null
```

* So whenever you hear that Arrays and Functions are Objects this is why
    - They both have customized behavior that comes from Array.prototype and Function.prototype (but at end of the day both are just a modified version of an Object)

## Primitives
* string
* number
* boolean
* null
* undefined

### broken into groups
* group one
    - `null` and `undefined`
        + These are truly primitive values
        + You will never access a property or method on them
* group two
    - `string`, `number` and `boolean`
        + They are slightly different
            * We used the `split` method on strings
            * So how can I say that a String has a method but is also not an Object?

## Let's explain this behavior
```
const product = 'Car';
console.log(product); // Car
```

* We just get a string and we see the log in the client console
* We can't click on it to get any properties or methods
* We can use `__proto__` to go up the Prototype tree

### So how can we do this?
```
const product = 'Car';
console.log(product.split('')); // (3) ["C", "a", "r"]
```

* We don't get an error saying we are trying to access a property on a primitive
* What is happening is that **behind the scenes** when we access a property on a String, the JavaScript engine converts it to an Object
    - So `strings`, `numbers` and `booleans` are Primitives but they also have what is known as a **Object wrapper**
    - This `Object wrapper` gives us the functionality we see with `split()` on strings

## Let's look at how this Object wrapper works
### String constructor function
```
const product = 'Car';
console.log(product.split(''));

const otherProduct = new String('Bus');
console.log(otherProduct); String { "Bus" }
```

* Now we can expand String and look at all of it's properties (all it's individual characters and length)
* And we can look at it's `__proto__` prop which is `String`
    - And String contains all of the String methods we used before
    - Scroll down and you'll see `split()`
* So behind the scenes when we try to access a method on a String primitive, it converts it into an object using what we did with `otherProduct` above and then it calls the method on that and it gives you the value back
* We'll never use the new String constructor in our code, we'll just do it the `product` way above and let the JavaScript engine do the conversion behind the scenes

## Strings can be classified as objects as well
```
String: myString --> String.prototype --> Object.prototype --> null
```

### And yes for numbers and booleans it is the exact same thing

```
Number: myNumber --> Number.prototype --> Object.prototype --> null
Boolean: myBoolean --> Boolean.prototype --> Object.prototype --> null
```

```
const number = 22;
console.log(number);

const otherNumber = new Number(11);
console.log(otherNumber);

const isSoccerFan = true;
console.log(isSoccerFan);

const isOtherSoccerFan = new Boolean(true);
console.log(isOtherSoccerFan);
```

## All of the Prototype Trees
```
// Primitive value: string, number, boolean, null, undefined

// Object: myObject --> Object.prototype --> null
// Array: myArray --> Array.prototype --> Object.prototype --> null
// Function: myFunction --> Function.prototype --> Object.prototype --> null
// String: myString --> String.prototype --> Object.prototype --> null
// Number: myNumber --> Number.prototype --> Object.prototype --> null
// Boolean: myBoolean --> Boolean.prototype --> Object.prototype --> null
```

