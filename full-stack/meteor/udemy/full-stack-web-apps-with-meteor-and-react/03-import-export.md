# Importing and Exporting
We won't use eager loading at all in our Apps

## We will use lazy loading
Uses the ES6 `import` keyword to explicitly load in specific files

![import export visualization diagram](https://i.imgur.com/tj3L8Q7.png)

Delete `imports/app.js` as we don't need it anymore. We just used it to show how `eager loading` works

## utils.js
Create `/imports/utils.js`

`./` tells our Application we are loading a local file versus a 3rd part Library

`imports/utils.js`

```
console.log('Log from /imports/utils.js');
```

And we can import it:

`server/main.js`

```
import './../imports/utils';

console.log('Log from /server/main.js');
```

## View in browser
You will see our import is working (and we're using lazying loading and not eager loading) because our terminal is showing the log statement `Log`

![server log statement from utils](https://i.imgur.com/8i0kJe1.png)

We don't see log in client console... not yet. Let's change that now with:

`client/main.js`

```
import './../imports/utils';

console.log('Log from /client/main.js');
```

### View in console
This is what you will see

![we can see in console from import](https://i.imgur.com/U7X3oHN.png)

## So far this is not very useful
We want the ability to export functions and use them in other files

### Export a function
`imports/utils.js`

```
console.log('Log from /imports/utils.js');

export let greetUser = function() {
   return 'Hello user!';
};
```

### Now we import that function
`server/main.js`

```
// import './../imports/utils';
import { greetUser } from './../imports/utils';

console.log('Log from /server/main.js');
console.log(greetUser());
```

We comment the old relative path because now we are defining a variable `greetUser` and then we can call the function we imported

![hello user prints to screen](https://i.imgur.com/Ks5UcRZ.png)

### Do same thing in client
`client/main.js`

```
import { greetUser } from './../imports/utils';

console.log('Log from /client/main.js');
console.log(greetUser());
```

And here is our console

![console greet user](https://i.imgur.com/R5RiZve.png)

### Multiple exports
`/imports/utils.js`

```
console.log('Log from /imports/utils.js');

export let greetUser = function() {
   return 'Hello user!';
};

export let name = 'PEH2';
```

### Import multiple variables
`client/main.js`

```
import { greetUser, name } from './../imports/utils';

console.log('Log from /client/main.js');
console.log(greetUser());
console.log(name);
```

![console output of client](https://i.imgur.com/quJQeyq.png)

## Exercise
Create a function inside `imports/math.js` that will take two numbers as arguments and add them. Import that function inside `server/main.js` and `console.log()` the function and and pass it two numbers you would like to add

## Review
* We now understand how to import and export stuff
* We know how to export a function or just a property
* We can import files or import as many export statements as we want by just separated them with commas `import { one, two, three }`
* When importing we grab files by specifying the relative path

### How is is possible to import a default function AND specify a name when it is not named in the exporting file?
You can name default exports whatever you want in the import statement. There's only one export default allowed per exporting file so it doesn't matter if the name matches.

### default export
Second type of export. Before we were using `named exports`. `greetUser()` and `name` were both `named exports`

We reference them by name anytime we want to use their functionality

We can also export one default value per file

`imports/utils.js`

```
console.log('Log from /imports/utils.js');

export let greetUser = function() {
   return 'Hello user!';
};

export let name = 'PEH2';

export default 'Default value'; // add this line
```

Now to import the default we need to place our variable name before our `{}` curly braces. We can use any "legitimate" JavaScript variable name we want

`client/main.js`

```
import someDefault, { greetUser, name } from './../imports/utils';

console.log('Log from /client/main.js');
console.log(greetUser());
console.log(name);
console.log(someDefault);
```

Will give us:

![default value](https://i.imgur.com/mtG0O5g.png)

## Error
`export default let someSefault = 'Default value';`

You can't give an export of default a variable name

This would be valid

```
let myDefault = 'Some default value';
export default myDefault;
```

Exercise
Modify `math.js` use a default export instead of a named export which is a function that adds those two numbers together. Remember to change how you load in the default value in `server/main.js`

After trying it out remember to check the Terminal because the output will be coming from the server
