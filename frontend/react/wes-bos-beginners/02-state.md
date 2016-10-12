# State

A representation of all of the data in our application

each component can have its own state

think of it as one object that holds all of the data related to a piece of our application or all of it 

copy current state
```
const fishes = {...this.state.fishes};
```

timestamp
* unique
* ascending

`Date.now()`

type that in your console and you will see the timestamp in milliseconds
(seconds since the Epoch)

click component in React tab
switch to console tab
```
> $r
```

That will give you access to the component in the console
Open and you can find properties and methods to that component

in console
`$r.addFish({name: 'phil', price: 1000});`

Switch to React tab
open State and you will see you added that item to your state

[item added to state](https://i.imgur.com/Ce7765E.png)

add data down the stream via `props`

example

```
import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
    render( ) {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm addFish={this.props.addFish} />
            </div>
        )
    }
}

export default Inventory;
```

setting value of attribute with variable - you don't need quotes

bad image

```
<img src="{this.props.details.image}" alt="" />
{this.props.details.name}
```

good image

```
<img src={this.props.details.image} alt="" />
{this.props.details.name}
```

object spread - takes a copy of the object's state
`const order = {...this.state.order};`

how to you pass an argument to:

```
<button disabled={!isAvailable} onClick={this.props.addToOrder}>{buttonText}</button>
```

first do this:

```
<button disabled={!isAvailable} onClick={() => this.props.addToOrder('fish-1')}>{buttonText}</button>
```

but how to make fish-1 dynamic?
* you can not access the key inside of a component
* you need to pass the key down yourself, you can't just grab the key
    - so you add a new property and (we'll call it index) and pass that
    - down

```
<button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>{buttonText}</button>
```

in App.js you need to do this

```
<ul className="list-of-fishes">
    {
      Object
      .keys(this.state.fishes)
      .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
    }
</ul>
```

And to make the value a little cleaner

```
class Fish extends React.Component {
  render() {
    // old way
    // const details = this.props.details;
    // new way
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add to Order' : 'Sold Out!';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>{buttonText}</button>
      </li>
    )
  }
}
```


what does this mean?

```
const { details, index } = this.props;
```

same thing as this

```
const details = this.props.details;
const index = this.props.index;
```

reduce (allows you to loop over an array, add up stuff and return an object or array)

[Lifecycle Methods](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods)

trick/tip name objects in console by surrounding them in `{}`

```
componentWillUpdate(nextProps, nextState) {
    console.log('Something Changed');
    console.log({nextProps, nextState}); // here!
  }
```

## How to access Local Storage
1. click on Application tab
2. open up local storage in sidebar
3. click on actual domain

local storage is a key value pair
* it is like an object but you can not nest an object inside of it
* you can only store numbers, string, booleans in value part

### How local storage works
switch to console tab of chrome dev tools

`localStorage.setItem('phil', 'trying to set a local storage item')`

then if you jump to Application tab, you'll see you just set it with `key`, `value` pair
[see, here it what you did](https://i.imgur.com/VU7SHpx.png)

And to retrieve or get that value just use

`localStorage.getItem('phil')`

![see, here is how you get it](https://i.imgur.com/adZPbU5.png)

```
whenever order state is updated, we will add it to local storage
when someone refreshed page, when loading for first time
 we will check if anything is in local storage
  if there is, we will restore our state
```

## how do I get App params down to Order?
App.js

```
<Order
  fishes={this.state.fishes}
  order={this.state.order}
  params={this.props.params}
/>
```

but when we use this

```
componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, nextState.order);
}
```

And add to order we get

![problem](https://i.imgur.com/pViU5mA.png)

We can't put an object inside and object so what we need to do is turn it into a JSON file.

```js
componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
}
```

And this gives us:

![a nice object](https://i.imgur.com/sFhNn6f.png)

And as you add orders, it stores the exact representation of our order state in this json object

![lots of orders in local storage](https://i.imgur.com/D7wfBBo.png)

but we have a problem when we refresh because it doesn't reinstate our order!

note:

```
componentWillMount() {
    // this runs right before the <App> is rendered
}
```

How to you turn a string back into an Object?
do opposite of `JSON.stringify` which is
`JSON.parse()`

and this works (althought there is a delay after refreshing, a different Lifecycle Hook could improve upon this)

```
componentWillMount() {
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`
    , {
      context: this,
      state: 'fishes'
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      // update our App component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }
```

How do you make a copy of an object?

old way

`Object.assign({}, fish)`

new ES6 way

`{...fish,`

how to delete with JavaScript
`delete fishes[key]`

but firebase has issues with this

to work with firebase you need to explicitly set it to null
this.setState({ fishes })

```js
removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
}
```

test ul animation
select in Chrome console
`transform: translateX(-120%);`
up or down arrow and watch it slide in
hold shift down and it moves faster


