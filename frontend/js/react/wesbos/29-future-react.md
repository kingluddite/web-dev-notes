# Future React
Property Initializers and getting rid of `.bind()`

## This is not fun
```
this.addPlayer = this.addPlayer.bind(this);
this.loadSamples = this.loadSamples.bind(this);
this.addToLineup = this.addToLineup.bind(this);
this.updatePlayer = this.updatePlayer.bind(this);
this.removePlayer = this.removePlayer.bind(this);
this.removeFromLineup = this.removeFromLineup.bind(this);
```

Back in the day when we used `React.createClass` it did it for us and now we have to explicitly bind

## None of this is in JavaScript but we can use it because we are using Babel
[Currently in Stage 2](https://github.com/tc39/proposal-class-public-fields)

## Comment out load samples (future-stuff branch)
`// this.loadSamples = this.loadSamples.bind(this);`

Test in local browser and you will not be able to load samples

**note** Make sure to remove homepage f`rom package.json`

`  "homepage": "https://kindluddite.github.io/react-wb",`

Comment out repo variable and basename from BrowserRouter

```
//const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
  return (
    //<BrowserRouter basename={repo}>
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={TeamPicker} />
        <Match pattern="/team/:teamId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}
```

## Error
We can't load sample data. We get an error saying `Cannot read property of 'setState' of null`

If we look at the `loadSamples()` method

```
loadSamples() {
    this.setState({
      players: samplePlayers
    });
  }
```

* `loadSamples()` is not longer bound to the instance of the `App` Component

## A fix with `Property Initializers`
```
  loadSamples = () => {
    this.setState({
      players: samplePlayers
    });
  }
```

* This means loadSamples will not be bound to this function but to the parent function (that is what an arrow function does)

### Don't forget the ending semi-colon!
```
loadSamples = () => {
    this.setState({
      players: samplePlayers
    });
  }; // this semi-colon is important!
```

 * This is similar to puttin a property on an object
 * Try again and it will work (if you forget that semi-colon it won't work!)

### Move our state
```
constructor() {
    super();
    this.addPlayer = this.addPlayer.bind(this);
    // this.loadSamples = this.loadSamples.bind(this);
    this.addToLineup = this.addToLineup.bind(this);
    this.updatePlayer = this.updatePlayer.bind(this);
    // this.removePlayer = this.removePlayer.bind(this);
    this.removeFromLineup = this.removeFromLineup.bind(this);

    // initial state (was known as 'getinitialstate' with React createClass)
    // this.state = {
    //   players: {},
    //   lineup: {}
    // };

  }

  state = {
    players: {},
    lineup: {}
  };
```

* Like add a property to an object except we are adding a property initializer, which means every instance of our app component will get it's own state (semi-colon at end is important!)

## static

`Roster.js`

```
  static propTypes = {
    addPlayer: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    players: React.PropTypes.object.isRequired,
    removePlayer: React.PropTypes.func.isRequired,
    updatePlayer: React.PropTypes.func.isRequired,
    teamId: React.PropTypes.string.isRequired
  };
}

// Roster.propTypes = {
//   addPlayer: React.PropTypes.func.isRequired,
//   loadSamples: React.PropTypes.func.isRequired,
//   players: React.PropTypes.object.isRequired,
//   removePlayer: React.PropTypes.func.isRequired,
//   updatePlayer: React.PropTypes.func.isRequired,
//   teamId: React.PropTypes.string.isRequired
// }
```

* We use `static` because we don't need a copy of our propTypes for every single instance because it will be the same for every single instance

go through and replace all binding with property initializers
