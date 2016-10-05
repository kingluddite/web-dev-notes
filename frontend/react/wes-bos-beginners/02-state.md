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

