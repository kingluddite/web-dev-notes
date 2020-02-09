# Looping Over arrays
## forEach
* Takes a single argument which is a function
* We could define a variable to assign a function and plug that in as an argument to `forEach` like this:

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

// Looping through arrays
// forEach

const doThis = function () {}
notes.forEach(doThis);
```

## But more commonly you'll see a function defined inline like this
```
const notes = ['Note 1', 'Note 2', 'Note 3'];

// Looping through arrays
// forEach

notes.forEach(function() {
  // in this function we define what to do with each item in the array
  // The function will run (aka "get called", "invoked") once for each item in the array
  console.log('I run once for every item in the array');
});
```

* Output (3 items in array means 3 calls to the function)

```
I run once for every item in the array
I run once for every item in the array
I run once for every item in the array
```

## Callback function
* First time seeing this 
* **important to know** When you pass a function into a function that is known as a **callback function**
* We have access to arguments
    - `item`

### Access the item argument values
```
const notes = ['Note 1', 'Note 2', 'Note 3'];

// Looping through arrays
// forEach

notes.forEach(function(item) {
  // in this function we define what to do with each item in the array
  // The function will run (aka "get called", "invoked") once for each item in the array
  console.log(item);
});
```

* Outputs

```
Note 1
Note 2
Note 3
```

### We also get access to the `index` of the item in the array
* As the second argument

### forEach Syntax
```
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
```

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

// Looping through arrays
// forEach

notes.forEach(function(item, index) {
  // in this function we define what to do with each item in the array
  // The function will run (aka "get called", "invoked") once for each item in the array
  console.log(item, index);
});
```

* Output

```
Note 1 0
Note 2 1
Note 3 2
```

## Challenge
* Use `forEach` to print out a nice list of your todos

```
1. First
2. Second
3. Third
...
```

### Challenge Solution
```
// challenge
// list of 5 todos
const todos = [
  'Lift weights',
  'Pay Rent',
  'Do Laundry',
  'Code JavaScript',
  'Run',
];

todos.splice(2, 1);
todos.push('Buy coffee');
todos.shift();

console.log(`You have ${todos.length} todos!`);

// forEach to list out todos in order
todos.forEach(function(item, i) {
  console.log(`${i + 1}. ${item}`);
});
```

* Output

```
You have 4 todos!
1. Pay Rent
2. Code JavaScript
3. Run
4. Buy coffee
```

### Refactor
* A slightly better way to write the above app

```
// forEach to list out todos in order
todos.forEach(function(todo, index) {
  const num = index + 1;
  console.log(`${num}. ${todo}`);
});
```

