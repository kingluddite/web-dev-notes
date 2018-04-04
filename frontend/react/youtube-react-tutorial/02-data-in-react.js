# Data

## state
by default is null
`this.state === null`

only set state in the constructor method

cool thing about state - whenever stage changes on a component,
the component will rerender and update the DOM if there are any changes * if there are no changes,
the DOM won 't get changed at all

that is the first amazing thing that React brought to the world * because it manages a virtual DOM for you * it also when it updates,
it does it in the most efficient way

javascript is very fast but the DOM is really slow * whenever we go to a webpage and update the DOM,
that is the slow part of any web page

### setStage( )
this is the one method you NEED to know with state in console click more options and find `Rendering Options`

![ `Rendering Options` ]( https : //i.imgur.com/Mbwzyhl.png)

check the `Paint Flashing` checkbox in Rendering This shows you what parts of the page need to be updated

```js
import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
	constructor( ) {
		super( );
		this.state = {
			name: 'Phile'
		}
	}

	render( ) {
		setTimeout( ( ) => {
			this.setState({ name: 'Bob' });
		}, 1000 );
		return (
			<div>
				{this.state.name}
				<Header/>
				<Footer/>
			</div>
		);
	}
}
```
You will see that Bob is highlighted in green because that is only part of page that needs to be repainted

state only gets used if a component has an internal value that only affects that component and doesn't affect any of the rest of the app

if there is something that affects layout and affect absolutely nothing else, state may be appropriate

aside from that you want to use Props

## Props
props are injected into every other component

how to inject props into components

`src/js/components/Layout.js`
```js
import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {

	render( ) {
		const title = 'Welcome Phil';
		return (
			<div>
				<Header title={title} name='some string'/>
				<Footer/>
			</div>
		);
	}
}
```

`src/js/components/Header.js`

```js
import React from 'react';

import Title from './Header/Title';

export default class Header extends React.Component {

	render( ) {
    console.log(this.props);
		return (
			<header>
        <Title/>
      </header>
		);
	}
}
```
and now you will see an object has been created with your props inside it

![inside the console](https://i.imgur.com/QtKAX0E.png)

## multiple versions of a header

`Layout.js`

```js
import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {

	render( ) {
		const title = 'Welcome Phil';
		return (
			<div>
				<Header title={title} name='some string'/>
				<Header title={"I'm another title"}/>
				<Footer/>
			</div>
		);
	}
}
```
now if you check out the console you will see we have two different instances of the Header component

![multiple Header component instances](https://i.imgur.com/t4LaqBJ.png)

now we have our layout with a Header component that has 2 instances with diffferent properties

how do I pass them down to other components

here is `Header.js`

```js
import React from 'react';

import Title from './Header/Title';

export default class Header extends React.Component {

	render( ) {

		return (
			<header>
        <Title title={this.props.title} name={this.props.name}/>
      </header>
		);
	}
}
```

and here is `components/Header/Title.js`

```js
import React from 'react';

export default class Title extends React.Component {

	render( ) {
		return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.name}</p>
      </div>
		);
	}
}
```

and this is what the output will look like

![output with props injected](https://i.imgur.com/eooNraZ.png)

## state with props
the page will show one title and then update it with a new state title 3 seconds later (only the part of the DOM that updates changes)

`Layout.js`

```js
import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
  constructor(){
    super();
    this.state = {
      title: "Rock it!",
    };
  }

	render( ) {
    setTimeout(() => {
      this.setState({title: "Keep it Rocking!"})
    }, 3000);

		return (
			<div>
				<Header title={this.state.title} name='some string'/>
				<Header title={"I'm another title"}/>
				<Footer/>
			</div>
		);
	}
}
```

