# Battleship Game Engine

## Battleship set up
* two grids, one for each player
* each player secretly places their 5 ships on their grid
* players taking turns guessing where ships are located
* if a player calls out a hit, he is notified he had a hit
* if a ship's spots for hit are full, the ship is sunk
* the first player to sing all of their opponent's 5 ships, wins

## Battleship game engine
* Current player and winner
* Number of ships
* Position of ships
* Status as active or sunk

### Naming convention
name-of-file_test.js so they can be easily found later

`$ touch test/ship-test.js`

**test/ship_test.js**

```js
var expect = require( 'chai' ).expect;

describe( 'checkForShip', function() {
  var checkForShip = require( '../game-logic/ship-methods.js' ).checkForShip;

  it( 'should correctly report no ship at a given player\' coordinate', function() {

  } );
} );
```

Run `$ npm test` and you will get an error because we pointed to asset on a path that does not exist `../game-logic/ship-methods.js`

mkdir /game-logic
touch /game-logic/ship-methods.js

Now let's write some code to help us get over our import error

Run `$ npm test`

And we get passing tests!

![two passing tests](https://i.imgur.com/iQmqa0P.png)

But we have not set up any expectations
But at least we know our code is set up correctly and ready to go (this was a sanity check and they are helpful)

**test/ship-test.js**

```js
var expect = require( 'chai' ).expect;

describe( 'checkForShip', function() {
  var checkForShip = require( '../game-logic/ship-methods' ).checkForShip;

  it( 'should correctly report no ship at a given player\' coordinate', function() {
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );
} );
```

We run this and get an error:

![no parameters error](https://i.imgur.com/fkUFrNX.png)

* we will represent a player as an object
    - each player will have a set of ships

```js
var expect = require( 'chai' ).expect;

describe( 'checkForShip', function() {
  var checkForShip = require( '../game-logic/ship-methods' ).checkForShip;

  it( 'should correctly report no ship at a given player\' coordinate', function() {

    player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ]
          }
        ]
    };


    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );
} );
```

We run this and we get an AssertionError: `expected undefined to be false`
* The reason is our real checkForShip() function doesn't return anything yet

* the first member of an empty array is undefined which will fail conditional
    - which is perfect which means we only need to save the first element of the filtered array and use that as our conditional check
    - if our array is empty it means there were not any matches to our given coordinates and no ship is present

```js
// accepts player and coordinates parameters
function checkForShip( player, coordinates ) {
  var shipPresent, ship;

  // loop through all ships in ships array
  // and check each one with the coordinates we are given in the function
  for ( var i = 0; i < player.ships.length; i++ ) {
    // save current ship inside the loop
    // to make things easier to read
    ship = player.ships[ i ];

    // filter the current ships location array down
    // by comparing each value to the given coordinates
    shipPresent = ship.locations.filter( function( actualCoordinate ) {
      // this will filter the current ships location array for matches against
      // a given coordinate
      // both the x and y numbers should match
      // will return an array containing only coordinates that are a match
      // if nothing is a match the array will be empty
      return ( actualCoordinate[ 0 ] === coordinates[ 0 ] ) && ( actualCoordinate[ 1 ] === coordinates[ 1 ] );
    } )[ 0 ];

    // check if a ship is present at a given coordinate
    if ( !shipPresent ) {
      return false;
    }
  }
}

module.exports.checkForShip = checkForShip;
```

Run `$ npm test`

And you should see we get all green checks because our tests passed

## So far
Test work but only work when we report a miss
It Tells us when no ship is located at our given coordinates
Does not tell us when a ship is located at our given coordinates
No. So let's run a new spec that will prove it

**test/ship-test.js**

```js
var expect = require( 'chai' ).expect;

describe( 'checkForShip', function() {
  var checkForShip = require( '../game-logic/ship-methods' ).checkForShip;

  it( 'should correctly report no ship at a given player\' coordinate', function() {

    player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ]
          }
        ]
    };

    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );

  it( 'should correctly report a ship located at the given coordinates', function() {

    player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ]
          }
        ]
    };

    expect( checkForShip( player, [ 0, 0 ] ) ).to.be.true;
  } );
} );
```

$ npm test

AssertionError: expected undefined to be true

To get it to pass change:

game-logic/ship-methods.js

```js
// check if a ship is present at a given coordinate
    if ( !shipPresent ) {
      return false;
    } else { // ADD THIS ELSE
      return true;
    }
```

Now it passes our 3 tests

But we only checked so far for a single ship using a single location

**test/ship-test.js**

```js
it( 'should handle ships located at more than one coordinate', function() {

    player = {
      ships: [
        {
          locations: [ [ 0, 0 ], [0, 1] ]
          }
        ]
    };

    expect( checkForShip( player, [ 0, 0 ] ) ).to.be.true;
    expect( checkForShip( player, [ 0, 1 ] ) ).to.be.true;
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );
```

* normally only 1 expect but this exception to the rule is ok

**test/ship-test.js**

```js
it( 'should handle checking multiple ships', function() {

    player = {
      ships: [
        {
          locations: [ [ 0, 0 ], [ 0, 1 ] ]
        },
        {
          locations: [ [ 1, 0 ], [ 1, 1 ] ]
        }
      ]
    };

    expect( checkForShip( player, [ 0, 0 ] ) ).to.be.true;
    expect( checkForShip( player, [ 0, 1 ] ) ).to.be.true;
    expect( checkForShip( player, [ 1, 0 ] ) ).to.be.true;
    expect( checkForShip( player, [ 1, 1 ] ) ).to.be.true;
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );
```

$ npm test

We fail the test because our logic was incorrect

Change this in **test/ship-methods.js**:

```js
 // check if a ship is present at a given coordinate
    if ( !shipPresent ) {
      return false;
    } else {
      return true;
    }
```

to this (just change the code in the if statement and add the last return false)

```js
function checkForShip() {
  // CODE HERE
  for (  ) {
    // CODE HERE
    if ( shipPresent ) {
      return true;
    } 
  }

  return false;
}

// code
```

$ npm test

We pass all 5 tests

