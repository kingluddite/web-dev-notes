# Styling the App list
![wireframe](https://i.imgur.com/rvx1Oia.png)

## Challenge
Center `PlayerList` and `AddPlayer` using `.wrapper` class

### Solution
`App.js`

```
class App extends Component {

  render() {

    return (
      <div>
        <TitleBar title={this.props.title} />
        <div className="wrapper">
          <PlayerList players={this.props.players} />
          <AddPlayer />
        </div>
      </div>
    );
  }
};
```

### Style modifications
* Make body have light gray background

`_main.scss`

```
body
{
    font-family: Helvetica, Arial, sans-serif;

    color: #555;
    background: #f2f2f2;
}
```

### Fix super small font size

![font size small](https://i.imgur.com/taDi7mZ.png)

#### REMs scale nicely
If you click `+` or `-` on keyboard the fonts will scale up and down nicely when you use REMs. (_They won't if you use pixels_)

Currently we target h1 with REMs and that is why it is `24px` but we didn't target anything else so everything is only `10px`

### Set body to `font-size: 1.6rem`
```
body
{
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1.6rem;

    color: #555;
    background: #f2f2f2;
}
```

* We set our root to 10px (_<html>_)
    - That makes setting REMs very easy because we just multiply any REM value by 10 to get the converted pixel value
* We set our `<body>` to `1.6rem` (_16px_)
    - So anything not targeted will be `16px` by default

## Styles for items
Add this file

`imports/client/styles/components/_item.scss`

Import it into `_main.scss`

```
@import './components/title-bar';
@import './components/wrapper';
@import './components/item'; // add this line
```

`_item.scss`

```
.item
{
    margin-bottom: 1.3rem;
    padding: 1.3rem;

    border: 1px solid #e8e8e8;
    background: #fff;
}
```

`AddPlayer`

```
// more code
render() {
    return (
      <div className="item">
        <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" name="playerName" placeholder="Player Name"/>
            <button>Add Player</button>
          </form>    
      </div>
    );
  }
// more code
```

`Player`

```
return (
        <div key={player._id} className="item">
          <p>
            {player.name} has {player.score} {this.checkPoints(player.score)}.
          </p>
          <button onClick={() => {
            Players.update( player._id, { $inc: { score: 1} } );
          }}>+1</button>
          <button onClick={() => {
            Players.update( player._id, { $inc: { score: -1} } );
          }}>-1</button>
          <button onClick={() => Players.remove(player._id)}>X</button>
        </div>
    );
```

Make our `Please add some players` have the `.item` class

`PlayerList`

Change this:

```
renderPlayers() {
    if (this.props.players.length === 0 ) {
      return <p>Please add some players.</p>
    } else {
      return this.props.players.map( player => {
        return <Player key={player._id} player={player} />;
      });
    }

  }
```

To this:

```
renderPlayers() {
    if (this.props.players.length === 0 ) {
      return (
        <div className="item">
          <p>Please add some players.</p>
        </div>
      );
    } else {
      return this.props.players.map( player => {
        return <Player key={player._id} player={player} />;
      });
    }

  }
```
