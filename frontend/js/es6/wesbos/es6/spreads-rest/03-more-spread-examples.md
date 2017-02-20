# More Spread examples

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>More Spread Examples</title>
</head>
<body>
<div class="people">
  <p>John</p>
  <p>Jane</p>
  <p>Peaches</p>
</div>
<!-- /.people -->
<script>
const deepDish = {
  pizzaName: 'Deep Dish',
  size: 'Medium',
  ingredients: ['Marinara', 'Italian Sausage', 'Dough', 'Cheese']
};
</script>
</body>
</html>
```

## Use case: Alternative to Array.from()
How do we select all the people?

`const people = document.querySelectorAll('.people p');`

In console type `people`

We'll get a NodeList with a length of 3

![NodeList of p](https://i.imgur.com/GurQF5n.png)

We can't use `.map()` on a NodeList

```js
const people = document.querySelectorAll('.people p');
const names = people.map();
```

We'll get this error:

![map error](https://i.imgur.com/Mu9kzH6.png)

Because `.map()` is not a method of NodeList. If you `console.log(people)` and expand prototype, you will see `.map()` isn't in there

We could do this:

```js
const people = [...document.querySelectorAll('.people p')];
console.log(people);
```

And that will convert our `NodeList` to an `Array` that has the `.map()` method

`Array.from()` is the preferred way to do this because it reads nicer but another way to do the same thing is to use a `spread`

```js
const people = [...document.querySelectorAll('.people p')];
console.log(people);
```

We take every single item and spread them across an array

How? Because a NodeList is an iterable and everything that is an iterable can be spread onto a new array

## Finishing up our `.map()`
```js
const people = [...document.querySelectorAll('.people p')];
const names = people.map((person) => {
  return person.textContent;
});
```

Type `names` in console gives us our names in an array `["John", "Jane", "Peaches"]`

### Cleaner way to write .map()
```js
const people = [...document.querySelectorAll('.people p')];
const names = people.map((person) => person.textContent);
```

* We put it on 1 line instead of 3
* We get rid of the curly braces
* We use an implicit return

## Other Use Case
When you want to create a new array off of a property on an Object

I create an array of a grocery list

```js
const deepDish = {
  pizzaName: 'Deep Dish',
  size: 'Medium',
  ingredients: ['Marinara', 'Italian Sausage', 'Dough', 'Cheese']
};

const groceries = ['milk', 'eggs', 'salad'];
```

But I want to add the ingredients from the deepDish object to my grocery list.

I can do this easily using spread

`const groceries = ['milk', 'eggs', 'salad', ...deepDish.ingredients];`

In console type `groceries`:

`["milk", "eggs", "salad", "Marinara", "Italian Sausage", "Dough", "Cheese"]`

And that is a true copy, not a reference

## Use Case
You have an array of objects and you need to remove one. This is something you will find yourself needing when working with React

```js
const comments = [
  { id: 234332, text: 'I love my car!' },
  { id: 453921, text: 'Where is my car?' },
  { id: 348272, text: 'Dude! Where is my car?' },
  { id: 673922, text: 'Seriously. Dude. I think I lost my car' },
];
```

How can we remove one of these object from the array?

We need to find an object by it's ID using `.findIndex()`

```js
const id = 348272;
const commentIndex = comments.findIndex(comment => comment.id === id);
console.log(commentIndex); // 2 (remember arrays start with 0 index)
```

* Find a comment with an id equal to our variable `id`

We have the right index. How do I delete if from there?

Previously you had to slice everything before, slice everything after but we have a better way with ES6

So we are going to create a new array and fill it with everything before the comment we want to delete and every comment after it

```js
const newComments = [comments.slice(0,commentIndex), comments.slice((commentIndex + 1))];
```

* We slice from 0 to our commentIndex (which is `2`)
    - And we slice from commentIndex + 1 (which is `3`) until the end (we don't pass a second argument so it will just go to the end)

```js
const comments = [
  { id: 234332, text: 'I love my car!' },
  { id: 453921, text: 'Where is my car?' },
  { id: 348272, text: 'Dude! Where is my car?' },
  { id: 673922, text: 'Seriously. Dude. I think I lost my car' },
];

const id = 348272;
const commentIndex = comments.findIndex(comment => comment.id === id);

const newComments = [comments.slice(0,commentIndex), comments.slice((commentIndex + 1))];
console.log(newComments);
```

Output: `[Array[2], Array[1]]`

This doesn't look very useful because we have an array of arrays
We don't want that. We want an array of comment objects

## Spreads to the rescue
`const newComments = [...comments.slice(0,commentIndex), ...comments.slice((commentIndex + 1))];`

Each spread takes those items out of their array and puts them in the parent array











































































































































