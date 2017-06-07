# The Scope Chain
* This confuses people a lot
* But with understanding of execution context and stacks it will be a lot easier to understand

```
function b() {
    console.log(myVar);
}

function a() {
    var myVar = 2;
    b();
}

var myVar = 1;
a();
```

* In function `b()` we are not declaring `myVar`, we are just logging it

* What do you think will happen?

```
1
```

* Why is it `1`?

1. We have our execution stack
2. At the Global level myVar was `1`
3. `a()` execution context myVar was `2`
4. `b()` execution context did not declare anything

![stack of scope](https://i.imgur.com/QI1aIt9.png)

* When we request a variable
* JavaScript does more than just look in the variable environment of the currently executing context
    - **remember** 
        + Each context has special things created like `this`
        + Also the `reference to the outer environment` (_We haven't used this yet_)
            * Every Execution Context has a reference to its outer environment
            * What is an outer environment?

`b()`s outer environment is the Global Execution Context

![outer context for b()](https://i.imgur.com/yu4sn2k.png)

`a()`s outer environment is also the Global Execution Context

![a()s outer environment](https://i.imgur.com/Fm2pvws.png)

## The Lexical Environment
* Where something is written physically in your code is important
* That it determines certain things as far as how the JavaScript engine will decide and determine where things live and where things will sit in memory and how they will connect to each other

Where does function `b()` sit **lexically**?

![function b()](https://i.imgur.com/S1P3tl1.png)

* It **lexically** sits on top of the Global Environment
* It is not inside function `a()`
* b() is sitting at same level as `var myVar = 1;`

![lexically same level](https://i.imgur.com/rok5FFB.png)

### JavaScript does something special
* It cares about the lexical environment when it comes to the **outer reference** that every Execution Context gets
* And when you ask for a variable while running a line of code inside of any particular Execution Context, if it can't find that variable, it will look at the **outer reference** and go look for variables there somewhere **down below it** in the Execution Stack
* And that **outer reference** (where it points) is going to depend on where the function sits `lexically`

Since the `b()` function sits on the Global level, so it's outer environment is Global and so it `a()`

In our example JavaScript couldn't find `myVar` inside the b() Execution Context so it went **down** to the **outer reference** and that was Global Execution Context and there is where `myVar` was set to `1` and that is the value it returned

* When you invoke a function the JavaScript engine creates an outer reference for that Execution Context and it looks at where the code was physically sitting
* The parser already knows where that function was written because it went line-by-line through your code and it then creates the appropriate outer reference based on where your code was physically written in the JavaScript file

* This entire act of searching this chain of references to outer environments could be a long journey
* If you had several more functions calling each other, it would keep on moving down until it hit Global (if those functions were defined inside each other), down the outer environment references until it finds it (or doesn't find it) - That whole chain is called **The Scope Chain**

![The Scope Chain](https://i.imgur.com/HA1iurG.png)

**Remember** `Scope` means - Where can I access a variable?
And the `chain` is those links of outer environment references lexical (where it was physically written in your code)

b() couldn't find `myVar` so it went **down the scope chain**

### We will change this by changing the `lexical environment` of the function

```js
function a() {

    function b() {
      console.log(myVar);
    }

    var myVar = 2;
    b();
}

var myVar = 1;
a();
```

* Output will be `2`
* Why?
    - We invoke `a()` and **myVar** is set to `2`
    - We invoke b() and when it tries to log myVar and doesn't see it inside `b()` it goes to its outer reference (which is a()) and in a() **myVar** is set to 2 and that is why we return `2`

```
function a() {

    function b() {
      console.log(myVar);
    }

    var myVar = 2;
    b();
}

var myVar = 1;
a();
b();
```

* there is no `b()` because it is inside `a()`
* If you run this you will get an uncaught reference that b is not defined
* function b() was not found in the first phase of the global Execution phase. It only found a() because that is where it was sitting `lexically`
* function a() is visible lexically but not b()

![new outer reference](https://i.imgur.com/EPnNOhh.png)

```
function a() {

    function b() {
      console.log(myVar);
    }

    b();
}

var myVar = 1;
a();
```

* The output is `1`
* We invoke a() and then invoke b()
* inside b we have no myVar so we go down to `a()` and there is no myVar so we go down to the Global scope and that's how we get `1`

### Alternative way to think about it
If you don't like thinking about it `lexically`

#### Who created it?
Since b() is inside a() - a() created b() and so a() is the outer environment reference


