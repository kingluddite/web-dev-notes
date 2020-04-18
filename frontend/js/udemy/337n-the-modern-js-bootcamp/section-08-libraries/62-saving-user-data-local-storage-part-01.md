# Saving user data using Local Storage (Part 1)
* We want an app that will save our user's data so when then leave and comeback, they can pick up right where they last left off

## Currently
* If we add a new todo and refresh the page, it's gone

### CRUD
* We need a data store mechanism that allows us to
    - Create
    - Read
    - Update
    - Delete
* LocalStorage can perform all CRUD operations

## localStorage
* We'll save the data and retrieve it using `localStorage`
* `localStorage` is a global variable that is provided to us by the browser (just like `document` is provided to us)
    - We are not going to be setting it or assigning anything to it, all we are going to be doing is accessing methods that live on this object

### localStorage (Create of CRUD) .setItem('key','value')
* Both arguments are Strings

`notes-app/assets/js/script.js`

```
// MORE CODE

localStorage.setItem('location', 'Los Angeles')
// MORE CODE
```

* Once you type that line and refresh the browser, you will have data stored in localStorage

### localStorage (Read of CRUD) .getItem('key') 
#### How can we read the data previously saved?
* Comment out the localStorage line we just wrote

`scripts.js`

```
// MORE CODE

// localStorage.setItem('location', 'Los Angeles');
console.log(localStorage.getItem('location'));

// MORE CODE
```

* You will see `Los Angeles` in the client console
* We will use localStorage to store our app data

### See it in the browser
* In Firefox - Storage tab, Local Storage, select URL and you will see key value pair (remember they are strings)
* In Chrome - Application tab, Storage, Local Storage, select URL and you will see the key value pair (they are strings!)

### You can change the data in localStorage
* Click and change the value to another city
* Refresh the page and in the console you will now see the new city you just changed it to

## U in CRUD (update)
* Simply just use setItem again but also provide a value
* Same as Creat (C in CRUD)

```
// MORE CODE

// localStorage.setItem('location', 'Boston');

// MORE CODE
```

## Delete (D in CRUD) removeItem('key')
* This is how we remove items from localStorage

`localStorage.removeItem('location')`

`script.js`

```
// MORE CODE

localStorage.setItem('location', 'Los Angeles');
console.log(localStorage.getItem('location'));
localStorage.removeItem('location');
console.log(localStorage.getItem('location'));

// MORE CODE
```

* Now you will see that location in localStorage is now `null`

## clear() - How can I clear "all data" in localStorage?
* clear() does not take any arguments

`localStorage.clear()`

```
// MORE CODE

// localStorage.setItem('locationOne', 'Los Angeles');
// localStorage.setItem('locationTwo', 'Philly');
// localStorage.setItem('locationThree', 'Vegas');
console.log(localStorage.getItem('locationOne'));
console.log(localStorage.getItem('locationTwo'));
console.log(localStorage.getItem('locationThree'));
localStorage.removeItem('locationTwo');
console.log(localStorage.getItem('locationTwo'));
localStorage.clear();

// MORE CODE
```

## Now we know how to perform CRUD operations with our data
* Create (C in CRUD) `localStorage.setItem('key', 'value')`
* Read (R in CRUD) `localStorage.getItem('key')`
* Update (U in CRUD) `localStorage.setItem('key', 'value')`
* Delete (D in CRUD) `localStorage.removeItem('key')`
    Delete All `localStorage.clear()`

### Houston we have a problem!
* We can only store strings in localStorage because localStorage only supports strings
    - With this limitation, how will localStorage be useful for us when we're trying to store an array of objects?
    - It won't be useful unless we can convert an array into a string

## Convert an array into a string
* converts an array and converts it into a string
* converts a string into an array

### Steps
#### Setting localStorage with an array
1. We'll take our array of objects and convert it into a string
2. Then we'll save that string to localStorage

#### Getting localStorage data
1. We grab the string stored in localStorage
2. We'll convert that string back into an array

## JSON
* JSON is a method on a global variable
* Stands for JavaScript Object Notation
* We'll use this to convert our objects into a string
    - The string will look like an object but will be string based data
    - `stringify()` takes in your object, or your array or whatever else and it returns a string `JSON.stringify()`

### Let's convert our notes array of object into a string
* We'll comment out our last code working with localStorage

```
// MORE CODE

const notesJSON = JSON.stringify(notes);
console.log(notesJSON);

// localStorage.setItem('locationOne', 'Los Angeles');
// localStorage.setItem('locationTwo', 'Philly');
// localStorage.setItem('locationThree', 'Vegas');
// console.log(localStorage.getItem('locationOne'));
// console.log(localStorage.getItem('locationTwo'));
// console.log(localStorage.getItem('locationThree'));
// localStorage.removeItem('locationTwo');
// console.log(localStorage.getItem('locationTwo'));
// localStorage.clear();

// MORE CODE
```

* View in browser and you will see:

```
[{"title":"Go to gym","body":"Work out shoulders"},{"title":"Go to gym","body":"work out arms"},{"title":"Go to school","body":"Teach a good class"},{"title":"do homework","body":"Write lots of JavaScript"}]
```

* It sure looks like an array but you will see that it is in fact a string

```
// MORE CODE

const notesJSON = JSON.stringify(notes);
console.log(typeof notesJSON); // string

// MORE CODE
```

* **note** - JSON must be written in double quotes (" ")
    - double quotes surround the key and value
    - But we can keep writing `' '` (single quotes) since we won't write JSON directly and we can convert JSON to and from arrays and strings when we need to

### Now we'll set localStorage to our new string data
```
// MORE CODE

const notesJSON = JSON.stringify(notes);
// console.log(notesJSON);
localStorage.setItem(notes, notesJSON);

// MORE CODE
```

### Now we need a way of reading localStorage JSON string

### Here is the steps
```
// MORE CODE

// 1. create an object
const user = {
   name: 'john',
   age: 33,
 };

// 2. Convert object into a string
const userJSON = JSON.stringify(user);

// 3. Set the string on localStorage via a 'key' (we'll use user as our key)
localStorage.setItem('user', userJSON);

// 4. Log it out to see the string (it looks like an object but it's a string)
console.log(userJSON);
```

## Then comment all that code out and...
```
// MORE CODE

// grab the localStorage item via it's key and store in a variable
const userJSON = localStorage.getItem('user');

// parse the string back into an object and store in user
const user = JSON.parse(userJSON);

// Show that it is an object and print the name and age of the user
console.log(`${user.name} is ${user.age}`);

// MORE CODE
```

* **Note** If we don't parse the string back into an object like this...

```
// MORE CODE

const userJSON = localStorage.getItem('user');
// const user = JSON.parse(userJSON);
console.log(`${userJSON.name} is ${userJSON.age}`);

// MORE CODE
```

* You will get in the client console `undefined` is `undefined`
* Because the data we are working with is a string it will not have `name` and `age` properties
