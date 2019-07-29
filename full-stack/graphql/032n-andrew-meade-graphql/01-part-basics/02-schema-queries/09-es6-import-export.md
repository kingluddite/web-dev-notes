# ES6 import/export
* Like `require` will allow us to break up our application into multiple distinct files
* This gives us the benefit of breaking one huge file into multiple smaller files which is easier to manage
* Each of these smaller files can have a concern with some sort of specific logical goal
* This will also enable us to load in code from 3rd party libraries we install (we'll do that soon when we install a GraphQL 3rd party library)

## Test this out with some dummy files
* Let's experiment here first and see how this works

`$ touch src/myModule.js` (Will contain some code that is necessary for `index.js` to run)

## Export JavaScript
### Steps for exporting code
* Write your code
* That will not be enough to export
* use `export { list out stuff you want to export };`

`myModule.js`

```
const name = 'My name is Phil';
const message = 'My message is simple. Be good to each other';

export { name, message };
```

## import JavaScript
`index.js`

* `import` statement has 4 major components
    - We define a relative path to the file we want to import
    - You can leave off the `.js` extension, it is the default extension and is not necessary
    - **note** if your were importing a `.scss` or `.css` file you would need to include the extension
* VS code will give you syntax highlight errors if you import something that is not being used, it goes away when you use it
* I only import what I need (so I am not included `name` in my import)

`index.js`

```
import { message } from './myModule';

console.log(message);
```

## Run the code
`$ npm run start`

* Terminal Output

```
My message is simple. Be good to each other
```

* Make a change

`index.js`

```
import { name } from './myModule';

console.log(name);
```

`$ npm run start`

* Output

```
My name is Phil
```

## Named export
* The export we used in `myModule.js` is known as a `Named` export
* It is called a `Named` export because it has a name

### Benefit of Named exports
* You can have as many as you want

`myModule.js`

```
const name = 'My name is Phil';
const message = 'My message is simple. Be good to each other';

export { name, message };
```

* I am exporting both

`index.js`

```
import { name, message } from './myModule';

console.log(name);
console.log(message);
```

* Output from Terminal

```
My name is Phil
My message is simple. Be good to each other
```

## Default export
* There are `Named` exports and `Default` exports

### What is a Default export?
1. It has no name
2. You can only have one

### How do we use a Default export?
`myModule.js`

```
const name = 'My name is Phil';
const message = 'My message is simple. Be good to each other';
const location = 'My location';

export { name, message, location as default };
```

* When we tag it `as default` we are tagging it as our default
* Since we can ONLY have once I couldn't also tag `name` and `location` **as default**

## How do we import a Default export?
### Here is an example where we grab both export types, Named and Default exports
* We give it a name, we can name it anything
* Add a comma if you are also providing Named exports

`index.js`

```
import myCurrentLocation, { name, message } from './myModule';

console.log(name);
console.log(message);
console.log(myCurrentLocation);
```

### Here is an example where we just grab the Default export

`index.js`

```
import myCurrentLocation from './myModule';

console.log(myCurrentLocation);
```

`myModules.js`

```
const name = 'My name is Phil';
const message = 'My message is simple. Be good to each other';
const location = 'My location';

export { name, message, location as default };
```

`index.js`

```
import myCurrentLocation, { name, message } from './myModule';

console.log(name);
console.log(message);
console.log(myCurrentLocation);
```

* Notice the `location as default` does not match up with the import Default name of `myCurrentLocation`
    - This is because the Default export HAS NO NAME
    - We are importing it by its Role, because it is the Default export we are able to get it's correct value in `myCurrentLocation`

## Run the code now
`$ npm run dev`

* Output

```
My name is Phil
My message is simple. Be good to each other
My location
```

## Example of exporting a function
`myModule.js`

```
const name = 'My name is Phil';
const message = 'My message is simple. Be good to each other';
const location = 'My location';

const getGreeting = (name) => {
  return `Welcome to the course ${name}`;
}

export { name, message, getGreeting, location as default };
```

* Use and output function returned value
* Function takes a name argument so we pass one in

`index.js`

```
import myCurrentLocation, { name, message, getGreeting } from './myModule';

console.log(name);
console.log(message);
console.log(myCurrentLocation);
console.log(getGreeting('Jill'));
```

* Output

```
My name is Phil
My message is simple. Be good to each other
My location
Welcome to the course Jill
```


## Challenge
1. Create a new file called `math.js`
2. Define add function that takes 2 arguments and adds them
3. Define subtract function that takes 2 arguments and subtracts them
4. Set up add as a default export
5. Set up subtract as a named export
6. Import both functions into `index.js`
7. Use both functions and print the results from each

`math.js`

```
const add = (num1, num2) => {
  return num1 + num2;
}

const subtract = (num1, num2) => {
  return num1 - num2
}

export { add as default, subtract}
```

`index.js`

```
import myCurrentLocation, { name, message, getGreeting } from './myModule';
import addTwoNumbers, { subtract } from './math';

console.log(name);
console.log(message);
console.log(myCurrentLocation);
console.log(getGreeting('Jill'));
console.log(addTwoNumbers(2,1));
console.log(subtract(100,50));
```

* Output

```
My name is Phil
My message is simple. Be good to each other
My location
Welcome to the course Jill
3
50
```

* Another way to write `math.js`

```
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
```



