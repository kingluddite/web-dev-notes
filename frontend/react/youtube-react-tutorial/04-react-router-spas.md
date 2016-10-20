# react router and SPAs

npm install -S react-router

npm install -S history@1
(note history 2.0 only works with react 2.0 which is not out yet)

npm install

note: whenever you are running a script in npm, it automatically adds node_modules/.bin to the path

so you can change this inside `package.json`

```js
"scripts": {
    "dev": "./node_modules/.bin/webpack-dev-server --content-base src --inline --hot"
  },
```

to this

```js
"scripts": {
    "dev": "webpack-dev-server --content-base src --inline --hot"
  },
```

now you can run `$ npm run dev`

add this to client.js

`import { Router, Route, IndexRoute, hashHistory } from 'react-router'`

Now we don't want to render our Layout, we want to render our Router
client.js

```js
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Layout from "./pages/Layout";

const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
  </Router>,
app);
```
add a Route
```js
const app = document.getElementById('app');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Layout}></Route>
  </Router>,
app);
```

## add a sub Route

## adding param to URL
to go to a specific article

```js
<Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Featured}></IndexRoute>
      <Route path="archives/:article" component={Archives}></Route>
      <Route path="settings" component={Settings}></Route>
    </Route>
  </Router>
```

check out `path="archives/:article"`

now that route won't work unless you change the URL from

so change it to this `http://localhost:8080/#/archives/some-article?_k=81mylw`

add a `console.log()` in `Archives.js` to see the `this.props` value

```js
import React from "react";

export default class Featured extends React.Component {
  render() {
    console.log(this.props);
    return (
    <h1>Archives</h1>
    );
  }
}
```

check out the params in the console

![some article param value in console](https://i.imgur.com/KqVVkwr.png)

## Get params on the article page with this

```js
import React from "react";

export default class Featured extends React.Component {
  render() {
    console.log(this.props);
    return (
    <h1>Archives ({this.props.params.article})</h1>
    );
  }
}
```

## clean up the code a bit with this

```js
import React from "react";

export default class Featured extends React.Component {
  render() {
    console.log(this.props);
    const { params } = this.props;
    return (
    <h1>Archives ({params.article})</h1>
    );
  }
}
```

## clean up even more with

```js
import React from "react";

export default class Featured extends React.Component {
  render() {
    console.log(this.props);
    const { params } = this.props;
    const { article } = params;
    return (
    <h1>Archives ({article})</h1>
    );
  }
}
```
## query variables
change the URL to this (append `date=today` to end of URL)

`http://localhost:8080/#/archives/some-article2?_k=81mylw?date=today`

then check out console

![query param variables](https://i.imgur.com/DZrPIMD.png)

add filter to URL

`http://localhost:8080/#/archives/some-article2?_k=81mylw?date=today&filter=none`

![date and filter query to location of prop](https://i.imgur.com/pHM0Gd0.png)

## and show them on the archives page

```js
mport React from "react";

export default class Featured extends React.Component {
  render() {
    console.log(this.props);
    const { query } = this.props.location
    const { params } = this.props;
    const { article } = params;
    const { date, filter } = query;
    return (
      <div>
        <h1>Archives ({article})</h1>
        <h2>Location: {date}</h2>
        <h2>Filter: {filter}</h2>
      </div>
    );
  }
}
```

## make sure page doesn't break if no article is passed to archives page

```js
<Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Featured}></IndexRoute>
      <Route path="archives(/:article)" component={Archives}></Route>
      <Route path="settings" component={Settings}></Route>
    </Route>
  </Router>
```

## Add active links to navigation

Layout.js

```js
<Link
  to="archives"
  activeClassName="test"
  class="btn btn-primary">archives
</Link>
```
## check history isActive

```js
import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
	navigate( ) {
		// console.log( this.props );
		this.props.history.pushState( null, '/' );
	}
	render( ) {
    console.log(this.props.history.isActive('archives'));
		return (
			<div>
				<h1>KillerNews.net</h1>
				{this.props.children}
				<Link
          to="archives"
          activeClassName="test"
          class="btn btn-primary">archives
        </Link>
				<Link to="settings">
					<button class="btn btn-success">settings</button>
				</Link>
				<button onClick={this.navigate.bind( this )}>featured</button>
			</div>
		);
	}
}
```

will output `false` if not on achives page and true if you are

how can we use `class` in JSX and not `className`?

plugins: ['react-html-attrs'] in webpack.config.js automatically transpiles `class` to `className` in JSX!

make state collapsed (true) by default

```js
export default class Nav extends React.Component {
  constructor() {
    this.state = {
      collapsed: true;
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

// CODE here
}
```
and we have a method toggleCollapse that toggles the true/false value of `collapsed`

then just make our button fire toggleCollapse onClick

```js
<button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)}>
</button>
```

so now we can remove the bootstrap.native code

remove this from `client.js`
`import BootstrapNative from 'bootstrap.native';`

now we are 100% react, no bootstrap on the page, no jquery on the page

these would be the same

```js
const Articles = [
   'Some Article',
   'Some Other Article',
   'Another Article',
   'Oh, yeah, one more article',
].map((title, i) => <Article key={i} title={title}/> );

const Articles = [
  <Article title={'some title'}/>,
  <Article title={'some title'}/>,
  <Article title={'some title'}/>,
  <Article title={'some title'}/>
];
```

but you need an array needs a unique key

`warning.js:45 Warning: Each child in an array or iterator should have a unique "key" prop. `

this fixes error

```js
const Articles = [
      <Article key={1} title={'some title'}/>,
      <Article key={2} title={'some title'}/>,
      <Article key={3} title={'some title'}/>,
      <Article key={4} title={'some title'}/>,
      <Article key={5} title={'some title'}/>
    ]
```
map is a great way to output with a key with minumum effort



