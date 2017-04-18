# SCSS imports
`imports/client/styles`

## Sass Partials
Cut and paste all our code from `client/main.scss` to `imports/client/styles/_main.scss`

`_main.scss`

```
body
{
    font-family: Helvetica, Arial, sans-serif;

    color: #555;
}

html
{
    font-size: 62.5%;
}

.title-bar
{
    color: #fff;
    background: #e35557;
}

h1
{
    font-size: 2.4rem;
    font-weight: 300;
}

.wrapper
{
    max-width: 50rem;
    margin: 0 auto;
    padding: 1.3rem;
}
```

`client/main.scss`

`@import './../imports/client/styles/main';`

You can shorten this **relative path** to:

`@import '../imports/client/styles/main';`

**note** It is the same path

Everything should look the same but we are now importing a partial Sass file

## CSS Components
`imports/client/styles/components`

This new `components` folder is not referring to a **React** Component but rather components relating to style

`imports/client/styles/components/_title-bar.scss`

```
.title-bar
{
    color: #fff;
    background: #e35557;
}
```

`imports/client/styles/components/_wrapper.scss`

```
.wrapper
{
    max-width: 50rem;
    margin: 0 auto;
    padding: 1.3rem;
}

```

### Import them

`_main.scss`

```
// more code
.wrapper
{
    max-width: 50rem;
    margin: 0 auto;
    padding: 1.3rem;
}

@import './components/title-bar';
@import './components/wrapper';
```

## Hard Refreshing
Can help debug when you make mistakes

### Break stuff!
Intentionally break our path with:

```
@import './component/title-bar'; // change this line
@import './components/wrapper';
```

Our app still looks like it is working but our **Terminal** shows the error

![terminal scss errors](https://i.imgur.com/VbiRx5I.png)

## Hard Refresh
A hard refresh will show the error so doing hard refreshes from time to time will alert us if our app has broken

Fix the error

## Next
We'll style the App Component
