# Outline Suite

If you don't know how you exactly would code an app but have a general idea of how you would go about it, then you can outline your testing with chai

**test/game-test.js**

```js
var expect = require( 'chai' ).expect;

describe( 'GAME INSTANCE FUNCTIONS', function() {
  describe( 'checkGameStatus', function() {
    it( 'should tell me when the game is over' );
  } );
} );
```

We use it with just a string and when we run this we will see it tells us we have 1 pending

![chai pending](https://i.imgur.com/v7Hatl2.png)

It's like having an outline for your outline and communicates what needs to be completed.

## Make specs as pending by putting `x` before them

```
xdescribe( 'GAME INSTANCE FUNCTIONS', function() {
  describe( 'checkGameStatus', function() {
    it( 'should tell me when the game is over' );
  } );
  it('some other stuff', function() {});
} );
```

* everthing inside this describe block will be marked as `pending`
* either way works better, you choose what works better for you

##Watching Test Files 
`$ npm test`
Writing this every time is a pain

**test/game-test.js**

```js
var expect = require( 'chai' ).expect;

describe( 'GAME INSTANCE FUNCTIONS', function() {
  describe( 'checkGameStatus', function() {
    var checkGameStatus = require( '../game-logic/game-instance.js' ).checkGameStatus;
    it( 'should tell me when the game is over', function() {
      var players = [
        {
          ships: [
            {
              locations: [ [ 0, 0 ] ],
              damage: [ [ 0, 0 ] ]
         }
        ]
      }
    ];
      var actual = checkGameStatus( players );
      expect( actual ).to.be.false;
    } );
  } );
} );
```

**game-logic/game-instance.js**

```js
function checkGameStatus( players ) {

}

module.exports.checkGameStatus = checkGameStatus;
```

when I'm building the checkGameStatus() function, mocha will run a test every time I make a change to this function.

$ npm test (AssertionError: expected undefined to be false)

$ mocha --watch ./test/game-test.js ./game-logic/game-instance.js

* now mocha will run a test every time I make a change to the file

Now if you modify the watched function, you'll see in the console right away that the test is passing

```js
function checkGameStatus( players ) {
  return false;
}
```

Watch all files

update package.json

```js
"scripts": {
    "test": "mocha",
    "test:watch": "mocha --watch ./test ./"
  },
```

`$ npm run test: watch`

* mocha will run all your tests
* and watches for any file changes in your project
* ctrl + c to stop running watch

if you have a lot of tests you might not want to run them all and adapt it to the ones you want to watch

update **package.json**

```js
"scripts": {
    "test": "mocha",
    "test:watch": "mocha --watch ./test ./",
    "test:watch:playerMethods": "mocha --watch ./test/player-test.js ./game-logic/player-methods.js"
  },
```

[Mocha report docs](https://mochajs.org/#reporters)

## Mocks and Stubs
Mocks and stubs are special kinds of "fake" helpers for our test suites; they fill in the gaps for our test unit’s dependencies.

**test/game-test.js**

```js
describe( 'takeTurn', function() {
    var takeTurn = require( '../game-logic/game-instance.js' ).takeTurn;
    var guess, player;

    beforeEach( function() {
      guess = function() {
        return [ 0, 0 ];
      };
      player = {
        ships: [
          {
            locations: [ [ 0, 0 ] ],
            damage: []
          }
        ]
      };
    } );
    it( 'should return false if the game ends', function() {
      var actual = takeTurn( player, guess );
      expect( actual ).to.be.false;
    } );
  } );
```

$ npm test

Output: TypeError: takeTurn is not a function

[When and Why to use Mocks and Stubs](http://sinonjs.org/docs/)
[Sinon.js](http://sinonjs.org/)

## Testing Asynchronous Code

update game-logic/player-methods.js

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
  if ( !direction ) throw Error( 'You left out the direction! I need that for math!' );
  var proposedLocations = [];
  var previousLocation,
    rowNumber,
    columnNumber;

  for ( var i = 0; i < ship.size; i++ ) {
    previousLocation = proposedLocations[ i - 1 ] || [];
    rowNumber = previousLocation[ 0 ];
    columnNumber = previousLocation[ 1 ];

    proposedLocations[ i ] = ( i === 0 ) ? startingCoordinates : ( direction === 'horizontal' ) ? [ rowNumber, ++columnNumber ] : [ ++rowNumber, columnNumber ];
  }

  if ( validateLocations( player, proposedLocations ) ) {
    ship.locations = proposedLocations;
  } else {
    return false;
  }
}

function getRandomCoordinates() {
  var x = Math.floor( Math.random() * 9 );
  var y = Math.floor( Math.random() * 9 );
  return [ x, y ];
}

function getRandomDirection() {
  return Math.random() > 0.5 ? 'horizontal' : 'vertical';
}


//fire(player, getRandomCoordinates());
//placeShip(computerPlayer, computerPlayer.ship[0], getRandomCoordinates(), getRandomDirection());

module.exports = {
  placeShip: placeShip,
  validateLocations: validateLocations,
  validateLocation: validateLocation
};
```

## done

```js
describe( 'saveGame', function() {
    it( 'should update save status', function( done ) {
      var status = 'game not saved...';

      saveGame( function() {
        status = 'game saved!';
        expect( status ).to.equal( 'game saved!' );
      } );
    } );
  } );
```

we get an error that we can fix with this:

```js
describe( 'saveGame', function() {
    it( 'should update save status', function( done ) {
      var status = 'game not saved...';

      saveGame( function() {
        status = 'game saved!';
        expect( status ).to.equal( 'game saved!' );
        done();
      } );
    } );
  } );
```

[mocha and writing asynchronous code](https://mochajs.org/#asynchronous-code)

* Mocha allows us to say that a test spec or test suite is "asynchronous"
* Passing an argument to the internal function of a `describe()` or `it()` block will tell Mocha to wait on running our expectations until we specifically say so
* Passing the `done` argument to our test spec tells Mocha that it’s supposed to wait for our instructions before checking our expectations.
* Mocha will wait for `done()` to fire before checking the expectations

A function that only returns some expected value, standing in for a real function somewhere else is called a **stub**

