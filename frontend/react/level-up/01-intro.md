# React
[download react](https://facebook.github.io/react/index.html)

video #1

## JSX
* HTML inside JavaScript

`index.html`

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>


</body>

</html>
```
video #2

## JSX

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">
    var HelloWorld = React.createClass({
      render: function() {
        return (
          <h1>Hello World</h1>
        )
      }
    });
    ReactDOM.render(
      <HelloWorld />,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```
[meteor and react]
https://www.youtube.com/watch?v=ootKAwnQiP4

## react component properties
video #3

properties are known as `props` in react
where you can add a property onto a given component
and pass information into that property that you can than pass into that component

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">

    var HelloWorld = React.createClass({
      render: function() {
        return (
          <h1>Hello {this.props.name}</h1>
        )
      }
    });

    ReactDOM.render(
      <HelloWorld name="Phil" />,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```

outputs Hello + whatever name is provided

### defaults prop

now if you remove the name you passed into the HelloWorld component you will see the default value of 'Bob'

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">

    var HelloWorld = React.createClass({
      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        return (
          <h1>Hello {this.props.name}</h1>
        )
      }
    });

    ReactDOM.render(
      <HelloWorld/>,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```
## propTypes
Make sure the correct data type is passed into your component

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">

    var HelloWorld = React.createClass({
      propTypes: {
        name: React.PropTypes.string
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        return (
          <h1>Hello {this.props.name}</h1>
        )
      }
    });

    ReactDOM.render(
      <HelloWorld name={false}/>,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```

You will get an error on your console because the component is expecting a string and we sent it a boolean.

![error](https://i.imgur.com/Ec2ye6O.png)

## Make it required prop type too

```js
propTypes: {
        name: React.PropTypes.string.isRequired
      },
```

## conditionals

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">

    var HelloWorld = React.createClass({
      propTypes: {
        name: React.PropTypes.string,
        isPerson: React.PropTypes.bool
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        return (
          <h1>Hello <Person name={this.props.name} /></h1>
        )
      }
    });

    var Person = React.createClass({
      propTypes: {
        name: React.PropTypes.string.isRequired
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        return (
          <span>{this.props.name}</span>
        )
      }
    });

    ReactDOM.render(
      <HelloWorld name="Phil" isPerson={true}/>,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```

* `name` is passed into the <HelloWorld> component
* <HelloWorld> renders 'Hello' and concatenates the name prop into it
* and inside the <Person> component `name` prop is passed into that

final output: Hello Phil

**Note** self closing tags must close
`<HelloWorld>` BAD code

`<HelloWorld />` GOOD code

### Conditional Example
Show `Hello World` if not a person and if a person show (or render) `Hello Phil`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">

    var HelloWorld = React.createClass({
      propTypes: {
        name: React.PropTypes.string,
        isPerson: React.PropTypes.bool
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        var greeting = "World";

        if(this.props.isPerson) {
          greeting = (<Person name={this.props.name} />)
        }

        return (
          <h1>Hello {greeting}</h1>
        )
      }
    });

    var Person = React.createClass({
      propTypes: {
        name: React.PropTypes.string.isRequired
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        return (
          <span>{this.props.name}</span>
        )
      }
    });

    ReactDOM.render(
      <HelloWorld name="Phil" isPerson={false}/>,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```

### Why not put our conditional inside our render() function?
Because if `isPerson` if false we won't render it so it should not be inside our render() function

## State
* set a state
* retreive state

### componentDidMount
* the component mounted and now we can do stuff
* it only runs once, so you don't have to worry about it firing a bunch of times

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">

    var HelloWorld = React.createClass({
      propTypes: {
        name: React.PropTypes.string,
        isPerson: React.PropTypes.bool
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      getInitialState: function() {
        return {
          value: 1
        }
      },

      componentDidMount: function() {
        this.setState({
            value: this.state.value + 19
          });
      },

      render: function() {
        var greeting = "World";

        if(this.props.isPerson) {
          greeting = (<Person name={this.props.name} />)
        }

        return (
          <div>
            <h1>Hello {greeting}</h1>
            {this.state.value}
          </div>
                )
      }
    });

    var Person = React.createClass({
      propTypes: {
        name: React.PropTypes.string.isRequired
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        return (
          <span>{this.props.name}</span>
        )
      }
    });

    ReactDOM.render(
      <HelloWorld name="Phil" isPerson={false}/>,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```

## Click Events & a Basic Lifecycle Method
funtion() vs function no ()
* first one automatically runs, second one does not

Add 1 on every click

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>React Level Up App</title>
  <script src="build/react.js"></script>
  <script src="build/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
</head>

<body>
  <div id="area"></div>
  <!-- /#area -->
  <script type="text/babel">

    var HelloWorld = React.createClass({
      propTypes: {
        name: React.PropTypes.string,
        isPerson: React.PropTypes.bool
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      getInitialState: function() {
        return {
          value: 1
        }
      },

      componentDidMount: function() {

      },

      _addByOne: function() {
        this.setState({
            value: this.state.value + 1
          });
      },

      _hello: function() {
        return (
          <h1>hello</h1>
          )
      },

      render: function() {
        var greeting = "World";

        if(this.props.isPerson) {
          greeting = (<Person name={this.props.name} />)
        }

        return (
          <div>
            {this._hello()}
            <h1>Hello {greeting}</h1>
            {this.state.value}
            <button onClick={this._addByOne}>Click Me</button>
          </div>
                )
      }
    });

    var Person = React.createClass({
      propTypes: {
        name: React.PropTypes.string.isRequired
      },

      getDefaultProps: function() {
        return {
          name: 'Bob'
        }
      },

      render: function() {
        return (
          <span>{this.props.name}</span>
        )
      }
    });

    ReactDOM.render(
      <HelloWorld name="Phil" isPerson={false}/>,
      document.getElementById('area')
    );
  </script>
</body>
</html>
```
