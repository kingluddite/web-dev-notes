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


