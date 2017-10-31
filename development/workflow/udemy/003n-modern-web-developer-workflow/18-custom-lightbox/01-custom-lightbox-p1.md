# Custom Lightbox Part 1

## Git Stuff
`$ git status`

* Add all changes with:

`$ git all -A`

* Commit changes

`$ git commit -m 'Complete sticky header functionality`

* Merge branch into master

`$ git checkout master`

`$ git merge reveal-on-scroll`

`$ git push origin master`

* Add new branch

`$ git checkout -b create-modal`

## Create a Modal/Overlay (aka Lightbox)
`index.html`

* **note** We now have a `wrapper--narrow` class that we will use to house our modal description
* **note** We also added `section-title--less-margin"`

```html
// more code
  <div class="modal">
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
  </div><!-- /.modal -->
  <script src="/temp/scripts/App.js"></script>
</body>
</html>
```

## Create CSS module
`/app/assets/styles/modules/_modal.css`

```css
.modal {
  /* we want the modal to cover the entire browser */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: rgba($white, 0.94);
  z-index: 5;

  &__description {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 300;
      line-height: 1.65;
    }
}
```

## Import the css module
`styles.css`

```css
// more code
@import "modules/_modal";
```

* A white box covers the site

`_wrapper.css`

```
// more code
  &--narrow { /* add this rule */
    max-width: 470px;
  }

  .wrapper {
    padding-left: 0;
    padding-right: 0;
  }

  &--b-margin {
    margin-bottom: 1rem;

    @mixin atSmall {
      margin-bottom: 3.875rem;
    }
  }
}
```

* Remove the bottom margin

`_section-title.css`

```
// more code
&--blue {
  color: $mainBlue;
}

&--less-margin {
  margin-bottom: 1.3rem;
}
// more code
```

## Add social network icons
* We name this class `social-icons` because we might use this other places beside the modal

`/app/assets/styles/modules/_social-icons.css`

```
.social-icons {
  text-align: center;

  &__icon {
    background-color: $mainOrange;
    display: inline-block;

    .icon {
      display: block;
    }
  }
}
```

* All of the social media icons will sit on a single line but `inline-block` enables us to give them a custom height if we need to

## Import it
`styles.css`

```
// more code
@import "modules/_social-icons";
```

* `transform: translate(-50%, -50%);`
    - Pull it back up half of it's own width
    - Pull it back up half of it's own height

`_social-icons.css`

```css
.social-icons {
  text-align: center;

  &__icon {
    position: relative;

    background-color: $mainOrange;
    display: inline-block;
    height: 72px;
    margin: 0 5px 5px 5px;
    width: 33%;

    @mixin atSmall {
      width: 72px;
      margin: 0 5px;
    }

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      
      display: block;
      transform: translate(-50%, -50%);
    }
  }
}
```

## Next - Add `X` and JavaScript to add behavior open/close modal
