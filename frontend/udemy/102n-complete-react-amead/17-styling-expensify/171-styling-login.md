# Styling Login Page
* Grab images and put into images folder
    - `public/img`
        + bg.jpg
        + favicon.png
        + loader.gif

## Create `src/styles/components/_box-layout.scss`

`LoginPage.js`

* We add our class (className)

```
// MORE CODE
export const LoginPage = props => (
  <div className="box-layout">
    <button onClick={props.startLogin}>Login</button>
  </div>
);
// MORE CODE
```

* Browser only has access to what is in the public directory

`_box-layout.scss`

```css
.box-layout {
  background: url('/img/bg.jpg');
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
```

* vh ---> viewport height
* vw ---> viewport width
    - We do this to cover the entire viewport
* background-size: cover ----> makes sure our image always covers the container even when we resize the browser

## Let's style the login button
* center the box

```css
.box-layout {
  align-items: center;
  background: url('/img/bg.jpg');
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

  &__box {
    background: fade-out(white, 0.15);
    border-radius: 3px;
    padding: $l-size $m-size;
    text-align: center;
    width: 26rem;
  }

  &__title {
    margin: 0 0 $m-size 0;
    line-height: 1;
  }
}

```

`LoginPage`

```
import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = props => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensified App</h1>
      <p>It&apos;s time to get your expenses in order</p>
      <button onClick={props.startLogin}>Login</button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);


```

`_base.scss`

```
body {
  background-color: $dark-grey;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $m-size;
  line-height: 1.6;
}
```

`_settings.scss`

`$dark-grey: #333333;`

