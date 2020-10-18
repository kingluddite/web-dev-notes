# Component CSS
## How can we cut down on the size of a global CSS?
* We can create all our CSS for our specific components

### Example
* Layout.js and Layout.css
* Navbar.js and Navbar.css

## Problem doing this
* If we have a global CSS we could override that
* As your project gets bigger it gets very annoying because you need to come up with **unique** class names
* You may need to use BEM

## Next option
* Solves both the size and the unique issues - CSS Modules
