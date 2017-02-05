# Array Cardio
Fundamentals of JavaScript dealing with Array methods

## Get good at
People say these are the gateway drug to functional programming
* `filter()`
* `mad()`
* `sort()`
* `reduce()`

If you do, you're JavaScript programming will get a lot better

## filter()
Way it works is you pass it a function and that function is going to loop over every single item in our array and it is going to give us the singular form of the array(`inventors` is array and `inventor` is what it gives us - the singular form of the array). For each inventor we can decide if we want to keep it or not

```js
const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];
    // Array.prototype.filter()
        // 1. Filter the list of inventors for those who were born in the 1500's
```

**note** If you do not `return` anything other than true or `truthy`, you do not need an `else` because it will just throw it in the garbage

## bad
```js
if (something) {
    return true;
} else {
    return false;
}
```

You don't need that else

## good
```js
if (something) {
    return true;
}
```

## use filter() on Array
```js
const fifteen = inventors.filter(function(inventor) {
      if (inventor.year >= 1500 && inventor.year < 1600) {
        return true; // key it!
      }
    });
    console.log(fifteen);
```

[This outputs two objects](https://i.imgur.com/1MsYYDY.png)

**tip** `console.table()` instead of `console.log()`

[console.table() is cooler](https://i.imgur.com/JAyIPJQ.png)

## Refactor our reduce() function
```js
const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600);
console.log(fifteen);
```

## Get array of first and last names
```js
const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names
```

## How does map() work?
It takes in an array, it does something with that array and then returns a new array but of the same length

Think of `map()` like a factory machine, where it takes in a raw material, it will stamp it somehow and then kick out that item on the other end. With filter you can bring in 100 things and return 10, `map()` will always return the same amount of items that you give it

```js
const fullNames = inventors.map(inventor => inventor.first + inventor.last);
console.log(fullNames);
```

[array of full names](https://i.imgur.com/gjTTvG4.png)

## You can add parenthesees
For improved readability

```js
const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));
```

But we need to add a space. This will work:

```js
const fullNames = inventors.map(inventor => inventor.first + ' ' + inventor.last);
console.log(fullNames);
```

But using ES6 and Template Strings is a superior technique:

```js
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`);
console.log(fullNames);
```

## sort()
Using the `inventors` array of objects

```js
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
```

### How `sort()` works
You have two items in your hand and you are asked to sort just those two items. Is person A older than person B and if so, you put the older person on top. In JavaScript we do that by returning `1` and `-1` and that will bubble those items up and down in the Array

### common sytnax
```js
array.sort(function(firstPerson, secondPerson) {
 // do stuff
});

// but more common to see this:
array.sort(function(a, b) {
 // do stuff
});
```

## Sorting Oldest to Youngest with `sort()`
```js
// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const ordered = inventors.sort(function(a, b) {
  if(a.year > b.year) {
    return 1;
  } else {
    return -1;
  }
});
console.table(ordered);
```

[Output of sort](https://i.imgur.com/aTmNlDW.png)

### Improve with ternary operator and ES6 fat arrow
We now did it all in one line. We are using an implicit return here too.

```js
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
console.table(ordered);
```

## Notes
`sort()`, `filter()` and `map()` will take something and either sort them or turn them into something else or they will filter them down but `reduce()` gives you the ability to build something on every single one

[Practice More](http://richardkho.com/back-to-basics-functional-programming/)

## use `reduce()` to find add up all the years inventors were alive
```js
// Array.prototype.reduce()
// 4. How many years did all the inventors live?
```

### The old way of doing the same thing
```js
var totalYears = 0;

for(var i = 0; i < inventors.length; i++) {
    totalYears += (inventors.passed - inventors[i].year);
}
console.log(totalYear); // 861
```

### A better way to do the same thing
`total` - is what you generated last time, or the running total

```js
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
});
console.log(totalYears); // [object Object]7859843780508967907681
```

### We get an Object but we need to do better
The problem is the first time around in our loop we don't have a total and we are getting `undefined`. To fix this we add a `0` to say let's start counting at `0`

```js
const totalYears = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
console.log(totalYears); // 861
```

## Sort inventors by year lived
```js
const oldest = inventors.sort(function(a, b) {
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  if(lastGuy > nextGuy) {
    return -1;
  } else {
    return 1;
  }
});
console.table(oldest);
```

### Refactor it
```js
const oldest = inventors.sort(function(a, b) {
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? -1 : 1;
});
console.table(oldest);
```

## Use live site to scrape for information
Find all Boulevards in Paris that contain `de` anywhere in the name

[Use this link}](https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris)

Inspect page and find container of list of all Boulevards

`mw-category`

[containing class for list](https://i.imgur.com/texAJ0w.png)

Use console and type:
`const category = document.querySelector('.mw-category')`

You can call querySelector or querySelectorAll against any existing DOM element

so this will work

```js
const category = document.querySelector('.mw-category a');
```

or this will work too

```js
const category = document.querySelector('.mw-category');
const links = category.querySelectorAll('a');
```

This will give us a [list of links](https://i.imgur.com/ExsD2jO.png) which is every link on the actual page. We need to convert that list of links into a list of names and then we will filter that list of names for only ones that include `de`

### we will use map()
We'll take in a list of links and return a list of names

```js
const de = links.map(link => link.textContent);
```

Type `de` in inspector and you'll get an error

`TypeError: links.map is not a function`

The problem is that `querySelector` returns to you a `nodeList`. To find out the problem type `links` in the console and scroll to the bottom of all those `a` tags. You will find the `__proto__` property. Click to expand it and you won't see 'map()' as one of it's methods

## Solution
We need to change `links` into an Array

### Two ways to convert `links` from a nodeList to an Array
#### 1. wrap the entire thing in `Array.from()`

```js
const links = Array.from(category.querySelectorAll('a'));
```

Refresh the browser and add add these two lines:

```js
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
```

Type `links` and you'll now see that it is an Array and if you scroll to the bottom and open the `__proto__` you will see that it has a `map()` method

#### 2. Spreads inside an Array
(ES6 - second way to convert a NodeList to an Array)

```js
const category = document.querySelector('.mw-category');
const links = [...category.querySelectorAll('a')];
```

The ES6 spread - spreads every single item into the Array. A spread will take every item out of something (an iterable - in which this case it is a NodeList) and it will put it into an Array)

In this case `Array.from()` might be more readible

**note** one of the pains of using `const` is you will have to refresh the browser because it will give you this error if you don't refresh

`Identifier 'links' has already been declared`

Remember when using `const` you can not change the value

## map() again
```js
const de = links.map(link => link.textContent);
console.log(category);
```

Now we have all the Boulevards we just have to filter out all without de

## filter()
```js
const category = document.querySelector('.mw-category');
const links = Array.from(category.querySelectorAll('a'));
// const links = [...category.querySelectorAll('a')];
const de = links
             .map(link => link.textContent)
             .filter(streetName => streetName.includes('de'));
