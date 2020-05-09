# Implementing BEM
* Let's convert our HTML to BEM

## Before BEM
`index.html`

```
// MORE CODE

  <header class="header">
      <div class="logo-box"><img class="logo" src="./assets/img/logo-white.png" alt="Logo"></div>
     
      <div class="text__box">
        <h1 class="heading__primary">
          <span class="heading__primary--main">Outdoors</span>
          <span class="heading__primary--sub">is where life happens</span>
        </h1>
        <!-- /.heading__primary -->

        <a href="#" class="btn btn-white btn-animated
">Discover Tours</a>
      </div>
      <!-- /.text__box -->
  </header>

// MORE CODE
```

* After BEM

```
// MORE CODE

  <header class="header">
      <div class="header__logo-box"><img class="logo" src="./assets/img/logo-white.png" alt="Logo"></div>
     
      <div class="header__text-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">Outdoors</span>
          <span class="heading-primary--sub">is where life happens</span>
        </h1>
        <!-- /.heading__primary -->

        <a href="#" class="btn btn--white btn--animated
">Discover Tours</a>
      </div>
      <!-- /.text__box -->
  </header>

// MORE CODE
```

`_header.scss`

```
// MORE CODE

.header {
  position: relative;
  height: 95vh;
  background-image:

    linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.8),
      rgba(40, 80, 131, 0.8)
    ),
    url(../img/hero.jpg);
  background-position: top;
  background-size: cover;
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75vh 100%, 0% 100%);
}

.header__logo-box {
  position: absolute;
  top: 4rem;
  left: 4rem;
}

.header__logo {
  height: 3.5rem;
}

.header__text-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.heading-primary {
  margin-bottom: 1.5rem;
  backface-visibility: hidden;
  color: #fff;
  text-transform: uppercase;
}

.heading-primary--main {
  display: block;

  /* animation */
  animation-name: moveInLeft;
  animation-duration: 1s;
  animation-timing-function: ease-out;

  /* animation-delay: 3s; */

  /* animation-iteration-count: 3; */

  /* styles */
  font-size: 6rem;
  font-weight: 400;
  letter-spacing: 3.5rem;
}

.heading-primary--sub {
  display: block;
  animation: moveInRight 1s ease-out;

  /* styles */
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 1.8rem;
}

// MORE CODE
```

`_buttons.scss`

```
// MORE CODE

.btn--white {
  background-color: #fff;
  color: #777;
}

.btn--white::after {
  background-color: #fff;
}

// MORE CODE

.btn--animated {
  animation: moveFromBottom 0.5s ease-out 0.75s;
  animation-fill-mode: backwards;
}


```
