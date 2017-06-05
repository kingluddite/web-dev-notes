# Functions, Context and Variable Environments

## Variable Environment:
* Where the variables live
* And how they relate to each other in memory

When you think of a variable environment just think about where is the variable

```
function b() {
    var myVar;
}

function a() {
    var myVar = 2;
    b();
}

var myVar = 1;
a();
```

## What will happen with this code?
![variable environment Execution Context](https://i.imgur.com/Ifm3B1N.png)


### What is the value of `myVar` at any point in time?
We need to think about Execution Context and what is happening when these functions are being invoked

1. Global Execution Context is created and code is executed
    * `var myVar = 1;` is put into memory space
    * The Environmental Environment for the Global Execution Context is the Global object (aka **Window** in the browser)
2. Next we invoke `a()`
    * A new Execution Context is created for `a()`
    * Then `var myVar = 2` will be put into that Execution Context Variable Environment

**note** Every Execution Context has it's own `variable environment`

3. Then it invokes `b()` and a new Execution Context with its own variable environment (it's own memory space for its variables is created)
    * Since it has no value, myVar will be put into memory with a value of `undefined`
    * This has to do with `Scope`
        - All **Scope** means is where are we able to "see" the variable
        - Each variable that we are looking at is defined within its own Execution Context because it is within a function
        - And everytime you call a function you get your own Execution Context

## Takeaway
* Even though the variable `myVar` is declared three times, each is unique and they don't **"touch"** each other

## Proving the variables don't touch each other
```
function b() {
  var myVar;
  console.log(myVar);
}

function a() {
  var myVar = 2;
  console.log(myVar);
  b();
}

var myVar = 1;
console.log(myVar);
a();
```

### View in console
```
1
2
undefined
```

### What if you did this?

```
function b() {
  var myVar;
  console.log(myVar);
}

function a() {
  var myVar = 2;
  console.log(myVar);
  b();
}

var myVar = 1;
console.log(myVar);
a();
console.log(myVar);
```

### How would the output change from the previous exercise?
### View in console
```
1
2
undefined
1
```

Does that make sense now?
