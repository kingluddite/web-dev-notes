# Global Styling and Typography with Styled Components

## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch
   
`Page.js`

```
import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

// custom components
import Meta from './Meta';
import Header from './Header';

const theme = {
  red: '#ff0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#e1e1e1',
  offWhite: '#ededed',
  maxWidth: '1000px',
  bs: '0 12ps 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
    font-family: 'radnika_next';
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    text-decoration: ${theme.black};
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
```

## Style our nav
`Nav.js`

```
import React, { Component } from 'react';
import Link from 'next/link';

// styles
import NavStyles from './styles/NavStyles';

export class Nav extends Component {
  render() {
    return (
      <NavStyles>
        <Link href="/sell">
          <a>Sell</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
        <Link href="/orders">
          <a>Orders</a>
        </Link>
        <Link href="/me">
          <a>Account</a>
        </Link>
      </NavStyles>
    );
  }
}

export default Nav;
```

## GIT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch
