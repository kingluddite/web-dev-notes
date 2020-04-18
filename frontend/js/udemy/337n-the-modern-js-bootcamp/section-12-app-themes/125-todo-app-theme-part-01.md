# Todo Add theme (part 1)
* [uuidv4](https://gist.github.com/andrewjmead/d64087c46129fc58df67c361cb01e889)

## Styles
`styles.css`

```
/*

// Colors
$off-black: #20222b;
$dark-blue: #333745;
$blue: #3c4251;
$light-blue: #464b5e;
$off-white: #a5afd7;
$purple: #8357c5;
// Spacing
$s-size: 1.2rem;
$m-size: 1.6rem;
$l-size: 3.2rem;
$xl-size: 4.8rem;
$desktop-breakpoint: 45rem;

*/

/* Base Styles */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
  font-size: 62.5%;
}

body {
    background: #2B292E;
  color: #fafafa;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.6rem;
}

button {
  cursor: pointer;
}

a {
    color: #6F439C;
}

/* Container */

.container {
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.6rem;
}

/* Header */

.header {
  background: #6F439C;
  color:white;
  padding: 1.6rem 0;
}

.header__title {
  font-size: 3.2rem;
  margin-bottom: .4rem;
}

.header__subtitle {
  /* color: #777; */
  font-size: 1.6rem;
  font-weight: 300;
}

/* Actions Bar */

.actions {
    background-color: #353239;
    /* border-bottom: 1px solid #dedfe0; */
    /* color: #333333; */
    padding: 1rem
}

.actions__container {
    align-items: center;
    display: flex;
    max-width: 60rem;
    margin: 0 auto;
    min-height: 3rem;
    padding: 0 1.6rem;
}

.actions__container--spaced {
    justify-content: space-between
}

/* Form Inputs */

.input {
    border: none;
    font-size: 1.4rem;
    font-weight: 300;
    height: 3rem;
    margin-right: 1.6rem;
    padding: .4rem .8rem;
}

.checkbox {
    display: flex;
    align-items: baseline;
}

.checkbox > input {
    margin-right: .4rem;
}

.button {
    background: #7044a0;
    border: none;
    border-bottom: 2px solid #603a88;
    color: white;
    font-size: 1.4rem;
    font-weight: 300;
    padding: .8rem;
    transition: background .3s ease, color .3s ease;
}

.button:hover {
    background: #5F3A87;
}

.button--secondary {
    background: #888888;
    border-bottom: 2px solid #717171;
}

.button--secondary:hover {
    background: #6E6E6E;
}

.button--text {
    background: none;
    border: none;
    color: #aaa;
}

.button--text:hover {
    background: none;
    color: white;
    text-decoration: underline;
}

/* Note editor */

.title-input {
    border: 1px solid #DEDFE0;
    font-size: 2rem;
    font-weight: 300;
    display: block;
    margin: 2.4rem 0;
    padding: .8rem;
    width: 100%;
}

.body-input {
    border: 1px solid #DEDFE0;
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: 300;
    display: block;
    margin: 2.4rem 0;
    min-height: 15rem;
    padding: .8rem;
    width: 100%;
}

/* Note List Item */

.list-item {
    text-decoration: none;
    color: #fafafa;
    cursor: pointer;
    background: #353239;
    border: 1px solid #423e47;
    margin: 1.6rem 0;
    padding: 1rem 1.6rem;
    display: block;
    transition: background .3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.list-item__container {
    display: flex;
    font-size: 1.8rem;
    font-weight: 300;
    align-items: baseline;
}

.list-item__container > *:first-child {
    margin-right: .8rem;
}

.list-item:hover {
    background: #3d3941;
}

.list-item__title {
    font-size: 1.8rem;
    margin-bottom: .4rem
}

.list-item__subtitle {
    color: #666;
    font-size: 1.4rem;
    font-weight: 300;
    font-style: italic;
}

.list-title {
    margin: 3.2rem 0 1.6rem;
}

.empty-message {
    margin: 3.2rem 0;
}
```

`index.html`

```
<!DOCTYPE html>

<html>
    <head>
      <title>Todo App</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png">
      <link rel="manifest" href="/images/favicon/site.webmanifest">
      <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
        <h1>Todos</h1>
        <input id="search-text" type="text" placeholder="Filter todos">
        <label>
            <input type="checkbox" id="hide-completed"> Hide completed
        </label>
        <div id="todos"></div>
        <form id="new-todo">
            <input type="text" placeholder="Something to do" name="text">
            <button>Add Todo</button>
        </form>
        <script src="/scripts/todo-functions.js"></script>
        <script src="/scripts/todo-app.js"></script>
        <script src='/scripts/uuidv4.js'></script>
      </body>
</html>
```

## Cache bust favicon
* Sometimes it's hard to clear this so cache bust it by adding something onto the query string (see below)

```
// MORE CODE

      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png?v=1">

// MORE CODE
```

* It will still load the image just fine but because it is a different URL it won't use the cached version and now you should get the latest favicon

## Live Server
`$ live-server old-todo-app`

* Basic styles added

![basic styles added](https://i.imgur.com/s5KBxdR.png)

`index.html`

```
<!DOCTYPE html>

<html>
    <head>
      <title>Todo App</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png?v=1">
      <link rel="manifest" href="/images/favicon/site.webmanifest">
      <link rel="stylesheet" href="/styles/styles.css">
    </head>
    <body>
        <header class="header">
          <div class="container">
            <h1 class="header__title">Todo App</h1>
            <h2 class="header__subtitle">What do you need to do?</h2>
          </div>
        </header>

// MORE CODE
```

![header on todo](https://i.imgur.com/aHcPbbz.png)

`index.html`

```
        <div class="actions">
          <div class="actions__container">
            <input id="search-text" type="text" placeholder="Filter todos" />
            <label>
                <input type="checkbox" id="hide-completed"> Hide completed
            </label>
          </div>
          <!-- /.actions__container -->
        </div>
        <!-- /.actions -->
        <div id="todos"></div>

// MORE CODE
```

![style todo form fields](https://i.imgur.com/aJ25lZw.png)

* Add classes to make form files look better

`index.html`

```
// MORE CODE

        <div class="actions">
          <div class="actions__container">
            <input id="search-text" class="input" type="text" placeholder="Filter todos" />
            <label class="checkbox">
                <input type="checkbox" id="hide-completed"> Hide completed
            </label>
          </div>
          <!-- /.actions__container -->
        </div>
        <!-- /.actions -->

// MORE CODE
```

![form field and checkbox styles](https://i.imgur.com/jpcpRQr.png)

## Adding todos (styling them)
`index.html`

```
// MORE CODE

        <div class="container">
          <div id="todos"></div>
          <form id="new-todo">
              <input type="text" class="input" placeholder="Something to do" name="text">
              <button class="button">Add Todo</button>
          </form>
        </div>
        <!-- /.container -->

// MORE CODE
```

![our styled todo form](https://i.imgur.com/fw1pszQ.png)

## Next we'll add CSS classes via JavaScript
