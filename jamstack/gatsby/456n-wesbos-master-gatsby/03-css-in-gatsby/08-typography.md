# Typography
## TODO
* Add custom font @font-face
* And a bunch of links good discussion on working with fonts
* system fonts
* Good to put typography styles in their own file

`styles/Typography.js`

```
import { createGlobalStyle } from 'styled-components';

import font from '../assets/fonts/frenchfries.woff';

const Typography = createGlobalStyle`
  @font-face {
    font-family: FrenchFries;
    src: url(${font});
  }
  html {
    font-family: FrenchFries, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
  p, li {
    letter-spacing: 0.5px;
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    margin: 0;
  }
  a {
    color: var(--black);
    text-decoration-color: var(--red);
    /* Chrome renders this weird with this font, so we turn it off */
    text-decoration-skip-ink: none;
  }
  mark, .mark {
    background: var(--yellow);
    padding: 0 2px 2px 2px;
    margin: 0;
    display: inline;
    line-height: 1;
  }

  .center {
    text-align: center;
  }

  .tilt {
    transform: rotate(-2deg);
  }
`;

export default Typography;
```

* **note** we use `createGlobalStyle` to insert global styles into our app
* We import fonts through gatsby too
    - `import font from '../assets/fonts/frenchfries.woff';`
    - It puts the URL of the file into a variable `font`
    - Then we can use that `font` variable when we use that font face later in our css
        + Gatsby will take the font out of our assets folder and an they'll put it in our `static` folder for us (great!)
        + You declare your font using `@font-face`
        + More info here - https://dev.to/alaskaa/how-to-import-a-web-font-into-your-react-app-with-styled-components-4-1dni

```
// MORE CODE

  @font-face {
    font-family: FrenchFries;
    src: url(${font});
  }
// MORE CODE
```

## Set a base font stack
* On the `html` element

```
// MORE CODE

 html {
    font-family: FrenchFries, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: var(--black);
  }
// MORE CODE
```

* [resource on fonts](https://www.internetingishard.com/html-and-css/web-typography/)
* Setting base font stack on html makes sure you don't get any weird times new romans sneak up buttons (TODO - research this more)
* We export it so we can use it elsewhere

## Add in our fonts
`Layout.js`

```
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Typography />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
```

* View in browser and you'll see new font

## Next - Styling the Nav and Logo

