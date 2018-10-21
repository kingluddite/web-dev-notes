# Intro to Styled Components
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch
* 
* [link to styled components](https://www.styled-components.com/)
* Tightly couple styles to your components

## Install vscode-styled-components
* Plugin for VS Code

## Add the styled-components package
`$ npm i styled-components`

## Add and style a button
* Just a simple example

`Page.js`

```
import React, { Component } from 'react';
import styled from 'styled-components';

// custom components
import Header from './Header';

const MyButton = styled.button`
  background: red;
  font-size: 100px;
`;

export class Page extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyButton>Click Me</MyButton>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
```

* View in browser
* MyButton is now styled using styled components

## Nest tags
`Page.js`

```
import React, { Component } from 'react';
import styled from 'styled-components';

// custom components
import Header from './Header';

const MyButton = styled.button`
  background: red;
  font-size: 100px;
`;

const SomethingDifferent = styled.span`
  color: green;
`;

export class Page extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyButton>
          Click Me
          <SomethingDifferent>
            {' '}
            Now for something completely different
          </SomethingDifferent>
        </MyButton>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
```

* Or you could nest like you would with Sass

```
import React, { Component } from 'react';
import styled from 'styled-components';

// custom components
import Header from './Header';

const MyButton = styled.button`
  background: red;
  font-size: 100px;

  span {
    color: green;
  }
`;

export class Page extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyButton>
          Click Me
          <span> Now for something completely different</span>
        </MyButton>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
```

* You decide how you want to use it
* If you will reuse the nested element then make it a component, otherwise just nest it

## Styled Components can have props
```
import React, { Component } from 'react';
import styled from 'styled-components';

// custom components
import Header from './Header';

const MyButton = styled.button`
  background: red;
  font-size: ${props => (props.huge ? '100px' : '50px')};

  span {
    color: green;
  }
`;

export class Page extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyButton huge>
          Click Me
          <span> Now for something completely different</span>
        </MyButton>
        <MyButton>
          Click Me
          <span> Now for something completely different</span>
        </MyButton>
        {this.props.children}
      </div>
    );
  }
}

export default Page;
```

## Put our Page.js back to before we added the styled component

`Page.js`

```
import React, { Component } from 'react';

// custom components
import Header from './Header';

export class Page extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
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
