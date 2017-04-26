# Starting Tools

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

## Problems getting eslint to work
* Install [linter-eslint](https://github.com/AtomLinter/linter-eslint)
* I don't like using a global `.eslintrc` as it is problematic if you are switching different types of JavaScript project. I find it best to use an `.eslintrc` file in each of your projects.
* Remove if you have a global `.eslintrc` file

`$ rm -rf ~/.eslintrc`

If you get this error: (_do the following_)

![eslint error](https://i.imgur.com/xcIoars.png)

### Add eslint as a [dev dependency](https://i.imgur.com/lm5pEZW.png)
`$ npm i -D eslint`

You will still see the error and if you follow the instructions and go to `view` > `Developer` > `Toggle Developer Tools` you will see you also need to install [`eslint-plugin-react`](https://i.imgur.com/c7jl7F6.png)

`$ npm i -D eslint-plugin-react`

And we also see that (from `view` > `Developer` > `Toggle Developer Tools`), we need to install [`babel-eslint`](https://i.imgur.com/aFQpAZe.png)

`$ npm i -D babel-eslint`

Close and open a JavaScript file and you should see eslint working

As an example, I am using an `.eslintrc` file in the root of my React/Meteor project

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
