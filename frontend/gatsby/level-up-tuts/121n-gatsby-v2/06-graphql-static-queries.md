# GraphQL Static Queries
## First let's add ESLint to our app
* Here is a link to the step-by-step instructions with more detail

`$ npm rm prettier`

`$ `
* Add `/.eslintrc`

```
# Remove the Prettier package
npm rm prettier
```

```
# Install ESLint and its packages
npm install --save-dev eslint babel-eslint eslint-config-standard eslint-plugin-node eslint-plugin-standard eslint-plugin-react eslint-plugin-import eslint-plugin-promise
```

```
# Remove the Prettier config file
rm .prettierrc
```

```
# Create a config file for ESLint
touch .eslintrc.js
```

`.eslintrc.js`

```
module.exports = {
  extends: ["standard"],
  plugins: ["standard", "react"],
  rules: {
    "no-var": "error", // optional, recommended when using es6+
    "no-unused-vars": 1, // recommended
    "arrow-spacing": ["error", { before: true, after: true }], // recommended
    indent: ["error", 2],
    "comma-dangle": [
      "error",
      {
        objects: "only-multiline",
        arrays: "only-multiline",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],

    // options to emulate prettier setup
    semi: ["error", "never"],
    "max-len": ["error", { code: 80 }],
    "template-curly-spacing": ["error", "always"],
    "arrow-parens": ["error", "as-needed"],

    // standard.js
    "space-before-function-paren": [
      "error",
      {
        named: "always",
        anonymous: "always",
        asyncArrow: "always",
      },
    ],

    // standard plugin - options
    "standard/object-curly-even-spacing": ["error", "either"],
    "standard/array-bracket-even-spacing": ["error", "either"],
    "standard/computed-property-even-spacing": ["error", "even"],
    "standard/no-callback-literal": ["error", ["cb", "callback"]],

    // react plugin - options
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
}
```

## Back to Static Query
`layout.js`

```
// MORE CODE

import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}

// MORE CODE
```

* In Gatsby V1 you dealt with GraphQL using a HOC (Higher Order Component)
* Now you use a **render prop**
    - This is similar to how it is done using Apollo
    - **Best Practice** Name your queries

## How StaticQuery works
* The StaticQuery has a prop named `query`
* We pass the `query` prop our GraphQL
* We can copy and paste our GraphQL sandbox working query we just did to our code
* All of the GraphQL is inside a ES6 template string
* Then we have a render prop and it is equal to a function that gives us the `data` and the return of that data will be a bunch of react/jsx code
* **note** The `data` is the data that comes back from our GraphQL query

### structure
* `data.site.siteMetadata.title` and you will see this structure is exact same as our GraphQL sandbox result set (output)

```
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "React Sensei",
        "description": "Learn Gatsby from the ground up. Our target market are people new to the world of development"
      }
    }
  }
}
```

* Then we pass that data down as a prop into our Header with:

`layout.js`

```
// MORE CODE

<Helmet
  title={data.site.siteMetadata.title}

// MORE CODE
```

### Add our description to our SEO
`layout.js`

```
// MORE CODE

<Helmet
  title={data.site.siteMetadata.title}
  meta={[
    { name: 'description', content: data.site.siteMetadata.description },
    { name: 'keywords', content: 'sample, something' },
  ]}
>

// MORE CODE
```

## Take it for a test drive
* Inspect the element and you will see the description inside the `<head>`
* You will not see it in the source as that is only created in production
* This will be statically built when we generate the site
