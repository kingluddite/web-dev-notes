# Breaking Out Configuration
**tip** Never use `id` in your styles

We will stick to generic selectors

## _base.scss
```
// poor man's reset
* {
  margin: 0;
  padding: 0;
}

html {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 62.5%; // approx 10px
}

body {
  font-size: 1.6rem; // 16px
}
```

`imports/client/styles/components/_boxed-view.scss`

```
.boxed-view {
  background: #dddddd;
  height: 100vh; // 100 viewport height
  width: 100vw; // 100 viewport width
}
```

`imports/client/styles/_main.scss`

```
@import './variables';
@import './base';
@import './components/boxed-view'; // add this line
```

`_boxed-view.scss`

```
.boxed-view {
  align-items: center;
  background: #dddddd;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.boxed-view__box {
  background-color: white;
  padding: 2.4rem;
  text-align: center;
  width: 24rem;
}
```

`Login.js`

```
// more code
render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button type="submit">Login</button>
          </form>

          <Link to="/signup">Have an account?</Link>
        </div>
      </div>
    );
  }
// more code
```

## Test
![boxed-view](https://i.imgur.com/eNLRoLz.png)

## Variables
`_variables.scss`

```
// Font sizes
$base-font-size: 1.6rem;

// Boxed view
$boxed-view-overlay-bg: #dddddd;
$boxed-view-bg: #ffffff;
```

* Find stuff that is:
    1. Reusable
    2. Likely to Change

## Use those variables
`_base.scss`

```
// poor man's reset
* {
  margin: 0;
  padding: 0;
}

html {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 62.5%;
}

body {
  font-size: $base-font-size; // add this line
}
```

`_boxed-view.scss`

```
.boxed-view {
  align-items: center;
  background: $boxed-view-overlay-bg; // add this line
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.boxed-view__box {
  background-color: $boxed-view-bg; // add this line
  padding: 2.4rem;
  text-align: center;
  width: 24rem;
}
```

## Exercise
Add same structure we added for `Login` to the `Signup` Component

<details>
  <summary>Solution</summary>
`Signup`

```
render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button type="submit">Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
};
```
</details>
