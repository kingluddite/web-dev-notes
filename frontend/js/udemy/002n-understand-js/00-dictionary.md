## Syntax Parser
A program that reads your code and determines what it does and if it's grammar is valid

## Lexical Environment
Where something sits physically in the code you write

## Execution Context
A wrapper to help manage the code that is running

## name/value pair
A name which maps to a unique value

## Object
A collection of name value pairs

### What do we mean by Global?
Something that is accessible everywhere and to everything in your code

## Single Threaded
* One command at a time
    - Programs have many lines of code but if they are single threaded they are only executing a line one at a time

## Synchronous
One at a time and in order

## Invocation
Running a function (_aka `calling` a function_)

## Variable Environment:
* Where the variables live
* And how they relate to each other in memory
## Scope
* Where a variable is availble in your code
    - And if it's truly the same variable, or a new copy
    - If you call the same function twice
        + They each get their own Execution Context
        + It looks like the same variable but it is two different variables in memory

## ES6
* Also called EcmaScript 2015

## Asynchronous
More than one at a time

### Event Queue
* This is filled with events and notifications of events that are happening
* When the browser, somewhere outside the JavaScript Engine has an event inside the JavaScript Engine we want to be notified of it gets placed on the **Event Queue** (aka `the queue`)
* And if we have a function that can respond to that event we can listen for that event and have that function handle that event
    - Either way the event gets placed on the queue

## Dynamic Typing
You don't tell the engine what type of data a variable holds, it figures it out while your code is running

## Static Typing
You tell the engine ahead of time what type of data the variable will hold

# Primitive Types
* A type of data that represents a single value
    - In other words, something that is not an object

## There are 6 types of Primitives in JavaScript
1. Undefined
2. Null
3. Boolean
4. Number
5. String
6. Symbol (new)

### 1. Undefined
* `undefined` represents a lack of existence
* (_you shouldn't set a variable to this_)
* The JavaScript Engine initially sets variables to this value and it will stay `undefined` unless you set the variable to have a value

### 2. Null
* `null` represents lack of existence
* Developers should use this when setting a variable to not having a value

### 3. Boolean
true or false

### 4. Number
* Only one numeric type in JavaScript and it is called `Number`
* `Number` is a **Floating point** number (meaning there is always some decimals)
* Unlike other programming languages (they have `integer`, `decimal`...), there is only one `number` type... and that can make math weird

### 5. String
* A sequence of characters
* both single quotes `''` and double quotes can be used `""`

### 6. Symbol (new)
Used in ES6 - won't talk about it in this course

# Operators
* A special function that is syntactically (written) differently
* Generally, operators take two parameters and return one result

## Operator Precedence
* Which operator function gets called first
* Functions are called in order of precedence
* HIGHER precedence wins!

## Associativity
* What order operator functions get called in:
    - Left-to-right (left associativity) or right-to-left (right associativity)
* When functions have the same precedence
* If my operators all have the same precedence how do I know what to do first?
    - The associativity of that operator will tell me to call the functions left to right or right to left

## Coercion
* Converting a value from one type to another
* This happens often in JavaScript because it is dynamically typed

## Framework 
A grouping of JavaScript code that performs a task and is intended to be reusable

## Objects and the Dot
* Objects are collections of name/value pairs
    - And those values can be other collections of name value pairs

## What is a Namespace?
* A container for variables and functions
* Typically to keep variables and functions with the same name separate

## JSON
`J`ava`S`cript
`O`bject
`N`otation

* It is inspired by object literal syntax in JavaScript
* It looks a lot like object literal syntax
* A common misconception is to think they are the exact same thing

## Functions are Objects
* Most fundamental Concept
* This is the difference between someone that uses JavaScript to someone that deeply understands it
* This is where we can learn to use JavaScript in ways that other popular programming languages can't match

## First Class Functions
In JavaScript, functions are Objects

### What are First Class Functions
Everything you can do with other types you can do with functions

## What is an Expression?
A unit of code that results in a value

## Function Statement and Function Expressions
In JavaScript we have both Function Statements and Function Expressions

## Arrays - Collections of Anything
* An array is a collection
* It can hold many things inside of it

## Arguments
* The parameters you pass to a function
* JavaScript gives you a keyword of the same name which contains them all
* You could say:(same thing)
    - Your parameters
    - Your arguments
    - This is the case with really any programming language that has functions
* But JavaScript gives you a keyword of that same name which contains them all

## The `arguments` keyword
* We don't have to declare it anywhere
* It is automatically made available to you by the Execution Context

## Whitespace
* Invisible characters that crate literal "space" in your written code
    - Carriage returns
    - tabs
    - spaces
* Makes your code more human readable
* But that is really now what is being executed on the computer system
* The JavaScript syntax parser is very liberal about what it allows when it comes to whitespace

## Immediately Invoked Function Expressions (IIFE)s
(pronouned if-ee)

## What is a factory
Something that returns or makes other things for me

## Function Currying
* Creating a copy of a function but with some preset parameters
    - Very useful in mathematical situations

## Functional Programming
* JavaScript has less to do with languages like:
    - Java
    - C++
* More to do with languages like:
    - These are languages with first class functions
        + [Lisp](http://www.gigamonkeys.com/book/introduction-why-lisp.html)
        + [Schema](https://en.wikipedia.org/wiki/Scheme_(programming_language))
        + [ML](https://en.wikipedia.org/wiki/Standard_ML)
    - Functions that behave as object
    - Functions you can pass as parameters
    - You can return functions from functions
* Having first class functions inside JavaScript means we can use **functional programming**
    - Where we think and code in terms of functions
    - This introduces an entirely different way of thinking when programming
    - It introduces an approach that is impossible to replicate in other programming languages

## Inheritance
One object gets access to the properties and methods of another object

## Reflection
An object can look at itself, listing and changing its properties and methods

## object literal syntax
* One way to build objects

## Function Constructors
A normal function that is used to construct objects

## prototype
### What is it?
* It starts its life as an empty object
* It is always there
* You can add on to it

## Object.create and Pure Prototypal Inheritance
* This is another way to create objects that does not try to mimick other programming languages
* New browsers all have built in

## Syntactic Sugar
A different way to type something that doesn't change how it works under the hood

## Initialization
* array literal uses brackets []
* object literal uses curly braces {}

## Strict Mode
* JavaScript is liberal with how it parses code
* You can tell the JavaScript Engine to process your code in a strictor way

## Why jQuery and what it is for
* It is written in JavaScript
* Deals with cross browser issues
* jQuery enables you to manipulate the DOM
    - Document Object Model inside the browser

## DOM
* Separate from the JavaScript Engine
* It is the thing that lets the browser look at the HTML and decide how to render `aka "paint"` it on the screen
* JavaScript has access to the DOM
    - It can manipulate the structure of an HTML page after its been loaded by manipulating the DOM in memory, which is a tree like structure that houses or stores a representation of your HTML that is used to paint or render onto the screen
* jQuery makes it easy to look at that tree (the DOM), to find things, to find elements on your page and manipulate them

## Sizzle
* A whole other engine inside of jQuery
* [link](https://sizzlejs.com/)
    - the string we passed jQuery `$('ul.people > li)` is using sizzle
* I can have an IIFE nested inside another IIFE
