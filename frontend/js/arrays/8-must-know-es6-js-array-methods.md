# 8 Must know ES6 JS array methods

`index.html`

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
 
  <script src="script.js"></script>
</body>
</html>
```

`script.js`

* Will use this array for all functions

```
const items = [
  { name: 'Bike', price: 100 },
  { name: 'Car', price: 2000 },
  { name: 'Album', price: 10 },
  { name: 'Book', price: 3 },
  { name: 'Phone', price: 500 },
  { name: 'Computer', price: 2000 },
  { name: 'Keyboard', price: 200 },
  { name: 'TV', price: 250 },
];
```

## filter
* filter out stuff from original array into a new array

```
const filteredItems = items.filter(item => {
  return item.price <= 1000;
});

console.log(filteredItems);

```

* Output

```
0: {name: "Bike", price: 100}
1: {name: "Album", price: 10}
2: {name: "Book", price: 3}
3: {name: "Phone", price: 500}
4: {name: "Keyboard", price: 200}
5: {name: "TV", price: 250}
```

* Does not mutate the original array

```
// MORE CODE
console.log(filteredItems);
console.log(items);
```

* Will show that the original array is still the same

## map()
* Convert one array into a new array so all the items in the array can look slightly different

```
const itemNames = items.map(item => {
  return item.name;
});

console.log(itemNames);

```

* Output

```
["Bike", "Car", "Album", "Book", "Phone", "Computer", "Keyboard", "TV"]
```

* If we just want prices

```
const itemNames = items.map(item => {
  return item.price;
});

console.log(itemNames);
```

* Output

```
(8) [100, 2000, 10, 3, 500, 2000, 200, 250]
```

## find()
* Allows you to find a single object in an array
* Will return the very first item in the array that returns true based on condition

```
const foundItem = items.find(item => {
  return item.name === 'Book';
});

console.log(foundItem); // {name: "Book", price: 3}

```

## forEach()
* Doesn't return anything so we don't need to store in a variable
* Works similar to a for loop but less coding

```
items.forEach(item => {
  console.log(item.name);
});

```

* Output in client console

```
Bike
Car
Album
Book
Phone
Computer
Keyboard
TV
```

* This makes working with arrays so much easier instead of having to write out the clunky long for loop

## some()
* Different than above functions
* Will not return an array, instead returns true or false
* Anything inside array matches condition and it will return true

```
const hasInexpensiveItems = items.some(item => {
  return item.price >= 1000;
});

console.log(hasInexpensiveItems); // true

```

## every()
* Very similar to some() but checks to see if every item in array matches condition

```
const items = [
  { name: 'Bike', price: 100 },
  { name: 'Car', price: 2000 },
  { name: 'Album', price: 10 },
  { name: 'Book', price: 3 },
  { name: 'Phone', price: 500 },
  { name: 'Computer', price: 2000 },
  { name: 'Keyboard', price: 200 },
  { name: 'TV', price: 250 },
];

const hasInexpensiveItems = items.every(item => {
  return item.price > 0;
});

console.log(hasInexpensiveItems); // true
```

## reduce()
* Different than all previous
* Get total price of all items in array

```
const totalAmount = items.reduce((currentTotal, item) => {
  return item.price + currentTotal
}, 0);

console.log(totalAmount); // 5063
```

## includes()
* Doesn't take a function, just takes a single argument

```
const items = [1, 2, 3, 4, 5];

const includesTwo = items.includes(2);
const includesNine = items.includes(9);
console.log(includesTwo); // true
console.log(includesNine); // false
```
