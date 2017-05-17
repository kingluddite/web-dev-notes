# Creating Side-by-side layout
* side by side layout
* heights are dynamic
* we are trying to make the web site look more like a web app

`_page-content.scss`

```
.page-content {
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}
```

This is the B in BEM (block level selecter)

* add two elements
    - sidebar
    - main content

```
.page-content {
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}

.page-content__sidebar {
    
}

.page-content__main {

}
```

## Add `sidebar` and `main` tags

`Dashboard`

```
import React from 'react';

import Header from './Header';
import NoteList from './NoteList';
import Editor from './Editor';

export default Dashboard = () => {
      return (
        <div>
          <Header title="Dashboard" />
          <div className="page-content">
            <aside className="page-content__sidebar">
              <NoteList />
            </aside>
            <main className="page-content__main">
              <Editor />
            </main>
          </div>
        </div>
      );
}
```

Right now our elements are stacked on top of each other but we want them left and right in our layout so we'll use `display: flex`

`_page-content.scss`

```
.page-content {
  display: flex;
  max-width: $site-max-width;
  margin: 0 auto;
  padding: $space;
}
// more code
```

![content shows up on right](https://i.imgur.com/dAdCebB.png)

## Make our Dashboard wider
`_variables.scss`

Change from `$site-max-width: 50rem;` to `$site-max-width: 100rem;`

## Allocate sidebar and main widths
`_variables.scss`

```
// more code
// Item
$item-bg: $light-grey;
$item-border: darken($item-bg, 8%);
$item-text-color: $dark-grey;

// Page Content (Add this section)
$page-content-sidebar-width: 30rem;
$page-content-main-width: 70rem;
```

`_page-content.scss`

```
// more code
.page-content__sidebar {
  width: $page-content-sidebar-width;
}

.page-content__main {
  width: $page-content-main-width;
}
```

### calc()
* CSS method
* examples
    - `$page-content-main-width: calc(2px + 22px);`
    - `$page-content-main-width: calc(100rem - 90rem);`
* We can inject variables into calc()
    - But we must use [Sass interpolation](https://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375) when we do

`_variables.scss`

```
// more code
// Page Content
$page-content-sidebar-width: 30rem;
$page-content-main-width: calc(#{$site-max-width} - #{$page-content-sidebar-width});
```



