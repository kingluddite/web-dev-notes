# Extending Array with Classes for Custom Collections

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Extending Arrays</title>
</head>
<body>
<script>

</script>
</body>
</html>
```

## You can extend the built-ins
No, not monkeying with the prototype with something like Array or Number but we can create our own classes that are modeled after an Array

### Create a movie collection
```js
const movies = new MovieCollection('My Fav Movies',
   { name: 'Pulp Fiction', stars: 8 },
   { name: 'Leon', stars: 8 },
   { name: 'Casablanca', stars: 8 },
   { name: 'What a Wonderful Life', stars: 10 },
   { name: 'Memphis Belle', stars: 8 }
);
```

We create an instance of our custom MovieCollection class. This class has a name property and then it has an array of all the movies. Each array will have a name property and a stars property

### Create our MovieCollection class
```js
class MovieCollection extends Array {
  constructor(name, ?) {
    
  }
}
```

We know we should first pass in a name but how do we pass in the rest?

### Using the ...rest operator

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    
  }
}
```

What if we did this?

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    this.name = name;
  }
}
const movies = new MovieCollection('My Fav Movies',
   { name: 'Pulp Fiction', stars: 8 },
   { name: 'Leon', stars: 8 },
   { name: 'Casablanca', stars: 8 },
   { name: 'What a Wonderful Life', stars: 10 },
   { name: 'Memphis Belle', stars: 8 }
);
```

We would get a `ReferenceError: this is not defined`

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super();
    this.name = name;
  }
}
```

Whenever we extend a class we need to use super() that will first create the parent class

Calling super() here as we are extending Array would be the same thing as `new Array(1,2,3,4)`. So how do we pass item1, item2, item3, item4?

We won't do `super(items[0], items[1], items[2], items[3])` as that would take forever and we don't know how many there are (we could have infinity movies in our MovieCollection) but we could do this

`super(items)`

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(items);
    this.name = name;
  }
}
const movies = new MovieCollection('My Fav Movies',
   { name: 'Pulp Fiction', stars: 8 },
   { name: 'Leon', stars: 8 },
   { name: 'Casablanca', stars: 8 },
   { name: 'What a Wonderful Life', stars: 10 },
   { name: 'Memphis Belle', stars: 8 }
);
```

Type `movies` in the console and we see an Array of an Array which is not what we want because we want each item in an array

So we would use `super(...items)` because we will `spread` into the function. Because items is an Array but we want to pass `super()` each item as an argument

So we capture all of them with the `...rest` and then we spread them out inside `super()` with a `...spread`

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(items);
    this.name = name;
  }
}
const movies = new MovieCollection('My Fav Movies',
   { name: 'Pulp Fiction', stars: 8 },
   { name: 'Leon', stars: 8 },
   { name: 'Casablanca', stars: 8 },
   { name: 'What a Wonderful Life', stars: 10 },
   { name: 'Memphis Belle', stars: 8 }
);
```

Type `movies` in console and we'll see our array of Objects which is what we want and if you type `movies.name` you'll get `My Fav Movies`

### Coolness
Great that we can have an Array but we can also have properties and that can be possible because at the end of the day Arrays are still Objects in JavaScript

### methods to our movies

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(...items);
    this.name = name;
  }
  add(movie) {
    this.push(movie);
  }
}
const movies = new MovieCollection('My Fav Movies',
   { name: 'Pulp Fiction', stars: 8 },
   { name: 'Leon', stars: 8 },
   { name: 'Casablanca', stars: 8 },
   { name: 'What a Wonderful Life', stars: 10 },
   { name: 'Memphis Belle', stars: 8 }
);

movies.add('Saving Private Ryan');
```

**note** we are using the `push()` method of Array and we can because we extended the Array class

That is not what we want because our console output when we type `movies` is:

`[Object, Object, Object, Object, Object, "Saving Private Ryan"]`

We don't want to add just a string to our MovieCollection. We want to add an Object with a `name` and `stars` properties

So change our last line to:

`movies.add({name: 'Saving Private Ryan', stars: 8});`

And then we get:

![output from our MovieCollection](https://i.imgur.com/eWzvN9D.png)

### for in loop
Type this in console
`for (const movie in movies) { console.log(movie) }`

Output

```
0
1
2
3
4
5
name
```

We get the index 0-5 which makes sense but why do we get `name`?

Because `for in` will loop over all items and we gave our object a `name` property

### for of loop
Only iterates over `iterable properties` of an Object

`for (const movie of movies) { console.log(movie) }`

![for of](https://i.imgur.com/J6NVLzm.png)

Now we get all the Objects but we don't get the name property

## Find top rated movies
Will take a `limit` argument (with a default of 10) to limit the result set of top movies

```js
class MovieCollection extends Array {
  constructor(name, ...items) {
    super(...items);
    this.name = name;
  }
  add(movie) {
    this.push(movie);
  }
  topRated(limit = 10) {
    return this.sort((a, b) => (a.stars > b.stars ? -1 : 1)).slice(0, limit);
  }
}
```

We use `this` which represents our entire collection and we `sort` each `object` comparing the `1st object` with the `next object` and each time we do this we check the `stars` inside each `object`. If `a stars` are **greater** than `b stars` than we return `false` else we return `true` and from the `result set` we will `slice off` starting from the `0 index` and ending on the value of the `limit` variable.

View in browser with `movies.topRated()` gives us `[Object, Object, Object, Object, Object, Object]`

- Not user friendly output

But try this: `console.table(movies.topRated())` gives us:

![cool table console output](https://i.imgur.com/nChqBb3.png)

`console.table(movies.topRated(2))` will give you the top 2 rated movies




