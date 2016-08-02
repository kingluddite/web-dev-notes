# Behavior Driven Development (BDD)

## Tests
Describe the expected behavior of our application
* Like an outline
* Tell us when we break stuff

### Unit Testing
Build up our tests to cover one small unit of our code at a time
* focus on small, meaningful chunks of functionality
* good unit tests are easy to understand
* prove that each piece of our code does what we want

## How do we test?
* console.log()
* write and see what happens
* `guess and check development`

## Problems with Manual Testing
* Difficult to write effectively
* Impacts my actual program
* Very hard to read
* Only a temporary fix

## Mocha
Tool to write automated tests for individual units of code in our app

### Suite
We'll build a collection of test functions called a `suite`
* Ask your team what they mean by suite
* Mocha uses `suite` to describe a specific group of related tests

## Automated Testing
* Results displayed in an informative way
* Test files are separate from real code
* Output is easy to read and understand
* Guarantees code works as expected
* Instantly see if anything has broken when making changes

## Unit Testing
Writing tests that confirm an individual function or piece of code works the way we intend it to. We write Unit Tests for code that has a clear specific purpose. We can write a test for a particular function and then we can just test that function itself without running our entire application

Analogy: Soccer Player Drills
* Dribbling
* Shooting
* Passing

## Unit Testing
The soccer player works on one skill at a time and doesn't worry about other skills when working on that one skill and not worrying about what their teammates are doing.

Unit Tests are very similar. 

## Integration Testing
But sometimes soccer players need to practice with teammates to make sure they all can use the skills all together to win the game.

In programming we use **integration testing** when we add new code to preexisting code to make sure that not only do all the pieces work individually as expected but also that they run together correctly without breaking.

## End-to-end Testing
Playing actual games. Live games are different from practice games. We play games on different fields with different fans and against teams with different strategies. Being a good soccer team requires a lot of team experience

In software End to end testing is when we fire up the application and run it from start to finish for all the user stories we can think of. This ensures that the app is ready to go live and that the special details of deployment don't mess up the stuff that we carefully tested on our local machines with unit testing and integration tests.

End to end tests are conducted occassional. Only a few times during the product's life cycle. Because they are very time consuming and expensive.

These notes are focused on Unit Testing because that is what you will spend most of your time writing.

Unit Tests Pros
* Help us write better code
* Help us grow as developers

## BDD - Behavior Driven Development
* Is not a type of testing like Unit Testing or Integration Testing
* BDD is an `approach` to building software

Start your app with a plan or a brainstorm or an outline so you can always have an idea where you are headed.

BDD is like creating a plan before you write your program
* Instead of writing your code and seeing if it works (lots of programmers write code like this)
* With BDD, you write tests first, and code second
* How should a program behave when something happens
* What should we expect to get back from this function if we give it a number instead of a string
* We start by describing how the program should work (these are our test), then we write code so that it does work the way we expect it to.
* at first our errors will be red and many but that is ok
* then step-by-step we code our function until our tests pass (our bright red errors are replaced with green pass checkmarks)
* as we fix errors we will get new errors and this will give us guidance in writing our new tests
* at first you don't care how your code looks, you just want the tests to pass
* once we get all our green pass check marks we can go back to clean up our code to make it nicer to read or faster to run (aka refactoring) 

## Red > Green > Refactor
This development cycle is called Red > Green > Refactor

1. Write the tests, even though they'll fail
2. Write the easiest code we can that passes the tests
3. Go back and improve the passing code
4. Repeat

