# Styling the Editor
`_variables.scss`

```
// more code
// Spacing
$space: 1.4rem;
$large-space: 2.8rem; // add this
$site-max-width: 100rem;
// more code
```

* Above just pushes it down more fro the top and up from the bottom

## Apply it
`_page-content.scss`

```
.page-content {
  display: flex;
  height: $page-content-height;
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $large-space $space; // update this line
}

.page-content__sidebar {
  display: flex;
  width: $page-content-sidebar-width;
  padding-right: $large-space; // update this line
}
// more code
```

* We now have space between the `sidebar` and `main`

![side and main space](https://i.imgur.com/XwqAhlB.png)

## Stack form elements using flex
`_editor.scss`

```
// Block level selector
.editor {
  background-color: white;
  border: 1px solid $grey;
  width: 100%;
  display: flex; // add this line
  flex-direction: column; // add this line
  padding: $large-space; // add this line
}
```

## Styling `title` and `body`
`Editor.js`

```
// more code
<input className="editor__title" value={this.state.title} placeholder="Note Title" type="text" onChange={this.handleTitleChange.bind(this)} />
<textarea className="editor__body" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
<div>
   <button onClick={this.handleDeleteNoteClick.bind(this)}>Delete Note</button>
</div>
// more code
```

* We add classes to `title` and `body` but not to `button`
* We wrap button in `div` which enables flex to shape the `div` but not shape the `button`
    - We don't want our `button` to take up the full width of the `editor` area
    - The `div` can take up the full width of the `editor` area and the `button` can just sit in its allocated space
    - By adding this parent `div` container we are changing which element is **flex boxed**

## Make large font larger
`_variables.scss`

```
// more code
// Font sizes
$base-font-size: 1.4rem;
// $large-font-size: 1.8rem; // old
$large-font-size: 2.2rem; // new
// more code
```

## Style the `title`
`_editor.scss`

```
.editor__title {
  border: 0;
  border-bottom: 2px solid $grey;
  font-size: $large-font-size;
  margin-bottom: $large-space;
  outline: none;
  padding: $input-spacing;
}
```

## Style the `body`

* `textarea` should grow to fill additional space
    - `flex-grow: 1;`
    - [caution on outline: none](http://www.outlinenone.com/)
    - prevent user from resizing textarea `resize: none;`

`_editor.scss`

```
.editor__body {
  flex-grow: 1;
  font-weight: 300;
  margin-bottom: $large-space;
  outline: none;
  padding: $input-spacing;
  resize: none;
}
```

* Add `textarea` to base styles

`_base.scss`

```
[type=text],
[type=email],
[type=password],
textarea {
  font-size: $base-font-size;
  margin-bottom: $space;
  padding: $input-spacing;
  border: 1px solid $input-border;
}
```

* Chrome the text in `textarea` will look good but in other browsers you may get a strange **monostyle** font... let's fix that by setting a `font-family` specifically to override any default font that may be used in that input

`_variables.scss`

```
// Body
$body-bg-color: #fafafa;
$body-default-color: #333333;
$body-default-font-family: Helvetica, Arial, sans-serif; // add this
```

`_base.scss`

```
// more styles
body {
  color: $body-default-color;
  font-family: $body-default-font-family; // add this
  font-size: $base-font-size;
  background-color: $body-bg-color;
}
// more styles
[type=text],
[type=email],
[type=password],
textarea {
  border: 1px solid $input-border;
  color: $body-default-color; // add this
  font-size: $base-font-size;
  margin-bottom: $space;
  padding: $input-spacing;
  font-family: $body-default-font-family; // add this
}
```

Here's our editor so far

![editor styled](https://i.imgur.com/Zx9qRbn.png)

## Style our Editor button
`Editor.js`

```
// more styles
<div>
  <button className="button button--default" onClick={this.handleDeleteNoteClick.bind(this)}>Delete Note</button>
</div>
// more styles
```

Our button styled

![button default style](https://i.imgur.com/XMGQhoz.png)

## Style our message
Currently it looks like this

![current message unstyled](https://i.imgur.com/OSQ9Jlp.png)

`_editor.scss`

```
editor__message {

}
```

* Add **className** to `p` element

`Editor.js`

```
// more code
return (
        <div className="editor">
          <p className="editor__message">
            { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
          </p>
        </div>
      )
// more code
```

* Add styles for `message`

`_editor.scss`

```
// more code
.editor__message {
  text-align: center;
  margin: $large-space * 2;
  font-style: italic;
}
```

`$ git status`

`$ git commit -a -m 'Style editor Component`
