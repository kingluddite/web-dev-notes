# Creating React Component
* Cut all code from app.js and paste into `src/playground/jsx-indecision.js`
* Switch to view babel on `app.js`

`$ babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

## Our first component!
### Header
* React components require one method to be defined `render()` 

`app.js`

```
class Header extends React.Component {
  render() {
    return <p>Header Component</p>;
  }
}

const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
  </div>
);
ReactDOM.render(jsx, document.getElementById('app'));
```

* View browser
* You will see

```
Title
Header Component
```
