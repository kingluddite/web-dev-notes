# Const and Let
When and why to use them

```js
var message = "Hello";
const pi = 3.14159
let score = 0;
```

## Using const
Best choice for defining variables
It is named `const` short for `constant` meaning the value of the variable shouldn't change

`cont pi = 3.14159;`

* `const` lets you protect your variables from any stray assignment in your code
    - in other words, once you create a constant you can't give it another value

### try it out
Assign `const pi = 3.14;` View in the browser and use the console to try and re-assign pi to another value. You will get an error because you can't.

`error is: type error assignment to a constant variable`

Your first choice when declaring variables should be `const`

But if a variable who's value will change during the life of a program, `const` is a poor choice

example: you don't want to use `const` to store the value of a game, since the score changes as the player plays the game. In that case, you should use the `let` keyword

```html
<html>
  <head>
    <title>name - let and Const</title>
  </head>
  <body>
    <h1>Name</h1>
    <script>
      var name = "Andrew";
      
      function createFullName(fName, lName) {
          name = fName + " " + lName;
          console.log(name);
      }
      console.log(name);
      createFullName("Joel", "Kraft");
    </script>
  </body>
</html>
```

The problem above is the variable `name` has been overwritten by the function. This is a simple scope issue. The function is overwriting the name variable in the global scope. It is a common problem and can be difficult to catch. But if you use const. You will be able to spot the mistake.

### Using const instead

```html
<html>
  <head>
    <title>name - let and Const</title>
  </head>
  <body>
    <h1>Name</h1>
    <script>
      const name = "Andrew";
      
      function createFullName(fName, lName) {
          name = fName + " " + lName;
          console.log(name);
      }
      console.log(name);
      createFullName("Joel", "Kraft");
    </script>
  </body>
</html>
```

Using `const` will alert you to your problem so that you can change your code to make it work

```js
const name = "Andrew";

function createFullName(fName, lName) {
    const name = fName + " " + lName;
    console.log(name);
}
console.log(name);
createFullName("Joel", "Kraft");
```

## const with arrays and objects
Use the console

`> const days = ["Monday"];`

`<` undefined

`const person = {first_name: "Phil"};`

`<` undefined

`> days.push("Tuesday");`

`<` 2

* This means we could alter the array even though we used `const`;

`> days`

`< ["Monday", "Tuesday"]`

* what if we try to add a last_name property to the person object

`> person.last_name = "Howley";`

`< "Howley"`

So we can alter the object properties even though we use `const`

`> person`

`< Object` - we get an object literal back with first_name and last_name

`const` does not prevent complex objects like arrays and objects from being modified. It just prevents them from being reassigned or overwritten completely

If you try this:

`> person = {first_name: "Bob"}`

You will get a TypeError where you can't assign to the constant variable

## Let
when you want to reassign a variable. works very similar to `var`

So when should we use `let` instead of `const`?

`name.html`

```html
<html>
  <head>
    <title>person - let and Const</title>
  </head>
  <body>
    <h1>Person</h1>
    <script>
       const person = {
            first_name: "Andrew",
            role: "Teacher"
        }
    
        function personDescription(person) {
            var description = person.first_name;
            if(person.role) {
                description = description + " is a ";
                description = description + person.role;
            }
            console.log(description);
        }
    
        personDescription(person);
    </script>
  </body>
</html>
```

Since we are using `const` we will get an error

```js
function personDescription(person) {
    const description = person.first_name;
    if(person.role) {
        description = description + " is a ";
        description = description + person.role;
    }
    console.log(description);
}
```

Because we are trying to reassign we get an error. But if we want to reassign it to different values we should use `let` instead. `let` is the same as `var` but it helps with scope issues.

## `let` helps in for loops

`buttons.html`

```html
<html>
  <head>
    <title>buttons - let and Const</title>
  </head>
  <body>
    <h1>Buttons</h1>
    <button>Button 0</button>
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
    <button>Button 4</button>
    <button>Button 5</button>
    <button>Button 6</button>
    <button>Button 7</button>
    <button>Button 8</button>
    <button>Button 9</button>
    <script>
      const buttons = document.getElementsByTagName("button");
      
      for(var i = 0; i < buttons.length; i++) {
          const button = buttons[i];
          button.addEventListener("click", function() {
              alert("Button " + i + " Pressed");
          });
      }
    </script>
  </body>
</html>
```

Above is a scope problem. If you click on any button you will get `10` because that is the value at the end of the loop. The variable `i` lives in the global scope. All the buttons share the same value of `i`. So if you use `let` instead of var, you will avoid this scope issue.

Now when you press a button, it correctly tells you the number of that button.

## const Keyword
`const` is used for values you never want reassigning

* `const` variables have block level scoping
    - A block of scope is anything between curly braces

don't use var
start with const and use let when you need it

## Temporal dead zone
* Where you can not access a variable before it is defined

This works:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>let and const real world</title>
</head>
<body>
<script>
  var pizza = 'Deep Dish';
  console.log(pizza);
</script>
</body>
</html>
```

this does not:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>let and const real world</title>
</head>
<body>
<script>
  console.log(pizza);
  var pizza = 'Deep Dish';
</script>
</body>
</html>
```

Pizza will be undefined here but if you change it to const or let it will be not defined (error).

## Is `var` dead?
Hot discussion topic

Here is one recommended way:

* use `const` by default
* only use `let` if rebinding is needed
  - only if you need to update the value of your variable
    + example: score would be a variable you would need to update for a game
* `var` should not ever be used in ES6
