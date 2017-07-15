# JavaScript Aside: JavaScript is Synchronous
* Asynchronous code
* libuv
* The Event Loop
* Streams
* All are connected

## Asynchronous
* More than one process running simultaneously
    - More then one set of code running simultaneously
* Node does things asynchronously
    - V8 does not

## Synchronous
* One process executing at a time
* JavaScript is synchronous
    - Think of it as only one line of code executing at a time
    - NodeJS is asynchronous

## Takeaway
Whenever we talk of about asynchronous JavaScript we are not talking about the JavaScript Engine itself but rather whatever the JavaScript Engine is sitting inside of (Like... the browser... or... Node) and things happening inside the engine and running simultaneously alongside the JavaScript Engine as well and how the JavaScript Engine responds to things that happen outside of it, things that are happening at the same time

 

