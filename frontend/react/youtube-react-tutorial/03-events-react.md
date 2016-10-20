ls# Events and React
very important point - when passing functions around you always want to bind them to `this`

* if we don't bind, it will execute to whatever is calling it

we add a input box and when we type inside it, it will update on change

`Layout.js`

```js
import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default class Layout extends React.Component {
	constructor( ) {
		super( );
		this.state = {
			title: "Rock it!"
		};
	}

	changeTitle( title ) {
		this.setState({ title: title })
		// es6 allow us to do this
		// this.setState({ title })
	}

	render( ) {

		return (
			<div>
				<Header changeTitle={this.changeTitle.bind( this )} title={this.state.title}/>
				<Footer/>
			</div>
		);
	}
}
```

`Header.js`

```js
import React from 'react';

import Title from './Header/Title';

export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }
	render( ) {

		return (
			<header>
        <Title title={this.props.title} name={this.props.name}/>
        <input type="text" onChange={this.handleChange.bind(this)} />
      </header>
		);
	}
}
```

## two way bound to the state of the title

https://bootswatch.com/
https://startbootstrap.com/template-categories/all/

https://github.com/Spartano/LearnCode.academy-REACT-JS-TUTORIAL

where the code for html is
https://github.com/learncodeacademy/react-js-tutorials/blob/f923c11ae2dfa921f4a7f7d25a47466ed1495eba/2-react-router/src/index.html