console.log(de);
```

Paste that into the console of the wikipedia page and you will now only see Boulevards with `de` in them

## Sort the people alphabetically by last name

### Bug Fix
We get this error: `Uncaught TypeError: Cannot read property 'querySelectorAll' of null`

Our last code was only intended to run in the wikepedia page so we need to comment it out

The error is because we use a querySelector() on `.mw-category` which doens't exist in our local HTML page so when you run `category.querySelectorAll('a')` it causes an error because `category` contains `null`

### Back to our sort() exercise
```js
const alpha = people.sort(function(lastOne, nextOne) {
  console.log(lastOne);
});
```

That will sort by last name. But it is not what we want. We really want to convert this into a first name and a last name

#### How can we do this?
```
Beck, Glenn
Blake, William
Beckett, Samuel
Beddoes, Mick
```

One thing they all have in common are a command and a space `, `

So we can use the Array `split()` method and pass it the `, ` as an argument

Now we get an array where the first thing is the last name and the second thing is the first name.

```js
const alpha = people.sort(function(lastOne, nextOne) {
  console.log(lastOne.split(', '));
});
```

### Output
![last and first name inside an array](https://i.imgur.com/mNTAB80.png)

### Destructure
Rather than return an Array we can put them into their own variables right away

```js
// Sort the people alphabetically by last name
const alpha = people.sort(function(lastOne, nextOne) {
  const [last, first] = lastOne.split(', ');
  console.log(last, first);
});
```

![some of our names](https://i.imgur.com/DZUrDEO.png)

### Finishing up our sort() by last name

```js
// Sort the people alphabetically by last name
const alpha = people.sort(function(lastOne, nextOne) {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
console.log(alpha);
```

Give you:

![sorting by last name](https://i.imgur.com/ijXRKVt.png)

**note**

We were not using this data (it was just for the conversion). But we are still hanging on to the original string that we were working with

```js
const [aLast, aFirst] = lastOne.split(', ');
const [bLast, bFirst] = nextOne.split(', ');
```

### Refactor with ES6 arrow function

```js
const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
console.log(alpha);
```

## Sum up the instances of each of these with `reduce()`
```js
// 8. Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
```

**note** `reduce()` is one of the most flexible methods to use with Arrays

We would like to do something like this:

```js
const transporation = data.reduce((obj, item) => {
    
}, {
  car: 0,
  walk: 0,
  truck: 0
});
```

But if our logic is large we don't want to have to open it and list out all the different transportation vehicles. We want our code to figure that out for us

```js
const transporation = data.reduce((obj, item) => {
   console.log(item);
   return obj;
}, {});
```

This will give us:

```
(2) car
(2) truck
bike
walk
car
van
bike
walk
car
van
car
truck
```

This will give us `NaN`

```js
const transporation = data.reduce((obj, item) => {
  //  console.log(item);
  console.log(obj[item]++);
   return obj;
}, {});
```

That is because of the first items. There are none so the value is null. We need to check if there is no Object and then set that to 0

```js
const transportation = data.reduce((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
   return obj;
}, {});
console.log(transportation);
```

Which gives us the result we want. The total of each item in our Object

![all item counts](https://i.imgur.com/BmJOhhu.png)

**note** reduce is the hardest method with arrays for people to get
We start with a blank object and then every time we loop over one, we check if there is a 0 there at all, if not we need to make an entry for that and then we go ahead an increment it

Then you can add to our array of transportation vehicles and when your refresh the browser the object will update with a new count

## More Practice
Grab all WordCup winners [from this site](http://www.topendsports.com/events/worldcupsoccer/winners.htm) and sort them by who won the most.

```js
const winnerTable = document.querySelector('.list');
const winnerTds = Array.from(winnerTable.querySelectorAll('tr td strong'));
const countries = winnerTds.map(winnerTd => winnerTd.textContent);
const winnerCount = countries.reduce((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});

let sortable = [];
for (let country in winnerCount) {
  sortable.push([country, winnerCount[country]]);
}
const best = sortable.sort((a, b) => {
  const lastWinCount = a[1];
  const nextWinCount = b[1];
  return lastWinCount > nextWinCount ? -1 : 1;
});
console.table(best);
```
