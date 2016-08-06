# DRY code

* we are using multiple player objects

## Setup Phase
The part of our tests where we set up conditions for testing

### Mocha breaks the setup process into 2 processes
1. before
    - the stuff we set up before the **entire** series of tests
2. before each
    - the stuff we set up before each **individual** test

because checkForShip() won't change the player object in any way, it's safe to set up a single player object once with the information we need and then use that for all of the check for ship tests

**ship-test.js**

```js
var expect = require( 'chai' ).expect;

describe( 'checkForShip', function() {
  var checkForShip = require( '../game-logic/ship-methods' ).checkForShip;
  var player;

  before( function() {
    player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ]
          }
        ]
    };
    });
    // more code
    });
```

* now before anything else happens in this test suite mocha will make a player object for all of the specs below to use
* so we can delete the player object from the: 2nd spec
* but our 3rd spec needs more complexity for our test suite to work, we can't just use the same player object we created in the `before`
    - our ship needs a second location
    - and the 4ths spec needs a bunch of ship locations
* so we need to grab the most complex player object in our suite and use that in our before block
    - grab that complex ship and paste into the before block

replace our before block with:

```js
before( function() {
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
  } );
```

No we can delete all the player objects in the ship specs

```js
var expect = require( 'chai' ).expect;

describe( 'checkForShip', function() {
  var checkForShip = require( '../game-logic/ship-methods' ).checkForShip;
  var player;

  before( function() {
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
  } );

  it( 'should correctly report no ship at a given player\' coordinate', function() {
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );

  it( 'should correctly report a ship located at the given coordinates', function() {
    expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal( player.ships[ 0 ] );
  } );

  it( 'should handle ships located at more than one coordinate', function() {
    expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 0, 1 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );

  it( 'should handle checking multiple ships', function() {
    expect( checkForShip( player, [ 0, 0 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 0, 1 ] ) ).to.deep.equal( player.ships[ 0 ] );
    expect( checkForShip( player, [ 1, 0 ] ) ).to.deep.equal( player.ships[ 1 ] );
    expect( checkForShip( player, [ 1, 1 ] ) ).to.deep.equal( player.ships[ 1 ] );
    expect( checkForShip( player, [ 2, 3 ] ) ).to.deep.equal( player.ships[ 2 ] );
    expect( checkForShip( player, [ 9, 9 ] ) ).to.be.false;
  } );
} );
```

Run tests in console `$ npm test`

And all tests should still pass (but with a lot less code)

## fire function
* Not same as `checkShip()` function 
* `fire()` is not a pure function
* It has side effects in other parts of our codebase
* `fire()` changes the damage array of the ship object its given by calling `damageShip()`
    - so if we ran it over and over, we would just keep pushing damage records onto the same ship
    - so that means our test specs will be altering the application state from one to another which will mess up our expectations and maybe make them fail even when our function works
    - so instead of setting up a **ship** once in a before block (like we did previously), we'll reset the **ship** for each spec
        + we'll do this usine a `beforeEach()` block
        + `beforeEach()` works just like before, the only difference is it will run the function before each spec instead of just once at the start of the whole suite

```js
beforeEach( function() {
    player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ],
          damage: []
          }
        ]
    };
  } );
```

The player object will be overwritten before each test so no matter what changes happen inside of the first spec, it will all be erased and set back up new for the next spec
* this makes our application state predictable between specs even when the function we're testing has side effectsa

```
describe( 'fire', function() {
  var fire = require( '../game-logic/ship-methods.js' ).fire;
  var player;

  beforeEach( function() {
    player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ],
          damage: []
          }
        ]
    };
  } );

  it( 'should record damage on the given players ship at a given coordinate', function() {
    fire( player, [ 0, 0 ] );
    expect( player.ships[ 0 ].damage[ 0 ] ).to.deep.equal( [ 0, 0 ] );
  } );

  it( 'should NOT record damage if ther is no ship at my coordinates', function() {
    fire( player, [ 9, 9 ] );
    expect( player.ships[ 0 ].damage ).to.be.empty;
  } );
} );
```

Test again and make sure it still passes all the tests.

Now our tests are more readable.

## Teardown Phase
Making tests easier with fixtures
* mocha does this so we can remove unwanted variables
* sets your system back to where it started
* need Teardowns more for mock databases or they interact with the DOM
    - say you add fake data to a database or add fake users
        + you want to remove all of these when you go to production
        + we don't need to test for external libraries functions 
        + we should avoid passing state between our test suites (adds unecessary complexity and room for error)
        + our tests don't need to be clever or do anything fancy

## after() and afterEach() hooks
Instead of destroying object, use these
* print a message in our message output

after() - takes one function that will run at the very end of the test suite when every spec has finished

```js
beforeEach( function() {
    player = {
      ships: [
        {
          locations: [ [ 0, 0 ] ],
          damage: []
          }
        ]
    };
  } );

  after( function() {
    console.log( 'entire test suite completed' );
  } );

  afterEach( function() {
    console.log( 'one unit test completed' );
  } );

```

Output run $ npm test

![Output in console](https://i.imgur.com/7UPMDrm.png)
