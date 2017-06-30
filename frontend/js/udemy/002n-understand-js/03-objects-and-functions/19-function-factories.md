# Function Factories
* Let's look at ways we can use closers to do things that would otherwise be impossible

## What is a factory
Something that returns or makes other things for me

```js
function makeGreeting(language) {

  return function(firstName, lastName) {

    if (language === 'en') {
      console.log(`Hello ${firstName} ${lastName}`);
    }

    if (language === 'es') {
      console.log(`Hola ${firstName $lastName}`);
    }

  }

}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');
```

* We pass `language` as a parameter
* The difference between this and that last time we used this function is we are passing `language` to the outer function and then returning the inner function
* `language` will be trapped in the `closure`

### Analysis
* makeGreeting('en') executes
* `en` is the language
* it will return a function
* that function's outer reference will point to what the language was when make greeting was executed here `makeGreeting('en')`
* Then it ends
* The function that was returned will still point to the language variable `en` because I executed `makeGreeting()` and it was it's own Execution Context

### Then in the second case
* I execute makeGreeting() again so it gets its own Execution Context where language will be `es`
    - A different spot in memory
    - And the function that is returned from there will point at that Execution Context spot in memory

* Even though these two functions lexically sit inside the same makeGreeting they will point at two different spots in memory because they were created during two different Execution Context
* We have a closure inside the result of `makeGreeting('en')` and a closure inside the result of `makeGreeting('es')`
* `greetEnglish` is a function object who's closure points to language being `en` and greetSpanish is a function object who's closure points to language being `es`

## Factory function
* My `makeGreeting` function has acted like a factory function and we are taking advantage of closures to set the parameter value that is then used inside the function that is returned
* But, with greetEnglish we can't access `langauge` anymore because it is hidden so we can't use it in the global context `greetEnglish('John', 'Doe');` but the function itself, when it runs, has access to it
* Confused? It's ok if you are

### Let's walk through it together
* Here is all our code in our function factory

![function factory](https://i.imgur.com/WPA4z7b.png)

* When it starts I have my Global Execution Context

![global Execution Context](https://i.imgur.com/Uqfpx9d.png)

* And it has the greetEnglish, greetSpanish and makeGreeting() functions

![3 functions](https://i.imgur.com/eWn61Ld.png)

* When we hit this line it calls/executes makeGreeting

![greetEnglish](https://i.imgur.com/sqdGvmJ.png)

* And then makeGreeting gets its own Execution Context
* And I pass language 'en'

![pass language as en](https://i.imgur.com/rfKdFtw.png)

* Then it returns a function

![returns a function](https://i.imgur.com/ogLReBT.png)

* which is stored in greetEnglish

![greetEnglish storing function](https://i.imgur.com/SNhlJ2m.png)

* makeGreeting ends and gets popped off the stack

![makeGreeting ends](https://i.imgur.com/EloiXv7.png)

* But `language` set to `en` is still in memory, that memory space for that Execution Context is still hanging around
* We then call makeGreeting again but pass it 'es'

![makeGreeting again](https://i.imgur.com/YOYy7ow.png)

* Here is the important distinction
* In the previous example we looked at when we filled an array with functions

```js
function buildFunctions() {
  var arr = [];

  for (var i = 0; i < 3; i++) {

    arr.push(
      function() {
        console.log(i);
      }
    )

  }

  return arr;

}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();
```

* We only called that outer function only once, so all those functions inside that array pointed to the same memory space
* But in this case we're calling the function twice
* And when we call it a second time we get a new Execution Context
    - Every time you call a function you get a new Execution Context, it doesn't matter how many times you call it
* So that new Execution Context has it's own variable environment

![new Execution Context with own variable environment](https://i.imgur.com/jXxtvpo.png)

* And the language is `es`
* And that returns a function object

![returns function object](https://i.imgur.com/a7GoUoG.png)

* And finishes and gets popped off the stack but it's 
* But `language` set to `es` is still in memory, that memory space for that Execution Context is still hanging around
* Now I have two spots in memory that are hanging out but they are from two separate Execution Contexts

![two memory spots](https://i.imgur.com/wdYoeoj.png)

### Calling function
* Then we we finally get to greetEnglish('John', 'Doe') and I'm calling the function that was returned

![calling function that was returned](https://i.imgur.com/EV67o09.png)

* That creates a new Execution Context with `firstName: John` and `lastName: 'Doe`
* The outer environment reference, we know it needs to point to one of the Execution Contexts created by makeGreeting because thats where it sits lexically and the JavaScript engine knows that this was first created during that first Execution Context so it points to that one

![JavaScript Engine knows](https://i.imgur.com/YmsWr6C.png)

* So that's where my closure is

![closure](https://i.imgur.com/3INhpEc.png)

* So greetEnglish gives me my english greeting
* When we hit the second line `greetSpanish`

![greetSpanish](https://i.imgur.com/Rjkkj59.png)

* That is pointing to a very similar function object
* So that creates its own Execution Context

![new Execution Context](https://i.imgur.com/XPXGBvM.png)

* But that function object was created in the second call to makeGreeting('es') 
* So it's outer reference points to that second Execution Context that was created for that second call

![second call](https://i.imgur.com/dhdd7ZB.png)

* It has its own closure

![own closure](https://i.imgur.com/3ORF0CY.png)

* When greetSpanish executes it sees language is 'es' and I get my spanish greeting
* The key is realizing every time you call a function it gets its own Execution Context and any functions created inside of it will point to that Execution Context
* It is doing what it should
* It is pointing to those other memory spaces as if those Execution Contexts hadn't disappeared
* It knows which ones to point to properly where these inner functions were created and run
* This is a language feature and pretty cool!

* We are return a function that has access to what a variable was (in the outer function parameter) at the time it was created by pointing to that memory space and that lets me create functions from other functions and that's one of those things you can do in JavaScript because functions are objects
