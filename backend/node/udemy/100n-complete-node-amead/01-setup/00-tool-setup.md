# Tools
## .eslintrc
```json
{
  "extends": [
   "airbnb",
   "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": ["error","never"],
    "no-unused-vars": [ "error",
    {
      "vars": "local",
      "args": "none"
    }],
  }
}
```

`package.json`

```json
{
  "name": "weather-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "request": "^2.73.0",
    "yargs": "^4.8.1"
  },
  "devDependencies": {
    "eslint": "^4.12.0",
       "eslint-config-airbnb": "^16.1.0",
    "eslint-config-prettier": "2.7.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.1",
    "eslint-plugin-prettier": "2.3.1",
    "eslint-plugin-react": "^7.4.0",
    "prettier": "1.8.2",
    "prettier-eslint-cli": "^4.4.0"
  }
}
```

## .eslintignore
```
node_modules/**
```

## nodemon
* Install nodemon globally

`$ npm install -g nodemon`

## yarn
`$ brew install yarn`



