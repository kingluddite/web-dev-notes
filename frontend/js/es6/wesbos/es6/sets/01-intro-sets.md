# Sets
In JavaScript is like a unique array, you can only add the same item only once with a nice API for managing the items inside of it

## How are sets different than arrays?
You can't access the items individually and it is not index based

## How should I think of sets?
Think of sets like a list of items you can add to, remove from and loop over

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Sets</title>
</head>
<body>
<script>
const people = new Set();
people.add('John Doe');
people.add('Peaches');
people.add('The Lone Ranger');
console.log(people);
</script>
</body>
</html>
```

![Output of Set](https://i.imgur.com/3lqQLXl.png)

Looks like an array but it is not.

`people.size` is how to find out how long it is. `index.length` is not possible because Sets can not be accessed by their index

### Remove someone from Set
`people.delete('John Doe')`

With arrays you always have to know the index to delete it. Not with Sets. You need to spell the name correctly to delete it

### Clear a Set
`people.clear()` - Will give us an empty set

Refresh the browser

### Sets and values
`people.values()`

Output - `SetIterator {"John Doe", "Peaches", "The Lone Ranger"}`

#### What is a SetIterator?
It means we can loop over it. But this is also a Generator. If it's a Generator, then we can use `.next()` on it. All we have to do is stick it inside a variable

```js
const it = people.values();
it.next();
```

Then we can loop through the Generator one-by-one

![looping through Generator](https://i.imgur.com/Drw5c0O.png)

### Also can use the `for of` loop with Generators

```js
const people = new Set();
people.add('John Doe');
people.add('Peaches');
people.add('The Lone Ranger');

for (const person of people) {
  console.log(person);
}
```

### Output

```
John Doe
Peaches
The Lone Ranger
```

## Set also have values of `keys` and `entries`
`people.keys();`

### So what's the difference between `.keys()` and `.values()`?
Nothing. They are the same thing. Because a Set is just values. Keys and values would be same thing

### What about `.entries()`
`people.entries()`

Output - `SetIterator {["John Doe", "John Doe"], ["Peaches", "Peaches"], ["The Lone Ranger", "The Lone Ranger"]}`

**important** - `.keys()` and `.entries()` will be very useful when we deal with `.map()`

### Setting Set with values as you make it
const students = new Set(['John Doe', 'Peaches', 'Tonto']);

### You can also create a Set when you pass it an array
```js
const cats = ['Missy', 'Sneakly'];
const catSet = new Set(cats);
```

### set.has()
To find out if someone is already in Set
Remember - the Set must be unique

`student.has('John doe')` - false

`student.has('John Doe')` - false

**note** If you try to add someone that is already in set, you won't get an error it just won't add the duplicate person

* You can not reference with `students[1]`
* You can only loop over Sets with a `for of` loop






