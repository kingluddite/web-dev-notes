# Gatsby Plugins
* Loads the Twitter JavaScript for embedding tweets. Let's you add tweets to markdown and in other places.
* **note:** when copying the embed code, just copy the blockquote section and not the script

`$ npm install --save gatsby-plugin-twitter`

## Stylelint
`$ npm install -D stylelint stylefmt stylelint-config-standard write-good standard-version eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react`

`.stylelintrc`

```
{
    "extends": "stylelint-config-standard",
    "rules": {
        "indentation": 4
    }
}
```

`eslintrc.json`

```
{
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "extends": ["airbnb", "prettier"],
  "plugins": ["react", "jsx-a11y", "import"],
  "rules": {
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/no-danger": "off"
  },
  "settings": {
    "import/core-modules": []
  },
  "env": {
    "browser": true
  }
}
```
