# Polyfilling ES6 for Older Browsers
Babel only works on syntax

There are a whole bunch of methods that are not included in Babel

Example:

`Array.from()`

[link to Array.from() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

This is a new method and it is part of ES6

In order to get this to work you need to use a `Polyfill`

What is a Polyfill?
Very simple. If the browser does not have it, we must recreate it with regular JavaScript.

Whenever you are looking for a method, `MDN` will always have a Polyfill for it inside of the documentation and this enables us to back port it to older browsers which is super helpful.

To help you decide should I use this or not? Two helpful polyfills

### [Babel Polyfill](https://babeljs.io/docs/usage/polyfill/)
This uses `core-js` which has a polyfill for every single ES6 feature.

#### How to use Babel Polyfill
* If you are using modules

`import "babel-polyfill";`

Put this at the top of your file and it will include a whole bunch of code which will Polyfill all of the older browsers that you don't have.

That's great but what if you aren't using modules or if you don't need to Polyfill all that much it can be a bit of code overhead that you don't need.

### [Polyfill.io](https://qa.polyfill.io/v2/docs/)
Great service

* Just include it with a script tag

`<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>`

* It will detect what browser is doing the requesting
    - Say someone is visiting from IE9 this script will polyfill a whole bunch of stuff
    - Someone visiting from the latest Chrome they won't be Polyfilling all that much.

### The script

`https://cdn.polyfill.io/v2/polyfill.js`

If you view this in the browser you will see the dynamically generated polyfill needed for your user agent (your particular browser) 

### Change your user agent in Chrome to something else
Chrome inspector > Console > Settings > More tools > Network conditions > User agent

Uncheck `Select automatically`
Choose Internet Explorer 9 and refresh your page and you will see a whole bunch of Polyfills

Polyfilling with Transpiling with babel is going to give you very good coverage of all of your ES6 features.
