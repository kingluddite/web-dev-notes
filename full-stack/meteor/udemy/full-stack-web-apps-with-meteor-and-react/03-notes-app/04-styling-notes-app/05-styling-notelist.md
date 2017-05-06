# Styling the `NoteList`
* Trash all your notes so we can start from scratch
    - Use the UI or Mongo Shell to do this

## Update `NoteListEmptyItem`
```
import React from 'react';

const NoteListEmptyItem = () => {
   return (
       <p className="empty-item">There are currently no notes. Feel free to add one</p>
   )
};

export default NoteListEmptyItem;
```

And apply the style to `_item.scss`

```
// more code
// Empty Item
.empty-item {
  font-style: italic;
  padding: $space;
  text-align: center;
}
```

## Remove the NoteList count as we don't need it in our app
`NoteList`

```
// more code
NoteList { props.notes.length }
// more code
```

## Style `NoteListHeader`
* Style our button with default blue
* 

```
// more code
return (
  <div className="item-list__header">
    <button className="button" onClick={handleButtonClick}>+ Add Note</button>
  </div>
);
// more code
```

* Make our button take up the full space of sidebar

```
// more code
.item-list__header {
  display: flex;
  flex-direction: column;
  padding: $space
}
// more code
```

Our NoteList add note button

![add note styled](https://i.imgur.com/t5ZygSJ.png)

## Styling the item
`_item.scss`

* Remove `.item__message` and `.item__status-message` and empty `.item` so we are starting from a clean slate

## Trash unused variables
`_variables.scss`

```
// Item
// remove these three
$item-bg: $light-grey;
$item-border: darken($item-bg, 8%);
$item-text-color: $dark-grey;
```

### Style the item when it is not selected and not hovered over
Basic generic style

* Create 5 notes now

`NoteListItem.js`

```
// more code
export const NoteListItem = (props) => {
   return (
    <div className="item" onClick={() => {
// more code
```

* Add CSS to give us hand cursor on rollover item

`_item.scss`

```
// more code
// Item
.item {
  cursor: pointer;
padding: $space;
}
// more code
```

## Add new variable
```
// Item
$item-border-width: 4px;
```

* Add variable to Sass rule

`_item.scss`

```
.item:hover {
  background-color: $light-grey;
  border-left: $item-border-width solid $grey;
}
```

## Houston we have a problem
* When we hover there is a slight `jarring` effect
* We'll add a border when we don't hover but it will be transparent

`_item.scss`

```
// Item
.item {
  cursor: pointer;
  padding: $space;
  border: $item-border-width solid transparent;
}
```

## Transition values so they are smooth instead of jumping
We can use a nice transition between two background colors

```
// Item
.item {
  cursor: pointer;
  padding: $space;
  border: $item-border-width solid transparent;
  transition: background-color 0.3s ease; // add this line
}
```

But the border can also be transitioned

```
// Item
.item {
  cursor: pointer;
  padding: $space;
  border: $item-border-width solid transparent;
  // update the line below - notice how they are chained to transition
  transition: background-color 0.3s ease, border-left 0.3s ease;
}
```

## Style items when they are selected
* Currently it is a static value
* We want to use dynamic CSS classes instead

`NoteListItem`

Change this:

```
// more code
return (
    <div className="item" onClick={() => {
// more code
```

To this

```
// more code
const className = props.note.selected ? 'item item--selected' : 'item';

return (
    <div className={className} onClick={() => {
// more code
```

* Remove this code
    - `{ props.note.selected ? 'selected' : undefined }`
    - We don't need it anymore

## Apply the styles
`_item.scss`

```
// more code
.item--selected,
.item--selected:hover {
  background-color: $light-grey;
  border-left: $item-border-width solid $brand-primary;
}
// more code
```

Now selected items will look like this:

![selected item](https://i.imgur.com/nMuiXVT.png)

## Add styles for item title and item subtitle
`NoteListItem.js`

```
// more code
return (
    <div className={className} onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
    <h5 className="item__title">{ props.note.title || 'Untitled Note' }</h5>
    <p className="item__subtitle">{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
  </div>
 );
// more code
```

### Make selected bold and not select normal
`_item.scss`

```
.item__title {
  font-weight: normal;
}

.item--selected .item__title {
  font-weight: bold;
}
```

* Make some other improvements

`_item.scss`

```
.item__title {
  font-weight: normal;
  font-size: $base-font-size;
  margin-bottom: 0.4rem;
}

.item--selected .item__title {
  font-weight: bold;
}

.item__subtitle {
  color: $dark-grey;
  margin: 0;
}
```

`$ git status`

`$ git commit -a -m 'Style note list'`
