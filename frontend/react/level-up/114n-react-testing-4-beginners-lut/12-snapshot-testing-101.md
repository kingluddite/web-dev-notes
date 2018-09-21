# Snapshot Testing 101
* Allows you to take a snapshot of your code and enables you to confirm that your code is the same as the snapshot

## Pros and cons of when to use snapshots
* imho best to do manual tests than snapshots
* Snapshots are really good to test your component to see if something has changed
* Jest makes snapshots super simple
    - We don't have to write long assertions
    - We only have to write one assertion

## container
* In Jest a `container` is an HTML element that contains all this stuff
* Let's look at it
* Open `NewMovie.js` and comment back in the `MovieForm` component
* That will remove the failed test

`NewMovie.test.js`

```
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';

// custom components
import NewMovie from './NewMovie';

afterEach(cleanup);

test('<NewMovie />', () => {
  const {
 debug, getByTestId, queryByTestId, container 
} = render(<NewMovie />);
  expect(getByTestId('page-title').textContent).toBe('New Movie');
  expect(getByTestId('movie-form')).toBeTruthy();

  console.log(container);
});
```

* That outputs a ton of DOM info about our app
* Change the last line to:

```
// MORE CODE
  console.log(container.firstChild);
});
```

* The first child of our container is a `DIV` element
* This is great because we don't want the BODY element we want the DIV that is wrapping our out component
* So we will expect that the container.first child will match the snapshot
* This will create a new folder `src/__snapshots__` which will contain a snapshot of what our DOM looks like

## The good, the bad and the ugly of snapshots
* Jest makes snapshots easy to create
* But if you go in and make a simple change than your snapshot will break
    - Say you turn an h1 into an h2, the code will break because the snapshots don't match up
    - This is not good

## Let's change our code
`NewMovie.js`

```
// MORE CODE

export class NewMovie extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="page-title">New Movie</h2>

// MORE CODE
```

* We see our snapshot failed
* We can update our shapshot if we like the change
    - You can use the `u` key to update a snapshot
    - Or you can use the Jest extension to open a dialog to let you update the snapshot by clicking the `Replace them` button

![snapshot vscode replace button](https://i.imgur.com/oDiqbZe.png)

* Update and rerun test and it will pass again

## Very easy to use
1. You just need the container.firstChild
2. Tell it to match the snapshot with expect(container.firstChild).toMatchSnapshot();
3. Jest will create the snapshot on the first run
4. Any addition run we'll have to tell it to update or else it will bug out

## Next - Test value of input is what we expect it to be
