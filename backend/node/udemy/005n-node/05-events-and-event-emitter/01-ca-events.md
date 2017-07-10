# Conceptual Aside
## Events
Something that has happened in our app that we can respond to

* In Node we actually talk about two different kinds of events
    - This is confusing to some people

## Two types of events in NodeJS
* System Events
    - Comes from C++ of Node Core
    - Thanks to a library called libuv
        + Sending events lower level, closer to the machine
        + Stuff like
            * I finished reading a file
            * The file is open
            * I received data from the Internet
            * These are things JavaScript doesn't have
* Custom Events
    - Completely different than System Events
    - They are inside the JavaScript Core
    - It is a JavaScript library of events that deals with events that I can create for myself
        + I can in my code say this happened and I can have code that responds to what happened
    - This is NOT part of the C++ library
    - This is the **Event Emitter** inside the JavaScript core
    - It is the JavaScript file that contains the code for the Event Emitter

## What is confusing
![two types of events](https://i.imgur.com/dbGyz75.png)

JavaScript code often wraps calls to the C++ side of Node so often times when an event occurs in **libuv** it often generates custom JavaScript event to make it easier for us to manage our code and decide which code should run when that event happens

* The JavaScript side is `faking it`
* It is not real events
    - JavaScript doesn't have an eventing concept
    - But we can fake it by creating our own event library
    - By using the technique that the Node Event Emitter uses

## We will build our own Event Emitter 
