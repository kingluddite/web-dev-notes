# Custom Lightbox Part 2
* Add `X` To close modal
* Add JavaScript to make it work

```html
<div class="modal__close">X</div>
  </div><!-- /.modal -->
  <script src="/temp/scripts/App.js"></script>
</body>
</html>
```

* Add close button CSS

`_modal.css`

```css
.modal {
  position: fixed;
  z-index: 5;

  background-color: rgba($white, 0.94);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__description {
    font-size: 1.3rem;
    font-weight: 300;
    line-height: 1.65;
    text-align: center;
  }

  &__close {
    position: absolute;
    top: 15px;
    right: 15px;

    color: $mainBlue;
    font-size: 2rem;
    transform: scaleX(1.2);
    transform-origin: 100% 0;

    &:hover {
      color: $mainOrange;
      cursor: pointer;
    }
  }
}
```

## Vertical Center Modal content in viewport
`index.html`

* We put everything in our modal (_except the X_) inside a `div` with a class of `modal__inner`

```html
<div class="modal">
    <div class="modal__inner">
      <h2 class="section-title section-title--blue section-title--less-margin"><span class="icon icon--mail section-title__icon"></span>Get in <strong>Touch</strong></h2>
      <div class="wrapper wrapper--narrow">
        <p class="modal__description">Connect with us on any of the platforms below:</p>
      </div><!-- /.wrapper -->

      <div class="social-icons">
        <a href="#" class="social-icons__icon"><span class="icon icon--facebook"></span></a>
        <a href="#" class="social-icons__icon"><span class="icon icon--twitter"></span></a>
        <a href="#" class="social-icons__icon"><span class="icon icon--instagram"></span></a>
        <a href="#" class="social-icons__icon"><span class="icon icon--youtube"></span></a>
      </div><!-- /.social-icons -->
    </div><!-- /.modal__inner -->
    <div class="modal__close">X</div>
  </div><!-- /.modal -->
```

`_modal.css`

```css
&__inner {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  &__description {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 300;
    line-height: 1.65;
  }
```

`_section-title.css`

```css
&--less-margin {
    margin-bottom: 1.3rem;
    margin-top: 0; /* add this line */
  }
```

## Hide modal on page load
`_modal.css`

```
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba(255, 255, 255, .94);
  opacity: 0; // add this line
  z-index: 5;
```

## Houston we have a slight problem
* But if you hover over the page you will still see that the social icons are still clickable
* So just add `visability: hidden` and that will prevent the hand cursor from appearing over the social icons

```
.modal {
  position: fixed;
  z-index: 5;
  background-color: rgba(255, 255, 255, .94);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  visibility: hidden; /* add this line */
```

## Let's work on the JavaScript behavior
`/app/assets/scripts/modules/Modal.js`

```js
import $ from 'jquery';

class Modal {

}

export default Modal;
```

## Import and create new blueprint/class
`App.js`

```js
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import HighlightSection from './modules/HighlightSection';
import SmoothScrolling from './modules/SmoothScrolling';
import Modal from './modules/Modal'; // add this line
import $ from 'jquery';

const mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '60%');
const stickyHeader = new StickyHeader();
const highlightSection = new HighlightSection();
const smoothScrolling = new SmoothScrolling();
const modal = new Modal(); // add this line
```

## Less generic class name
* We add `open-modal` class name in case we have other `btn` instances on our page
* We obviously don't want the modal to open on every button click
* So we differentiate the buttons we want to open a modal by giving them a distinctive class name

```html
<div class="site-header__menu-content">
  <div class="site-header__btn-container">
    <a href="#" class="btn open-modal">Get in Touch</a>
  </div>
```

### Default link behvior - (return false)
* Our links have `href="#"`
* When links are clicked and have the `#` the browser default behavior is to scroll up to the top of the page
* We want to turn that default behavior off so we use `return false`

`Modal.js`

```js
import $ from 'jquery';

class Modal {
  constructor() {
    this.openModalButton = $('.open-modal');
    this.modal = $('.modal');
    this.closeModalButton = $('.modal__close');
    this.events();
  }

  events() {
    // clicking the open modal button
    this.openModalButton.click(this.openModal.bind(this));
    // clicking the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));
    // pushes the escape key
    $(document).keyup(function(event) {
      if (event.keyCode === 27) this.closeModalButton.click();
    });
  }

  openModal() {
    this.modal.addClass('modal--is-visible');
    return false;
  }

  closeModal() {
    this.modal.removeClass('modal--is-visible');
  }
}

export default Modal;
```

`_modal.css`

```
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba($white, 0.94);
  opacity: 0;
  transform: scale(1.2);
  transition: all .3s ease-out;
  visibility: hidden;
  z-index: 5;

  &--is-visible {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }
/* more code */
```

## Test it out
* Click `Get in Touch` and you see modal
* Click `X` and it closes
* Nice zoom animation effect

## Make the escape key work to close the modal
`Modal.js`

```js
events() {
  // clicking the open modal button
  this.openModalButton.click(this.openModal.bind(this));
  // clicking the x close modal button
  this.closeModalButton.click(this.closeModal.bind(this));
  // pushes the escape key
  $(document).keyup(this.keyPressHandler.bind(this));
}

keyPressHandler(event) {
  if (event.keyCode === 27) {
    this.closeModal();
  }
}
```

## Add the `open-modal` class to `Get Started Today` button and button in footer

```html
<p><a href="#" class="btn btn--orange btn--large open-modal">Get Started Today</a></p>
// more code
<footer class="site-footer">
  <div class="wrapper">
    <p><span class="site-footer__text">Copyright &copy; 2016 Clear View Escapes. All rights reserved.</span> <a href="#" class="btn btn--orange open-modal">Get in Touch</a></p>
  </div>
  <!-- /.wrapper -->
</footer>
// more code
```

* Test and you should find all 3 buttons open the modal window

## Next - Make our site load faster
Using lazy loading

