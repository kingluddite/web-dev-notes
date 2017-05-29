# Conceptual Aside
* Syntax Parsers
* Execution Contexts
* Lexical Environments

## Syntax Parser
A program that reads your code and determines what it does and if it's grammar is valid

* Someone wrote a program that translates your code for the computer
* Those programs are called **compilers** and at times they also have to do with interpreters
* But those programs, interpreters and compilers do the process or work of reading your code, character by character, then determining if the syntax is valid and then they implement that syntax in a way the computer can understand

### Think of it like this
![syntax parsers diagram](https://i.imgur.com/I2J9wYN.png)

You have your code

```
function hello() {
    const a = 'hello world';
}
```

There is a program that is going to convert what you've written into a real set of computer instructions, something the hardware can physically understand

If you have a function with a variable, that function and variable will be represented in memory but it is being translated from what you are writing (which is more human readable) to what the computer can understand. There is a compiler or interpreter between those two things (and part of that is a syntax parser - it is going through character by character) f-u-n-c-t-i-o-n "and then it say oh there should be a space after this word" and then it looks for the name of the function etc... and that gets translated by the systems that someone else wrote)
* But the programs that the programmers wrote can choose to do extra stuff. Your code is not what is being given to the computer .... just a translation of it
* Along the way the engine that is interpreting your code can decide to do other things

## Lexical Environment
Where something sits physically in the code you write

* **Lexical** means `having to do with words or grammar`
* So we are talking about the code you write, its syntax, its vocabulary
* A lexical environment exists in programming languages in which **where** you write something is _important_
* The program you write cares about where you put things

## Execution Context
A wrapper to help manage the code that is running

* There are lots of lexical environments
* Which one is currently running is managed via the execution contexts
* It can contain things beyond what you've written in your code


