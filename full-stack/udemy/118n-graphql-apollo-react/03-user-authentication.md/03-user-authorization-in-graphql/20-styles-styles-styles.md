# Add some styles
* Here is a fast way to get up and running
* Create a style guide to quickly create elements
* CSS Grid built in
* This is based on a great Gatsby V2 starter page `github.com/codebushi`
    - He did all the heavy lifting and we can use it to get a great looking site in a minimal amount of time

## Clone this repo to your desktop
`$ cd ~/Desktop`

`$ git clone https://github.com/codebushi/gatsby-starter-forty-codebushi`

`$ cd gatsby-starter-forty-codebushi`

## Copy the assets folder to your project
* I'll assume your project relative path is:

`/Documents/dev/fullstack/react-stuff/five-star-colognes`

* And this is the code you'll use to copy the assets to your project
    - Make sure you are in this directory:

`~/Desktop/gatsby-starter-forty-codebushi/`

### Copy assets into your 

`$ cp -R src/assets ~/Documents/dev/react-stuff/udemy/112e-react-graphql/five-star-colognes/frontend/src/`

* After running the last line you now will have the `assets` folder inside your project's `frontend/src`

#### assets ingredients
* This will include a bunch of Sass (you will see *.scss files)
    - This is a great collection of sass and it is highly recommended to go through all the `scss` [documentation](https://sass-lang.com/documentation/) to see the power of sass
        + You will see
            * sass functions
            * sass partials
            * sass mixins
            * sass imports
            * sass variables
            * sass nesting
* fontawesome - easy way to add icons
    - This is version 4 and there is a more modern version 5 but that is better but takes more time to setup and understand the new structure
    - version 4 is quick and easy to use but it does have a larger bandwidth impact
* The icons needed for fontawesome are inside the `fonts` folder

## Make sure you have the minimal setup for working with Sass and Create React App
* Create React App recently (10/1/2018) had a [major upgrade](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html)
    - More styling options: you can use Sass and CSS Modules out of the box
    - Updated to Babel 7, including support for the React fragment syntax and many bugfixes
    - We updated to webpack 4, which automatically splits JS bundles more intelligently
    - We updated to Jest 23, which includes an interactive mode for reviewing snapshots
    - We added PostCSS so you can use new CSS features in old browsers
    - You can use Apollo, Relay Modern, MDX, and other third-party Babel Macros transforms
    - You can now import an SVG as a React component, and use it in JSX
    - You can try the experimental Yarn Plug’n’Play mode that removes node_modules
    - You can now plug your own proxy implementation in development to match your backend API
    - You can now use packages written for latest Node versions without breaking the build
    - You can now optionally get a smaller CSS bundle if you only plan to target modern browsers
    - Service workers are now opt-in and are built using Google’s Workbox

### How to upgrade to Create React App 2
* All new versions created don't have to do this but check your `frontend/package.json` file
* Make the following change

`frontend/package.json`

```
// MORE CODE

"react-scripts": "2.0.3"

// MORE CODE
```

* By the time you read this the version number might be different
* Be sure to google the upgrade instructions and make sure you use the correct version number when updating

### After upgrading add Sass with:
`$ npm node-sass`

* After doing that you are now ready to start using Sass

### Create a Style Guide
* I like this because I can use it whenever I need to create a new layout for a page
* Inside `frontend/src/components` create `StyleGuide.js`

`frontend/src/components/StyleGuide.js`

* Use the VS Code React snippets library to quickly create a React Class with `rce` + **tab** and that will generate this:

```
import React, { Component } from 'react';

export class StyleGuide extends Component {
  render() {
    return (
      <div>
        <h1>StyleGuide</h1>
      </div>
    );
  }
}

export default StyleGuide;

```

## Remove any calls to skeleton.css
* Check if there is any CSS being using in:

`frontend/public/index.html`

```
// MORE CODE

<title>React App</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
</head>

// MORE CODE
```

* You may not have this code but if you do make sure to remove it
* We will now be using Sass to transpile our Sass into CSS so this link to the skeleton CDN is no longer needed
* Our Sass file is importing and using a Sass verion of Skeleton JS

## Get rid of our existing CSS
* Delete
    - `frontend/src/components/App.css`
    - `frontend/src/index.css`
* Inside `frontend/src/index.js` 

replace:

`import './index.css` 

with:

```
// MORE CODE

// styles
import './assets/scss/main.scss';

// custom components
// MORE CODE
```

* That will pull in all our sass
* Remember that sass needs a preprocessor and that is now baked into our Webpack Development Server
    - When we save all our sass partials will be pulled into `main.scss` and transpiled into CSS everytime we hit save

## Stop and start your app
`Ctrl` + `c`

* Make sure you are in the root of your app

`$ npm run dev`

* You should now see your app is using our Sass

`http://localhost:3000/`

* Inspect code and you will see a bunch of `<style>` tags with the css inside it

## Layout problem
* Can we add some padding to our home page?
* Sure, just add this

`frontend/src/index.js`

```
// MORE CODE

const Root = () => (
  <Router>
    <div id="wrapper">
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);

// MORE CODE
```

* We want every page to be centered so we add the `wrapper` **id** to surround our `Switch`
* We are using `#wrapper` that is styled here:

`frontend/src/assets/scss/layout/_wrapper.scss`

```
#wrapper {
    @include vendor('transition', (
        'filter #{_duration(menu)} ease',
        '-webkit-filter #{_duration(menu)} ease',
        'opacity 0.375s ease-out'
    ));
    padding-top: 3.25em;

    &.is-transitioning {
        opacity: 0;
    }

    > * {
        @include inner;
    }

    > * > * {
        @include inner;
    }

    @include breakpoint(small) {
        padding-top: 2.75em;
    }
}
```

* You can see that a lot of very powerful Sass is being used in this file
* It is highly recommended to dig into Sass and see all the power it gives you
* Our layout slightly improved but we will do a lot better
* First, let's add our `StyleGuide` to our routes

## Add StyleGuide to router
`src/index.js`

```
// MORE CODE

import Signup from './components/Auth/Signup';
import StyleGuide from './components/StyleGuide'; // ADD!

// MORE CODE

const Root = () => (
  <Router>
    <div id="wrapper">
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/styleguide" component={StyleGuide} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);

// MORE CODE
```

* Now browse to new route

`http://localhost:3000/styleguide`

## Style Page
* We want to add our style guide
* Copy the following code:

```
<div id="main" className="alt">
  <section id="one">
    <div className="inner">
      <header className="major">
        <h1>Elements</h1>
      </header>

      <h2 id="content">Sample Content</h2>
      <p>
        Praesent ac adipiscing ullamcorper semper ut amet ac risus. Lorem
        sapien ut odio odio nunc. Ac adipiscing nibh porttitor erat risus
        justo adipiscing adipiscing amet placerat accumsan. Vis. Faucibus
        odio magna tempus adipiscing a non. In mi primis arcu ut non
        accumsan vivamus ac blandit adipiscing adipiscing arcu metus
        praesent turpis eu ac lacinia nunc ac commodo gravida adipiscing
        eget accumsan ac nunc adipiscing adipiscing.
      </p>
      <div className="grid-wrapper">
        <div className="col-6">
          <h3>Sem turpis amet semper</h3>
          <p>
            Nunc lacinia ante nunc ac lobortis. Interdum adipiscing
            gravida odio porttitor sem non mi integer non faucibus ornare
            mi ut ante amet placerat aliquet. Volutpat commodo eu sed ante
            lacinia. Sapien a lorem in integer ornare praesent commodo
            adipiscing arcu in massa commodo lorem accumsan at odio massa
            ac ac. Semper adipiscing varius montes viverra nibh in
            adipiscing blandit tempus accumsan.
          </p>
        </div>
        <div className="col-6">
          <h3>Magna odio tempus commodo</h3>
          <p>
            In arcu accumsan arcu adipiscing accumsan orci ac. Felis id
            enim aliquet. Accumsan ac integer lobortis commodo ornare
            aliquet accumsan erat tempus amet porttitor. Ante commodo
            blandit adipiscing integer semper orci eget. Faucibus commodo
            adipiscing mi eu nullam accumsan morbi arcu ornare odio mi
            adipiscing nascetur lacus ac interdum morbi accumsan vis mi
            accumsan ac praesent.
          </p>
        </div>
        <div className="col-4">
          <h3>Interdum sapien gravida</h3>
          <p>
            Nunc lacinia ante nunc ac lobortis. Interdum adipiscing
            gravida odio porttitor sem non mi integer non faucibus ornare
            mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia
            sapien lorem accumsan varius montes viverra nibh in adipiscing
            blandit tempus accumsan.
          </p>
        </div>
        <div className="col-4">
          <h3>Faucibus consequat lorem</h3>
          <p>
            Nunc lacinia ante nunc ac lobortis. Interdum adipiscing
            gravida odio porttitor sem non mi integer non faucibus ornare
            mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia
            sapien lorem accumsan varius montes viverra nibh in adipiscing
            blandit tempus accumsan.
          </p>
        </div>
        <div className="col-4">
          <h3>Accumsan montes viverra</h3>
          <p>
            Nunc lacinia ante nunc ac lobortis. Interdum adipiscing
            gravida odio porttitor sem non mi integer non faucibus ornare
            mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia
            sapien lorem accumsan varius montes viverra nibh in adipiscing
            blandit tempus accumsan.
          </p>
        </div>
      </div>

      <hr className="major" />

      <h2 id="elements">Elements</h2>
      <div className="grid-wrapper">
        <div className="col-6">
          <h3>Text</h3>
          <p>
            This is <b>bold</b> and this is <strong>strong</strong>. This
            is <i>italic</i> and this is <em>emphasized</em>. This is{' '}
            <sup>superscript</sup> text and this is <sub>subscript</sub>{' '}
            text. This is <u>underlined</u> and this is code:{' '}
            <code>for (;;)</code>. Finally, this is a <a href="/">link</a>
            .
          </p>
          <hr />
          <h2>Heading Level 2</h2>
          <h3>Heading Level 3</h3>
          <h4>Heading Level 4</h4>
          <hr />
          <p>
            Nunc lacinia ante nunc ac lobortis. Interdum adipiscing
            gravida odio porttitor sem non mi integer non faucibus ornare
            mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia
            sapien lorem accumsan varius montes viverra nibh in adipiscing
            blandit tempus accumsan.
          </p>

          <h3>Lists</h3>
          <div className="grid-wrapper">
            <div className="col-6">
              <h4>Unordered</h4>
              <ul>
                <li>Dolor etiam magna etiam.</li>
                <li>Sagittis lorem eleifend.</li>
                <li>Felis dolore viverra.</li>
              </ul>

              <h4>Alternate</h4>
              <ul className="alt">
                <li>Dolor etiam magna etiam.</li>
                <li>Sagittis lorem eleifend.</li>
                <li>Felis feugiat viverra.</li>
              </ul>
            </div>
            <div className="col-6">
              <h4>Ordered</h4>
              <ol>
                <li>Dolor etiam magna etiam.</li>
                <li>Etiam vel lorem sed viverra.</li>
                <li>Felis dolore viverra.</li>
                <li>Dolor etiam magna etiam.</li>
                <li>Etiam vel lorem sed viverra.</li>
                <li>Felis dolore viverra.</li>
              </ol>

              <h4>Icons</h4>
              <ul className="icons">
                <li>
                  <a href="/" className="icon fa-twitter">
                    <span className="label">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="icon fa-facebook">
                    <span className="label">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="icon fa-instagram">
                    <span className="label">Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="icon fa-github">
                    <span className="label">Github</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="icon fa-dribbble">
                    <span className="label">Dribbble</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="icon fa-tumblr">
                    <span className="label">Tumblr</span>
                  </a>
                </li>
              </ul>
              <ul className="icons">
                <li>
                  <a href="/" className="icon alt fa-twitter">
                    <span className="label">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="icon alt fa-facebook">
                    <span className="label">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="icon alt fa-instagram">
                    <span className="label">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <h4>Definition</h4>
          <dl>
            <dt>Item1</dt>
            <dd>
              <p>
                Lorem ipsum dolor vestibulum ante ipsum primis in faucibus
                vestibulum. Blandit adipiscing eu felis iaculis volutpat
                ac adipiscing accumsan eu faucibus. Integer ac
                pellentesque praesent. Lorem ipsum dolor.
              </p>
            </dd>
            <dt>Item2</dt>
            <dd>
              <p>
                Lorem ipsum dolor vestibulum ante ipsum primis in faucibus
                vestibulum. Blandit adipiscing eu felis iaculis volutpat
                ac adipiscing accumsan eu faucibus. Integer ac
                pellentesque praesent. Lorem ipsum dolor.
              </p>
            </dd>
            <dt>Item3</dt>
            <dd>
              <p>
                Lorem ipsum dolor vestibulum ante ipsum primis in faucibus
                vestibulum. Blandit adipiscing eu felis iaculis volutpat
                ac adipiscing accumsan eu faucibus. Integer ac
                pellentesque praesent. Lorem ipsum dolor.
              </p>
            </dd>
          </dl>

          <h4>Actions</h4>
          <ul className="actions">
            <li>
              <a href="/" className="button special">
                Default
              </a>
            </li>
            <li>
              <a href="/" className="button">
                Default
              </a>
            </li>
          </ul>
          <ul className="actions small">
            <li>
              <a href="/" className="button special small">
                Small
              </a>
            </li>
            <li>
              <a href="/" className="button small">
                Small
              </a>
            </li>
          </ul>
          <div className="grid-wrapper">
            <div className="col-6">
              <ul className="actions vertical">
                <li>
                  <a href="/" className="button special">
                    Default
                  </a>
                </li>
                <li>
                  <a href="/" className="button">
                    Default
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="actions vertical small">
                <li>
                  <a href="/" className="button special small">
                    Small
                  </a>
                </li>
                <li>
                  <a href="/" className="button small">
                    Small
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="actions vertical">
                <li>
                  <a href="/" className="button special fit">
                    Default
                  </a>
                </li>
                <li>
                  <a href="/" className="button fit">
                    Default
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="actions vertical small">
                <li>
                  <a href="/" className="button special small fit">
                    Small
                  </a>
                </li>
                <li>
                  <a href="/" className="button small fit">
                    Small
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <h4>Pagination</h4>
          <ul className="pagination">
            <li>
              <span className="button small disabled">Prev</span>
            </li>
            <li>
              <a href="/" className="page active">
                1
              </a>
            </li>
            <li>
              <a href="/" className="page">
                2
              </a>
            </li>
            <li>
              <a href="/" className="page">
                3
              </a>
            </li>
            <li>
              <span>&hellip;</span>
            </li>
            <li>
              <a href="/" className="page">
                8
              </a>
            </li>
            <li>
              <a href="/" className="page">
                9
              </a>
            </li>
            <li>
              <a href="/" className="page">
                10
              </a>
            </li>
            <li>
              <a href="/" className="button small">
                Next
              </a>
            </li>
          </ul>

          <h3>Blockquote</h3>
          <blockquote>
            Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt
            felis sagittis eget tempus euismod. Vestibulum ante ipsum
            primis in faucibus vestibulum. Blandit adipiscing eu felis
            iaculis volutpat ac adipiscing accumsan faucibus. Vestibulum
            ante ipsum primis in faucibus vestibulum. Blandit adipiscing
            eu felis.
          </blockquote>

          <h3>Table</h3>

          <h4>Default</h4>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item2</td>
                  <td>Vis ac commodo adipiscing arcu aliquet.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item3</td>
                  <td> Morbi faucibus arcu accumsan lorem.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item4</td>
                  <td>Vitae integer tempus condimentum.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item5</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" />
                  <td>100.00</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <h4>Alternate</h4>
          <div className="table-wrapper">
            <table className="alt">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item2</td>
                  <td>Vis ac commodo adipiscing arcu aliquet.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item3</td>
                  <td> Morbi faucibus arcu accumsan lorem.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item4</td>
                  <td>Vitae integer tempus condimentum.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item5</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" />
                  <td>100.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="col-6">
          <h3>Buttons</h3>
          <ul className="actions">
            <li>
              <a href="/" className="button special">
                Special
              </a>
            </li>
            <li>
              <a href="/" className="button">
                Default
              </a>
            </li>
          </ul>
          <ul className="actions">
            <li>
              <a href="/" className="button big">
                Big
              </a>
            </li>
            <li>
              <a href="/" className="button">
                Default
              </a>
            </li>
            <li>
              <a href="/" className="button small">
                Small
              </a>
            </li>
          </ul>
          <ul className="actions">
            <li>
              <a href="/" className="button special big">
                Big
              </a>
            </li>
            <li>
              <a href="/" className="button special">
                Default
              </a>
            </li>
            <li>
              <a href="/" className="button special small">
                Small
              </a>
            </li>
          </ul>
          <ul className="actions fit">
            <li>
              <a href="/" className="button special fit">
                Fit
              </a>
            </li>
            <li>
              <a href="/" className="button fit">
                Fit
              </a>
            </li>
          </ul>
          <ul className="actions fit small">
            <li>
              <a href="/" className="button special fit small">
                Fit + Small
              </a>
            </li>
            <li>
              <a href="/" className="button fit small">
                Fit + Small
              </a>
            </li>
          </ul>
          <ul className="actions">
            <li>
              <a href="/" className="button special icon fa-search">
                Icon
              </a>
            </li>
            <li>
              <a href="/" className="button icon fa-download">
                Icon
              </a>
            </li>
          </ul>
          <ul className="actions">
            <li>
              <span className="button special disabled">Special</span>
            </li>
            <li>
              <span className="button disabled">Default</span>
            </li>
          </ul>

          <h3>Form</h3>

          <form method="post" action="#">
            <div className="grid-wrapper">
              <div className="col-6">
                <div className="mb-5">
                  <input
                    type="text"
                    name="demo-name"
                    id="demo-name"
                    defaultValue=""
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-5">
                  <input
                    type="email"
                    name="demo-email"
                    id="demo-email"
                    defaultValue=""
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="select-wrapper mb-5">
                  <select name="demo-category" id="demo-category">
                    <option defaultValue="">- Category -</option>
                    <option value="1">Manufacturing</option>
                    <option value="1">Shipping</option>
                    <option value="1">Administration</option>
                    <option value="1">Human Resources</option>
                  </select>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-5">
                  <input
                    type="radio"
                    id="demo-priority-low"
                    name="demo-priority"
                    defaultChecked
                  />
                  <label htmlFor="demo-priority-low">Low</label>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-5">
                  <input
                    type="radio"
                    id="demo-priority-normal"
                    name="demo-priority"
                  />
                  <label htmlFor="demo-priority-normal">Normal</label>
                </div>
              </div>
              <div className="col-4">
                <div className="mb-5">
                  <input
                    type="radio"
                    id="demo-priority-high"
                    name="demo-priority"
                  />
                  <label htmlFor="demo-priority-high">High</label>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-5">
                  <input
                    type="checkbox"
                    id="demo-copy"
                    name="demo-copy"
                  />
                  <label htmlFor="demo-copy">Email me a copy</label>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-5">
                  <input
                    type="checkbox"
                    id="demo-human"
                    name="demo-human"
                    defaultChecked
                  />
                  <label htmlFor="demo-human">I am a human</label>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-5">
                  <textarea
                    name="demo-message"
                    id="demo-message"
                    placeholder="Enter your message"
                    rows="6"
                  />
                </div>
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li>
                    <input
                      type="submit"
                      value="Send Message"
                      className="special"
                    />
                  </li>
                  <li>
                    <input type="reset" value="Reset" />
                  </li>
                </ul>
              </div>
            </div>
          </form>

          <h3>Image</h3>

          <h4>Fit</h4>
          <span className="image fit">
            <img src={pic03} alt="" />
          </span>
          <div className="box alt">
            <div className="grid-wrapper">
              <div className="col-4">
                <span className="image fit">
                  <img src={pic08} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic09} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic10} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic10} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic08} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic09} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic09} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic10} alt="" />
                </span>
              </div>
              <div className="col-4">
                <span className="image fit">
                  <img src={pic08} alt="" />
                </span>
              </div>
            </div>
          </div>

          <h4>Left &amp; Right</h4>
          <p>
            <span className="image left">
              <img src={pic09} alt="" />
            </span>
            Lorem ipsum dolor sit accumsan interdum nisi, quis tincidunt
            felis sagittis eget. tempus euismod. Vestibulum ante ipsum
            primis in faucibus vestibulum. Blandit adipiscing eu felis
            iaculis volutpat ac adipiscing accumsan eu faucibus. Integer
            ac pellentesque praesent tincidunt felis sagittis eget. tempus
            euismod. Vestibulum ante ipsum primis sagittis eget. tempus
            euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
            Blandit adipiscing eu felis iaculis volutpat ac adipiscing
            accumsan eu faucibus. Integer ac pellentesque praesent
            tincidunt felis sagittis eget tempus vestibulum ante ipsum
            primis in faucibus magna blandit adipiscing eu felis iaculis.
          </p>
          <p>
            <span className="image right">
              <img src={pic10} alt="" />
            </span>
            Lorem ipsum dolor sit accumsan interdum nisi, quis tincidunt
            felis sagittis eget. tempus euismod. Vestibulum ante ipsum
            primis in faucibus vestibulum. Blandit adipiscing eu felis
            iaculis volutpat ac adipiscing accumsan eu faucibus. Integer
            ac pellentesque praesent tincidunt felis sagittis eget. tempus
            euismod. Vestibulum ante ipsum primis sagittis eget. tempus
            euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
            Blandit adipiscing eu felis iaculis volutpat ac adipiscing
            accumsan eu faucibus. Integer ac pellentesque praesent
            tincidunt felis sagittis eget tempus vestibulum ante ipsum
            primis in faucibus magna blandit adipiscing eu felis iaculis.
          </p>

          <h3>Box</h3>
          <div className="box">
            <p>
              Felis sagittis eget tempus primis in faucibus vestibulum.
              Blandit adipiscing eu felis iaculis volutpat ac adipiscing
              accumsan eu faucibus. Integer ac pellentesque praesent
              tincidunt felis sagittis eget. tempus euismod. Magna sed
              etiam ante ipsum primis in faucibus vestibulum. Blandit
              adipiscing eu ipsum primis in faucibus vestibulum. Blandit
              adipiscing eu felis iaculis volutpat ac adipiscing accumsan
              eu faucibus lorem ipsum.
            </p>
          </div>

          <h3>Preformatted</h3>
          <pre>
            <code>
              i = 0; print 'It took ' + i + ' iterations to sort the
              deck.';
            </code>
          </pre>
        </div>
      </div>
    </div>
  </section>
</div>
```

* Open up `StyleGuide.js`
* Replace the `<div>...</div>` with all of the code you just copied
* View `/styleguide` and you will see a bunch of errors about missing images

## And imports pointing to images

`StyleGuide.js`

```
import React, { Component } from 'react';

// images
import pic03 from '../assets/images/pic03.jpg';
import pic08 from '../assets/images/pic08.jpg';
import pic09 from '../assets/images/pic09.jpg';
import pic10 from '../assets/images/pic10.jpg';

// MORE CODE
```

## View in browser
`http://localhost:3000/test`

* You now have our Style Guide!
* We can use this guide to make anyweb site design we need

## Apply our knowledge
* Let's make our Signup.js look nicer
* Here is a simple mockup of what it will look like

![mockup](https://i.imgur.com/8r7ooA3.png)

### Create our main structure
* Add a main and a section

`Signup.js`

```
// MORE CODE
return (
    <div id="main" className="alt">
      <section id="one">
         <div className="inner">
            PUT YOUR FORM HERE
        </div>
      </section>
    </div>
)

// MORE CODE
```

* Add comments to help with complex html
    - I like this because it lets me know what is closing

```
// MORE CODE
return (
    <div id="main" className="alt">
      <section id="one">
         <div className="inner">
            PUT YOUR FORM HERE
         </div>
         {/* END .inner */}
      </section>
      {/* END section#one */}
    </div>
    // END #main
)

// MORE CODE
```

## Add our Grid
* Want our form on the left with a centered heading
* We want text on the right
* We use a 12 grid system
* If we want 2 columns in a 12 grid
* 12/2 = 6
* We are using CSS grid and to use this we just need to give the parent element (containing both our columns) a class name of `grid-wrapper`
    - Inside grid-wrapper we will have 2 `col-6` classes
    - Our `form` will go in the left column
    - Our text will go in the right column

```
// MORE CODE
return (
    <div id="main" className="alt">
      <section id="one">
         <div className="inner">
            div.grid-wrapper>.col-6*2
         </div>
         {/* END .inner */}
      </section>
      {/* END section#one */}
    </div>
    // END #main
)

// MORE CODE
```

* We are using Emmet above so after you type:

`div.grid-wrapper>.col-6*2`

* Just hit `tab` and it will look like this:

```
// MORE CODE
return (
  <div id="main" className="alt">
    <section id="one">
      <div className="inner">
        <div className="grid-wrapper">
          <div className="col-6" />
          <div className="col-6" />
        </div>

        FORM HERE

      </div>
      {/* END .inner */}
    </section>
    {/* END section#one */}
  </div>
  // END #main
);
// MORE CODE
```

* Now we'll put our form in the first column and some text in the second column
* Use this Emmet to make 2nd column of text

```
// MORE CODE

<div className="col-6">
  p>lorem*2
</div>

// MORE CODE
```

* Hit `tab` and you will see 2 paragraphs of lorem ipsum latin filler text

## Code should look like this:

```
import React, { Component } from 'react';

// graphql
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

// custom components
import Error from '../Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class SignTest extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    // call our signupUser function
    // it is a promise so we can use `then()`
    // within `then()` we get our return `data`
    signupUser().then(({ data: { signupUser } }) => {
      // console.log(signupUser);
      localStorage.setItem('token', signupUser.token);
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username ||
      !email ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation;
    return isInvalid; // true or false
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            // console.log(data);

            return (
              <div id="main" className="alt">
                <section id="one">
                  <div className="inner">
                    <div className="grid-wrapper">
                      <div className="col-6">
                        <form
                          className="form"
                          onSubmit={event =>
                            this.handleSubmit(event, signupUser)
                          }
                        >
                          <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={this.handleChange}
                            value={username}
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={this.handleChange}
                            value={email}
                          />
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={password}
                          />
                          <input
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                            value={passwordConfirmation}
                          />
                          <button
                            type="submit"
                            disabled={loading || this.validateForm()}
                            className="button-primary"
                          >
                            Submit
                          </button>
                          {error && <Error error={error} />}
                        </form>
                      </div>
                      <div className="col-6">
                        <p>
                          <span>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Necessitatibus enim architecto rerum doloribus
                            asperiores cumque rem perferendis officiis ducimus
                            provident obcaecati incidunt placeat consequuntur
                            quas dicta excepturi quis, ut culpa.
                          </span>
                          <span>
                            Perferendis odit facere animi magni fuga nulla
                            officia deserunt dolore quidem soluta libero
                            cupiditate eius accusamus, autem sed assumenda
                            exercitationem, nobis laudantium veritatis eos ad
                            tenetur reiciendis. Repellat, distinctio doloribus.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* END .inner */}
                </section>
                {/* END section#one */}
              </div>
              // END #main
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default SignTest;
```

* We need to add a heading centered above form
* Easy to do as our sass `_typography.scss` gives us nice utility class `align-center`

```
// MORE CODE

return (
  <div id="main" className="alt">
    <section id="one">
      <div className="inner">
        <div className="grid-wrapper">
          <div className="col-6">
            <h2 className="align-center">Register</h2>
            <form

// MORE CODE
```

* Finally we can add 4 columns below our form
* 12/4 = 3
    - So we'll need 4 columns of 3
    - `className="col-3`
* We'll need another `section`

```
// MORE CODE

</section>
    {/* END section#one */}
    <section id="two">
     <div className="inner">
       div.grid-wrapper>.col-3*4>lorem
     </div>
    </section>
  </div>
  // END #main
);
// MORE CODE
```

* We use emmet again above

`div.grid-wrapper>.col-3*4>lorem`

* Just hit tab and you'll get this:

```
// MORE CODE

 </section>
                {/* END section#one */}
                <section id="two">
                  <div className="inner">
                    <div className="grid-wrapper">
                      <div className="col-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Odio explicabo praesentium, sit doloremque dicta eum,
                        eos culpa vero possimus illum inventore unde vitae
                        dolores saepe tenetur. Obcaecati inventore mollitia
                        dignissimos.
                      </div>
                      <div className="col-3">
                        Assumenda, nostrum, corrupti autem dolorum magni alias
                        asperiores obcaecati praesentium itaque quibusdam modi
                        architecto voluptatem delectus voluptates voluptatibus
                        quaerat dolore, libero natus officiis facere placeat?
                        Nihil nulla qui numquam eum.
                      </div>
                      <div className="col-3">
                        Quae, temporibus veniam sequi facilis reiciendis quia,
                        sint maiores modi, minima sapiente est rem fugit
                        perspiciatis quasi! Sapiente, quam architecto voluptatem
                        molestiae, ipsum eligendi, commodi odio eius nemo
                        laudantium distinctio?
                      </div>
                      <div className="col-3">
                        Pariatur ullam rerum perferendis a aliquam tenetur
                        expedita quis ratione! Dolorem animi magni maiores
                        soluta, veritatis sequi ea, eius eligendi ipsum nisi
                        dolores? Iure earum molestiae, consectetur doloribus
                        sint ipsa.
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              // END #main
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default SignTest;
```

* Now we get our 4 columns
* Everything looks good except our form

## Look to the style guide
* Everything you want to do with HTML and CSS is in the style guide. Use it as... your style guide
* I look at the form in the style guide and I see I need to add a `class` around the inputs of my form

```
// MORE CODE

<form
  className="form"
  onSubmit={event =>
    this.handleSubmit(event, signupUser)
  }
>
  <div className="mb-5">
    <input
      type="text"
      name="username"
      placeholder="Username"
      onChange={this.handleChange}
      value={username}
    />
  </div>

  <div className="mb-5">
    <input
      type="email"
      name="email"
      placeholder="Email Address"
      onChange={this.handleChange}
      value={email}
    />
  </div>

  <div className="mb-5">
    <input
      type="password"
      name="password"
      placeholder="Password"
      onChange={this.handleChange}
      value={password}
    />
  </div>

  <div className="mb-5">
    <input
      type="password"
      name="passwordConfirmation"
      placeholder="Confirm Password"
      onChange={this.handleChange}
      value={passwordConfirmation}
    />
  </div>
  <div className="mb-5">
    <button
      type="submit"
      disabled={loading || this.validateForm()}
      className="button-primary"
    >
      Submit
    </button>
  </div>
  {error && <Error error={error} />}
</form>

// MORE CODE
```

* Our form looks better now

## Better colors for form
* I like to use [adobe kuler](https://color.adobe.com) to change colors:
* Using this I clicked `explore` to find nice color palettes

### Variables
* Make the following changes:

`_vars.scss`

```
// MORE CODE
// Palette.
$palette: (
    bg:                 #F27830,
    bg-alt:             #2a2f4a,
    fg:                 #ffffff,
    fg-bold:            #ffffff,
    fg-light:           rgba(244, 244, 255, 0.612),
    border:             rgba(212,212,255,0.1),
    border-bg:          rgba(212, 212, 255, 0.249),
    highlight:          #9bf1ff,
    accent1:            #6fc3df,
    accent2:            #8d82c4,
    accent3:            #ec8d81,
    accent4:            #e7b788,
    accent5:            #8ea9e8,
    accent6:            #87c5a4
    );
```

* View in browser
* Your form now looks really nice

## Responsive design
* One of the major advantages of using css-grid for layouts it it removes the necessity of using a lot of medi queries for responsive design
* Shrink your browser to one column and you'll see our form is responsive

## Fix our form
* I added React Fragments
* I commented when necessary and left them out when they were not needed
* I added 3 sections so the top heading was properly spaced

```
import React, { Component } from 'react';

// graphql
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

// custom components
import Error from '../Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // console.log(name, ':', value);
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    // call our signupUser function
    // it is a promise so we can use `then()`
    // within `then()` we get our return `data`
    signupUser().then(({ data: { signupUser } }) => {
      // console.log(signupUser);
      localStorage.setItem('token', signupUser.token);
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username ||
      !email ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation;
    return isInvalid; // true or false
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div id="main" className="alt">
        <section id="one">
          <div className="inner">
            <h2>Signup</h2>
          </div>
        </section>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            // console.log(data);

            return (
              <>
                <section id="two">
                  <div className="inner">
                    <div className="grid-wrapper">
                      <div className="col-6">
                        <h2 className="align-center">Register</h2>
                        <form
                          className="form"
                          onSubmit={event =>
                            this.handleSubmit(event, signupUser)
                          }
                        >
                          <div className="mb-5">
                            <input
                              type="text"
                              name="username"
                              placeholder="Username"
                              onChange={this.handleChange}
                              value={username}
                            />
                          </div>
                          <div className="mb-5">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              onChange={this.handleChange}
                              value={email}
                            />
                          </div>
                          <div className="mb-5">
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              onChange={this.handleChange}
                              value={password}
                            />
                          </div>
                          <div className="mb-5">
                            <input
                              type="password"
                              name="passwordConfirmation"
                              placeholder="Confirm Password"
                              onChange={this.handleChange}
                              value={passwordConfirmation}
                            />
                          </div>
                          <div className="mb-5">
                            <button
                              type="submit"
                              disabled={loading || this.validateForm()}
                              className="button-primary"
                            >
                              Submit
                            </button>
                            {error && <Error error={error} />}
                          </div>
                        </form>
                      </div>
                      <div className="col-6">
                        <p>
                          <span>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptas rerum necessitatibus fuga ex sequi
                            incidunt repellat. Voluptates eum molestias iusto.
                            Nulla ex accusantium animi saepe ullam deserunt
                            voluptates in repellat.
                          </span>
                          <span>
                            Necessitatibus fugiat nisi labore rem, molestiae
                            ipsa dolores ab velit qui illo corrupti minus et
                            cumque consequatur vitae officia doloremque quisquam
                            non maxime? Necessitatibus temporibus aut cumque
                            dolor excepturi odit.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* END .inner */}
                </section>
                {/* END section#two */}
                <section id="three">
                  <div className="inner">
                    <div className="grid-wrapper">
                      <div className="col-3">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Temporibus delectus totam quod error dolores,
                          cupiditate voluptatem optio autem quos, soluta
                          reprehenderit, sed quia. Similique sit, esse error cum
                          eaque assumenda.
                        </p>
                      </div>
                      <div className="col-3">
                        <p>
                          Autem eius dicta tempore similique maxime facere
                          inventore fugiat quibusdam tenetur libero
                          reprehenderit debitis esse minima cum, aspernatur
                          natus iusto illo magni suscipit at illum itaque vel?
                          Quo, ipsam at!
                        </p>
                      </div>
                      <div className="col-3">
                        <p>
                          Ab debitis quaerat quod. Dicta nam, dignissimos
                          mollitia vitae nemo sequi quia reiciendis explicabo
                          doloribus totam magni optio culpa praesentium rerum
                          deserunt distinctio. Ea dolores iusto veniam dolore at
                          facilis.
                        </p>
                      </div>
                      <div className="col-3">
                        <p>
                          Accusantium quidem mollitia minus voluptas cupiditate.
                          Inventore aliquam ab totam labore quam natus, alias
                          autem vitae quia, quidem iure sit exercitationem
                          eveniet adipisci esse soluta facilis voluptatem
                          aliquid perspiciatis? Ipsum?
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* END .inner */}
                </section>
                {/* END section#three */}
              </>
            );
          }}
        </Mutation>
      </div>
      //  END #main
    );
  }
}

export default Signup;
```

## Next steps with this design
* You now have all the tools in your style guide to layout any layout you want
* Dive into Sass to make the powers of your CSS exponentially stronger



