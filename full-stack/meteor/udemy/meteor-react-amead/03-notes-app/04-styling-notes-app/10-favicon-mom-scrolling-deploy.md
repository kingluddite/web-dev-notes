# Favicons, Momentum Scrolling, Final Deployment

## Favicons

`main.html`

```
<head>
  <title>Notes App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/png" href="/images/favicon.png" />
</head>

<body>
  <div id="app"></div>
  <!-- /#app -->
</body>
```

* We add our favicon
* We update our title to `Notes App`

## Momentum Scrolling
Only can see on mobile phones
If you try our app on phone and try to scroll through the notes list, we see that we can not scroll (like settings on an app phone)

* We have to enable Momentum Scrolling for the NoteList and textarea
* We also have to fix zooming issue preventing a user from zooming in on stuff
    - This is controversial and some people feel it should not be done

### Disable Zooming
`main.html`

`<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />`

### Add Momentum Scrolling
`_item.scss`

```
// Item List
.item-list {
  background-color: white;
  border: 1px solid $grey;
  overflow-y: scroll;
  width: 100%;
  -webkit-overflow-scrolling: touch; // add this line
}
```

* over scrolling is not universally supported by browsers
* `-webkit-overflow-scrolling: auto;` (default behavior)

### And let's add it to our `textarea`

`_editor.scss`

```
// more code
.editor__body {
  flex-grow: 1;
  font-weight: 300;
  margin-bottom: $large-space;
  outline: none;
  padding: $input-spacing;
  resize: none;
  -webkit-overflow-scrolling: touch; // add this line
}
// more code
```

## Fix bug
When setting `overflow` **scrolling** property can mess with that `z-index`

`_page-content.scss`

```
page-content__sidebar {
  display: flex;
  transition: left 0.3s ease;
  width: 100vw;

  position: fixed;
  top: $header-height;
  left: -100vh;
  bottom: 0;
  z-index: 1; // add this line

  @include desktop() {
    display: flex;
    position: static;
    width: $page-content-sidebar-width;
    padding-right: $large-space;
  }
}
```

* That fixes the bug on iphones

`$ git status`

`$ git commit -am 'Add mobile momentum and scaling styles'`

`$ git push`

## Update readme.md
```
# Notes App

This is a simple notes Application built on Meteor and React.

## Getting Started

This app requires you to have Meteor installed on your machine. Then you can clone the repo with the following commands:

### Install the npm dependencies

`$ meteor npm install`

### Run Meteor
`$ meteor`

### Running the Tests
`$ npm test`

* Make sure to view the test results in the following URL `http://localhost:3000`
```

`$ git status`

`$ git commit -am 'Add instructions to readme'`

`$ git push`

`$ git push heroku master`

Wait 5 minutes

`$ heroku open`

### Add New Features
* Confirmation screen when deleting note
* Add Search bar to the list



