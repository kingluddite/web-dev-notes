# Mobile Menu Part 2
`_page-content.scss`

```
// more code
.page-content__sidebar {
  display: none;
  width: $page-content-sidebar-width;
  padding-right: $large-space;

  @include desktop() {
    display: flex;
  }
}
// more code
```

* We currently use `display: none` but we'll improve on this

```
// more code
.is-nav-open .page-content__sidebar {
  display: block;
}
// more code
```

* Test it out
    - Make browser phone size click and watch NoteList appear and on the other click it disappears

### Making improvements

```
// more code
.page-content__sidebar {
  // display: none; // remove this line
  width: $page-content-sidebar-width;
  padding-right: $large-space;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  @include desktop() {
    display: flex;
  }
}
.is-nav-open .page-content__sidebar {
    // display: block; // remove this line
}
// more code
```

* **tip** Organize your properties in alphabetical order
    - **exception** - keep your position elements grouped together
        + Because they usually get changed together

## Problems
* Our new position CSS makes our sidebar move to the top and we obfuscate the tri-bar
* Change `top` value by tweaking in Chrome dev tool bar
    - Highlight sidebar and in **Styles** tab select `top` and press `up` arrow key on your keyboard until the sidebar is the height of the header

![sidebar push down](https://i.imgur.com/TIKvsdS.png)

* In addition, uncheck `width` (we're removing it)
* Uncheck `padding-right` (we're removing it so sidebar can take over available screen)

![three styles we need for sidebar](https://i.imgur.com/LIjKh6n.png)

* We need `width` and `padding-right` but just inside our `media query` so we'll move them into it like this:

```
// more code
.page-content__sidebar {
  //
  position: fixed;
  top: $header-height;
  left: 0;
  right: 0;
  bottom: 0;

  @include desktop {
    display: flex;
    padding-right: $large-space;
    width: $page-content-sidebar-width;
    //
  }
}
.is-nav-open .page-content__sidebar {

}
// more code
```

* We want to set `top` to be the value of our header height, which we have stored in the `$header-height: 6rem;` variable
  - We'll add that in the code snippet below

## Houston we have a huuuuge Problem!
* We can not scroll in the sidebar
    - This is happening because the item list is not taking up the same height as sidebar
    - It is growing but `overflow: scroll` is doing nothing
    - You might need to add notes to see that it is not scrolling

### We can fix this by constraining it to its parent
`_page-content.scss`

```
.page-content__sidebar {
  display: flex; // add this line

  position: fixed;
  top: $header-height;
  left: 0;
  right: 0;
  bottom: 0;

  @include desktop() {
    display: flex;
    width: $page-content-sidebar-width;
    padding-right: $large-space;
  }
}
```

* Now we get our scrollbar back and can scroll through notes

## Shifting left
* If we just add negative values to `left` inside our sidebar, we see the whole sidebar doesn't move left
    - Holding shift allows you to increase/decrease css numeric values in chrome tool bar quicker (10px at a time instead of 1px)
* But if we set `sidebar` to have `width: 100vw` and decrease the `left` value is slides the whole sidebar container left
* We can remove the `right: 0`
* We set `left: -100vw`

`_page-content.scss`

```
// more code
.page-content__sidebar {
  display: flex;
  width: 100vw;

  position: fixed;
  top: $header-height;
  left: -100vh;
  bottom: 0;

  @include desktop() {
    display: flex;
    width: $page-content-sidebar-width;
    padding-right: $large-space;
  }
}

.is-nav-open .page-content__sidebar {
  left: 0;
}
// more code
```

* Test it out
    - You should see when tri-bar is clicked the notelist takes up all space and click again it hides
    - We can scroll fine when we see the note list

### Fix our h5 margin
`_base.scss`

```
// more code
h5 {
  margin: 0;
}
// more code
```

Old h5 margin

![old h5 margin](https://i.imgur.com/qN9jCOY.png)

New h5 margin

![new h5 margin](https://i.imgur.com/5pCypzs.png)

## Add transition
`_page-content.scss`

```
// more code
.page-content__sidebar {
  display: flex;
  transition: left 0.3s ease;
  width: 100vw;
// more code
```

* Test it out
    - You should see the menu transitions smoothly

## More fixes
* When we add a note (or switch notes)
    - The note list doesn't go away
    - The dashboard URL doesn't change
    - The note doesn't load
* We need to change `isNavOpen` every time `selectedNoteId` changes

`client/main.js`

```
// more code
Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});
// more code
```

* Test it out and all should work nicely

## Add a className to `Header` nav-toggle image
`<img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc} />`

`_header.scss`

```
// more code
.header__nav-toggle {
  cursor: pointer;
  height: 2rem;
  width: 2rem;
}
```

Now we need to center the icon vertically

![bad vertical alignment](https://i.imgur.com/9q4Ukh0.png)

```
.header__content {
  align-items: center; // add this line
  display: flex;
  height: $header-height; // add this line
  justify-content: space-between;
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}
```

And now that looks nicer

![vertically aligned nicely](https://i.imgur.com/Jp3d2kw.png)

* Change our Dashboard name to Notes

`Dashboard`

`<Header title="Notes" />`

### Houston we have another problem
When we stretch the browser the tri-bar (tri-con?) stays on the screen

`_header.scss`

```
// more code
.header__nav-toggle {
  cursor: pointer;
  height: 2rem;
  width: 2rem;

  @include desktop() {
    display: none;
  }
}
```

* Now the tri-con disappears in desktop view

## How do we bring back the note list when we are in desktop view?
On mobile, `position` was set to **fixed** but we need to set that to `static` (_default flow of document_) when we are in **desktop**

```
// more code
.page-content__sidebar {
  display: flex;
  transition: left 0.3s ease;
  width: 100vw;

  position: fixed;
  top: $header-height;
  left: -100vh;
  bottom: 0;

  @include desktop() {
    display: flex;
    position: static;
    width: $page-content-sidebar-width;
    padding-right: $large-space;
  }
}
// more code
```

Now we see our note list in desktop view

![note list in view on desktop](https://i.imgur.com/m5CHG2U.png)

`$ git status`

`$ git add .`

`$ git commit -m 'Setup mobile navigation`

`$ git push`


