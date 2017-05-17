# Mobile Menu Part 1
* We will focus on sidebar
* Currently does not show up on mobile devices
    - So on phone or tablet we have no way to switch notes

## Create Mobile Menu
* We will add the famous tri-bars for mobile menus

![tri-bars menu](https://i.imgur.com/dmG5nP7.jpg)

* We will add a click on the bars that will open the menu and show us an `X` that when you click it it will close
* The menu will close when you create a new note
* The menu will close when you switch to an existing note in the notes list
* When nav-tri icon is clicked we will target a Session variable
    - false to true (open)
    - true to false (close)
    - **isNavOpen** Session name
    - We will use Tracker.autorun()

```
.is-nav-open .page-content__sidebar {

}
```

* Will enable us to target sidebar only when the nav is open
* `is-nav-open` only exists when nav is open
* We will pass that dynamically through that Session variable

## Adding/Removing `is-nav-open` to DOM
`client/main.js`

```
Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false); // add this line
  ReactDOM.render(routes, document.getElementById('app'));
});
```

## Add images
* Create /public/images
    - Add bars.svg, favicon.png, x.svg

`Header.js`

```
// more code
return (
      <header className="header">
        <div className="header__content">
          <img src="/images/bars.svg" />
// more code
```

* import Session to `Header.js`

``

* Add in Container and PropType

```
Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired, // don't forget to add this comma!
  isNavOpen: PropTypes.bool.isRequired // add this line
};

export default createContainer(() => {
  return {
     handleLogout: () => Accounts.logout(), // don't forget to add this comma!
     isNavOpen: Session.get('isNavOpen') // add this line
  };
}, Header);
```

* Add variable with dynamic image

`Header.js`

```
// more code
export const Header = (props) => {

  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <header className="header">
      <div className="header__content">
        <img src={navImageSrc} />
// more code
```

## Practice in Console
* We'll change Session values using the console to make sure our current code is working
    - The tri-bar shows up when `isNavOpen` is false and the `X` shows up when `isNavOpen` is set to false

`> require('meteor/session')`

![show Session](https://i.imgur.com/iq3c26D.png)

`> Session.set('isNavOpen', true)` - should show `X`

`> Session.set('isNavOpen', false)` - should show **tri-bar**

## Exercise
Figure out a way to click and toggle tri-bar/X

<details>
  <summary>Solution</summary>
`Header`

```
// more code
export const Header = (props) => {

  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  const handleNavToggle = () => {
    Session.set('isNavOpen', !props.isNavOpen);
  }

  return (
    <header className="header">
      <div className="header__content">
        <img className="header__icon" onClick={handleNavToggle.bind(this)} src={navImageSrc} />
// more code
```
</details>

## Alternative Way
`Header`

```
// more code
export const Header = (props) => {

  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <header className="header">
      <div className="header__content">
        {/* add this propType */}
        <img className="header__icon" onClick={props.handleNavToggle} src={navImageSrc} />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout() }>Logout</button>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleNavToggle: PropTypes.func.isRequired, // add this line
  isNavOpen: PropTypes.bool.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    // add this line below
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen'),
  };
}, Header);
```

* Just get it working, it doesn't matter how
* You can always refactor later
* The latter method is recommended
    - pass in `handleNavToggle` as a prop
    - doing things like this (down below) because we only need to pass in the method we created
        + We don't have to inject Session
        + We don't have to use a global variable inside of our Components
        + We now have set it up so that anywhere in our app we can have access to `isNavOpen`

## Set a className on our markup
Will enable us to set up selectors

* We could do this a variety of ways
    - We could Containerize `Dashboard` but that would only work on a single page
* Instead we'll take things up a level `client/main.js`
    - And we'll add a new `Tracker.autorun()`
    - It will watch that Session variable `isNavOpen`

```
Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen'); 
});
```

* If it is true, we want to add a class onto the `body` of our HTML document
* If it is false, we want to remove that class from the `body` of our HTML document

### Using JavaScript to add/remove classes to HTML document
* Old days we used jQuery to do this
* Now we can safely use vanilla JavaScript

#### How does it work?
1. Get the element you want to access

`> document.body`

`> document.querySelector('body')`

* Either one works

### [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
* Available on every single method
* It has several useful methods

#### classList.add()
`> document.classList.add('test')`

* Inspect the source and you'll see that class was added to the `body`

#### classList.remove()

`> document.classList.remove('test')`

* Removes a class from the body if it exists

#### classList.toggle()
* If class exists it will remove it, if it doesn't it will add it
* classList.toggle('some-class-name', boolean)
    - You can pass in true or false
    - If it is true it will add the class
    - If it is false it will remove the class

`client/main.js`

```
Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
});
```

* Check it out in the chrome inspector
* Click tri-bar and it will add `is-nav-open` and if you click it again it will remove it
* We are trying to toggle this class based on the current value of our `isNavOpen` Session variable

We toggle it on:

![is-nav-open toggled on](https://i.imgur.com/fSaeNbP.png)

We toggle it off:

![is-nav-open toggled off(https://i.imgur.com/3JspVwy.png)]
