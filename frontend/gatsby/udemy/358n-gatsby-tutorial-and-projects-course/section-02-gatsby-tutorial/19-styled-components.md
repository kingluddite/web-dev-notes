# Styled Components
* [docs](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/?=style-components)
* VS Code plugin - vscode-styled-components
    - Syntax highlighting for styled-components
        + Great that it give you proper syntax highlighting
        + And it gives you errors if you screw something up

## If you are using stylelint you need to hide from styled-components
* [styled components are javascript objects so you need to hide from stylelint and here is the code](https://stylelint.io/user-guide/ignore-code)

`.stylelintignore`

```
**/*.js
```

* If you are using `import` you'll see **CSSSyntaxError 'Unknown Word' but adding the ignore file above it goes away

## Install
`$ npm install --save gatsby-plugin-styled-components styled-components babel-plugin-styled-components`

* **IMPORTANT** If you change `gatsby-config.js` you MUST MUST MUST to restart server

Edit `gatsby-config.js`

```
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
  ],
}
```

## Create a styled-component
`components/button.js`

```
import styled from 'styled-components';

const ExampleButton = styled.button`
  background: green;
  color: orange;
  font-size: 2rem;
`;

export default ExampleButton;
```

## Using the styled-component
* Make sure you know if it is a named or default export

`pages/index.js`

```
import React from 'react';
import Layout from '../components/layout';
import ExampleButton from '../components/button';

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>
      <div>
        <a href="https://cnn.com">CNN</a>
      </div>
      <ExampleButton>Test Button</ExampleButton>
    </Layout>
  );
}
```

* **Note** If you view the page in the UI and inspect you'll see the button has a unique class name as well and this keeps it from conflicts
