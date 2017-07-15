# Libuv,The Event Loop, and Non-Blocking Asynchronous Code
![event emitter sys and custom events](https://i.imgur.com/MCBmPTt.png)

* Event Emitter is just a trick
    - Really just an object with properties and methods

## Custom Events
* JavaScript Core
    - Event Emitter

## System Events
* These are handled inside the C++ Core
    - They are handled by a `C` Library called **libuv**
    - This is embedded inside Node and used elsewhere
    - We want to manage events coming from the OS (Operating System... closer to the machine)

## Inside Node
### V8
* Inside Node we have V8
    - JavaScript is synchronous 
    - V8 runs 1 line of code at a time

![V8 runs 1 line of code at a time](https://i.imgur.com/0hZwkFC.png)

![V8 runs until done all lines of code](https://i.imgur.com/ABFeqa1.png)

### libuv
* Also inside Node lives `libuv`
* This is another library
    - Written specifically to deal with things happening at a lower level
    - Events occurring in the OS
* libuv may request to download something from the Internet

![libuv request OS](https://i.imgur.com/BUhEcb2.png)

#### libuv
* Inside of libuv is a queue
    - A queue of events that have completed
    - This may be happening simultaneously why V8 runs its code

![libuv queue](https://i.imgur.com/tDrtwe7.png)

##### Event Loop
* The most important part inside the Queue is the Event Loop

![libuv event loop](https://i.imgur.com/TfnlQVk.png)

* In this Event Loop libuv is constantly checking the queue that something has happened
* This is happening while V8 is running
* At some point the event, download data, open a file... will be placed in the queue from the OS

![event placed in queue](https://i.imgur.com/Oghqn5E.png)

* There may be more than one event in the event loop between checks as the loop is looping

![stack of events](https://i.imgur.com/XL8GCoa.png)

* On every loop, libuv checks the queue and the OS may put more than one "Hey I finished that" inside that loop

####### libuv processes completed events
* When libuv sees that an event is complete, it processes it and pops that event off of the event loop stack
    - And then is runs a **callback**

![event loop callback](https://i.imgur.com/tohw08K.png)

* The callback tells V8 code that is to be run when that Event completes
    - Similar to the idea of an `event listener`
    - That callback will usually involve (most likely internally) JavaScript code running as a response
        + But only when its finished running in the other code that is running
            * Because JavaScript is synchronous (which means it can only handle one thing at a time)
            * V8 has to wait until it is finished running the code it was running before it can start running the code it was instructed to run by the libuv callback
* This entire process is asynchronous because there are things happening in libuv and V8 at the same time and all of this inside Node itself

## Node Tagline - Event Driven Non-Blocking I/O in V8 JavaScript
### What the hell does that mean?
* V8 is embedded inside of Node and that's what's executing the JavaScript code
* I/O - Input/Output
    - These are things happening at the OS level
        + Opening files
        + Connecting to Databases
        + Retrieving and sending information over the Internet
    - These things happen at a core level within your computer system
        + Within a server
* The **Event Driven** part is where we are asking for these things to happen and then we are getting an event notification when its done
    - Because your JavaScript code can continue to run, this is called **non-blocking**

## Non-Blocking
* Doing other things without stopping your programming from running
* This is made possible by Node's doing things asynchronously

### What is a blocking process
* Go get me this file and read me the contents
    - And then I wait for the entire file to be read and all the file contents to be pulled into memory
    - And then I moved on to the next line of code
* This can be a huge problem if
    - You have many users
    - Times the server slows down
    - The files could be extremely large
    - And then you would end up blocking the next thing you can do in your program, so your program would appear to FREEZE while it's carrying out these other tasks
    - But with Non-Blocking, we ask Node to go off and doing something else while our JavaScript continues running

## Asynchronous code
* Has been around a long time
* But it has been difficult to program with
* Having multiple sets of code running simultaneously is hard to manage from a code perspective
    - Node lets us write synchronous code in JavaScript which is easy to manage
    - But gives us the ability to still respond to things that are happening asynchronously
    - So this is a solution to the problem and difficulty and makes life easier to deal with simultaneous code running
        + Because we as developers are not worrying about how the simultaneous code affects each other
        + Instead we just say "Please run this code when this thing over here is done and meanwhile we'll keep running this code over here"
        + This is how NodeJS can be high performance, because many things can be running but we won't be blocking

## libuv 
* Aynchronous I/O made simple

[libuv website](http://libuv.org/)

* Click on show code
    - `.c` and `.h` files which is **C Code**
    - `libuv/src/win/core.c`

![libuv primary loop](https://i.imgur.com/2Lt0ltu.png)

* Above is libuv's primary loop about to be run
* Here is the while loop

`while (r != 0 && loop->stop_flag == 0) {`

* That loop keeps running and checking for things to invoke
* It checks for events to be completed and callbacks to run
* This is the foundation of how everything works under the hood
