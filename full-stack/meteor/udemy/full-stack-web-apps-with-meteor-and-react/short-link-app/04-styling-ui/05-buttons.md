# Button Styles

## Add base style for `p`
`_base.scss`

```
p {
  margin-bottom: $space;
}
```

* Now the `p` in `NotFound` and our validation errors will all have the same space

`_button.scss`

* Remember to import this into `_main.scss`

```
.button {
  font-size: $base-font-size;
  padding: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  color: $button-bg; // add this to variables and use #5b4681
  border: 0;
  background-color: #5b4681;
}
```

![looking good](https://i.imgur.com/ilQSsVp.png)

## Add a button modifier (BEM)
`_button.scss`

```
.button {
  font-size: $base-font-size;
  padding: $input-spacing;
  cursor: pointer;
  margin-bottom: $space;
  text-transform: uppercase;
  color: #ffffff;
  border: 0;
  background-color: $button-bg;
}

// button modifier
.button--link {
  display: inline-block;
  text-decoration: none;
}
```

* This allows our spacing with other elements like `p` to have an impact
    - We need an **inline-block** or **block-level** element to make this possible
    - By default anchor tags are **inline** elements

`NotFound`

* We add `button button--link` classes to our React Router `Link`

```
import React from 'react';
import { Link } from 'react-router';

export default () => {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Page Not Found</h1>
          <p>Hmmm, we're unable to find that page</p>
          <Link to="/" className="button button--link">HEAD HOME</Link>
        </div>
      </div>
    );
};
```

![Link Modifier](https://i.imgur.com/AzQjNZZ.png)

**note** We just add a class of `button` to **Login** and **Signup** Components because they are buttons but we needed to add the modifier to `Link` because it really is an `a` tag that is **inline** by default

## Login to your app
Hint: It won't look pretty. It actually looks worse now that we added all these styles

### Time to make is pretty
`AddLink` - Add our `button` class

`<button className="button" onClick={this.openModal}>+ Add Link</button>`

### Pill Buttons
![Pill Buttons](https://i.imgur.com/q7RZNw7.png)

Next we'll style these buttons. Since it is a modification of our `button` class we'll create a new modifier inside `_button.scss`

`LinksListItem.js`

* We add `className="button button--pill button--link"` because the first is an `a` tag
* We add `className="button button--pill"` to our three buttons

```
render() {
    return (
       <div>
         <p>{this.props.url}</p>
         <p>{this.props.shortUrl}</p>
         <p>{this.props.visible.toString()}</p>
         {this.renderStats()}
         <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
           Visit
         </a>
         <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
           {this.state.justCopied ? 'Copied' : 'Copy'}
         </button>
         <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
         }}>
           {this.props.visible ? 'Hide' : 'Unhide'}
         </button>
       </div>
    );
  }
```

## Test
[Looks like this](https://i.imgur.com/jaWj5EF.png)

`_boxed-view.scss`

```
.button {
  font-size: $base-font-size;
  padding: $input-spacing;
  cursor: pointer;
  margin-bottom: $space;
  text-transform: uppercase;
  color: #ffffff;
  border: 0;
  background-color: $button-bg;
}

// button modifier
.button--link {
  display: inline-block;
  text-decoration: none;
}

// we add these styles
.button--pill {
  background-color: transparent;
  border: 1px solid $button-pill-color;
  color: $button-pill-color;
}
```

## Update our variables
`_variables.scss`

```
// Colors
$grey: #dddddd;
$white: #ffffff;
$purple: #5b4681;

// Spacing
$space: 1.4rem;

// Font sizes
$base-font-size: 1.6rem;

// Form inputs
$input-border: $grey;
$input-spacing: 1rem;

// Boxed view
$boxed-view-overlay-bg: $grey;
$boxed-view-bg: $white;

// Links
$link-color: #000000;

// Button
$button-bg: $purple;
$button-color: $white;
$button-pill-color: $purple;
```

## Line-height issue
If we add `line-height` to our `.button` class and set it to `1.2` 

```
.button {
  font-size: $base-font-size;
  padding: $input-spacing;
  cursor: pointer;
  line-height: 1.2;
  margin-bottom: $space;
  text-transform: uppercase;
  color: #ffffff;
  border: 0;
  background-color: $button-bg;
}
```

## Test
Our buttons will now look like this:

![buttons lined up](https://i.imgur.com/tRkp7u0.png)

### Remove the poor man's reset from `_base.scss`
```
* {
    margin: 0;
    padding: 0;
}
```

And replace withe the `meteor-normalize` [package](https://atmospherejs.com/johnantoni/meteor-normalize)

`$ meteor add johnantoni:meteor-normalize`

## Making our Modals show our Login and Signup
Inspect our modal by clicking The `+ Add Link` button to open it

![modal inspect](https://i.imgur.com/yUB8eLZ.png)

* You'll see the overlay
* And you'll see the Modal content

## Add props to Modal
* className
* overlayClassName

```
<Modal
  isOpen={this.state.modalIsOpen}
  contentLabel="Add link"
  onAfterOpen={() => this.refs.url.focus()}
  onRequestClose={this.closeModal}
  className="test1"
  overlayClassName="test2"
>
```

Now open Modal by clicking button and you will see by adding our own class names we overwrote the Modal classes

## Add our class names
```
<Modal
  isOpen={this.state.modalIsOpen}
  contentLabel="Add link"
  onAfterOpen={() => this.refs.url.focus()}
  onRequestClose={this.closeModal}
  className="boxed-view__box"
  overlayClassName="boxed-view"
>
```

* It looks better but it is not overlaying and is at bottom of page

## Add new boxed view modifier
`AddLink` 

Modify our last prop with:

`overlayClassName="boxed-view boxed-view--modal"`

**note**

`position: fixed` - Is relative to the user's viewport (visible part of web page). It will stay in that position regardless of you scroll. So if you have a fixed position set to 20px from the top of the viewport. You can scroll but the item will always be 20px from the top of the viewport (It is relative to the browser, not relative to the top of the page)

## Transparent Background with Sass function
[Documentation for Sass fade_out function](http://sass-lang.com/documentation/Sass/Script/Functions.html#fade_out-instance_method)

```
// take up entire space of viewport
.boxed-view__modal {
  background: fade-out($boxed-view-overlay-bg, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

## Test
Your Modal has a transparent background and if you have a lot of links you can scroll but your modal will stay fixed

## Add classes to our Add Link form
```
<form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
            <button className="button">Add Link</button>
          </form>
          <button className="button button--link" onClick={this.closeModal}>Cancel</button>
        </Modal>
```

![Add Link](https://i.imgur.com/D213OWs.png)

* `Cancel` button (I changed the name from `close` to `Cancel`) is not stretching out because it is not part of our form and Flexbox is not styling it
* We move the `Cancel` button inside our form but by default buttons inside the form will submit by default
* So we change `type` to **button** like this:

```
<button className="button">Add Link</button>
</form>
<button type="button" className="button" onClick={this.closeModal}>Cancel</button>
```

### Make our Cancel button a different style
Modify the cancel button

`<button type="button" className="button button--default" onClick={this.closeModal}>Cancel</button>`

### Bug in Code
I was calling the wrong function name. Should have called `this.closeModal()` instead of `this.modalClose()`

```
onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.closeModal();
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
```

## Test
All the functionality should work

## Next
What our code should look like at this point
