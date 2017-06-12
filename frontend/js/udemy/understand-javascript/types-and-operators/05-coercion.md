# Coercion
* Converting a value from one type to another
* This happens often in JavaScript because it is dynamically typed

```
var a = 1 + 2;
console.log(a); // 3
```

But what if we pass two strings instead of two numbers?

```
var a = 'hello ' + 'world';
console.log(a); // hello world
```

* Instead of adding two numbers it concatenates the two strings

### But what about this?
```
var a = 1 + '2';
console.log(a); // 12
```

* The first value was coerced by the JavaScript Engine into a String
* In memory the string '1' and the number `1` look nothing alike
* I didn't tell JavaScript Engine what to do, it decided when the function ran (other programming languages would throw an error in the same situation)
* JavaScript is dynamically typed so it tries to convert the value to the value it thinks you want
