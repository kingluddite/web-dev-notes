# Intro to React

A JavaScript framework for buidling user interfaces

* for web browser
* mobile and the react native project

this will be building react for the browser

2 benefits for building, maintaining our UI code
1. react is declarative
2. react is component based

## declarative
our program describes the result we are trying to achieve as opposed to being imperative (describe the process and steps we need to get to our result )

* example - most of JavaScript we write is imperative
    - we take one step at a time
    - modifying variables and calling functions
    - html, on other hand, is declarative
        + we use a markup language to describe the layout of our page
        + the browser takes that description and begins doing the work to render the actual pixels for the screen, if we had to write that code imperatively, writing web pages would be a lot harder
## components
* building html we work with elements like divs, spans, inputs
* sections of UIs we want to reuse
    - comment section facebook
    - star rating widget on netflix
        + they are both build with comment elements like divs and spans when we design we think of them as self contained components

## When building JavaScript UIs
* we often have some sort of JavaScript Data Model
    - Arrays
    - Objects
        + both describing our data
        + example
            * todo list - might be represented as an array of objects with each object being one todo item
            * in our HTML
                - we represent that as an UL with LIs representing each todo
* the difficult part of UIs is keeping your Data Model and DOM UI in sync

## How do we declare our UI
By building a Virtual Dom

React provides us with a declarative way to build our UIs
* we write a description up of what we want
* but we don't have to assemble the pieces or update them ourselves
* we describe our application entirely within our JavaScript files
* this includes
    - our app logic
    - our data
    - our markup
        + not literal markup but representation of our HTML markup

REact will create a representation of our markup using basic JavaScript data types like Objects, Arrays and Strings

* this JavaScript representation of the DOM is call the virtual DOM in react
* these virtual DOM objects are cheap and fast to use
* react will translate our virtual DOM elements into real DOM elements on the page

adding and removing elements from the DOM is WAY SLOWER than doing the same thing in the VIRTUAL DOM
React makes every effort to manipulate the real DOM as little as possible
* when we write our react markup code we will always think of it as we are building it from scratch, we describe what the markup should look like from a given piece of data
* think of it like:
    - every time our data changes, we discard our DOM elements and build it from scratch
        + this means we don't have to consider our previous data of our UI when building our components
        + react takes care of rebuilding our real DOM elements from our virtual DOM
react keeps tract of previous version of virtual DOM and current version of current DOM and compares the two and does the minimal changes needed to update the real DOM tree

## JSX
JSX is a tool, that while not required, makes working with React much easier to write and understand.

How do we describe a DOM element in the VDOM
* describe the element
    - div, span, script, anything
    - then list of attributes
        + key value pairs that add more information
    - may or may not have children

```jsx
React.createElement('a', {
    href: "http://somesite.com"
    }, "Example");
```

3 args
1. string - elements name
2. object of keys and values describing elements
3. children of our element

we don't want to use React.createElement() over and over again
instead we use JSX

### JSX
Extension to the JavaScript language that allows us to use an XML syntax to build our React.createElement() calls

so instead of writing this:

```jsx
React.createElement('a', {
    href: "http://somesite.com"
    }, "Example");
```

we write this

```xml
var myLink = (
  <a href="http://somesite.com">
    Example
  </a>
);
```

we need to introduce a build step into our development to translate our JSX code into regular JavaScript
in development this tool can run in a browser when we run our code
* simplies things but not recommended for production

## Babel
transpiler translates JSX into JavaScript


## why is HTML mixed into our JavaScript files
* isn't that bad?
* note
    - jsx is not HTML
        + it is just an alternate syntax for calling functions in JavaScript
    - a component is composed of layout code and behavior code
        + traditionally this was split between HTML and JavaScript files
        + but there really is no reason to separate the two
        + you usually need to reach into your HTML templates from your JavaScript code and then the separation breaks down there
    - so we need to think of our components holistically 




