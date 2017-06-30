# The Execution Context:
## Code Execution
Two Phases with Execution Context

1. Creation Phase
    * Set up variables and functions in memory
2. Execution Phase
    * Pretty simple to wrap your head around

![execution phase](https://i.imgur.com/g5iqmh9.png)

* We have all stuff set up from phase one (Creation Phase)
* Step two is JavaScript engine runs your code line-by-line
    1. interpreting
    2. converting it
    3. compiling it
    4. executing it on the computer into something the computer can understand
    5. runs your code line-by-line

```
function b() {
  console.log('Called b!');
}

b();

console.log(a);

var a = 'Hello World';

console.log(a);
```

## What will happen?
```
Called b!
undefined
Hello World
```

* This phase is pretty obvious
* The JavaScript engine just executes the code line-by-line
