# Styling `sidebar` and `main`
Create `/imports/client/styles/components/_editor.scss`

`_editor.scss`

```
// Block level selector

```

Make sure to import it

`_main.scss`

```
@import './variables';
@import './base';
@import './components/boxed-view';
@import './components/button';
@import './components/editor'; // add this line
@import './components/header';
@import './components/page-content';
@import './components/checkbox';
@import './components/item';
```

* When order doesn't matter we keep our imports in alphabetical order so we can easily find imports

## Now we need to use the editor class
`Editor`

```
// more code
  render() {

    if (this.props.note) {
      return (
        <div className="editor">
          {/* add class here */}
          <input value={this.state.title} placeholder="Note Title" type="text" onChange={this.handleTitleChange.bind(this)} />
          <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
          <button onClick={this.handleDeleteNoteClick.bind(this)}>Delete Note</button>
        </div>
      )
    } else {
      return (
        <div className="editor">
          {/* add new div container with editor class */}
          <p>
            { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
          </p>
        </div>
      )
    }

  }
// more code
```

Not too pretty yet but working

![ugly box](https://i.imgur.com/IHOfm46.png)

## Fix heights of box
Should take up all height available to it

`_page-content.scss`

```
// more code
.page-content__main {
  display: flex;
  width: $page-content-main-width;
}
```

Looking a bit better

![better layout](https://i.imgur.com/Jm7PYt0.png)

We want our editor to take up 100% width

`_editor.scss`

```
// Block level selector
.editor {
  background-color: white;
  border: 1px solid $grey;
  width: 100%; // add this
}
```

Looking even better (the height matches height of sidebar)

![wider editor](https://i.imgur.com/QfRQmZW.png)

## Houston we have a problem
* Add some notes
    - And our page stretches and we get a scrollbar
    - This is more like a website and less like a web app

* We need to make sure the sidebar and editor never take up more height than is available to them and if they do, it should show a scrollbar

## Calculation time
* Make sure browser doesn't get taller than space available in browser
    - height === entire height of browser - space left over for page-content

## Fixed height for header
`_variables.scss`

```
// more code
// Header
$header-bg: $brand-primary;
$header-color: $white;
$header-link-color: $white;
$header-height: 6rem;
// more code
```

Apply to `_header.scss`

```
// more code
.header__content {
  display: flex;
  height: $header-height; // add this line
  justify-content: space-between;
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}
// more code
```

Height is more but a bit wonky

![height header](https://i.imgur.com/NKltyfT.png)

`_variables.scss`

```
// Page Content
$page-content-sidebar-width: 30rem;
$page-content-main-width: calc(#{$site-max-width} - #{$page-content-sidebar-width});
$page-content-height: calc(100vh - #{$header-height}); // add this line
```

* 100vh gives use the full height of the browser and we subtract the header height

## Apply our page height variable
`_page-content.scss`

```
.page-content {
  display: flex;
  height: $page-content-height; // add this line
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}

.page-content__sidebar {
  display: flex; // add this line
  width: $page-content-sidebar-width;
}

.page-content__main {
  display: flex;
  width: $page-content-main-width;
}
```

* If you view the page it is not quite what we want
* The editor box does stop before the notes list but is seems a few pixels off
* We needed to add `display: flex` to the sidebar to make sure editor and sidebar have same height
* The problem has to do with a property called **box-sizing**

### [box-sizing](https://css-tricks.com/box-sizing/)
(default setting --> `box-size: content-box`)
You need to use this inside of all your CSS projects

If you open browser, inspect, select header you'll see something like:

![header dimensions](https://i.imgur.com/ANW30oj.png)

* But our height should be 6rem? Why is it 88px?
    - The reason is it is also taking the **padding** into account when setting the height
    - So this height is the height of the content and does not include the height of the padding or the border
    - This is confusing and often causes layout problems where everything is off but just a bit

#### Solution
Set `box-sizing: border-box` for all your elements that problem no longer exists

`_base.scss`

```
* {
  box-sizing: border-box;
}
```

#### View in browser
* We are getting closer to what we want
* Editor is stopping just before the edge of the page

![border-box](https://i.imgur.com/iynGxDw.png)

### Fix the notes list
`_item.scss`

```
// Item List
.item-list {
  background-color: white;
  border: 1px solid $grey;
  overflow-y: scroll;
  width: 100%;
}

// Item
.item {
  background: $item-bg;
  border: 1px solid $item-border;
  margin-bottom: $space;
  padding: $space;
}

.item__message {
  color: $item-text-color;
}

.item__status-message {
  color: $item-text-color;
  font-style: italic;
  text-align: center;
  margin: 0;
}
```

* Add comments to break up Item List and Item
* overflow-y: scroll (gives us the scrollbar when list exceeds height)
* width 100% of sidebar

## Apply new CSS class
`NoteList`

```
// more code
return (
      <div className="item-list">
        <NoteListHeader />
        {(props.notes.length === 0) ? <NoteListEmptyItem /> : undefined }
        {renderNotes}
        NoteList { props.notes.length }
      </div>
    );
// more code
```

`$ git status`

`$ git add .`

`$ git commit -m 'Setup page content layout'`
