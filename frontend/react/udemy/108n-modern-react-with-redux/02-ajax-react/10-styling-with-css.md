# Styling with CSS

`style.css`

```css
.search-bar {
  margin: 20px;
  text-align: center;
}

.search-bar input {
  width: 75%;
}

.video-item img {
  max-width: 64px;
}

.video-detail .details {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #eee;
}
```

* Hover over boxes adds nice grey
* Mouse to let you know they are clickable

`SearchBar.js`

```
render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value})} />
      </div>
    )
  }
```

**tip** In general, give your top level Component a `className` that is the same as the Component name (use lowercase separated-by-dashes like `search-bar`

* `SearchBar` is the Component name
* `search-bar` is the className
* This makes it easier to have one CSS file per component which makes styling very straight forward

![What is should look like in browser](https://i.imgur.com/wcZlXyh.png)



