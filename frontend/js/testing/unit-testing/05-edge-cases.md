# Covering Edge Cases

* Write tests retroactively
* Only focus on what a function does
* Write simpler expectations first
* Get simple tests to pass before writing more involved ones

# Edge Case
Radical situation your function might end up in but not normally how your function would work

Email validator works when user types in valid email but what happens if they type in number?
* we are assuming our functions get the right amount of input
* what if someone tries to use our function in a way we didn't intend

rules of game
* players need a way to put their ships on the board
* for each ship they should be able to name a starting square and a direction
* and save the ships location for the game

**test/player-test.js**

```js
var expect = require( 'chai' ).expect;

describe( 'PLAYER METHODS', function() {
  describe( 'validateLocation', function() {
    var validateLocation = require( '../game-logic/player-methods.js' ).validateLocation;
    var player;

    beforeEach( function() {
      player = {
        ships: [
          {
            locations: [ [ 9, 9 ] ]
          }
        ]
      };
    } );
    it( 'should confirm valid for unoccupied locations in range', function() {
      var location = [ 0, 0 ];
      var actual = validateLocation( player, location );

      expect( actual ).to.be.ok;
    } );

    it( 'should confirm invalid for occupied locations in range', function() {
      var location = [ 9, 9 ];
      var actual = validateLocation( player, location );

      expect( actual ).to.be.false;
    } );

    it( 'should confirm invalid for unoccupied locations OUT of range', function() {
      var locationHigh = [ 10, 10 ];
      var locationLow = [ -1, -1 ];

      expect( validateLocation( player, locationHigh ) ).to.be.false;
      expect( validateLocation( player, locationLow ) ).to.be.false;
    } );
  } );

  describe( 'validateLocations', function() {
    var validateLocations = require( '../game-logic/player-methods.js' ).validateLocations;
    var player;

    beforeEach( function() {
      player = {
        ships: [
          {
            locations: [ [ 0, 0 ] ]
          }
        ]
      };
    } );

    it( 'should correctly report a list of unoccupied locations is valid', function() {
      var locations = [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ] ];
      expect( validateLocations( player, locations ) ).to.be.ok;
    } );

    it( 'should correctly report a problem if any location in the list is invalid', function() {
      var locations = [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 10, 10 ] ];
      expect( validateLocations( player, locations ) ).to.be.false;

      locations = [ [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 0, 0 ] ];
      expect( validateLocations( player, locations ) ).to.be.false;
    } );
  } );

  describe( 'placeShip', function() {
    var placeShip = require( '../game-logic/player-methods.js' ).placeShip;
    var player;

    beforeEach( function() {
      player = {
        ships: [
          {
            size: 1,
            locations: []
      },
          {
            size: 2,
            locations: [ [ 1, 0 ], [ 1, 1 ] ]
      }
      ]
      };
    } );

    it( 'should update a ship with a valid starting location', function() {
      var ship = player.ships[ 0 ];
      var coordinates = [ 0, 1 ];

      placeShip( player, ship, coordinates, 'horizontal' );
      var actual = ship.locations;

      expect( actual ).to.be.ok;
      expect( actual ).to.have.length( 1 );
      expect( actual[ 0 ] ).to.deep.equal( [ 0, 1 ] );
    } );
  } );
} );
```

**game-logic/player-methods.js**

```js
var checkForShip = require( './ship-methods.js' ).checkForShip;

function validateLocation( player, coordinates ) {
  var x = coordinates[ 0 ];
  var y = coordinates[ 1 ];

  var spaceAvailable = !checkForShip( player, coordinates );

  if ( ( x <= 9 && x >= 0 ) && ( y <= 9 && y >= 0 ) ) {
    return spaceAvailable; // decides whether this valid space is occupied
  } else {
    return false;
  }
}

function validateLocations( player, locations ) {
  var validated = locations.map( function( location ) {
    return validateLocation( player, location );
  } );
  return validated.indexOf( false ) === -1;
}

function placeShip( player, ship, startingCoordinates, direction ) {
  var proposedLocations = [];
  var previousLocation,
    rowNumber,
    columnNumber;

  for ( var i = 0; i < ship.size; i++ ) {
    previousLocation = proposedLocations[ i - 1 ] || [];
    rowNumber = previousLocation[ 0 ];
    columnNumber = previousLocation[ 1 ];

    proposedLocations[ i ] = ( i === 0 ) ? startingCoordinates : ( direction === 'horinzontal' ) ? [ rowNumber, ++columnNumber ] : [ ++rowNumber, columnNumber ];
  }

  if ( validateLocations( player, proposedLocations ) ) {
    ship.locations = proposedLocations;
  } else {
    return false;
  }
}

module.exports = {
  placeShip: placeShip,
  validateLocations: validateLocations,
  validateLocation: validateLocation
};

```

we can run the test only on player-test.js with:

$ mocha test/player-test.js

Output

![player output](https://i.imgur.com/ROMEgTp.png)

Dive into test code
* wrap entire test suite inside a describe() block that names the suite
    - this makes it easier to see that the tests are grouped together and all tests are printed to the console at once

Now for an edge case in case someone forgets to pass a direction parameter

add this after the last spec on player-test.js placeShip

```js
it( 'should throw an error if no direction is specified', function() {
      var ship = player.ships[ 0 ];
      var coordinates = [ 0, 1 ];

      var handler = function() {
        placeShip( player, ship, coordinates );
      };
      expect( handler ).to.throw( Error );
    } );
```

$ mocha test/player-test.js

we get an error that says the placeShip() function does not throw any errors

update the player-method.js file

```js
function placeShip( player, ship, startingCoordinates, direction ) {
  if ( !direction ) {
    throw Error( 'You left out the direction. I need that for math!' );
  }
// more code
}
```

run $ mocha test/player-test.js

And now it passes!

## Mocha's Reporter

`$ mocha --reporter min`

* show only failures

`$ mocha --reporter markdown`

writes to terminal in markdown your results

