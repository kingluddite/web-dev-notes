# Themes and Layout with Styled Components
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## Organize your styled components
* Put styled component in same folder of component you are styling
* Great if you are only using that styled component in that one location
* But what happens if you want to reuse that styled component?

## Usual Evolution of Styled Components
* Start by writing Styled component inside the components you are building
* Then if you will use it elsewhere refactor and put it in its own file

## Other Option
* Create a `styles` folder inside your `components` folder

![styles folder for modular styles](https://i.imgur.com/g0Loq9e.png)

### Example `CloseButton`
`components/styles/CloseButton.js`

```
import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
`;

export default CloseButton;
```

#### Use CloseButton
* Just import it to the component you want to use it
* And use it like this:

```
import React, { Component } from 'react';
import Link from 'next/link';
import CloseButton from './styles/CloseButton';

export class Nav extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <CloseButton>
              <a href="/sell">Sell</a>
            </CloseButton>
          </li>
          <li>
            <Link>
              <a href="/">Home</a>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
```

## Another common preference
* components/
    - Header/
        + index.js
        + styles.js
        + __test__.js
* This option is great when you start to grow your app and you have dozens an dozens of components
* **con** When you have 30 `index.js` files in your app it gets very confusing 

## Add inner
* Make content max 1000px and responsive

`Page.js`

```
import React, { Component } from 'react';
import styled from 'styled-components';

// custom components
import Meta from './Meta';
import Header from './Header';

const StyledPage = styled.div`
  background: white;
  color: black;
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: red; // just add this to test it is constrained
`;

class Page extends Component {
  render() {
    return (
      <StyledPage>
        <Meta />
        <Header />
        <Inner>{this.props.children}</Inner>
      </StyledPage>
    );
  }
}

export default Page;
```

## Create a theme

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

// MORE CODE
```

* **note** That `theme` holds an object so don't forget to make the values strings
* If you come from Sass world you know you can create a variables file and place all your variables in a file
* style components has a concept of themes
    - To use you need to import { ThemeProvider, injectGlobal }
    - You will wrap everything inside the `reactContext API`
        + It allow you to specify values up high and then any child component whether it is 2 or 3 or 15 or 16 levels deep can access those values without having to "pass down" the values from component to component
        + This is great because it totally avoids you having to resort to "prop drilling"
        + We need to pass `ThemeProvider` a `theme` attribute with our theme as a value

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
  color: black;
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: red; // just add this to test
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

## Using theme variables
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

## VS Code
* Install [this plugin](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
* On Github settings (main) Settings > Developer settings > Personal Access token and create a new access token called vs-code-settings and check `gist` and click `update token` button
* Open VS Code command pallete and clear your sync
* Type sync download
* First enter your copied new gist token
* Next grab the id from my gist repo (next line: `c11366028e72db9484739d967f35f473` )
* `https://gist.github.com/kingluddite/c11366028e72db9484739d967f35f473`
* That will sync your VS Code up with my settings
* Uninstall Vim as you probably won't like it and just use Sublime Text settings

## Install Prettier but you won't use it with JS but will use it with HTML and CSS
* To disable JS in VS Code Settings

`settings.json`

```
// MORE CODE

"prettier.disableLanguages": [
        "vue","js"
    ]

// MORE CODE
```

## Emmet settings
* Get emmet to work with JSX

```
// MORE CODE

  },
  "emmet.includeLanguages": {"javascript": "javascriptreact"},
}
```

* This will enable you to use Emmet for CSS and JavaScript inside your `.js` files

## Style our Header
`Header.js`

```
import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// custom components
import Nav from './Nav';

const Logo = styled.h1`
   font-size: 4rem;
   margin-left: 2rem;
   position: relative;
   z-index: 2;
   transform: skew(-7deg);
   a {
     padding: 0.5rem 1rem;
     background: ${props => props.theme.red};
     color: white;
     text-transform: uppercase;
     text-decoration: none;
   }
   @media (max-width: 1300px) {
     margin: 0;
     text-align: center;
   }
`;

export class Header extends Component {
  render() {
    return (
      <div>
        <div className="bar">
          <Logo>
            <Link href="/">
              <a>Sick Fits</a>
            </Link>
          </Logo>
        </div>
        <Nav />
        <div className="sub-bar">
          <p>Search</p>
        </div>
        <div>Cart</div>
      </div>
    );
  }
}

export default Header;
```

* **note** We are using media queries

## Layout
`Header.js`

```
import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

// custom components
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <div className="bar">
          <Logo>
            <Link href="/">
              <a>Sick Fits</a>
            </Link>
          </Logo>
          <Nav />
        </div>
        <div className="sub-bar">
          <p>Search</p>
        </div>
        <div>Cart</div>
      </StyledHeader>
    );
  }
}

export default Header;
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
