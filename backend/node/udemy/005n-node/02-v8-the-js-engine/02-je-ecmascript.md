# JavaScript Aside
## JavaScript Engines and the Ecmascript specification

## What is ECMASCRIPT?
* The standard JavaScript is based on
* Needed a standard sincer there are many engines

### JavaScript was invented first
* But different browser makers created different engines
    - Browser makers
        + Google - Chrome
        + Mozilla - Firefox
        + Apple - Safari
* Created crazy different code so a standard was needed and that is the purpose behind ecmascript
* V8 is one of many JavaScript engines

### Where can I find the current ecmascript?
[link to ecmascript documentation](https://www.ecma-international.org/publications/standards/Ecma-262.htm)

* If you read it you would find stuff like:
    - All the specifications JavaScript should have and do
    - It describes its behavior
    - What is expected when things are done in the language
    - And the standard upon which a JavaScript Engine should be based
* If you wrote your own JavaScript Engine what you cause JavaScript to do in that engine should match this specification
* V8 does that
    - V8 makes sure it matches the ecmascript specification expects it to do
    - Everyone has agreed upon this

## What is a JavaScript Engine?
* A program that converts JavaScript code into something the computer processor can understand 
* And it should follow the ECMAScript standard on how the language should work and what features it should have