Example
Titles should be [title cased](http://grammar-monster.com/lessons/capital_letters_title_case.htm) (Title Cased except for the, and a)

## Install npm into your project
`$ npm init -y`

# Chai
## Install mocha
Chai is not a dependency for our production code. It is purely used for development

[chai installation documenation](http://chaijs.com/guide/installation/)

```
$ npm install chai --save-dev
```

* chai is called an `expectation library`
* chai includes special functions that throw an error when an expectation is not met
* we will use chai to write our BDD outline for a small function

`$ touch textUtilities.js`

[Chai Expect method](http://chaijs.com/guide/styles/#expect)

**textUtilities.js**
Writing it this way:

```js
var expect = require( 'chai' ).expect;
```

Is more efficient than writing it this way:

```js
var chai = require('chai');
var expect = chai.expect;
```

* We require **chai**
* Now node will look for that name in our `node_modules` directory
* Since I don't want to use everything in this library, I just save the expect method to a variable and throw the rest away

Add this line: (it will obviously be false)

`expect( true ).to.be.false;`

## Run in console
```
$ node textUtilities.js
```

Will get this error:

![assertion error](https://i.imgur.com/czM8FaH.png)

But if we change this line to:

`expect( true ).to.be.true;`

And run it again. We won't see any output. Which means there was no errors.

Out output isn't very user friendly but when we combine Mocha with Chai, our output will be a lot more user friendly

## Writing our first expectation for Title Case function

`expect(titleCase('the secret life of walter mitty'));`

* I make up a title and come up with a title that has several words and I make them all lower case
* what is the output I want? A string comes in and a string comes out

`expect(titleCase('the secret life of walter mitty')).to.be.a('string');`

Run it
We have an error saying titleCase is not defined
Because we didn't create our function yet.
we fix one error at a time

Add our function above our previous code

```js
function titleCase() {

}

expect( titleCase( 'the secret life of walter mitty' ) ).to.be.a( 'string' );
```

Now we get this error: `AssertionError: expected undefined to be a string`

To fix this I pass the titleCase() method a string and return it.

```js
function titleCase( title ) {
  return title;
}

expect( titleCase( 'the secret life of walter mitty' ) ).to.be.a( 'string' );
```

Run it and you will see no errors.

Woohoo!

[Great article on Writing Great Unit Tests](http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/)

## Writing Better Expectations
Our expectations aren’t really accurate yet. We can pass all our tests, even if nothing works correctly, because our test code doesn’t really test what we want it to.

Our next expectation will be to output a title with title case:

```js
var expect = require( 'chai' ).expect;

function titleCase( title ) {
  return title;
}

expect( titleCase( 'the secret life of walter mitty' ) ).to.be.a( 'string' );
expect( titleCase( 'the secret life of walter mitty' ) ).to.equal( 'The Secret Life Of Walter Mitty' );
```

## Run `$ node testUtilities.js`

### Output: Assertion Error: `      ^

**AssertionError:** expected 'the secret life of walter mitty' to equal 'The Secret Life of Walter Mitty'`

No in order to make this test work, we need to make our whole function work
That is too big of a task
We need to break this up into smaller expectations that we know how to tackle

We will move the test we just wrote (the `to.equal`) at the end of our tests because we know when that runs our test is complete

```js
var expect = require( 'chai' ).expect;

function titleCase( title ) {
  return title.toUpperCase(); // MODIFY THIS LINE
}

expect( titleCase( 'the secret life of walter mitty' ) ).to.be.a( 'string' );
expect( titleCase( 'a' ) ).to.equal( 'A' ); // ADD THIS LINE
expect( titleCase( 'the secret life of walter mitty' ) ).to.equal( 'The Secret Life Of Walter Mitty' );
```

Assertion Error: `AssertionError: expected 'THE SECRET LIFE OF WALTER MITTY' to equal 'The Secret Life of Walter Mitty'`

We pass our a to A test but fail our final test

We made progress but now we capitalized too much

```js
var expect = require( 'chai' ).expect;

function titleCase( title ) {
  return title[ 0 ].toUpperCase(); // MODIFY THIS LINE
}

expect( titleCase( 'the secret life of walter mitty' ) ).to.be.a( 'string' );
expect( titleCase( 'a' ) ).to.equal( 'A' );
expect( titleCase( 'vertigo' ) ).to.equal( 'Vertigo' ); // ADD THIS LINE
expect( titleCase( 'the secret life of walter mitty' ) ).to.equal( 'The Secret Life Of Walter Mitty' );
```

Assertion Error: `AssertionError: expected 'V' to equal 'Vertigo'

Alter the `titleCase()` function to:

```js
function titleCase( title ) {
  return title[ 0 ].toUpperCase() + title.substring( 1 );
}
```

Run the test again

`AssertionError: expected 'The secret life of walter mitty' to equal 'The Secret Life of Walter Mitty'`

We get an error but at least the first word is capitalized.

### the map() function
do something to each member of an array and return an array of the same length

Loop through all the words, do our titleCase logic on them and then store them in titleCaseWords

## Update our code

```js
var expect = require( 'chai' ).expect;

function titleCase( title ) {
  // split words up by their spaces and save them to an array
  var words = title.split( ' ' );
  var titleCasedWords = words.map( function( word ) {
    return word[ 0 ].toUpperCase() + word.substring( 1 );
  } );
  // join all the words together with a space
  return titleCasedWords.join( ' ' );
}

expect( titleCase( 'the secret life of walter mitty' ) ).to.be.a( 'string' );
expect( titleCase( 'a' ) ).to.equal( 'A' );
expect( titleCase( 'vertigo' ) ).to.equal( 'Vertigo' );
expect( titleCase( 'the secret life of walter mitty' ) ).to.equal( 'The Secret Life Of Walter Mitty' );
```

Run the code again with `$ node textUtilities`

And everything should pass

Woohoo!

Edge cases
* What if our input is a title that is not nicely formatted?
