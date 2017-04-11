# DB Planning and Rendering static data
* Each player needs
    - name
    - score

The place they are in can be rendered on the fly

So we need an array of objects with a name and a score

## First Static Data
Type this in `client/main.js` and you see [this rendered to the screen](https://i.imgur.com/xaUbt5p.png) which means we can render a dynamic set of JSX to the screen

```
let jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
       {[<p>1</p>, <p>2</p>]}
     </div>
);
```

We get an error about **unique key** and can fix it with

```
let jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
       {[<p key="1">1</p>, <p key="2">2</p>]}
     </div>
  );
```

So we know how to render an array to the screen now we need to render an array of objects to the screen

```js
const players = [
  {
    _id: '1',
    name: 'Manny',
    score: 0
  },
  {
    _id: '2',
    name: 'Moe',
    score: 0
  },
  {
    _id: '3',
    name: 'Jack',
    score: 0
  }
];
```

And we create a new function and plop in our existing array and return it, then call that function from inside our JSX

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

const players = [
  {
    _id: '1',
    name: 'Manny',
    score: 0
  },
  {
    _id: '2',
    name: 'Moe',
    score: 0
  },
  {
    _id: '3',
    name: 'Jack',
    score: 0
  }
];

const renderPlayers = function() {
   return [<p key="1">1</p>, <p key="2">2</p>];
}

Meteor.startup(function() {
  let title = 'Score Keep';
  let name = 'PEH2'
  let jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
       {renderPlayers()}
     </div>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
});
```

This works as it did before but now we have the benefit of a reusable function. I can pass in our `players` list and I can take that in as an argument of `renderPlayers`

**note** We should give the `players` variable and the argument name `playersList` different names to avoid confusion

```
const renderPlayers = function(playersList) {
   return [<p key="1">1</p>, <p key="2">2</p>];
}

Meteor.startup(function() {
  let title = 'Score Keep';
  let name = 'PEH2'
  let jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
       {renderPlayers(players)}
     </div>
  );
```

### How do we take the array of objects and get an array of JSX?
Use the Array `.map` function

#### Learning how to use `.map()`
`client/main.js`

```
const renderPlayers = function(playersList) {
   let numbers = [{val: 1}, {val: 2}, {val: 3}];

   let newNumbers = numbers.map(function(number) {
    return number.val - 1;
   });
   console.log(newNumbers);
}
```

This will give us an array of numbers `[0, 1, 2]` (_not objects_) and this is because of how we used `.map()`

* We take the object and we return whatever we want to replace that object with (_in the above case we got the individual number and subtracted 1_)
* We could have returned an object to keep an array of objects or we could return some JSX

```
const renderPlayers = function(playersList) {
   let numbers = [{val: 1}, {val: 2}, {val: 3}];

   let newNumbers = numbers.map(function(number) {
    return <p key={number.val}>{number.val}</p>
   });
   console.log(newNumbers);
}
```

This give us an array of JSX

![jsx array](https://i.imgur.com/LQ1BDh0.png)

The reason that are object is that is what happens behind the scenes (_as we saw with the babel **repl**_)

### What is a `repl`?
In short, it starts an interactive console where you can type in commands and immediately see the result of these commands. [This babel site is a repl](https://babeljs.io/)

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

const players = [
  {
    _id: '1',
    name: 'Manny',
    score: 0
  },
  {
    _id: '2',
    name: 'Moe',
    score: 0
  },
  {
    _id: '3',
    name: 'Jack',
    score: 0
  }
];

const renderPlayers = function(playersList) {
   let numbers = [{val: 1}, {val: 2}, {val: 3}];

   return numbers.map(function(number) {
    return <p key={number.val}>{number.val}</p>
   });
}

Meteor.startup(function() {
  let title = 'Score Keep';
  let name = 'PEH2'
  let jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
       {renderPlayers(players)}
     </div>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
});
```

Now if you add to our `numbers` array of objects like `let numbers = [{val: 9}, {val: 2}, {val: 3}, {val: 4}];`, it will dynamically update our app on the screen

## Exercise:
[Make your screen look like this](https://i.imgur.com/b77qGCu.png) by using our `players` object inside our `renderPlayers()` function

## Solution:
```
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

const players = [
  {
    _id: '1',
    name: 'Manny',
    score: 10
  },
  {
    _id: '2',
    name: 'Moe',
    score: -10
  },
  {
    _id: '3',
    name: 'Jack',
    score: -1
  }
];

const renderPlayers = function(playersList) {
   return playersList.map(function(player) {
    return <p key={player._id}>{player.name} has {player.score} point(s)</p>
   });
}

Meteor.startup(function() {
  let title = 'Score Keep';
  let name = 'PEH2'
  let jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
       {renderPlayers(players)}
     </div>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
});
```

## Review
* We can call functions inside of JSX and whatever gets returned will be used
* We can use an array of JSX to print multiple elements
    - We took an array of objects and used it to convert to an array of expressions and all of those get rendered to the screen which creates a dynamic list

### Use conditional logic to dynamically output `points` or `point` depending on single or plural number of points

```
const renderPlayers = function(playersList) {
   return playersList.map(function(player) {
    return <p key={player._id}>{player.name} has {player.score} {(player.score === 1 || player.score === -1) ? 'point' : 'points'}.</p>
   });
}
```

## Next Up - Create a MongoDB collection 
