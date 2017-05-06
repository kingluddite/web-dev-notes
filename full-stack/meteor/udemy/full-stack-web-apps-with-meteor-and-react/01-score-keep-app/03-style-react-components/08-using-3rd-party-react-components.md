# Using 3rd-Party React Components (FlipMove)
We don't have to write all code by ourselves. We can use other people's Component's and that saves us time from writing and maintaining code that is not essential to our app

We will drop in a Library that adds nice animations to lists

## Mobile Design
Our app looks crappy on a phone

![mobile layout](https://i.imgur.com/KOsspzD.png)

Left is ugly un-responsive Desktop site and right is nice mobile responsive design

## Easy Change
We'll add one line (_meta tag_) in our `main.html` and this tag will tell our **viewport** how to operate with our website. 

**note** This is very standard and Google officially recommends this technique

`main.html`

```
<head>
  <title>Score Keep</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>

<body>
  <div id="app"></div>
  <!-- /#app -->
</body>
```

* You should copy and paste this meta tag on every single project you work on
* Think of `name` and `content` attributes as **key/value** pairs
    - `name` is the thing and `content` is the value
    - We want to set `viewport` and we want its value to be a width, we don't want the width to be static but to change depending on the width of the browser
    - The `content` attribute takes a comma-separated list of **key/value** pairs
    - **initial-scale** - This will fix some bugs when rotating from portrait to landscape mode making sure we always have a nice scale for our app

After we add that our `app` will look like the right side of the above image inside a phone browser

## The children prop
Allows you to pass JSX into your Components

Currently inside `App` we are using 3 self-closing Component instances. What if we changed one to an open and close tag and added JSX inside it?

`App`

```
// more code
return (
      <div>
        <TitleBar title={this.props.title} slogan="You can only win if someone keeps score!"/>
        <div className="wrapper">
          <PlayerList players={this.props.players} />
          <AddPlayer>
            <h1>Test</h1>
          </AddPlayer>
        </div>
      </div>
    );
// more code
```

* How does `AddPlayer` take advantage of the `<h1>Test</h1>` JSX?
* If you view the browser you won't see `<h1>Test</h1>`
    - We need to tell `AddPlayer` explicitly what to do with any JSX that might get passed in

`AddPlayer`

```
// more code
render() {
    return (
      <div className="item">
        {this.props.children}
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
// more code
```

* Above we are accessing a `prop` that we personally didn't pass in (_this is a built in one `this.props.children`_)
* After we make the change, and we get a **full page refresh** we will then see our `Test` text

`App`

```
<AddPlayer>
  <h1>Test</h1>
  <p>Another test</p>
</AddPlayer>
```

And now we will see our `H1` and `P` with their respective content wherever we use `this.props.children`

![children](https://i.imgur.com/KimR5lt.png)

### Introducing 3rd Party Components
We are going to use this exact same technique when using **3rd Party Components**

Remove that code we just added. We were only using it to illustrate a point

### Installing FlipMove
[github link](https://github.com/joshwcomeau/react-flip-move)

`$ npm i -S react-flip-move`

### Read Documentation and see if you can add FlipMove
Import it

`PlayerList`

```
import React, { Component } from 'react';
import Player from './Player';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move'; // add this line
// more code
```

And Add this:

```
// more code
render() {
    return (
      <div>
        <FlipMove>
          {this.renderPlayers()}
        </FlipMove>
      </div>
    );
  }
// more code
```

## Test it out
You should see the animation working. 

### Houston we have a problem
But there is a problem when you remove the last player

## Fix Problem
[maintainContainerHeight](https://github.com/joshwcomeau/react-flip-move/blob/master/documentation/api_reference.md#maintaincontainerheight)

```
render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderPlayers()}
        </FlipMove>
      </div>
    );
  }
```

### 3rd Party Bugs
I've fallen and I can't get up

[bug](https://github.com/joshwcomeau/react-flip-move/issues/138)

That is a link to a problem with a recent **React** upgrade and recommendation. It won't break the app but reading shows how the community works with open source code

```
So, the solution to this problem is to use the prop-types package instead of importing them from react.

The prop-types package is only compatible with React 15 and the just-penned release of 0.14.9.

Lamely, I think this would need to be a major version bump, to avoid breaking things for users who use 0.14.8 and earlier. Which is annoying, since likely another major version bump will be required when React 16 comes out.

I think the simplest thing is just to allow the deprecation warnings for now. When React 16 comes out, Flip Move 3 will come out and will include this change. The deprecation warnings should only happen in dev, so it's not user-facing.

If anyone disagrees with this approach (or sees a better way), happy to discuss!
```

Searching github issues can help you find solutions to problems with ever-changing software



