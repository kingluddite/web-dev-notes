# V8 - The JavaScript Engine

![languages](https://i.imgur.com/HMycdAd.png)

At the core of the JavaScript Engine
## We need to understand three things
* Processors
* Machine Code
* C++

## Processors
* Your microprocessor
* You buy a PC you look at the processor speed

### What is a microprocessor?
* A very small (tiny) machine
* We give it instructions
* The microprocessor speaks a language
* Not all microprocessor are the same and they all don't speak the exact same language
    - We give it instructions and the microprocessor has to get those instructions is a specific language
    - Different languages microprocessors may speak
        + IA-32
        + x86-64
        + ARM
        + MIPS
    - The Processor is a physical thing
        + You can hold it in your hand
        + cellphone, laptop, it is a machine
        + A machine that accepts instructions and carries them out
        + set of instructions === computer code
            * code that is given directly to the machine and that is called **machine code**

#### Machine Code (Language)
* Programming languages spoken by computer processors
* Every program you run on your computer has been converted (compiled) into machine code

##### What machine code looks like
![machine code sample](https://i.imgur.com/pBhzj30.png)

* These are instructions with memory
    - Specifically what to do with what pieces of memory on your computer
        + This is very, very low level
* We don't write in machine code
    - We write in languages that are compiled into machine code
    - As time has moved on we moved away from writing lower level code and into more higher level languages
* Assembly Language was a step up from Machine Language
* Then C/C++
* JavaScript was inspired by C syntax
    - C/C++ still gives you a level of control that is lower level
        + Very popular
        + Easier to code in that machine or assembly language but gives you a great deal of control
* Then you have very high programming languages like JavaScript

## JavaScript
* Very far removed from Machine Language
* Don't deal directly with where memory is and what its doing
    - You have an engine between you and the microprocessor that is taking care of all those things for you
    - When we write JavaScript some other languages are going to convert into something like machine language
    - We sit very high on these levels of abstraction
    - As a developer we sit very far away from the microprocessor
    - This can lead to us having improper models of how Node.js is working
    - We need to and should have a proper idea of what is happening

## First thing you need to know about Node.js
Node is written in C++

* Lot's of people have misconceptions about this
* People think Node was written in Javascript
    - With Node, you write JavaScript when typing code using Node but Node itself, the program Node, was written in C++
    - The reason Node was written in C++ is because V8 is written in C++
    - V8 is the JavaScript Engine
    - V8 is the thing that converts JavaScript to Machine Code is written in C++
* We will see a tiny bit of C++
    - You don't need to know C++
    - We just want to establish a foundation of knowledge that will help you understand Node better
