# Components
`app.js`

```
class Header extends React.Component {
  render() {
    return <p>This is from Header.</p>;
  }
}

const jsx = (
  <div>
    <h1>Title</h1>
  </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
```

## Components are reusable
```
class Header extends React.Component {
  render() {
    return <p>This is from Header.</p>;
  }
}

const jsx = (
  <div>
    <h1>Title</h1>
    <Header />
    <Header />
  </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
```

* See how `<Header/>` is an instance and can easily be replicated
* If you look at the babel transpiled ES5 JavaScript you will see that the upper case of `Header` is very important, if you used `header` lowercase it would not create a class but instead an HTML `header` element
* React needs to know if it is going to create a component or an HTML element and the spelling lets it know that (uppercase is class, lowercase is HTML element)
