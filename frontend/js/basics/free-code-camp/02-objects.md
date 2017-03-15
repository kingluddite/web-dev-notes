# More fun with Objects

## Accessing Nested Objects
The sub-properties of objects can be accessed by chaining together the dot or bracket notation.

Here is a nested object:
```js
var ourStorage = {
  "desk": {
    "drawer": "stapler"
  },
  "cabinet": {
    "top drawer": { 
      "folder1": "a file",
      "folder2": "secrets"
    },
    "bottom drawer": "soda"
  }
};
ourStorage.cabinet["top drawer"].folder2;  // "secrets"
ourStorage.desk.drawer; // "stapler"
```

## Accessing Nested Arrays
* objects can contain both nested objects and nested arrays
* Similar to accessing nested objects, Array bracket notation can be chained to access nested arrays

### Example accessing nested array:

```js
var ourPets = [
  {
    animalType: "cat",
    names: [
      "Meowzer",
      "Fluffy",
      "Kit-Cat"
    ]
  },
  {
    animalType: "dog",
    names: [
      "Spot",
      "Bowser",
      "Frankie"
    ]
  }
];
ourPets[0].names[1]; // "Fluffy"
ourPets[1].names[0]; // "Spot"
```

## Record Collection Exercise
* You are given a JSON object representing a part of your musical album collection
* Each album has several properties and a unique id number as its key. Not all albums have complete information

```json
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [ 
        "Let It Rock", 
        "You Give Love a Bad Name" 
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [ 
        "1999", 
        "Little Red Corvette" 
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));
```

Write a function which takes an album's id (_like 2548_), a property prop (_like "artist" or "tracks"_), and a value (_like "Addicted to Love"_) to modify the data in this collection.
```js
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {
  
  if (value === '') {
    delete collection[id][prop];
  }
  if (prop !== 'tracks' && value !== '') {
    collection[id][prop] = value;
  }
  if (prop === 'tracks' && value !== '') {
    if (collection[id].tracks === undefined) {
      collection[id].tracks = [];
      collection[id].tracks.push(value);
      console.log(collection[id].tracks);
    } else {
      collection[id].tracks.push(value);
    }
     
  }
    return collection;
}

// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");
```

If prop isn't "tracks" and value isn't empty (""), update or set the value for that record album's property.

Your function must always return the entire collection object.

There are several rules for handling incomplete data:

If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the new value to the album's corresponding property.

If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.

If value is empty (""), delete the given prop property from the album.

**Hints**

* Use bracket notation when accessing object properties with variables.
* Push is an array method you can read about on Mozilla Developer Network.

## Iterate with JavaScript While Loops
You can run the same code multiple times by using a loop.

Another type of JavaScript loop is called a "while loop", because it runs "while" a specified condition is true and stops once that condition is no longer true

```js
var ourArray = [];
var i = 0;
while(i < 5) {
  ourArray.push(i);
  i++;
}
```

## Iterate with JavaScript For Loops
You can run the same code multiple times by using a loop.

The most common type of JavaScript loop is called a **"for loop"** because it runs "for" a specific number of times.

For loops are declared with three optional expressions separated by semicolons:

`for ([initialization]; [condition]; [final-expression])`

The **initialization** statement is executed one time only before the loop starts. It is typically used to define and setup your loop variable

The *condition statement* is evaluated at the beginning of every loop iteration and will continue as long as it evaluates to `true`. When condition is `false` at the start of the iteration, the loop will stop executing. This means if condition starts as false, your loop will never execute

The **final-expression** is executed at the end of each loop iteration, prior to the next condition check and is usually used to increment or decrement your loop counter

### Example 
We initialize with `i = 0` and iterate while our condition `i < 5` is true. We'll increment `i by 1` in each loop iteration with `i++` as our final-expression.

```js
var ourArray = [];
for (var i = 0; i < 5; i++) {
  ourArray.push(i);
}
ourArray will now contain [0,1,2,3,4];
```

## Iterate Odd Numbers With a For Loop
For loops don't have to iterate one at a time
By changing our final-expression, we can count by even numbers

We'll start at `i = 0` and loop `while i < 10`. We'll increment `i by 2` each loop with `i += 2`

```js
var ourArray = [];
for (var i = 0; i < 10; i += 2) {
  ourArray.push(i);
}
ourArray will now contain [0,2,4,6,8].
```

## Count Backwards With a For Loop
* A for loop can also count backwards, so long as we can define the right conditions
* In order to count backwards by twos, we'll need to change our initialization, condition, and final-expression.

We'll start at `i = 10` and loop while `i > 0`. We'll decrement `i by 2` each loop with `i -= 2`

```js
var ourArray = [];
for (var i=10; i > 0; i-=2) {
  ourArray.push(i);
}
ourArray will now contain [10,8,6,4,2].
```

## Iterate Through an Array with a For Loop
* A common task in JavaScript is to iterate through the contents of an array
* One way to do that is with a for loop. 

This code will output each element of the array arr to the console:

```js
var arr = [10,9,8,7,6];
for (var i = 0; i < arr.length; i++) {
   console.log(arr[i]);
}
```

**note** 

* Arrays have **zero-based** numbering
    - Which means the last index of the array is `length - 1`
    - Our condition for this loop is `i < arr.length`
        + Which stops when `i` is at `length - 1`.

## Nesting For Loops
If you have a multi-dimensional array, you can use the same logic as the prior waypoint to loop through both the array and any sub-arrays. Here is an example:

```js
var arr = [
  [1,2], [3,4], [5,6]
];
for (var i=0; i < arr.length; i++) {
  for (var j=0; j < arr[i].length; j++) {
    console.log(arr[i][j]);
  }
}
```

This outputs each sub-element in arr one at a time. Note that for the inner loop, we are checking the `.length` of `arr[i]`, since `arr[i]` is itself an array

```js
function multiplyAll(arr) {
  var product = 1;
  // Only change code below this line
  for (var i = 0; i < arr.length; i++ ) {
    for (var j = 0; j < arr[i].length; j++) {
      product *= arr[i][j];
    }
  }
  // Only change code above this line
  return product;
}

// Modify values below to test your code
multiplyAll([[1,2],[3,4],[5,6,7]]);
```

