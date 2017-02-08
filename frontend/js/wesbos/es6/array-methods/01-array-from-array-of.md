# Array.from() and Array.of()

```html
!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Array .from() and .of()</title>
</head>
<body>
  <div class="people">
    <p>John</p>
    <p>Jane</p>
    <p>Peaches</p>
  </div>
  <!-- /.people -->
<script>
  
</script>  
</body>
</html>
```

**note** `Array.from()` and `Array.of()` are not on the prototype

![no Array.of() or Array.from()](https://i.imgur.com/57c7xF5.png)

Above image shows us what happens if we try to use `from()` or `of()` on an Array. They don't exist

Why? They are not on the prototype, they are on the Array itself

![show .of() and .from() working on Array](https://i.imgur.com/CpEMJha.png)

## Array.from()
Will take something that is `array-ish` and turn it into a true Array

### Practical use of Array.from()
When we are working with DOM elements

```js
const people = document.querySelectorAll('.people p');
console.log(people);
```

Gives us a NodeList of all `p`s. What if I just want an array of people's names?

```js
const people = document.querySelectorAll('.people p');
const names = people.map(person => person.textContent);
console.log(names);
```

We'll get an error:  `TypeError: people.map is not a function`

The reason if you log it:

You'll see that it is a NodeList

![NodeList](https://i.imgur.com/k66z2G5.png)

And NodeList doesn't have `map()` as a function

![no map()](https://i.imgur.com/01rz86L.png)

How can we make this `map()` work?

`const peopleArray = Array.from(people);`

That will take our NodeList and convert it to an Array so we can then use our `map()`

```js
const people = document.querySelectorAll('.people p');
const peopleArray = Array.from(people);
const names = peopleArray.map(person => person.textContent);
console.log(names);
```

**note** If you `console.log(peopleArray)` you will see it has been converted to a real Array

![yay! array!](https://i.imgur.com/pzdM5qM.png)

Output: We now have a real Array:

```js
["John", "Jane", "Peaches"]
```

### More efficient way to do the same thing

```js
const people = Array.from(document.querySelectorAll('.people p'));
const names = people.map(person => person.textContent);
console.log(names);
```

### Even more efficient
`Array.from()` can take a second argument which will allow us to modify the data as we are creating the array

First we'll write it so that it is clear what we are doing
Creates new file in the tree where you currently are
```js
const people = document.querySelectorAll('.people p');
const peopleArray = Array.from(people, person => {
  return 'john doe';
});
console.log(peopleArray); // ["john doe", "john doe", "john doe"]
```

How is this working? the second argument 
```js
person => {
  return 'john doe';
}
```

Loops through every paragraph tag and returns to us something. In this case, text 3 times (because there are 3 paragraphs)

### Let's inspect further
What is `person`? Let's `console.log(person)` to find out more

```js
const people = document.querySelectorAll('.people p');
const peopleArray = Array.from(people, person => {
  console.log(person);
  return 'john doe';
});
```

Output

```
<p>John</p>
<p>​Jane​</p>​
<p>​Peaches​</p>​
["john doe", "john doe", "john doe"]
```

We see that it is holding inside it the DOM fragment

Do if we `return person.textContent` we should get the actual person's name

```js
const people = document.querySelectorAll('.people p');
const peopleArray = Array.from(people, person => {
  console.log(person);
  return person.textContent;
});
console.log(peopleArray); // ["John", "Jane", "Peaches"]
```

And it does return all their names and so we can remove the `names` array since we don't need it anymore.

## Refractor
```js
const people = Array.from(document.querySelectorAll('.people p'),  person => {
  return person.textContent;
});
console.log(people);
```

Gives us same output

## Use case: Convert arguments Object into an Array

```js
function sumAll() {
 console.log(arguments);
}
sumAll(234,343,425,45345,345,4534,34534);
```

Output `[234, 343, 425, 45345, 345, 4534, 34534]`

Looks like an Array but it's not

### Let's try reduce() on this `fake` array

```js
function sumAll() {
 // console.log(arguments);
 return arguments.reduce((prev, next) => prev + next, 0);
}
sumAll(234,343,425,45345,345,4534,34534);
```

**note** we loop through array with reduce() and add each number and start at zero (0)

Will give us an error: `array-from-and-of.html:21 Uncaught TypeError: arguments.reduce is not a function`

The reason there is an error is you won't see `Arguments.reduce()` in the prototype (check inspector to see for yourself)

![no reduce()](https://i.imgur.com/hnPaJog.png)

We can see that `arguments` is not an array it is `array-ish`

```js
function sumAll() {
 const nums = Array.from(arguments);
 return nums.reduce((prev, next) => prev + next, 0);
}
```

Then if you paste this into the console (after refreshing it):

`sumAll(234,343,425,45345,345,4534,34534); // 85760`

## Array.of()
Pretty straightforward. It will create an array from every single argument you supply it with

```js
const ages = Array.of(234,343,34,222,34);
console.log(ages); // [234, 343, 34, 222, 34]
```


