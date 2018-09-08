# Add react pose to home page

## Install react-pose
`$ cd client`

`$ npm i react-pose`

## We'll need state ----> convert to class
* We need to convert our home page form SFC to a CBC

`App.js`

* Make the necessary changes to make your `App.js` look like the code below

```
import React, { Component } from 'react';
import { Query } from 'react-apollo';

import './App.css';

// components
import GenealogyItem from './Genealogy/GenealogyItem';

import { GET_ALL_GENEALOGIES } from '../queries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="main-title">
          Find Genealogies you <strong>Love</strong>
        </h1>
        <Query query={GET_ALL_GENEALOGIES}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return (
              <ul className="cards">
                {data.getAllGenealogies.map(genealogy => (
                  <GenealogyItem key={genealogy._id} {...genealogy} />
                ))}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default App;
```

## Import react-pose

`App.js`

```
import React, { Component } from 'react';
import pose from 'react-pose';

// MORE CODE
```

## Add our special HTML element that we want to put the animation on
* We'll animate our `ul` so we can animate all our cards

`App.js`

```
// MORE CODE

const GenealogyList = pose.ul({} );

class App extends Component {

// MORE CODE
```

```
// MORE CODE

return (
              <GenealogyList className="cards">
                {data.getAllGenealogies.map(genealogy => (
                  <GenealogyItem key={genealogy._id} {...genealogy} />
                ))}
              </GenealogyList>
            );

// MORE CODE
```

## Add our state
`App.js`

```
// MORE CODE

const GenealogyList = pose.ul({});

class App extends Component {
  state = {
    on: false,
  };

  componentDidMount = () => {
    setTimeout(this.func, 200);
  };

  func = () => {
    this.setState({ on: !this.state.on });
  };

// MORE CODE
```

## sliding in
* Since our animation will involve sliding in let's call our animaton function `slideIn`

```
// MORE CODE

componentDidMount = () => {
  setTimeout(this.slideIn, 200);
};

slideIn = () => {
  this.setState({ on: !this.state.on });
};

// MORE CODE
```

### Add our ternary

```
// MORE CODE

if (error) return <div>Error</div>;
// console.log(data);

const { on } = this.state;

return (
  <GenealogyList className="cards"
   pose={on ? '???' : '???'}>

// MORE CODE
```

Those `???` will correspond how we name our different properties within our config object

```
// MORE CODE

const GenealogyList = pose.ul({
  shown: {
    x: '0%',
  },
  hidden: {
    x: '-100%',
  },
});

// MORE CODE
```

Now we use end and start here:

```
// MORE CODE

return (
              <GenealogyList className="cards" pose={on ? 'shown' : 'hidden'}>

// MORE CODE
```

## Start up your app again
* In root of app (make sure you are not inside your client folder!)
* `$ npm run dev`

## Test
* View home page and you should see a nice slide in animation

## staggerChildren
```
// MORE CODE

const GenealogyList = pose.ul({
  shown: {
    x: '0%',
    staggerChildren: 100,
  },
  hidden: {
    x: '-100%',
  },
});

// MORE CODE
```

## Now we want to animate all the children
* The children are inside `GenealogyItem.js`

## What special element do you want to animate?
`GenealogyItem.js`

```
 // MORE CODE
import React from 'react';
import { Link } from 'react-router-dom';
import pose from 'react-pose';

const GenealogyItem = pose.li({

});
 // MORE CODE
```

* We have a name collision so now we'll just use `export default`

```
// MORE CODE

const GenealogyItem = pose.li({

});

export default ({ _id, firstName, lastName, imageUrl, category }) => {

// MORE CODE
```

## Rename LI to GenealogyItem

```
import React from 'react';
import { Link } from 'react-router-dom';
import pose from 'react-pose';

const GenealogyItem = pose.li({

});

export default ({ _id, firstName, lastName, imageUrl, category }) => {
  return (
    <GenealogyItem
      style={{
        background: `url(${imageUrl}) center center / cover no-repeat`,
      }}
      className="card"
    >
      <span className={category}>{category}</span>
      <div className="card-text">
        <Link to={`/genealogy/${_id}`}>
          <h4>
            Name: {firstName} {lastName}
          </h4>
        </Link>
      </div>
    </GenealogyItem>
  );
};
```

* We removed the `export default GenealogyItem` at bottom of this file

## Test
* Now we slide in and stagger the opacity of the children


