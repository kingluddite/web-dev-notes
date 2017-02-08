# Spread Operator Intro
You will see 3 dots in front of array or any iterable

`...iterable`

## What is the spread operator
It takes every single item from an iterable

### What's an iterable again?
Anything you can loop over with our `for of` loop (that includes arrays, strings, DOMNodes, arguments object, maps and sets)

For this review we'll use strings and arrays (most use case)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>The ...Spread Operator</title>
</head>
<body>
<script>
const featured = ['Deep Dish', 'Veggie', 'Soy'];
const specialty = ['Meatzza', 'Spicee', 'Margherita'];

const deepDish = {
  pizzaName: 'Deep Dish',
  size: 'Medium',
  ingredients: ['Marinara', 'Italian Sausage', 'Dough', 'Cheese']
};
</script>
</body>
</html>
```

## The Spread operator
Take every single item in the array and apply it to the containing element or the containing array

### How is that useful?
How can you combine 2 arrays into 1?

```js
const featured = ['Deep Dish', 'Veggie', 'Soy'];
const specialty = ['Meatzza', 'Spicee', 'Margherita'];
const pizzas = featured.concat(specialty);
console.log(pizzas); // ["Deep Dish", "Veggie", "Soy", "Meatzza", "Spicee", "Margherita"]
```

That works but...

### How would you put a new pizza into the middle of the `pizzas` array?
```js
const featured = ['Deep Dish', 'Veggie', 'Soy'];
const specialty = ['Meatzza', 'Spicee', 'Margherita'];

let pizzas = [];
pizzas = pizzas.concat(featured);
pizzas.push('Mushroom');
pizzas = pizzas.concat(speciality);
console.log(pizzas);
```

And as you can see this gets to be overly complex. There has to be a better way to manage that. There is!

## spread operator
Take every single item in an array and spread it into a new array

Let's take a string of `John`

* every item in that string is a character

You could make it an array `["john"]` 

But if we wanted to make every single char of that string inside an array?

`[... 'john']` transforms into `["j", "o", "h", "n"]`

So using that logic:

```js
const featured = ['Deep Dish', 'Veggie', 'Soy'];
const specialty = ['Meatzza', 'Spicee', 'Margherita'];

const pizzas = [...featured, ...specialty];
```

Type `pizzas` in console and we get: `["Deep Dish", "Veggie", "Soy", "Meatzza", "Spicee", "Margherita"]`

And to add `'mushroom'` in the middle just do this:

`const pizzas = [...featured, 'mushroom', ...specialty]; // ["Deep Dish", "Veggie", "Soy", "mushroom", "Meatzza", "Spicee", "Margherita"]`

## Copy an array
```js
const pizzas = [...featured, 'mushroom', ...specialty];
const fridayPizzas = pizzas;
```

Is this a copy?

If we type `pizzas` and `fridayPizzas` they contain the same items. But what happens when you add a pizza to `fridayPizzas` with:

Type in console: `fridayPizzas[0] = 'Goat Cheese Pie'`

Now view `pizzas` in console

![overwriting arrays](https://i.imgur.com/mNPs6QQ.png)

We added an item to one array and it was also added to the other array. That is not what we wanted to do. We didn't actually copy our original array, we just referenced it - so `pizzas` and `fridayPizzas` are the exact same thing

## The workaround for copying an array
```js
const pizzas = [...featured, 'mushroom', ...specialty];
const fridayPizzas = [].concat(pizzas);
```

![copy array example](https://i.imgur.com/ZYLXJhR.png)

### But the best way is now using spread
```js
const pizzas = [...featured, 'mushroom', ...specialty];
const fridayPizzas = [...pizza];
```

So now we spread the former array items into this fresh new array

And it will work the same as when we copied the array with `concat()`

![copy array example](https://i.imgur.com/ZYLXJhR.png)
