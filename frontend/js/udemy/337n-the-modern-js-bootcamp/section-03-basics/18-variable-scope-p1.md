# Variable Scope (Part 1)
* The `scope` of a variable defines where it's accessible in your program based off of where it was created

## This works as we expect
```
let varOne = "Hello from the global scope";

if (true) {
  console.log(varOne);
}
// Output: Hello from the global scope
```

## This causes a problem
```
let varOne = "Hello from the global scope";

if (true) {
  console.log(varOne);
  let varTwo = "Hello from the local scope";
}

console.log(varTwo);
// ERROR - varTwo is not defined
```

## Lexical Scope
* JavaScript using `Lexical Scoping` (aka Static Scope)
* What does it mean?
    - It is the idea that a variable defined in one part of your program might not be accessible everywhere else in your program
      + (_the **context** of the variable that is defined and used comes into play_)
* **tip** When dealing with scoping pay attention to the "code blocks"
    - "Code blocks" are what we put inside of curly braces `{...}`

## There are 2 types of scope in JavaScript
1. global scope
2. local scope

### What is global scope?
* `global scope` contains all of the things defined outside of all "code blocks"
  - **note** Above code: `varOne` is a `globally scoped` variable

### What is local scope?
* local scope are things defined inside a "code block"
* **note** Above code: `varTwo` is a local scoped variable

### Important scope rule
* In a scope you can access variables defined in that scope, or in `any parent/ancestor` scope
* This explains why we can access `varOne` and `varTwo` from _inside_ the "code block"
  - But we can not access `varTwo` from _outside_ the "code block"

```
let varOne = "Hello from the global scope";

if (true) {
  console.log(varOne);
  let varTwo = "Hello from the local scope";
  console.log(varTwo);
}

console.log(varTwo);
```

## Fun with "scope trees"
### Let's draw a scope tree for the following:
```
let varOne = "varOne";

if (true) {
  console.log(varOne);
  let varTwo = "Hello from varTwo's local scope";
  console.log(varTwo);

  if (true) {
    let varFour = "Hello from varFour's local scope";
  }
}

if (true) {
  let varThree = "Hello from varThree's local scope";
}

console.log(varTwo);

// here is the scope tree

// global scope (varOne)
//  local scope (varTwo)
//    local scope (varFour)
//  local scope (varThree)
```

* global scope can only access `varOne`
* The first local scope can only access `varOne` and `varTwo` and `varFour`
* The second local scope can only access `varOne` and `varThree`
