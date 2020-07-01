# Clean Up & Initial Components
## Delete these files
* serviceWorker.js
* logo.svg
* index.css
* App.test.js

## Inside index.js
* Remove reference to `index.css`
* Remove reference to `serviceWorker.js`
* Delete comments above and `serviceWorker.unregister();` 

## Inside App.js
`App.js`

```
import React from 'react';
import './App.css';

const App = () => (
  <>
    <h1>App</h1>
  </>
);

export default App;
```

* Remove logo import
* **note** `create-react-app` has removed the class (used formerly in React apps but now with the advent of hooks they have converted the class based App.js component to a functional component (they used to be stateless but now you can add state using hooks)
* We'll convert the regular function into an arrow function
* Since we are returning a single element we can remove the return and just return the `div` implicitly
* We'll remove the nested `header`
* We'll replace the `div` with a `Fragment`
    - **note** Fragment is just a "ghost element" and it is named that because it won't actually show up in the DOM and we avoid adding extraneous `div` elements to avoid the `error` from elements with no parent
    - We don't need to import Fragment like `import React, { Fragment } from 'react'` as it is part of React and we can just use `<>` to open a Fragment and `</>` to close a fragment

## App.css
* Remove all the `App.css` content and replace with the following `CSS`

`App.css`

```
/* Global Styles */
:root {
  --primary-color: #17a2b8;
  --dark-color: #343a40;
  --light-color: #f4f4f4;
  --danger-color: #dc3545;
  --success-color: #28a745;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Raleway', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  background-color: #fff;
  color: #333;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

ul {
  list-style: none;
}

img {
  width: 100%;
}

/* Utilities */
.container {
  max-width: 1100px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
}

/* Text Styles*/
.x-large {
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.large {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.lead {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: var(--primary-color);
}

.text-dark {
  color: var(--dark-color);
}

/* Padding */
.p {
  padding: 0.5rem;
}
.p-1 {
  padding: 1rem;
}
.p-2 {
  padding: 2rem;
}
.p-3 {
  padding: 3rem;
}
.py {
  padding: 0.5rem 0;
}
.py-1 {
  padding: 1rem 0;
}
.py-2 {
  padding: 2rem 0;
}
.py-3 {
  padding: 3rem 0;
}

/* Margin */
.m {
  margin: 0.5rem;
}
.m-1 {
  margin: 1rem;
}
.m-2 {
  margin: 2rem;
}
.m-3 {
  margin: 3rem;
}
.my {
  margin: 0.5rem 0;
}
.my-1 {
  margin: 1rem 0;
}
.my-2 {
  margin: 2rem 0;
}
.my-3 {
  margin: 3rem 0;
}

.btn {
  display: inline-block;
  background: var(--light-color);
  color: #333;
  padding: 0.4rem 1.3rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: opacity 0.2s ease-in;
  outline: none;
}

.badge {
  font-size: 0.8rem;
  padding: 0.1rem;
  text-align: center;
  margin: 0.3rem;
  background: var(--light-color);
  color: #333;
}

.alert {
  padding: 0.8rem;
  margin: 1rem 0;
  opacity: 0.9;
  background: var(--light-color);
  color: #333;
}

.btn-primary,
.bg-primary,
.badge-primary,
.alert-primary {
  background: var(--primary-color);
  color: #fff;
}

.btn-light,
.bg-light,
.badge-light,
.alert-light {
  background: var(--light-color);
  color: #333;
}

.btn-dark,
.bg-dark,
.badge-dark,
.alert-dark {
  background: var(--dark-color);
  color: #fff;
}

.btn-danger,
.bg-danger,
.badge-danger,
.alert-danger {
  background: var(--danger-color);
  color: #fff;
}

.btn-success,
.bg-success,
.badge-success,
.alert-success {
  background: var(--success-color);
  color: #fff;
}

.btn-white,
.bg-white,
.badge-white,
.alert-white {
  background: #fff;
  color: #333;
  border: #ccc solid 1px;
}

.btn:hover {
  opacity: 0.8;
}

.bg-light,
.badge-light {
  border: #ccc solid 1px;
}

.round-img {
  border-radius: 50%;
}

.line {
  height: 1px;
  background: #ccc;
  margin: 1.5rem 0;
}

/* Overlay */
.dark-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Forms */
.form .form-group {
  margin: 1.2rem 0;
}

.form .form-text {
  display: block;
  margin-top: 0.3rem;
  color: #888;
}

.form input[type='text'],
.form input[type='email'],
.form input[type='password'],
.form input[type='date'],
.form select,
.form textarea {
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
}

.form input[type='submit'],
button {
  font: inherit;
}

.form .social-input {
  display: flex;
}

.form .social-input i {
  padding: 0.5rem;
  width: 4rem;
}

.form .social-input i.fa-twitter {
  color: #38a1f3;
}
.form .social-input i.fa-facebook {
  color: #3b5998;
}
.form .social-input i.fa-instagram {
  color: #3f729b;
}
.form .social-input i.fa-youtube {
  color: #c4302b;
}
.form .social-input i.fa-linkedin {
  color: #0077b5;
}

.table th,
.table td {
  padding: 1rem;
  text-align: left;
}

.table th {
  background: var(--light-color);
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 2rem;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  border-bottom: solid 1px var(--primary-color);
  opacity: 0.9;
}

.navbar ul {
  display: flex;
}

.navbar a {
  color: #fff;
  padding: 0.45rem;
  margin: 0 0.25rem;
}

.navbar a:hover {
  color: var(--primary-color);
}

.navbar .welcome span {
  margin-right: 0.6rem;
}

/* Landing Page */
.landing {
  position: relative;
  background: url('../img/showcase.jpg') no-repeat center center/cover;
  height: 100vh;
}

.landing-inner {
  color: #fff;
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Profiles Page */
.profile {
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  align-items: center;
  grid-gap: 2rem;
  padding: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

/* Profile Page */
.profile-grid {
  display: grid;
  grid-template-areas:
    'top top'
    'about about'
    'exp edu'
    'github github';
  grid-gap: 1rem;
}

.profile-top {
  grid-area: top;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile-top img {
  width: 250px;
}

.profile-top .icons a {
  color: #fff;
  margin: 0 0.3rem;
}

.profile-top .icons a:hover {
  color: var(--dark-color);
}

.profile-about {
  grid-area: about;
  text-align: center;
}

.profile-about .skills {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.profile-exp {
  grid-area: exp;
}

.profile-edu {
  grid-area: edu;
}

.profile-exp h2,
.profile-edu h2 {
  margin-bottom: 1rem;
}

.profile-exp > div,
.profile-edu > div {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: #ccc 1px dotted;
}

.profile-exp > div:last-child,
.profile-edu > div:last-child {
  border: 0;
}

.profile-exp p,
.profile-edu p {
  margin: 0.5rem 0;
}

.profile-github {
  grid-area: github;
}

.profile-github .repo {
  display: flex;
}

.profile-github .repo > div:first-child {
  flex: 7;
  flex-basis: 70%;
}

.profile-github > div:last-child {
  flex: 3;
  flex-basis: 20%;
}

/* Posts Page */
.post-form .post-form-header {
  background: var(--primary-color);
  padding: 0.5rem;
}

.post {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 2rem;
  align-items: center;
}

.post > div:first-child {
  text-align: center;
}

.post img {
  width: 100px;
}

.post .comment-count {
  background: var(--light-color);
  color: var(--primary-color);
  padding: 0.1rem 0.2rem;
  border-radius: 5px;
  font-size: 0.8rem;
}

.post .post-date {
  color: #aaa;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

/* Mobile Styles */
@media (max-width: 700px) {
  .container {
    margin-top: 8rem;
  }

  .hide-sm {
    display: none;
  }

  /* Text Styles */
  .x-large {
    font-size: 3rem;
  }

  .large {
    font-size: 2rem;
  }

  .lead {
    font-size: 1rem;
  }

  /* Navbar */
  .navbar {
    display: block;
    text-align: center;
  }

  .navbar ul {
    text-align: center;
    justify-content: center;
  }

  .navbar h1 {
    margin-bottom: 1rem;
  }

  .navbar .welcome {
    display: none;
  }

  /* Profiles Page */
  .profile {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .profile ul {
    display: none;
  }

  /* Profile Page */

  .profile-top img,
  .profile img {
    width: 200px;
    margin: auto;
  }

  .profile-grid {
    grid-template-areas:
      'top'
      'about'
      'exp'
      'edu'
      'github';
  }

  .profile-about .skills {
    flex-direction: column;
  }

  .dash-buttons a {
    display: block;
    width: 100%;
    margin-bottom: 0.2rem;
  }

  .post {
    grid-template-columns: 1fr;
  }
  .post a,
  .post button {
    padding: 0.3rem 0.4rem;
  }
}
```

* Fix path error - change:

```
// MORE CODE

.landing {
  position: relative;
  background: url('../img/showcase.jpg') no-repeat center center/cover;
  height: 100vh;
}

// MORE CODE
```

* We change the path from `../` to `./` (because it will be looking at the image in the same folder)
* Still have an error
    - We'll add `img` inside `src` and copy and paste [this image](https://github.com/kingluddite/devconnector_html_theme/blob/master/img/showcase.jpg) inside it
* The error should disappear

## Add fontawesome
* Copy CDN from https://fontawesome.com/ and click `Start for Free`
* You need to add your email
* Click confirmation in email
* Enter info
* Finally, click the `Copy Kit Code` button to add their code

`public/index.html`

* I removed all comments and altered the `title` content

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Welcome to DevConnect</title>
    <script src="https://kit.fontawesome.com/7650fb1960.js" crossorigin="anonymous"></script>  
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

* Congrats! Fontawesome is now included

## Create React Components
* `client/components/Landing.js`
* `client/components/Navbar.js`

`Navbar.js`

```
import React from 'react'

const Navbar = () => {
  return (
    <div>

    </div>
  )
}

export default Navbar
```

## We are using the React snippets
* **ES7 React/Redux/GraphQL/React-Native Snippets
* We'll use `racfe` to create a functional component
    - `r` = react
    - `a` = arrow
    - `f` = function
    - `c` = command
    - `e` = export
* This creates a `functional component` and it takes the name from the file to create `Navbar`
    - For now we'll just have static HTML/JSX output
    - Later we'll use state where we pull from Redux to decide what links we'll show

### Grab `nav` element fragment from `index.html` of UI theme
```
// MORE CODE

<nav class="navbar bg-dark">
      <h1>
        <a href="index.html"><i class="fas fa-code"></i> DevConnector</a>
      </h1>
      <ul>
        <li><a href="profiles.html">Developers</a></li>
        <li><a href="register.html">Register</a></li>
        <li><a href="login.html">Login</a></li>
      </ul>
    </nav>
// MORE CODE
```

* And Paste into Navbar.js

`Navbar.js`

* Change `class` to `className`

```
import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <a href="index.html">
            <i className="fas fa-code"></i> DevConnector
          </a>
        </h1>
        <ul>
          <li>
            <a href="profiles.html">Developers</a>
          </li>
          <li>
            <a href="register.html">Register</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
```

* For `Landing.js` we'll grab `index.html` in UI for `section`

`Landing.js`

```
import React from 'react';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">
              Sign Up
            </a>
            <a href="login.html" className="btn btn-light">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
```

`App.js`

```
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Landing from './components/Landing';

const App = () => (
  <>
    <Navbar />
    <Landing />
  </>
);

export default App;
```

## Next Add our client side routes via React-Router


