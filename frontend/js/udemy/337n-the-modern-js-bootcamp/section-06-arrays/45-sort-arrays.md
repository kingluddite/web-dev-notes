# Sort Arrays
* [sort array docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
* More complex then most
* The sort method doesn't require a function as the first method, though it can take one

```
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]
```

* Similar to `indexOf` - it worked with simple data types but did not work with complex data types like objects
* If we use the array `sort()` method with objects it will not allow us to specify the specific criteria we want to sort by
  - But `sort()` does take a function that allows us to specify the exact comparison behavior

## sort() optional compareFunction
* This function allows the developer to define the sort order

```
arr.sort([compareFunction])
```

* For the notes, I want to sort by the `title`
* For the todos, I want to sort the completed items at the bottom of the list, and the incomplete todos to be at the top of the list

### Using the sort() compare function
* Unlike our other array methods where we had the function called one time for each item, the function for `sort()` gets called with 2 individual items (in our example it will get called with 2 notes)

#### sort() a and b
* You will see online that most devs call the first argument provided to the sort() compare function `a` and the second argument called `b`
* `a` and `b` will each represent some object from the array we will be sorting

```
const sortNotes = function (notes) {
  notes.sort(function (a, b) {
    // do stuff
  })
}

```

##### 1, -1 or 0
* It's the dev's job to look at `a` and `b` and figure out which comes first
  - Depending on which one comes first we return 1 of 3 values
    + If `a` comes first we should return `-1`
    + If `b` comes first we return `1`
    + If both `a` and `b` are the same (i.e. both todos are completed) then we return `0` stating the order doesn't need to be changed
* **Tricky Part** For the dev to figure out if an object argument should come before or after the other object argument

###### For strings
* To find if a string comes before or after another string we use `<` (less than) or `>` greater than operators

```
// Is the string 'a' before the string 'b'
console.log('a' < 'b'); // true
```

```
// Is the string 'March' before the string 'January'
console.log('a' < 'b'); // false
```

* **important** Capitalization matters in search
  - We'll address this in our function by converting everything to lowercase before we sort

```
// Does lowercase `a` come before `A`
console.log('a' < 'A'); // false
```

### Let's write out our sort() method
```
const sortNotes = function(notes) {
  notes.sort(function(a, b) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    } else if (b.title.toLowerCase() < a.title.toLowerCase()) {
      return 1;
    } else {
      return 0;
    }
  });
};
```

### sort() doesn't return anything, it just sorts the array we are working on
This means we just need to call the function and print the notes array

* This won't work

```
console.log(sortNotes());
```

* You need to call the function pass the notes array to it and then print it to the screen to reflect the changes to the array
  - **Note** we are not doing anything with the `sortNotes()` return value, since it will be `undefined` since we haven't explicitly returned anything from our `sortNotes()` function

```
// MORE CODE
sortNotes(notes);
console.log(notes);
```

* Output in Terminal

```
[
  { title: 'Do homework', body: 'Write lots of JavaScript' },
  { title: 'Go to gym', body: 'Work out shoulders' },
  { title: 'Go to gym', body: 'work out arms' },
  { title: 'Go to school', body: 'Teach a good class' }
]
```

* Look at original array and you'll see our array was properly sorted by title

```
const notes = [
  {
    title: 'Go to gym',
    body: 'Work out shoulders',
  },
  {
    title: 'Go to gym',
    body: 'work out arms',
  },
  {
    title: 'Go to school',
    body: 'Teach a good class',
  },
  {
    title: 'Do homework',
    body: 'Write lots of JavaScript',
  },
];
```

* Even if you change the title to be lowercase for "Do Homework" to ("do homework"), it sorts same way since we build `toLowerCase()` into our sortNotes() method

## Challenge sortTodos()
* Sort by completed and not completed (incomplete on top of list)

```
const todos = [
  { text: 'Lift weights', completed: true },
  { text: 'Pay Rent', completed: false },
  { text: 'Do Laundry', completed: true },
  { text: 'Code JavaScript', completed: false },
  { text: 'Run', completed: true },
];

// MORE CODE

const sortTodos = function(todos) {
  todos.sort(function(a, b) {
    if (a.completed === false && b.completed) {
      return -1;
    } else if (b.completed === false && a.completed) {
      return 1;
    } else {
      return 0;
    }
  });
};

sortTodos(todos);
console.log(todos);
```

* Output in Terminal
  - **note** You will see incomplete todos are at the top of our array list

```
[
  { text: 'Pay Rent', completed: false },
  { text: 'Code JavaScript', completed: false },
  { text: 'Lift weights', completed: true },
  { text: 'Do Laundry', completed: true },
  { text: 'Run', completed: true }
]
```

* Now we have a great understanding of working with the fundamentals of working with arrays of objects which is so essential when we're modeling real applications
    - Because we can add tons of properties on objects where we try to represent the thing we are trying to model
        + Whether its:
            * A todo
            * A product on our ecommerce site 
            * An email
            * Lots of other examples
