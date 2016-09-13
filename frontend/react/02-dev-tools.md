# React Dev Tools

The DOM built by react can be confusing
difficult to match the virtual DOM we are building with what we see on our Developer Tools inspector

## React Devloper Tools (Chrome)
[Download link](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

After installing their will be a `React` tab to show you the virtual DOM

## Mocking Up App
Scoreboard

className vs class
in jsx, it is not html, but javascript and since the code is compiled we can not use the name `class` because it is a reserved word in JavaScript

if you had a DOM element for a DIV you would assign a class by assigning to className
* react elements that map to DOM elements will use attributes that match their JavaScript DOM implentation as opposed to their HTML attributes
* jsx requires the quotes `""`
* most style guides recommend double quotes

class added

![class added](https://i.imgur.com/C4uQt6K.png)

* with react we are using className simpling for styling purposes

app.jsx

```js
function Application() {
  return (
    <div className="scoreboard">
      <div className="header">
          <h1>Scoreboard</h1>
      </div>

      <div className="players">
          <div className="player">
            <div className="player-name">
                John Doe
            </div>
            <div className="player-score">
              <div className="counter">
                <button className="counter-action decrement"> - </button>
                <div className="counter-score">
                    31
                </div>
                <button className="counter-action increment"> + </button>
              </div>
            </div>
          </div>
      </div>
      <div className="players">
          <div className="player">
            <div className="player-name">
                Jane Doe
            </div>
            <div className="player-score">
              <div className="counter">
                <button className="counter-action decrement"> - </button>
                <div className="counter-score">
                    40
                </div>
                <button className="counter-action increment"> + </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Application />, document.getElementById('container'))
```

app.class

```css
body {
  background: #d5d5d5;
  font-family: arial;
  color: #FAFAFA;
  text-transform: uppercase;
}

.scoreboard {
  background: #333;
  width: 700px;
  margin: 70px auto;
  box-shadow: 0 4px 0px #333;
  border-radius: 15px;

}

.header {
  padding: 5px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  background-color: #222;
  border-radius: 15px 15px 0 0;
  border-bottom: solid 2px #444;
}

.header h1 {
  flex-grow: 1;
  font-size: 1.5em;
  letter-spacing: 3px;
  font-weight: normal;
}

.header .stats,
.header .stopwatch {
  width: 170px;
}

.stats {
  margin-top: 0;
  font-weight: normal;
}

  .stats td:first-child {
    text-align: right;
    font-weight: normal;
    letter-spacing: 2px;
    color: #666;
    font-size: .7em;
  }

  .stats td:last-child {
    text-align: left;
  }

.stopwatch {
  padding: 15px 10px 5px 10px;
  margin: -5px -10px -5px 10px;
  background: #2f2f2f;
  border-radius: 0 15px 0 0;
}

  .stopwatch-time {
    font-family: monospace;
    font-size: 2em;
  }

  .stopwatch button {
    margin: 8px 5px;
    background-color: #222;
    border-radius: 5px;
    padding: 7px 8px;
    border: none;
    color: #999;
    letter-spacing: 2px;
    font-weight: bold;
    text-shadow: none;
    text-transform: uppercase;
  }

  .stopwatch button:hover {
    background: #4b71b5;
    color: #fafafa;
    cursor: pointer;
  }

  .stopwatch h2 {
    font-size: .6em;
    margin: 0;
    font-weight: normal;
    letter-spacing: 2px;
    color: #666;
  }

.player {
  display: flex;
  font-size: 1.2em;
  border-bottom: solid 2px #444;
  letter-spacing: 2px;
}

  .remove-player {
    visibility: hidden;
    margin-right: 10px;
    color: #e57373;
    cursor: pointer;
  }

  .player-name:hover .remove-player {
    visibility: visible;
  }

  .player-name {
    flex-grow: 1;
    padding: 20px 10px 10px 10px;
  }

  .player-score {
    width: 190px;
    background: blue;
  }

  .counter {
    display: flex;
  }

  .counter-action {
    border: none;
    font-weight: bold;
    color: #FAFAFA;
    display: block;
    padding: 20px 20px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .counter-action.increment {
    background: #66BB6A;
  }

  .counter-action.increment:hover {
    background: #549d59;
    cursor: pointer;
  }

  .counter-action.decrement {
    background: #ef5350;
  }

  .counter-action.decrement:hover {
    background: #c44442;
    cursor: pointer;
  }

  .counter-score {
    flex-grow: 1;
    background: #2b2b2b;
    color: #FAFAFA;
    text-align: center;
    font-family: monospace;
    padding: 10px;
    font-size: 2em;
  }


.add-player-form form {
  display: flex;
  background-color: #222;
  border-radius: 0 0 20px 20px
}

  .add-player-form input[type=text] {
    flex-grow: 1;
    border-width: 0 0 1px 0;
    margin: 15px 10px 15px 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: #333;
    border-style: none;
    text-shadow: none;
    text-transform: uppercase;
    color: #999;
    letter-spacing: 2px;
    outline: none;
  }

  .add-player-form input[type=text]::-webkit-input-placeholder{
    color: #666;
    letter-spacing: 2px;
  }

  .add-player-form input[type=text]:focus{
    background-color: #444;
  }

  .add-player-form input[type=submit] {
    display: block;
    font-size: .6em;
    margin: 15px 15px 15px 0;
    padding: 10px;
    background-color: #333;
    border-radius: 5px;
    border: none;
    color: #999;
    letter-spacing: 2px;
    font-weight: bold;
    text-shadow: none;
    text-transform: uppercase;
  }

  .add-player-form input[type=submit]:hover{
    background: #4b71b5;
    color: #fafafa;
    cursor: pointer;
  }
```
index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Scoreboard</title>
	<link rel="stylesheet" href="./app.css" />
</head>
<body>
  <div id="container">Loading...</div>
  <script src="./node_modules/react/dist/react.min.js" charset="utf-8"></script>
  <script src="./node_modules/react-dom/dist/react-dom.min.js" charset="utf-8"></script>
  <!-- <script src="./node_modules/babel-browser/browser.min.js" charset="utf-8"></script> -->
  <script src="./vendor/babel-browser.min.js" charset="utf-8"></script>
  <script type="text/babel" src="./app.jsx"></script>
</body>
</html>
```

## Properties
Used to customize our app

most common name for argument is `props`

function Application(props) {}

`ReactDOM.render(<Application title="My Scoreboard" />, document.getElementById('container'))`

Now if I want to output title in my page `props.title` won't work
Instead we need to use a jsx expression
an expression is wrapped in curly braces
* can appear inside elements or as value of attribute inside our elements
* so wrapping it in curly braces will now be regular JavaScript, so {props.title} will evaluate to `My Scoreboard`

remember inside the curly braces it HAS TO BE AN expression (something that returns a value)

we can not use an `if else` because that would be a JavaScript `statement` which does not evaluate to a value
* we just passed in an consumed a property

## PropTypes and DefaultProps
What if we forget to pass in a title? We'll have an empty header
In react we can document exactly which properties our components take, and what types they should be.
we can make a property required or provide a default value

app.jsx

```js
Application.propTypes = {
    title: React.PropTypes.string.isRequired,
};
```

this makes sure that title can only have a string value

## DefaultProps
Application.propTypes = {
    title: React.PropTypes.string,
};
Application.defaultProps = {
    title: "Scoreboard",
}

* we remove isRequired because with a default value, it is not needed
* fill out propTypes for each compoent (recommeneded)
    * makes debuggin a lot easier
    * makes code easier to read and use

## Decompose Application into smaller components
### Benefits
* we can take pieces of our repeated code and turn them into a reusable component
* its easier to work with many small components rather than a single large one
* each component can have a narrow use and limited markup associated with it
* larger components can be composed of smaller ones allowing us to abstract away the details of those smaller components

think of your app from a high level (describe it in words)
"A header with several players"

factor out a header component

app.jsx

```js
function Header(props) {
    return (
    <div className="header">
        <h1>{props.title}</h1>
    </div>
    );
}
Header.propTypes = {
    title: React.PropTypes.string.isRequired,
};
```

and use it in main App

```js
function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />

      <div className="players"></div>
      ...
    </div>
 );
}
```



