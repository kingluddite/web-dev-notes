# Default Values
```js
function greet(name) {
  console.log('Hello ' + name);
}

greet('John'); // Hello John
```

* Simple
* What if we call `greet()` without a **parameter**

```js
function greet(name) {
  console.log('Hello ' + name);
}

greet(); // Hello undefined
```

* When the function is invoked
    -  A new Execution Context is created
    -  The `name` variable (which is essentially created inside the function, though the value is passed during its invokation)
        +  But `name` is initially set when the memory space is set up to `undefined`
    - JavaScript will ignore that we called the function without the expected parameter and it says **"That's Ok. No worries on not sending me the parameter, then I'll keep it as `undefined`. It has a value and you simply didn't give me a new one"**

### Houston we have a coercion problem
* The JavaScript Engine used `undefined` but when it was in `'Hello ' + name`, it coerced it to the **String** `undefined` and concatenated `Hello undefined`
* That is Bad and will cause us problems

### The solution to prevent this problem from happening it to use a default value for our parameter
* ES6 has a solution and allows default values for parameters

### Cool trick for setting default value
```
function greet(name) {
  name = name || 'Default Name';
  console.log('Hello ' + name);
}

greet();
```

* Remember `operators` are just functions that return values

#### What does the || operator return?
* It doesn't just return `true` or `false`

`> true || false` ---> true

`undefined || 'hello'` ---> "hello"

* So in the above case, `||` returns that value that can be coerced to **true**

`> Boolean("hello")` ---> true

* But what about

`> "hi" || "hello"` ---> "hi"

* It just returns the first one that coerced to true

### The || operator's special behavior
* If you pass || two values that can be coerced to true and false, it will return the first one that coerces to true

`> 0 || 1` --> 1

* 1 can be converted to true when converted to Boolean
* 0 converts to false when converted to Boolean
* So || will return 1

## What is || userful for?
We can use it in our to say "if something doesn't exist, or is an empty string, or is null, give me the second option back instead"

`> undefined || "hello"` ---> "hello"

`> null || "hello"` ---> "hello"

`> "" || "hello"` ---> "hello"

Operators are functions that return values

### That is why we can use this:
```
function greet(name) {
  // name is equal to a name passed || (OR) some default value
  // then if name is, undefined, an empty string or null, then || (OR) will return the default value to the = (equals operator)
  // || will be run before equals (order of precedence)
  // = has a lower precedence than ||
  // So || is run first
  // if name is undefined then we return the default value
  // Then equals is run and we set name = to the default value
  name = name || 'Default Name';
  console.log('Hello ' + name);
}

greet();
```

And if we did this:

```
function greet(name) {
  name = name || 'Default Name';
  console.log('Hello ' + name);
}

greet('John'); // Hello John
greet(); // Hello Default Name
```

### Cool Tip
* Use `||` to set a default value
* We could do the same thing with an `if` statement but that would require a lot more typing
* This is a neat, cool cat trick that makes your code readable

### Remember to be careful with `0`
```js
function greet(name) {
  name = name || 'Default Name';
  console.log('Hello ' + name);
}

greet('John');
greet();
greet(0);
```

* The last call for `greet(0)` will return `Hello Default Name` because `0` converts to `false`
