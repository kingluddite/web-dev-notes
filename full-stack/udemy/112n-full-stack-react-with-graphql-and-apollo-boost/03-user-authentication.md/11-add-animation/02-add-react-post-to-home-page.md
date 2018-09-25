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
import posed from 'react-pose';

// MORE CODE
```

## Add our special HTML element that we want to put the animation on
* We'll animate our `ul` so we can animate all our cards
* We pick off the `ul` because that is where we want to target our animation
* We swap out the `ul` for our new `GenealogyList` pose component

`App.js`

```
// MORE CODE

const GenealogyList = posed.ul({} );

class App extends Component {

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

const GenealogyList = posed.ul({}); // add this

class App extends Component {
  state = { // add the state
    on: false,
  };

  // add this so that it happens as soon as component is rendered
  componentDidMount = () => { 
    setTimeout(this.func, 200);
  };

  func = () => {
    this.setState({ on: !this.state.on });
  };

// MORE CODE
```

## sliding in
* Since our animation will involve sliding in let's call our animation function `slideIn`

`App.js`

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

`App.js`

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

* Those `???` will correspond how we name our different properties within our config object

### CAUTION - pose vs posed
* The library is called react-pose but our variable is `posed` but the attribute when we call `GenealogyList` component above is `pose` (This tripped me up and I spent 30 minutes trying to figure out what the heck I did wrong)

```
// MORE CODE

const GenealogyList = posed.ul({
  shown: {
    x: '0%',
  },
  hidden: {
    x: '-100%',
  },
});

// MORE CODE
```

* Now we use `end` and `start` here:

```
// MORE CODE

return (
  <GenealogyList className="cards" pose={on ? 'shown' : 'hidden'}>

// MORE CODE
```

## Start up your app again
* In root of app (make sure you are not inside your `client` folder!)

`$ npm run dev`

## Test
* View home page and you should see a nice slide in animation

## staggerChildren
* Traditionally, coordinating animation across multiple children has been an involved process (Especially with React)
    - With Pose, it’s as simple as animating just one
* Rather than animating all the children in at once, it’s possible to stagger them in individually
* The `staggerChildren` prop can be used to determine the delay between each one, starting from after the `delayChildren` duration
* [docs](https://popmotion.io/pose/learn/animating-children/)

```
// MORE CODE

const GenealogyList = posed.ul({
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
* The `li`
* So we need to jump into the `GenealogyItem` component

`GenealogyItem.js`

```
 // MORE CODE
import React from 'react';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const GenealogyItem = posed.li({

});
 // MORE CODE
```

## Rename LI to GenealogyLi
* Convert SFC to class
* I want to avoid a name collision

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const GenealogyLi = posed.li({
  shown: { opacity: 1 },
  hidden: { opacity: 0 },
});

class GenealogyItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  };

  render() {
    const { _id, firstName, lastName, imageUrl, category } = this.props;
    return (
      <GenealogyLi
        style={{
          background: `url(${imageUrl}) center center / cover no-repeat`,
        }}
        className="card"
      >
        <span className={category}>{category}</span>
        <div className="card-text">
          <Link to={`/genealogy/${_id}`}>
            <h4>{firstName} {lastName}</h4>
          </Link>
        </div>
      </SongLi>
    );
  }
}

export default GenealogyItem;
```

## Test
* Now we slide in and stagger the opacity of the children


