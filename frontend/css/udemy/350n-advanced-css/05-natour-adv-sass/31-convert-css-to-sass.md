# Convert CSS to Sass: Variables and Nesting
* [css-architecture-with-sass-and-bem](https://itnext.io/css-architecture-with-sass-smacss-and-bem-cc618392c148)

## Troubleshoot
* [sass os-x-64-error](https://medium.com/@proustibat/how-to-fix-error-node-sass-does-not-yet-support-your-current-environment-os-x-64-bit-with-c1b3298e4af0)

`$ npm rebuild node-sass`

`_buttons.scss`

```
// MORE CODE

.btn {
  &:link,
  &:visited {
    // Box
    display: inline-block;
    position: relative;
    padding: 1.5rem 4rem;

    // animations
    transition: all 0.2s;

    // Border
    border-radius: 10rem;

    // Text
    font-size: 1.6rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.4s;
    border-radius: 10rem;
  }

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 1rem 2rem rgba($color-black, 0.2);

    &::after {
      transform: scaleX(1.4) scaleY(2);
      opacity: 0;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 0.5rem 1rem rgba($color-black, 0.2);
  }

  &--white {
    background-color: $color-white;
    color: #777;

    &::after {
      background-color: $color-white;
    }
  }

  &--animated {
    animation: moveFromBottom 0.5s ease-out 0.75s;
    animation-fill-mode: backwards;
  }
}

// MORE CODE
```




