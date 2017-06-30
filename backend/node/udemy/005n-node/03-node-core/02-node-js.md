# What does JavaScript need to manage a server?
## JavaScript needs better ways to organize its code into resuable pieces
* ES6 has better ways to do this but before it came out, node.js had better ways to do this

## Ways to deal with files

## Ways to deal with Databases
* If you are building web software almost always deal with a Database
* The web server is what communicates with the Database
* We need a way to communicate over the Internet
* We need the ability to accept requests and send responses (in the standard format)
* Sometime the work takes a long time, we need a way to deal with work that takes a long time and continue to access the web server even when it is doing things that are taking a while
* These are some of the problems that need to be solved because JavaScript doesn't have them out of the box
* These are some of the things that Node.js solves for us 
