# Mocha and Chai

Chai is an expectation library
We wrote our test code in our production code

## The Professional Way to write test code
Put your code in a file that is separate from your app code
* This makes unit testing much different than logging to the console
* Tests describe expected behaviors
* Unit Tests focus on the concrete output of functions without worrying how the function does it

## Battleship Test
* Game to build
* Run automatically any time we make a change

### Add npm to your project
```
$ npm init -y
```

## Mocha

### Install [Mocha](https://mochajs.org/) and Chai

```
$ npm install --save-dev mocha chai
```

touch /main-test.js

`$ mocha main-test.js`

If you get this error

![mocha error](https://i.imgur.com/rYR5HMt.png)

Install mocha globally

`$ npm install --global mocha`

Then run

`$ mocha main-test.js`

Output:   `0 passing (2ms)`

We have no code yet but we passed all our test (there were none to pass)

**Question:** Do we have to run Mocha for each file indivually? Because if we have 100 files, this mocha thing can be pretty tedius.

## General Structure of Test Files
* We want them to be easy to run and write
* Because we installed mocha with npm we can have npm run all of our tests automatically

Name your test directory `test` (spell this exactly `test`)
* has to be located at the same level of our project as package.json

## All tests in one directory benefits
* Easy to import code from other files
* Easy to organize our tests
* Easy to find a test file after seeing its output in the console

If you have mocha installed, when you create your package.json file it will add a cool line:

Delete package.json and recreate it.

**package.json**

```json
{
  "name": "battleship-engine",
  "version": "1.0.0",
  "description": "",
  "main": "main_test.js",
  "dependencies": {},
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^3.0.0"
  },
  "scripts": {
    "test": "mocha"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Because mocha was instead this object was added to package.json

```json
"scripts": {
    "test": "mocha"
  }
```

* you can also manually change the above fragment of code by hand

## Review

* It’s important that the test directory is specifically named `test` (not "tests" or "Test"), and it has to be located at the same level of your project as the **package.json** file
* With your test directory in place, you simply run `$ npm test`, and Mocha _will automatically run every test in the test directory_

```
$ mkdir `test`
$ mv main-test.js test
$ npm test
# or you can just run
$ mocha
```

If you name the folder something other than `test` you will get an error like this (in this example I renamed `test` as `tests`). It is a common developer mistake

![wrong named test folder](https://i.imgur.com/p4N4997.png)

## Test Suite
A block of unit tests that are all closely related because they test the same function or they test similar parts of a code base

* introduce a Test suite in mocha with describe()
    - takes 2 args
        + string
            * describes what the suite will cover
            * common to do a simple sanity check in beginning to make sure it 
            * is working
        + another function
            * just an anonymous function that acts as a wrapper for all our individual unit tests that we will include with the suite
* spec - each individual unit test in a test suite is sometimes referred to as a `spec`
* it() - a function in mocha that makes it easy to add specs
    - first arg
        + behavior spec is responsible for
    - second arg
        + function
            * should contain all of our expectations
* we require chai so we can write expectations inside mocha
* `expect(true).to.be.ok;`
    - chai method to see if value is **truthy**
        + any value besides `undefined`, NaN, false, empty string, 0 (zero)
            * aka - any value that would satisfy an if condition

```js
var expect = require( 'chai' ).expect;

// Test suite
describe( 'Mocha', function() {
  // Test spec (unit test)
  it( 'should run our tests using npm', function() {
    expect( true ).to.be.ok;
  } );
} );
```

`$ npm test`

![Output](https://i.imgur.com/Zk6GVNg.png)

What is a sanity check?
A trivial function or test that proves we set things up correctly

## Add another .describe

**test/ship-test.js**

```js
describe( 'damageShip', function() {
  var damageShip = require( '../game-logic/ship-methods.js' ).damageShip;

  it( 'should register damage on a given ship at a given location', function() {
    var ship = {
      locations: [ [ 0, 0 ] ],
      damage: []
    };

    damageShip( ship, [ 0, 0 ] );

       expect( ship.damage ).to.not.be.empty;
  } );
} );
```

## run `$ npm test`
1 failing; TypeError: damageShip is not a function

## Add to game logic

**game-logic/ship-method.js**

```js
function damageShip( ship, coordinates ) {

}

module.exports.checkForShip = checkForShip;
module.exports.damageShip = damageShip;
```

**note**: remember that without the `module.exports` statements, the test files won't have access to the functions we wrote and they'll fail when we run the tests

## Run $ npm test

Now we get: AssertionError: expected [] not to be empty

### Alter the damageShip function

```js
function damageShip( ship, coordinates ) {
  ship.damage.push( coordinates );
}
```

And now our test passes!

* [chai bdd](http://chaijs.com/api/bdd/)
* .not
* `.empty`
    - Chai's **.empty** method checks for empty objects, arrays, or strings
    - **.empty** makes it easy to write expectations without worrying about how the real code will work
* .deep
    - The .deep method allows you to make deep equality comparisons
    - deeply equal values
        + You call arrays that look the same “deeply equal”, because their “deep” internal values are equal

Add this line in **ship-test.js**

```js
expect( ship.damage ).to.not.be.empty;
expect( ship.damage ).to.include( [ 0, 0 ] ); // ADD THIS LINE
```

Run $ node test

AssertionError: expected [ [ 0, 0 ] ] to include [ 0, 0 ]

Modify this line:

```js
expect( ship.damage ).to.not.be.empty;
expect( ship.damage[ 0 ] ).to.deep.equal( [ 0, 0 ] ); // MODIFY THIS LINE
```

ship-test.js

```js
describe( 'fire', function() {
  var fire = require( '../game-logic/ship-methods.js' ).fire;

  it( 'should record damage on the given players ship at a given coordinate', function() {
    var player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ],
          damage: []
          }
        ]
    };

    fire( player, [ 0, 0 ] );

    expect( player.ships[ 0 ].damage[ 0 ] ).to.deep.equal( [ 0, 0 ] );
  } );
} );
```

$ node test

1 failing: TypeError: fire is not a function

ship-methods.js

```js
function fire( player, coordinates ) {

}

