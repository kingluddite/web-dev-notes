# Database Planning
* Each player needs
    - name
    - score
* The place they are in can be rendered on the fly
* We will need an array of objects with a name and a score

## Rendering Static Data
Type this in `client/main.js` and you see [this rendered to the screen](https://i.imgur.com/xaUbt5p.png) which means we can render a dynamic set of JSX to the screen

```
const jsx = (
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
const jsx = (
     <div>
       {/* Put new h1 here */}
       <h1>{title}</h1>
       <p>Hello {name}</p>
       <p>Second</p>
       {[<p key="1">1</p>, <p key="2">2</p>]}
     </div>
  );
```

#### Great! We know how to render an array to the screen
Now we need to render an <u>array of objects</u> to the screen

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

### Our Strategy to Accomplish rending an array of objects to the screen
1. We create a new function
2. We plop in our existing array (_And return it_)
3. Then we call that function from inside our JSX

`client/main.js`

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

* This works as it did before
* But now we have the benefit of a reusable function
* I can pass in our `players` list
  - And I can take that in as an argument of `renderPlayers`

### Stuff to Remember

* We will give the `players` variable and the argument name `playersList` different names to avoid confusion
* I want to point out that there is a difference between a **parameter** and an **argument**
* **parameter** - Is a variable in the declaration of a functi
* **argument** - Is the actual value of this variable that gets passed to the function

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
const renderPlayers = function(players) {
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

#### How do we take the array of objects and get an array of JSX?
Use the Array `.map` function

##### Learning how to use `.map()`
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
* We could have returned an object to keep an array of objects
* Or we could return some JSX

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

* The reason they are objects is that is what happens behind the scenes
    + As we saw with the babel **repl**

### What is a `repl`?
In short, it starts an interactive console where you can type in commands and immediately see the result of these commands

[This babel site is a repl](https://babeljs.io/)

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

<details>
  <summary>Solution</summary>
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
</details>

## Review
* We can call functions inside of JSX and whatever gets returned will be used
* We can use an array of JSX to print multiple elements
    - We took an array of objects and used it to convert to an array of expressions and all of those get rendered to the screen which creates a dynamic list

##### Use conditional logic to dynamically output `points` or `point` depending on single or plural number of points

```
const renderPlayers = function(playersList) {
   return playersList.map(function(player) {
    return <p key={player._id}>{player.name} has {player.score} {(player.score === 1 || player.score === -1) ? 'point' : 'points'}.</p>
   });
}
```

## Next Up - Create a MongoDB collection 
