# Variable Scope (Part 1)
* The `scope` of a variable defines where it's accessible in your program based off of where it was created

## This works as we expect
```
let varOne = "varOne";

if (true) {
  console.log(varOne);
}
// Output: varOne
```

## This causes a problem
```
let varOne = "varOne";

if (true) {
  console.log(varOne);
  let varTwo = "varTwo";
}

console.log(varTwo);
// ERROR - varTwo is not defined
```

## Lexical Scope
* JavaScript using Lexical Scoping (aka Static Scope)
* What does it mean?
    - It is the idea that a variable defined in one part of your program might not be accessible everywhere else in your program (the context of the variable that is defined and used comes into play)
* **tip** When dealing with scoping pay attention to the "code blocks"
    - What we put inside of curly braces `{...}`

## There are 2 types of scope
1. Global Scope
    * What is Global Scope?
        - Global scope contains all of the things defined outside of all "code blocks"
        - **note** Above code: `varOne` is a Global Variable
2. Local Scope
    * What is Local Scope?
        - Local Scope are things defined inside a "code block"
        - **note** Above code: `varTwo` is a Local Variable

### Very Important scope rule
* In a scope you can access variables defined in that scope, or in any parent/ancestor scope
* This explains why we can access varOne and varTwo from inside the "code block" but can not access varTwo from outside the "code block"

```
let varOne = "varOne";

if (true) {
  console.log(varOne);
  let varTwo = "varTwo";
  console.log(varTwo);
}

console.log(varTwo);
```

## Let's draw a scope tree for the following:
```
let varOne = "varOne";

if (true) {
  console.log(varOne);
  let varTwo = "varTwo";
  console.log(varTwo);

  if (true) {
    let varFour = "varFour";
  }
}

if (true) {
  let varThree = "varThree";
}

console.log(varTwo);

// here is the scope tree

// Global Scope (varOne)
//  Local Scope (varTwo)
//    Local Scope (varFour)
//  Local Scope (varThree)
```

* Global scope can only access varOne
* The first Local Scope can only access varOne and varTwo and varFour
* The second Local Scope can only access varOne and varThree
