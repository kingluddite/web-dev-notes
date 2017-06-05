# Single Threaded, Synchronous Execution
Conceptual Aside

## Single Threaded
* One command at a time
    - Programs have many lines of code but if they are single threaded they are only executing a line one at a time

### When dealing with browsers
* Remember, JavaScript isn't the only thing happening in the browser
* Under the hood of the browser, JavaScript may not be single threaded but from our perspective as programmers, JavaScript behaves in a single threaded manner

## Synchronous
One at a time and in order

* The code is executed one line at a time in the order it appears
* What about Ajax and Asynchronous code... we'll get to that later
