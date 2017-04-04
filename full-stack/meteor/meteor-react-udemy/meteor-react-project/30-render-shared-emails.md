# Render shared emails

`BinShare`

```
render() {
    return (
      <footer className="bins-share">
        <div className="input-group">
          <input ref="email" type="text" className="form-control"/>
          <div className="input-group-btn">
            <button
              onClick={this.onShareClick.bind(this)}
              className="btn btn-default">
              Share Bin
            </button>
          </div>
        </div>

        <div>
          Shared With:
        </div>
        <div className="btn-group">
          {this.renderShareList()}
        </div>
      </footer>
```

## Test in browser
The emails get added but we need to make the CSS nicer

`main.css`

```css
.bins-share .input-group {
  width: 30%;
}

.bins-share > div {
  margin: 0 10px;
}
```

## Next Challenge
If a bin was shared with an email address. If I log into the app with that email, I should have access to that bin
