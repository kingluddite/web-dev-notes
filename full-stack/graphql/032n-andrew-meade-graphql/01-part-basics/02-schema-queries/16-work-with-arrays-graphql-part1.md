# Work with Arrays in GraphQL (part 1)
* We will learn how to exchange arrays back in forth with the GraphQL API
    - Maybe the client needs to send an array as one of the values for the operation argument
    - Or maybe the server needs to send an array back as the response for a given operation

## Working with Arrays with with our Scalar types
* An array of Strings, Numbers
* Then we'll learn a more real world example and how to work with an array of our Custom types
    - An array of posts, or users

### Let's set up a query for a grading application
* We'll call it `grades` and set it up to return some array based data

#### Make it an array
```
grades: []
```

* Make it required

```
grades: []!
```

* Make it return an array of integers but there could be null values inside the array but the array is required

```
grades: [int]!
```

* Make it an array and all elements of array must be an int and the array must be returned

```
grades: [Int!]!
```

* We want to have high numbers be a high percentage (good grade)
* Low numbers low percentage (bad grade)

## Set up our resolver method
* **Note**: order of Query resolvers not important

`index.js`

```
// MORE CODE

    grades(parent, args, ctx, info) {
      return [90, 80, 76]
    }, // don't forget this comma!

// MORE CODE
```

* Save it

## Test it out in Playground
```
query {
  grades
}
```

* Output

```
{
  "data": {
    "grades": [
      90,
      80,
      76
    ]
  }
}
```

* Notice that when we want an array in Playground we do not do this

```
query {
    grades {
        id
    }
}
```

* We can not provide a selection set using the curly braces where I specify what I want for each grade
* This is NOT something we can do for an array of Scalar types like and Array of Integers, array of Floats or an array of Strings
* Specifying a selection set like that is ONLY something we do for an Array of Custom Types

### Example of custom types specifying fields
```
query {
    posts {
        id
    }
}
```

* Output

```
{
  "data": {
    "posts": [
      {
        "id": "bd8cc868-bd47-487f-8a61-345067cf66a1"
      },
      {
        "id": "c90a463a-c223-4bce-b1ce-66f6a6344b1b"
      },
      {
        "id": "f7c0c5d0-0a72-4fee-9543-5927c42e0f76"
      }
    ]
  }
}
```

## Summary
* With an array of Custom Types you HAVE to specify that selection set
* With an array of Scalar Types you CAN NOT specify that selection set

## We just sent things from the server to the client

## Let's send things in the other direction
* From the client to the server

### We will alter our add query to accept an array of required Floats
`index.js`

```
// MORE CODE

const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!

// MORE CODE
```

* Now we'll use that query in our resolver for add
* We will use the array's `reduce` method that will reduce our array to a single number
    - [docs on reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```
// MORE CODE

    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0
      }

      // sample data [1, 5, 10, 2]
      return args.numbers.reduce(() => {

      })
    },

// MORE CODE
```

* To understand reduce let's use sample data [1,5,10,2]
* We call reduce on our numbers passed in from `args`
* We have to provide a function to reduce so we provide a single callback function
    - like we do for most of our array methods like:
        + forEach, map etc
    - The callback function only gets called if we have more than 1 item in the array
* reduce gets called with 2 arguments
    - `accumulator`
    - `currentValue`
* The first time this function runs
    - The accumulator will be equal to 1 (remember our array of sample data[1, 5, 10, 2])
    - The current value will be 5
    - And it is our job to reduce both numbers to a single number by returning something
        + So I will add both numbers: `return accumulator + currentValue; // 1 + 5 = 6`
        + Now the next time this runs 6 is the accumulator and 10 is the currentValue `6 + 10 = 16`
        + Now the next time this runs 16 is the accumulator and 2 is the current values `16 + 2 = 18`
        + So we are finished and we return the number `18`
* We return whatever we get back from the reduce as the return value for our resolver method

* Playground

```
query {
 add(numbers: [3,10,33,100])
}
```

* Make sure to refresh Playground
* Use Docs to understand
* Errors will also let you know what Playground expects to be passed

* Output

```
{
  "data": {
    "add": 146
  }
}
```

* Now we see arrays going in both directions
    - Sending arrays from the client as arguments
    - And taking an array on the server
    - Not common to send array from the client to the server
    - Most times you will be sending arrays from the server to the client
