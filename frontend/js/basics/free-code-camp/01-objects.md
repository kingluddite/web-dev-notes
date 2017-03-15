# Objects
Objects are similar to arrays, except that instead of using indexes to access and modify their data, you access the data in objects through what are called properties.

A sample object:

```js
var cat = {
  "name": "Whiskers",
  "legs": 4,
  "tails": 1,
  "enemies": ["Water", "Dogs"]
};
```

Objects are useful for storing data in a structured way, and can represent real world objects, like a cat.

**note** When you are accessing the properties of an object you may be asked to 'read the values of that object' - It means the same thing as show the values of the properties

## Accessing Objects Properties with the Dot Operator
There are two ways to access the properties of an object: the dot operator (.) and bracket notation ([]), similar to an array.

The dot operator is what you use when you know the name of the property you're trying to access ahead of time.

Here is a sample of using the dot operator (.) to read an object property:
```js
var myObj = {
  prop1: "val1",
  prop2: "val2"
};
var prop1val = myObj.prop1; // val1
var prop2val = myObj.prop2; // val2
```

## Accessing Objects Properties with Bracket Notation
The second way to access the properties of an object is bracket notation `[]`. If the property of the object you are trying to access has a space in it's name, you will need to use bracket notation.

Here is a sample of using bracket notation to read an object property:

```js
var myObj = {
  "Space Name": "Kirk",
  "More Space": "Spock"
};

myObj["Space Name"]; // Kirk
myObj['More Space']; // Spock
```

Note that property names with spaces in them must be in quotes (_single or double_).

## Accessing Objects Properties with Variables
* Another use of bracket notation on objects is to use a variable to access a property
* This can be very useful for iterating through lists of the object properties or for doing **the lookup**.

Here is an example of using a variable to access a property:

```js
var someProp = "propName";
var myObj = {
  propName: "Some Value"
}
myObj[someProp]; // "Some Value"
```

Here is one more:

```js
var myDog = "Hunter";
var dogs = {
  Fido: "Mutt",
  Hunter: "Doberman",
  Snoopie: "Beagle"
}
var breed = dogs[myDog];
console.log(breed);// "Doberman"
```

**note** 

We do not use quotes around the variable name when using it to access the property because we are using the value of the variable, not the literal name

### Exercise
Use the playerNumber variable to lookup player 16 in testObj using bracket notation. Then assign that name to the player variable.

```js
var testObj = {
  12: "Namath",
  16: "Montana",
  19: "Unitas"
};

var playerNumber = 16;
var player = testObj[playerNumber];
```

## Updating Object Properties
After you've created a JavaScript object, you can update its properties at any time just like you would update any other variable. You can use either **dot** or **bracket notation** to update.

### Example

```js
var ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"]
};
```

Change his name to "Happy Camper" with:

`ourDog.name = "Happy Camper";` or `ourDog["name"] = "Happy Camper";`

Now when we evaluate `ourDog.name`, instead of getting "Camper", we'll get his new name, "Happy Camper"

## Delete Properties from a JavaScript Object
We can also delete properties from objects like this:

`delete ourDog.bark;`

## Using Objects for Lookups
Objects can be thought of as a **key/value** storage, like a dictionary. If you have tabular data, you can use an object to "lookup" values rather than a **switch statement** or an **if/else** chain. This is most useful when you know that your input data is limited to a certain range.

simple reverse alphabet lookup example:

```js
var alpha = {
  1:"Z",
  2:"Y",
  3:"X",
  4:"W",
  ...
  24:"C",
  25:"B",
  26:"A"
};
alpha[2]; // "Y"
alpha[24]; // "C"

var value = 2;
alpha[value]; // "Y"
```

### Exercise

```js
function phoneticLookup(val) {
  var result = "";
  /* switch(val) {
    case "alpha": 
      result = "Adams";
      break;
    case "bravo": 
      result = "Boston";
      break;
    case "charlie": 
      result = "Chicago";
      break;
    case "delta": 
      result = "Denver";
      break;
    case "echo": 
      result = "Easy";
      break;
    case "foxtrot": 
      result = "Frank";
  } */
  
  var lookup = {
    "alpha": "Adams",
    "bravo": "Boston",
    "charlie": "Chicago",
    "delta": "Denver",
    "echo": "Easy",
    "foxtrot": "Frank"
  };

  result = lookup[val];

  // Only change code above this line
  return result;
}
```

## Testing Objects for Properties
Sometimes it is useful to check if the property of a given object exists or not. We can use the `.hasOwnProperty(propname)` method of objects to determine if that object has the given property name. `.hasOwnProperty()` returns `true` or `false` if the property is found or not

### Example
```js
var myObj = {
  top: "hat",
  bottom: "pants"
};
myObj.hasOwnProperty("top");    // true
myObj.hasOwnProperty("middle"); // false
```

### Exercise
Modify the function checkObj to test myObj for checkProp. If the property is found, return that property's value. If not, return "Not Found".

```
var myObj = {
  gift: "pony",
  pet: "kitten",
  bed: "sleigh"
};

function checkObj(checkProp) {
  // Your Code Here
  if (myObj.hasOwnProperty(checkProp)) {
    return myObj[checkProp];
  } else {
    return "Not Found";
  }
}

checkObj("gift");
```

## Manipulating Complex Objects
Sometimes you may want to store data in a flexible Data Structure. A JavaScript object is one way to handle flexible data. They allow for arbitrary combinations of strings, numbers, booleans, arrays, functions, and objects.

## Example of complex data structure:

```js
var ourMusic = [
  {
    "artist": "Daft Punk",
    "title": "Homework",
    "release_year": 1997,
    "formats": [ 
      "CD", 
      "Cassette", 
      "LP"
    ],
    "gold": true
  }
];
```

* This is an `array` which contains one object inside. The object has various pieces of **metadata** about an album. It also has a nested "formats" array. If you want to add more album records, you can do this by adding records to the top level array

Objects hold data in a property, which has a **key-value** format. In the example above, "artist": "Daft Punk" is a property that has a key of "artist" and a value of "Daft Punk".

### JavaScript Object Notation or JSON
Is a related data interchange format used to store data.
```json
{
  "artist": "Daft Punk",
  "title": "Homework",
  "release_year": 1997,
  "formats": [ 
    "CD",
    "Cassette",
    "LP"
  ],
  "gold": true
}
```

**note**

You will need to place a comma after every object in the array, unless it is the last object in the array.
