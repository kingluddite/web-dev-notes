# What about asynchronous callbacks?
So far we talked about how everything is executed synchronously

![async vs sync](https://i.imgur.com/HxeD5vM.png)

## Asynchronous
More than one at a time

* We can fire off a bunch of functions that all are executing at the same time
* But JavaScript is synchronous, it handles code one line at a time
* JavaScript has click events
    - You can go off, get data and come back
    - You have callback functions that run when that event/action is complete

## So since JavaScript is synchronous how does it handle those asynchronous events?
* The JavaScript Engine does not exist by itself inside the browser (let's assume we are building a web app)
* There are other elements, other engines, other pieces of code that are happening outside the JavaScript Engine that runs JavaScript when you load it into the browser

## What other things are running?
* The Rendering Engine
    - Renders or "paints" to the screen of the web pages that you are looking at
* Elements of the browser have to do with going out and getting HTTP Requests and Responses (example - going out and grabbing some data)
* The JavaScript engine has **hooks** where it can go out and talk to the Rendering Engine and has **hooks** to go out and request data from HTTP Requests
    - Outside of JavaScript is an asynchronous environment and multiple things are happening at once
    - But inside the JavaScript engine is a synchronous environment

## When we asynchronously go out and make a request or we run a function when someone clicks a button, what happens?

![execution stack diagram](https://i.imgur.com/XqXYjVo.png)

* We've learned about the Execution Stack
* Where we have Execution Contexts that are being created
* And as functions are being called they are being run, stacked on top of each other
* And when they finish running they are **popped** off the stack
* There is another list that sits inside the JavaScript Engine called the **Event Queue**

### Event Queue
* This is filled with events and notifications of events that are happening
* When the browser, somewhere outside the JavaScript Engine has an event inside the JavaScript Engine we want to be notified of it gets placed on the **Event Queue** (aka `the queue`)
* And if we have a function that can respond to that event we can listen for that event and have that function handle that event
    - Either way the event gets placed on the queue

### Example - We have a click event
* Someone clicks on the screen
    - What happens if we have a function that is supposed to respond to that click event?
    - And what if another event happens while code is running (like we went out and got data and that code went out to the browser, the browser went and got the data, as my code kept running and now it's finished)
* What happens is the **Event Queue** gets looked at by JavaScript when the Execution Stack is EMPTY

![event queue diagram](https://i.imgur.com/xxcqC7q.png)

* So when `b()` finishes running and gets popped off
* Then `a()` fininishes and gets popped off
* And when the Global Execution Context finishes
* Then The Stack is EMPTY!
* Then JavaScript periodically looks at the Event Queue and waits for something to be there
    - If something is there is looks to see if a particular function should be run when that event was triggered
    - It sees a click event, it processes that click event
    - Then it creates the Execution Context for whatever function when that event happened
    - When that click event is processed it gets removed from the **Event Queue**
    - And then the next event moves up (example: HTTP Request) in the Event Queue

## Important
* So JavaScript is not asynchronous
* What is happening is the browser is putting things into the **Event Queue** but the code that is running is still running line-by-line and when the Execution Context is all gone and the Stack is empty then JavaScript processes the events in the Event Queue

## Code Example
How JavaScript handles asynchronous callbacks

```
// long running function
function waitThreeSeconds() {
  var ms = 3000 + new Date().getTime();
  while (new Date() < ms) {}
  console.log('finished function');
}

function clickHandler() {
  console.log('click event!');
}

// listen for the click event
document.addEventListener('click', clickHandler);

waitThreeSeconds();
console.log('finished execution');
```

* Our while loop waits `3` seconds
    - We are trying to simulate something that takes a long time
    - When finished it will console.log
* We will also listen for a click event (a browser event) and that will appear in that **Event Queue**
    - We will listen for the click and run the `clickHandler` function when the JavaScript Engine decides to go look at and process the **Event Queue**
* Then we get to the line that will run our `waitThreeSeconds()` function and as soon as our page loads we will click around the page while the function is running
* When all is done we'll log out that we are finished

#### What order will the 3 console logs appear?
1. `finished function`
2. `finished execution`
3. `click event`

The reason the `click` is last is the JavaScript Engine will not look at the **Event Queue** until the JavaScript Stack is EMPTY!

That means long running functions can interrupt events being handled but this is how JavaScript synchronously deals with the fact that asynchronous events are happening
* Somewhere outside the JavaScript Engine things are happening that then complete that JavaScript needs to know about so all it does is it just keeps running its normal code and when that's all done it will then go and look at the Event Queue and if its already done then it will just continue to watch that Event Queue (That is called `The Event Loop` - that's what that is called, the continuous check of the Event Queue by JavaScript Engine)
    - When the JavaScript Engine sees something, if there is supposed to be a function, if there is a handler or a listener that is supposed to run when that event appears in the Event Queue it will run it

* And that is how JavaScript, though synchronous deals with asynchronous events
* Any events that happen outside of the JavaScript Engine get placed in the Event Queue and if the Execution Stack is Empty, JavaScript isn't working on anything else currently, it will process those events in the order they happen
* If a click happens first and then a HTTP Request event, it will first run the click event function and when that function is complete it will then run the HTTP Request function and then it will start to look at the Event Queue again

Asynchronous calls are possible in JavaScript but the asynchronous part is really about what is happening outside the JavaScript Engine and JavaScript via this Event Loop via this list of events that are happening when its ready it will look at events and process them but it does so synchronously
