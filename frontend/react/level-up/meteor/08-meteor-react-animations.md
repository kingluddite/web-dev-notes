# React Meteor Animations
[meteor for everyone tutorial](https://www.youtube.com/watch?v=hgjyr6BPAtA&list=PLLnpHn493BHECNl9I8gwos-hEfFrer7TV
)

[intermediate meteor](https://www.youtube.com/watch?v=BI8IslJHSag&list=PLLnpHn493BHFYZUSK62aVycgcAouqBt7V)

`$ npm install --save react-addons-css-transition-group`

modify `ResolutionsContainer.js`

```js
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Navigation } from './Navigation';import React from 'react';

import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


import ResolutionsForm from './ResolutionsForm';
import ResolutionSingle from './ResolutionSingle';

Resolutions = new Mongo.Collection( 'resolutions' );

export default class ResolutionsWrapper extends TrackerReact( React.Component ) {
	constructor( ) {
		super( );

		this.state = {
			subscription: {
				resolutions: Meteor.subscribe( 'userResolutions' )
			}
		}
	}

	componentWillUnmount( ) {
		this.state.subscription.resolutions.stop( );
	}

	resolutions( ) {
		// find all resolutions
		return Resolutions.find( ).fetch( )
	}

	render( ) {
		let res = this.resolutions( );

		return (
			<div>
				<h1>My Resolutions - {Session.get( 'test' )}</h1>
				<Navigation/>
				<ResolutionsForm/>
				<ul className="resolutions">
          <ReactCSSTransitionGroup
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            >
  					{this.resolutions( ).map(( resolution ) => {
  						return <ResolutionSingle key={resolution._id} resolution={resolution}/>
  					})}
          </ReactCSSTransitionGroup>
				</ul>
			</div>
		)
	}
}
```

Now it slides in and out animations

it tracks down `styles.styl` and finds this:

```stylus
.resolutionLoad-enter
    opacity: 0
    animation: slideIn 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)

.resolutionLoad-leave
    animation: slideOut 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)
    opacity: 1.0
    @keyframes slideIn
        0%
            opacity 0
            transform translate3d(-50px, 0, 0)
        100%
            opacity 1
            transform translate3d(0, 0, 0)

    @keyframes slideOut
        0%
            opacity 1
            transform translate3d(0, 0, 0)
        100%
            opacity 0
            transform translate3d(50px, 0, 0)

    @keyframes slideUp
        0%
            opacity 0
            transform translate3d(0, 60px, 0)
        100%
            opacity 1
            transform translate3d(0, 0, 0)
```

there was a jump in the animation so we comment out the opacity

```stylus
.resolutionLoad-enter
    // opacity: 0
    animation: slideIn 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)

.resolutionLoad-leave
    animation: slideOut 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)
    // opacity: 1.0
```

and now it no longer jumps

why use `translate3d`?
it enables the graphics processor
so your animations will be smoother

now if I want to get rid of the UL and add it to our RCTG (ReactCSSTransitionGroup) I make the following change:

```js
<ReactCSSTransitionGroup
  component="ul"
  className="resolutions"
  transitionName="resolutionLoad"
  transitionEnterTimeout={600}
  transitionLeaveTimeout={400}
  >
  {this.resolutions( ).map(( resolution ) => {
    return <ResolutionSingle key={resolution._id} resolution={resolution}/>
  })}
</ReactCSSTransitionGroup>
```

## Page Transitions
[video #20](https://www.youtube.com/watch?v=UptJPJpKVeo&index=20&list=PL6klK99EwGXj6IED7wO8V9nJJIj4_vpDh)

syltes.styl

```stylus
.route-enter, .route-appear
    opacity: 0
    animation: slideIn 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)

.route-leave
    animation: slideOut 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)
    opacity: 1.0

.route-appear
    opacity: 0
    animation: slideUp 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
```

`imports/ui/pages/About.js`

```js
import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class About extends Component {

  setVar() {
    Session.set('Meteor.loginButtons.dropdownVisible', true);
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="route"
        transitionEnterTimeout={600}
        transitionLeaveTimeout={400}
        <h1>About Us</h1>
        <p>Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus. Cras ultricies ligula sed magna dictum porta. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <button onClick={this.setVar}>Sign Up</button>
      </ReactCSSTransitionGroup>
    )
  }
}
```
view in browser and you will not see any page transitions. Why?

make this change

```js
<ReactCSSTransitionGroup
        component="div"
        transitionName="route"
        transitionEnterTimeout={600}
        transitionAppearTimeout={600}
        transitionLeaveTimeout={400}
        transitionAppear={true}
        >
```

and add a page transition to the `ResolutionsWrapper` page

```js
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Navigation } from './Navigation';

import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


import ResolutionsForm from './ResolutionsForm';
import ResolutionSingle from './ResolutionSingle';

Resolutions = new Mongo.Collection( 'resolutions' );

export default class ResolutionsWrapper extends TrackerReact( React.Component ) {
	constructor( ) {
		super( );

		this.state = {
			subscription: {
				resolutions: Meteor.subscribe( 'userResolutions' )
			}
		}
	}

	componentWillUnmount( ) {
		this.state.subscription.resolutions.stop( );
	}

	resolutions( ) {
		// find all resolutions
		return Resolutions.find( ).fetch( )
	}

	render( ) {
		let res = this.resolutions( );

		return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="route"
        transitionEnterTimeout={600}
        transitionAppearTimeout={600}
        transitionLeaveTimeout={400}
        transitionAppear={true}
        >
				<h1>My Resolutions - {Session.get( 'test' )}</h1>
				<Navigation/>
				<ResolutionsForm/>
          <ReactCSSTransitionGroup
            component="ul"
            className="resolutions"
            transitionName="resolutionLoad"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={400}
            >
  					{this.resolutions( ).map(( resolution ) => {
  						return <ResolutionSingle key={resolution._id} resolution={resolution}/>
  					})}
          </ReactCSSTransitionGroup>

			</ReactCSSTransitionGroup>
		)
	}
}
```

#FIN 