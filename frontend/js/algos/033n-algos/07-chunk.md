# chunk

```
Given an array and chunk size, divide the array into many subarrays where each subarray is of length size

-- Examples
* chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
* chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
* chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
* chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
* chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]
```

* We are taking one array and transforming it into many smaller sub arrays
* Chunk takes 2 arguments, the first argument is the array and the second argument is the size of each chunk

## Start the test
`$ jest chunk/test.js --watch`

## Talk through the algorithm
* Lets assume our `chunk()` function gets called with some array that has 3 elements `[1, 2, 3]`
    - Let's assume we have a chunk size of 2

![array with 3 elements and chunk size of 2](https://i.imgur.com/entDv9o.png)

1. Create an empty array to hold chunks called `"chunked"`

![chunked array](https://i.imgur.com/yT15ibc.png)

2. Iterate through the "Unchunked" array (For each element in the "unchunked" array)

* Retrieve the last element in "chunked"
* The last element in "chunked" in the first iteration will be `undefined` 
* (the next line is how we handle that)
* **If** last element does not exist, or if its length is equal to the chunk size 

```
if (!lastElement) || lastElement.length === chunk.length
```

* Push a new chunk (a sub array) into "chunked" with the current element
* **else** add the current element into the chunk
* First loop through array looks like this:

![first loop](https://i.imgur.com/rTlOThi.png)

* Now we iterate through the chunked array again
* This time we hit element 2 in the array

![element 2 of the array](https://i.imgur.com/u0YaGjl.png)

* We will attempt to retrieve the last element in chunked, this time it will be this sub array

![last element in our chunked array](https://i.imgur.com/1BIJElw.png)

* We check to see if that last element does exist - it does
* We then check to see if the length of that chunk size is equal to a chunk size of 2, it does not (at present our chunk size is 1)
    - So we go to the else case - and add the current element into the chunk

![add element into subarray](https://i.imgur.com/ltGY0ow.png)

* Iterate a third time and the last element in the chunked array is 3

![last element in chunked array](https://i.imgur.com/YDUZMMa.png)

* Check to see if its length is equal to the chunked size (is 2 === 2? --> yes it is)
    - So now we push a new "chunk" into chunked and take the current element and put it inside of that

![put current element into new subarray chunk](https://i.imgur.com/xsXTVIi.png)

* Now we have nothing else to iterate through with our for loop
* And we have ended up with our correctly chunked array

## Let's code it
* The starting function

```
function chunk(array, size) {
  
}

module.exports = chunk;
```

* Create a new array that will hold all these different chunks

```
function chunk(array, size) {
  // declare a new array that will hold all these different chunks
  const chunked = [];
  
}

module.exports = chunk;
```

* Now we iterate through all our original array of elements

```
function chunk(array, size) {
  // declare a new array that will hold all these different chunks
  const chunked = [];
  // iterate through our original array of elements
  // we will use the "for of" helper

  for (let element of array) {
    //
  }
}

module.exports = chunk;
```

* Looping through original array grab the last element

```
function chunk(array, size) {
  // declare a new array that will hold all these different chunks
  const chunked = [];
  // iterate through our original array of elements
  // we will use the "for of" helper

  for (let element of array) {
    // look at last element inside of our chunked array
    const last = chunked[chunked.length - 1];
  }
}

module.exports = chunk;
```

* Now we need to check if that last element exists or that the last chunk is equal to the chunk size
    - If it is we want to push a new chunk into `chunked` with the current element
    - rather than put a new chunk inside of it and then add the element in we can do both things at the same time
        + We push in a new chunk `[]` and we'll immediately put a new element inside of it

```
function chunk(array, size) {
  // declare a new array that will hold all these different chunks
  const chunked = [];
  // iterate through our original array of elements
  // we will use the "for of" helper

  for (let element of array) {
    // look at last element inside of our chunked array
    const last = chunked[chunked.length - 1];

    // check if that last element exists
    // or
    // that the last chunk is equal to the chunk size
    if (!last || last.length === size) {
      // if it is we push a new chunk into "chunked" with the current element
      chunked.push([element]);
    }
  }
}

module.exports = chunk;
```

* We already have a chunk but it is not yet full so in that case we'll take the current element and add it to the chunk

```
function chunk(array, size) {
  // declare a new array that will hold all these different chunks
  const chunked = [];
  // iterate through our original array of elements
  // we will use the "for of" helper

  for (let element of array) {
    // look at last element inside of our chunked array
    const last = chunked[chunked.length - 1];

    // check if that last element exists
    // or
    // that the last chunk is equal to the chunk size
    if (!last || last.length === size) {
      // if it is we push a new chunk into "chunked" with the current element
      chunked.push([element]);
    } else {
      // add the current element into the chunk
      last.push(element);
    }
  }
}

module.exports = chunk;
```

* The last step (NEVER FORGET THIS!) return chunked

```
function chunk(array, size) {
  // declare a new array that will hold all these different chunks
  const chunked = [];
  // iterate through our original array of elements
  // we will use the "for of" helper

  for (let element of array) {
    // look at last element inside of our chunked array
    const last = chunked[chunked.length - 1];

    // check if that last element exists
    // or
    // that the last chunk is equal to the chunk size
    if (!last || last.length === size) {
      // if it is we push a new chunk into "chunked" with the current element
      chunked.push([element]);
    } else {
      // add the current element into the chunk
      last.push(element);
    }
  }

  return chunked;
}

module.exports = chunk;
```

## Test it
* All 5 tests should be passing

## Alternative Solution using slice()
* slice()
    - The `slice()` method returns a shallow copy of a portion of an array into a new array object selected from **begin** to **end** (_end not included_) where **begin** and **end** represent the `index` of items in that array
    - The original array will not be modified
* [docs on slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

### slice() syntax
`slice(start index, end index)`

* Remember we are taking a copy of every element (important!)
* We go up to the end index but do not include that element
    - A common error with slice is `letters.slice(0, 3)` is that the `3` is the number of elements that we want to slice out of the array - this is not correct

```
const letters = ['a', 'b', 'c', 'd', 'e']
```

* In `letters.slice(0, 3)` we are taking everything in the letters array from index `0` up to but not including `3`
    - Which would be `['a', 'b', 'c']`

```
const letters = ['a', 'b', 'c', 'd', 'e']

letters.slice(0, 4) // ['a', 'b', 'c', 'd']
```

## Draw it out
* Create empty 'chunked' array

![create empty chunked array](https://i.imgur.com/7ZqyybB.png)

* Then we will create an 'index' variable at 0
    - Just some random variable, we'll call it index and start it off at zero

* We'll then create a `while` loop that will run as long as `index` is less than our original `array.length`

* Now it gets interesting
    - Inside this while loop we'll take a slice out of our original `array` starting at `index` and ending at `index + size` and then we will push that into our `chunked` array

* for the first go through we'll start at index of 0 and a chunk size of 2
* We will take a chunk size from 0 to 2 and we'll put that into our array

![take slice from 0 to 2 of array and put into chunked array](https://i.imgur.com/cqgQWi1.png)

* we then add size to index
* We restart our while loop, index will now be equal to 2 and we repeat the process and now we try to take a slice from 2 to 4, so in this case we don't have elements going up to 4 so it just gives us every left in the array and we end up sticking everything like so

![items in array an subarrays](https://i.imgur.com/wtkHRaG.png)

## Write the code
```
function chunk(array, size) {}

module.exports = chunk;

```

* Create an empty `chunked` array and create an `index` variable starting off at `0`

```
function chunk(array, size) {
  const chunked = [];
  let index = 0;
}

```

* Run a while loop as long as index is less than the arrays length

```
function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {

  }
}

module.exports = chunk;
```

* Write out a slice that will take a slice out of our original array

```
function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    array.slice(index, index + size);
  }
}

module.exports = chunk;
```

* Now we'll push all of that into the chunked array

```
function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
  }
}

module.exports = chunk;
```

* Now we need to move on to our next index and we'll take our index variable and add size to it
* We are not iterating by 1 here, we are incrementing by the size variable because we want to take big scoops out of the array over time

```
function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
  }

  index += size;
}

module.exports = chunk;
```

* Always REMEMBER to return!

```
function chunk(array, size) {
  const chunked = [];
  let index = 0;

  while (index < array.length) {
    chunked.push(array.slice(index, index + size));
    index += size;
  }

  return chunked;
}

module.exports = chunk;
```

* All tests should now pass

