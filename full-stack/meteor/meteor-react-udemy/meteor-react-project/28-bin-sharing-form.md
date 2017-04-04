# BinsShare Form
## Add the input and button
Add email with input and submit with button

```
class BinsShare extends Component {
  render() {
    return (
      <footer className="bins-share">
        <div className="input-group">
          <input type="text" className="form-control"/>
          <div className="input-group-btn">
            <button className="btn btn-default">
              Share Bin
            </button>
          </div>
        </div>
      </footer>
    )
  }
}
```

## View in browser
Input and button hug bottom of screen.

## Add some CSS
```css
.bins-share {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  margin: 10px;
}
```

We add flex to be able to center our items in the `Y` direction

Also add this rule:

```css
.bins-share .input-group {
  width: 50%;
}
```

### Add click event handler
`BinsShare`

```
// more code
class BinsShare extends Component {
  render() {
    return (
      <footer className="bins-share">
        <div className="input-group">
          <input type="text" className="form-control"/>
          <div className="input-group-btn">
            <button
              onClick={this.onShareClick.bind(this)}
              className="btn btn-default">
              Share Bin
            </button>
          </div>
        </div>
      </footer>
    )
  }
}

// more code
```

### When to use helper functions?
If the inline code will be more than one line use a helper function. It keeps your code lean and mean

### Add a ref
We need a value from our `input` tag so add a ref to it

`<input ref="email" type="text" className="form-control"/>`

### Get the value out of the input

```
onShareClick() {
    const email = this.refs.email.value;
  }
```

### Next Challenge
Take that email and provide it to a meteor method to update that list of `sharedWith` people on the `bin`

