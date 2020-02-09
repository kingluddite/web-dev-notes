# The for loop
* Gives us lots more flexibility then forEach
* forEach only works if I have an array
* What if I want to loop through 1000 items
    - With forEach I would need an array with 1000 items

## Loop through 1000 items
```
for (let i = 0; i <= 1000; i++) {
  console.log(`item ${i}`);
}
```

* Output `0 to 1000`

## The `for` statement gives us a way to run code a specific number of times
```
for (INITIALIZER; CONDTIONAL; FINAL EXPRESSION)
```

* Initializer - what sets up our starting point for our loop
* The initializer only runs one time
* If the `Conditional` is true we'll run the code for the very first time
* Then our code will execute to the screen
* The `Final Expression` runs incrementing the count
* Then we check the conditional again
* Keep going until the conditional is false
* The loop stops
* Watch out for infinite loops!

## Count backwards via a for loop from 500 to 0
```
for (let i = 500; i >= 0; i--) {
  console.log(`item ${i}`);
}
```

## Use the for statement with arrays
* To accomplish what we accomplished with `forEach`

```
const notes = ['Note 1', 'Note 2', 'Note 3'];

// Looping through arrays
// forEach

for (let i = 0; i < notes.length; i++) {
  console.log(`${i + 1}. ${notes[i]}`);
}
```

* Output

```
1. Note 1
2. Note 2
3. Note 3
```

* **note** The `i` variable in the for loop statement is scoped locally

```
for (let i = 0; i < notes.length; i++) {
  console.log(`${i + 1}. ${notes[i]}`);
}

for (let i = 0; i < notes.length; i++) {
  console.log(`${i + 1}. ${notes[i]}`);
}

console.log(i); // ReferenceError: i is not defined (because it is not in scope)
```

## Loop backwards through array
```
for (let i = notes.length - 1; i >= 0; i--) {
  console.log(`${i + 1}. ${notes[i]}`);
}
```

* Output

```
3. Note 3
2. Note 2
1. Note 1
```

## Challenge
* Use a `for` loop statement to output a list of your Todos

### Solution
```
for (let i = 0; i < todos.length; i++) {
  console.log(`${i + 1}. ${todos[i]}`);
}
```

* Output

```
You have 4 todos!
1. Pay Rent
2. Code JavaScript
3. Run
4. Buy coffee
```

## Refactor a bit
```
for (let i = 0; i < todos.length; i++) {
  const num = i + 1;
  const todo = todos[i];
  console.log(`${num}. ${todo}`);
}
```

* Same output as above but the code is structured a bit nicer

## Takeaway
* If you have an array and are counting in order, use `forEach()`
* If you don't have an array and need to count, use `for()` statement
* If you are trying to count in a different order, use a `for()` statement

## Update your todo.js to:
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
todos.forEach(function(todo, index) {
  const num = index + 1;
  console.log(`${num}. ${todo}`);
});
```

* Update `notes.js` to:
```
const notes = ['Note 1', 'Note 2', 'Note 3'];

notes.forEach(function(item, index) {
  console.log(index);
  console.log(item);
});

console.log(notes.length);
console.log(notes);
```

## Docs for `for` statement
* [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
