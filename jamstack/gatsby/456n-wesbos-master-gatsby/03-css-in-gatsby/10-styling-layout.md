# Styling layout
* If components (like our style components) are not rendering out any DOM, they are "side effects"
* The Logo
    - It was so small Gatsby was so smart that it decided to turn the image into a base64 representation of the stripes (and this means it doesn't need to make another request to download another file, it just knows that the image is those stripes)

`Layout.js`

```js
import React from 'react';
import 'normalize.css'; // reset
import styled from 'styled-components';
import Footer from './Footer';
import Nav from './Nav';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import stripes from '../assets/images/stripes.svg';

const SiteBorderStyles = styled.div`
  max-width: 1000px;
  margin: 12rem auto 4rem auto; /* if browser doesn't like clamp */
  margin-top: clamp(2rem, 10vw, 12rem);
  padding: 5px;
  padding: clamp(5px, 1vw, 25px);
  background: var(--white) url(${stripes});
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);
`;

const ContentStyles = styled.div`
  padding: 2rem;
  background: var(--white);
`;

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  // console.log(props);
  return (
    <>
      <GlobalStyles />
      <Typography />
      <SiteBorderStyles>
        <ContentStyles>
          <Nav />
          {children}
          <Footer />
        </ContentStyles>
      </SiteBorderStyles>
    </>
  );
}
```

## How to style current page
* Current page will have a class of `aria-current`

```css
// MORE CODE

  a {
    font-size: 3rem;
    text-decoration: none;

    &:hover {
      color: var(--red);
    }

    &[aria-current='page'] { /* this is way cool! */
      color: var(--red);
    }
  }

// MORE CODE
```

## TODO - Can we do this?
```css
// MORE CODE

    &[aria-current='page'] {
      /* anywhay to not have nav change red when home or logo is clicked? */
      color: var(--red);
    }

// MORE CODE
```

