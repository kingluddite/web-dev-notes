we are running a loader to load in all js
our babel will transpile back to IE8

we ignore js inside node_modules and bower_components

npm install
webpack
also webpack --watch

$ npm install -S webpack-dev-server

install webpack-dev-server globally

$ npm install -g webpack-dev-server

serve from inside the `src` folder

$ webpack-dev-server --content-base src

now you can go to localhost:8080

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React Tutorials</title>
    <!-- change this up! http://www.bootstrapcdn.com/bootswatch/ -->
    <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
  </head>

  <body>
    <div id="app"></div>
    <script src="client.min.js"></script>
  </body>
</html>
```

src/client.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
	render( ) {
		return (
			<h1>It works!</h1>
		);
	}
}

const app = document.getElementById( 'app' );

ReactDOM.render(
	<Layout/>, app);
```

`http://localhost:8080/webpack-dev-server/index.html`

loads into an iframe and refreshes every time

or this line helps us do a hot reload without crazy URL and iframes

`$ webpack-dev-server --content-base src --inline --hot`

but we want to add that to our package.json `script` so we have a shortcut to do it

`package.json`

```js
"scripts": {
    "dev": "webpack-dev-server --content-base src --inline --hot",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
`npm run dev` will run the above command for hot reload!

 we don't want all our developers to have to do a npm install -g web-dev-server

inside `node_modules` `bin` directory, you'll see it installs a `webpack-dev-server` modules folder

![webpack inside node_modules](https://i.imgur.com/c7SEVrB.png)

so we change `package.json` slightly to this:

```js
"scripts": {
    "dev": "./node_modules/.bin/webpack-dev-server --content-base src --inline --hot",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

now we can `$ npm uninstall -g webpack-dev-server`

now `$ npm run dev` will still work because I'm referencing the one that is inside my repository

return 1 parent tag
if you want to return multiple, just wrap them in a parent div
`error: BabelLoaderError: SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag (7:22)`

## dynamic data with `{}`

```js
class Layout extends React.Component {
	render( ) {
		const name = 'phil';
		return (
			<h1>Hello {name}</h1>
		);
	}
}
```

anything inside JSX in curly braces will execute as normal JSX

if you need logic, don't do it in JSX
you can do it in the render() method

always a good idea to keep your rendor() method clean

```js
class Layout extends React.Component {
	getVal( val ) {
		return 'Phil' + val;
	}
	render( ) {
		const name = 'phil';
		return (
			<h1>Hello {this.getVal( 1 )}</h1>
		);
	}
}

## constructor method
* you must call super() as the first line

```js
class Layout extends React.Component {
	constructor( ) {
		super( );
		this.name = 'Phil';
	}
	render( ) {
		return (
			<h1>Hello {this.name}</h1>
		);
	}
}
```

## components

take the Layout class and put it in its own file

`src/js/client.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';

const app = document.getElementById( 'app' );
ReactDOM.render(
	<Layout/>, app);
```

`js/components/Layout.js`

* capitalize component names

```js
import React from 'react';

export default class Layout extends React.Component {
	constructor( ) {
		super( );
		this.name = 'Phil';
	}
	render( ) {
		return (
			<h1>Hello {this.name}</h1>
		);
	}
}
```

## create a Header and Footer component
* save Layout as Footer.js
* keep imports in alphabetical order

`src/js/components/Header.js`

```js
import React from 'react';

export default class Header extends React.Component {

	render( ) {
		return (
			<header>Header</header>
		);
	}
}
```

`src/js/components/Footer.js`

```js
import React from 'react';

export default class Layout extends React.Component {

	render( ) {
		return (
			<footer>Footer</footer>
		);
	}
}
```
## folder structure

root
* src
  + js
    - components
     * Header
      + Title.js
     * Footer.js
     * Header.js
     * Layout.js
  + client.js

`src/js/components/Header.js`

```js
import React from 'react';

import Title from './Header/Title';

export default class Header extends React.Component {

	render( ) {
		return (
			<header>
        <Title />
      </header>
		);
	}
}
```

`src/js/components/Header/Title.js`

```js
import React from 'react';

export default class Title extends React.Component {

	render( ) {
		return (
			<h1>Welcome!</h1>
		);
	}
}
```

