## Add our ESLint for Meteor and React
1. After you create your Meteor app come back to these notes and create `.eslintrc`in the root of your project
2. Copy the `package.json` and you can install the stuff you need for ESlint and React
3. Then run `$ npm install` or `$ meteor npm install` to install all the dependencies and dev-dependencies

`.eslintrc`

```
{
  "env": {
    "browser": true,
    "node": true
  },
  "ecmaFeatures": {
    "jsx": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "comma-spacing": 2,
    "key-spacing": 0,
    "no-underscore-dangle": 0,
    "no-unused-vars": [2, { "vars": "all", "args": "none" }],
    "no-var": 2,
    "object-shorthand": 2,
    "quotes": [2, "single", "avoid-escape"],
    "react/display-name": 0,
    "react/jsx-no-undef": 2,
    "react/jsx-uses-react": 2,
    "react/no-did-mount-set-state": 2,
    "react/no-did-update-set-state": 2,
    "react/no-multi-comp": 2,
    "react/prop-types": [2, { ignore: [children, className] }],
    "react/react-in-jsx-scope": 2,
    "react/self-closing-comp": 2,
    "react/wrap-multilines": 2,
    "react/jsx-uses-vars": 2,
    "strict": 0
  }
}
```

`package.json`

```
{
  "name": "short-link-practice",
  "private": true,
  "scripts": {
    "start": "meteor run"
  },
  "dependencies": {
    "babel-runtime": "^6.20.0",
    "meteor-node-stubs": "~0.2.4",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-router": "^3.0.5"
  },
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "eslint": "^3.19.0",
    "eslint-plugin-react": "^6.10.3"
  }
}

```

**note** Remove your global `.eslintrc` (_If it exists it will reside inside yoru user directory ~/username_)

* I find it easier to manually set up an `.eslintrc` per project