module.exports.fire = fire;
```

AssertionError: expected undefined to deeply equal [0, 0]

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
    if ( shipPresent ) {
      return ship;
    }
  }

  return false;
}

function damageShip( ship, coordinates ) {
  ship.damage.push( coordinates );
}

function fire( player, coordinates ) {
  var ship = checkForShip( player, coordinates );

  if ( ship ) {
    damageShip( ship, coordinates );
  }
}

module.exports.checkForShip = checkForShip;
module.exports.damageShip = damageShip;
module.exports.fire = fire;
```

lots of broken code

fixes the fails

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

    expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal( player.ships[ 0 ] );
  } );

  it( 'should handle ships located at more than one coordinate', function() {

    player = {
      ships: [
        {
          locations: [ [ 0, 0 ], [ 0, 1 ] ]
          }
        ]
    };

    expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 0, 1 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );

  it( 'should handle checking multiple ships', function() {

    player = {
      ships: [
        {
          locations: [ [ 0, 0 ], [ 0, 1 ] ]
        },
        {
          locations: [ [ 1, 0 ], [ 1, 1 ] ]
        },
        {
          locations: [ [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ]
        }
      ]
    };

    expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 0, 1 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 1, 0 ] ) ).to.deep.equal( player.ships[ 1 ] );
    expect( checkForShip( player, [ 1, 1 ] ) ).to.deep.equal( player.ships[ 1 ] );
    expect( checkForShip( player, [ 2, 3 ] ) ).to.deep.equal( player.ships[ 2 ] );
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );
} );

describe( 'damageShip', function() {
  var damageShip = require( '../game-logic/ship-methods.js' ).damageShip;

  it( 'should register damage on a given ship at a given location', function() {
    var ship = {
      locations: [ [ 0, 0 ] ],
      damage: []
    };

    damageShip( ship, [ 0, 0 ] );

    expect( ship.damage ).to.not.be.empty;
    expect( ship.damage[ 0 ] ).to.deep.equal( [ 0, 0 ] );
  } );
} );

describe( 'fire', function() {
  var fire = require( '../game-logic/ship-methods.js' ).fire;

  it( 'should record damage on the given players ship at a given coordinate', function() {
    var player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ],
          damage: []
          }
        ]
    };

    fire( player, [ 0, 0 ] );

    expect( player.ships[ 0 ].damage[ 0 ] ).to.deep.equal( [ 0, 0 ] );
  } );

  it( 'should NOT record damage if ther is no ship at my coordinates', function() {
    var player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ],
          damage: []
          }
        ]
    };

    fire( player, [ 9, 9 ] );

    expect( player.ships[ 0 ].damage ).to.be.empty;
  } );
} );
```

![all passing](https://i.imgur.com/oO55Yxv.png)

