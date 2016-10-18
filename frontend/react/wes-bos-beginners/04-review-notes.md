# import ReactDOM

Using our `src/index.js`

## one way to import
` import { render } from 'react-dom';`

## other way to import

```
import ReactDOM from 'react-dom';
// code here
ReactDOM.render()
```

but since we don't need the entire reactDOM package
we just need that one render method so we use the first choice

`import { render } from 'react-dom'`

# Relative path vs node_modules

if you use `import TeamPicker from 'StorePicker';`

It will look inside `node_modules`

But if we use `import TeamPicker from './components/TeamPicker';`

It will look inside that file (called a relative path)

## Return
this is bad because the return doesn't have paranthesees `()`
* so it will just add a semicolon at the end
```
render() {
  return
  <p>
  Hello</p>
}
```

this is good

```
render() {
  return (
    <p>
    Hello</p>
    )   
}
```

## class is a reserved word in JavaScript
so use `className`

bad

```
render() {
  return (
    <form class="bad-class-name">

    </form>
    )   
}
```

good

```
render() {
  return (
    <form className="good-class-name">

    </form>
    )   
}
```

tip - with atom and emmet type `form.good-class-name` and press the `ctrl` + `e` button and it will add `form.className`

## You can only return 1 parent element

bad

```
render() {
  return (
    <form className="good-class-name">

    </form>
    <p>some text here</p>
    )   
}
```

good

```
render() {
  return (
    <div>
      <form className="good-class-name">

      </form>
      <p>some text here</p>
    </div>
    )   
}
```

## Must self close tags

bad

`<input id="teamName" required type="text" placeholder="Team  Name">`

good

`<input id="teamName" required type="text" placeholder="Team  Name" />`

## Comment in React

jsx

bad

```
render() {
  return (
    <div>
      <form className="good-class-name">
      <!-- Bad Comment -->
      // bad Comment
      /* bad Comment */
      </form>
      <p>some text here</p>
    </div>
    )   
}
```

good Comment

```js
render() {
  // regular javascript ok comment here
  return (
    <div>
      <form className="good-class-name">
    { /* Good Comment */ }
      </form>
      <p>some text here</p>
    </div>
    )   
}
```

You can comment regular javascript anywhere else but with JSX you have to use this special comment

Common Gotcha

```js
render() {
  // regular javascript ok comment here
  return (
  { /* this is where JSX starts - this will error because you can only return 1 parent element */ }
    <div>
      <form className="good-class-name">
    { /* Good Comment */ }
      </form>
      <p>some text here</p>
    </div>
  { /* this is where JSX ends - this will error because you can only return 1 parent element */ }
    )   
}
```

## Case sensitive JSX

this

`<Header />`

is different from

`<HEADER />`

