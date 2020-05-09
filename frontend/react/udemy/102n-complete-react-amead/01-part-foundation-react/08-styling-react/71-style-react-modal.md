# Style React Modal
* Unstyled Modal

![unstyled modal](https://i.imgur.com/YjRyCxy.png)

* This is a 3rd party module
* Comes with own
    - DOM structure
    - CSS classes

## How we we work with this
* Same as before
    - Create our own classes
    - Style those classes
    - Add them to our JSX

## Use Chrome Elements panel to discover what you need to change
* It is best to dock your chrome dev to the right like below:
 
![dock to right](https://i.imgur.com/iMAvxi7.png)

![dock on right](https://i.imgur.com/KixKWlB.png)

```
<div class="ReactModal__Overlay ReactModal__Overlay--after-open" aria-modal="true" ...>MORE CODE</div>
```

* You see they are using BEM
    - structure is
    - `ReactModal__Body--open` (in body when open)
        + `ReactModalPortal` (root element of React Modal)
            *`ReactModal__Overlay`
                - `ReactModal__Content`
                    + **Our Content**

![structure](https://i.imgur.com/RsU3Oq1.png)

* For all 3rd party components you do the same thing
* You analyze their structure and styles and manipulate them to your own situation

## Our tasks
* Change size of Modal box
* Add transition effect to smooth open and closing of Modal

## New file
* `/src/styles/components/_modal.scss`
* import that style component into `styles.scss`

`.ReactModalPortal > div` ----> only target direct `div` descendent's of `.ReactModalPortal`

```
.ReactModalPortal > div {}
```

* This is the root element of the React Modal component `<div class="ReactModalPortal></div>`

### Modal Opacity
* When modal opens we'll start it off with an opacity set to `0` (invisible)
* Here is what the code looks like before you click the button

![no click no modal](https://i.imgur.com/xvMWcrm.png)

* Just and empty `ReactModalPortal` element

`_modal.scss`

```
.ReactModalPortal > div {
  opacity: 0.5;
}
```

* Test in UI and click `What should I do?` button
* You will see the modal is transparent

![now modal has code](https://i.imgur.com/WQoy2iB.png)

* Look and see the React__Overlay--after-open class
* If we add a transition like below it won't work

```
.ReactModalPortal > div {
  opacity: 0.5;
}
//
.ReactModalPortal .ReactModal__Overlay {
  opacity: 1;
  transition: opacity 200ms ease-in-out;
}
```

* It shows up right away and we don't want this
* Using the `React__Overlay--after-open` class we can use this to then call the transition code

### Animate as the modal opens

```
.ReactModalPortal > div {
  opacity: 0;
}

.ReactModalPortal .ReactModal__Overlay {
  transition: opacity 200ms ease-in-out;
}

.ReactModalPortal .ReactModal__Overlay--after-open {
  opacity: 1;
}

```

* Click `What should I do?` button and the modal will fade in
* But fade out is jarring when you close it
* It is harder to work with this because when you click close the entire element is gone

## ReactModal guts the entire empties ReactModalPortal right away
* This means there's no time for the transition to take place
* Transitioning in is easy, Transitioning out is harder
  - ReactModal gives us a tool to make this easier
* To see what is happening let's add this:

## closeTimeoutMS
* This is a property that we can tell ReactModal to wait before "gutting" the modal
* We'll wait 4 full seconds to see the effect

`OptionModal.js`

```
const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
    closeTimeoutMS={4000}
  >
```

* View chrome console elements tab and you'll see (we added the `closeTimeoutMS` property that we found in the ReactModal documentation and this tells us how long to wait before we remove the React Modal element 4000 milliseconds === 4 seconds)
* We see that we have access to a style called `ReactModal__Overlay--before-close`
    - We'll target this to add our fade out
    - Other wise we won't be able to fade it out

* Set the time back to 200 milliseconds
* And we'll target the `ReactModal__Overlay--before-close` modifier

```
const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
    closeTimeoutMS={200}
```

`_modal.scss`

```
.ReactModalPortal>div {
  opacity: 0;
}

.ReactModalPortal .ReactModal__Overlay {
  transition: opacity 200ms ease-in-out;
}

.ReactModalPortal .ReactModal__Overlay--after-open {
  opacity: 1;
}

// add this 
.ReactModalPortal .ReactModal__Overlay--before-close {
  opacity: 0;
}
```

## It works now!
* You should now be able to fade/out your modal on open and close

## Style the Modal box itself
* Currently it is just white
* Analyze the CSS of the `ReactModal__Overlay` and you'll see this:

```
position: absolute;
top: 40px;
left: 40px;
right: 40px;
bottom: 40px;
border: 1px solid rgb(204, 204, 204);
background: rgb(255, 255, 255);
overflow: auto;
border-radius: 4px;
outline: none;
```

## Override styles
* We could target that style but `ReactModal` gives us access to `className` where we supply it our name and our custom class will override their default styles

```
// MORE CODE
const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
    closeTimeoutMS={200}
    className="modal"
  >
// MORE CODE
```

* After saving and viewing our React Modal things look a lot worse
* We add our custom style to `_modal.scss`

```
// MORE CODE
.ReactModalPortal .ReactModal__Overlay--before-close {
  opacity: 0;
}

.modal {
  background: $light-blue;
}
```

And we use `flexbox` to center our box vertically and horizontally in the browser

```
.ReactModalPortal .ReactModal__Overlay {
  align-items: center;
  display: flex;
  justify-content: center;
  transition: opacity 200ms ease-in-out;
}
```

![centered](https://i.imgur.com/kmOSGtx.png)

```
.modal {
  background: $light-blue;
  color: white;
  max-width: 30rem; // keeps from growing too large and wraps text when reach limit
  outline: none; // removes blue accessibility border
  padding: $l-size;
  text-align: center;
}
```

![better box](https://i.imgur.com/WDz07SR.png)

## Fix stuff inside box
* Organize better
* Break off react-modal changes and custom modal changes into two files:
    - `_react-modal.scss`
    - `_custom-modal.scss`
* Add new classes for modal

`styles.scss`

```
// MORE CODE
@import './components/react-modal';
@import './components/custom-modal';
@import './components/option';
@import './components/widget';
```

`_react-modal.scss`

```
.ReactModalPortal>div {
  opacity: 0;
}

.ReactModalPortal .ReactModal__Overlay {
  align-items: center;
  display: flex;
  justify-content: center;
  transition: opacity 200ms ease-in-out;
}

.ReactModalPortal .ReactModal__Overlay--after-open {
  opacity: 1;
}

.ReactModalPortal .ReactModal__Overlay--before-close {
  opacity: 0;
}
```

`_custom-modal.scss`

```
.custom-modal {
  background: $light-blue;
  color: white;
  max-width: 30rem;
  outline: none;
  padding: $l-size;
  text-align: center;

  &__title {
    margin: 0 0 $m-size 0;
  }

  &__content {
    font-size: 2rem;
    font-weight: 300;
    margin: 0 0 $l-size 0;
  }
}
```

`OptionModal.js`

```
// MORE CODE
const OptionModal = props => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearSelectedOption}
    closeTimeoutMS={200}
    className="custom-modal"
  >
    <h3 className="custom-modal__title">Selected Option</h3>
    {props.selectedOption && (
      <p className="custom-modal__content">{props.selectedOption}</p>
    )}
    <button className="button" onClick={props.handleClearSelectedOption}>X</button>
  </Modal>
);
// MORE CODE
```

* We update the className from `modal` to `custom-modal`
* We add our `button` className
* And we give classes to our title and content for our modal
* This is what it looks like now:

![final modal](https://i.imgur.com/djJGkEq.png)

### Edge cases
* Create option with really long text
    - It will look good (and wrap) in the modal and in Option
* But really long word breaks our interface
    - Words don't break
    - We have to use CSS to make this look good and wrap using `word-break: break-all`

`_custom-modal.scss`

```
// MORE CODE
  &__content {
    font-size: 2rem;
    font-weight: 300;
    margin: 0 0 $l-size 0;
    word-break: break-all;
  }
}
```

* That will fix the modal to make the word wrap

`_option.scss`

```
.option {
  border-bottom: 1px solid lighten($light-blue, 10%);
  display: flex;
  justify-content: space-between;
  padding: $l-size $m-size;

  &__content {
    color: white;
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    word-break: break-all; // add this line
  }
}
```

![word break](https://i.imgur.com/3xfV7ah.png)

## Our app is styled

### Next - Mobile considerations for our app
