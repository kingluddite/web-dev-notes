# Vim React
* Add this plugin (Vundle)

```
Plugin 'pangloss/vim-javascript'
Plugin 'mxw/vim-jsx'
```

* If you use JSX syntax in `.js` files, which is now becoming standard, add (.vimrc):

`let g:jsx_ext_required = 0 " Allow JSX in normal JS files`

## Eslint
* Install eslint, babel-eslint (for ES6 support), and eslint-plugin-react:

```
$ npm install -g eslint
$ npm install -g babel-eslint
$ npm install -g eslint-plugin-react
```

## Eslint config file `.eslintrc`
* Create a config like this in your project's .eslintrc

```json
{
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true
    },
    "settings": {
        "ecmascript": 6,
        "jsx": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "strict": 0,
        "quotes": 0,
        "no-unused-vars": 0,
        "camelcase": 0,
        "no-underscore-dangle": 0
    }
}
```


