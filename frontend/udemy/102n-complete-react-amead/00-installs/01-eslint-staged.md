# lint-staged
* I had prettier doing this but it was generating lots of errors I couldn't fix without it reverting to the error
* I switched to pure eslint --fix and it now works

`package.json`

```json
// // MORE CODE
"scripts": {
  "serve": "live-server public/",
  "build": "webpack --watch",
  "lint": "eslint verbose --fix src/*.js",
  "pretest": "npm run lint",
  "dev-server": "webpack-dev-server",
  "precommit": "lint-staged",
  "eslint-check": "eslint --print-config .eslintrc.js | eslint-config-prettier-check"
},
"lint-staged": {
  "*.js": [
    "eslint --fix", "git add"
  ],
  "*.css": "stylelint",
  "*.scss": "stylelint --syntax=scss"
},
// // MORE CODE
```

## My eslint rules
`.eslintrc`

```
{
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "es5",
      // "bracketSpacing": false,
      "jsxBracketSameLine": true,
    }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "comma-dangle": ["error", "only-multiline"],
    "no-underscore-dangle": [0],
    "semi": [2, "always"],
    "react/prop-types": 0,
    "react/jsx-boolean-value": 0,
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }],
    "consistent-return": 0,
    "array-callback-return": 0,
  },
  "plugins": [
    "flowtype",
    "react",
    "jsx-a11y",
    "import",
    "prettier"
  ],
  "settings": {
    "ecmascript": 7,
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "modulesDirectories": ["node_modules"]
      }
    }
  },
  "globals": {
    "__DEVELOPMENT__": true,
    "__CLIENT__": true,
    "__SERVER__": true,
    "__DISABLE_SSR__": true,
    "__DEVTOOLS__": true,
    "socket": true,
    "mixpanel": true,
    "Raven": true,
    "isCallback": true,
    "returnsPromise": true,
    "webpackIsomorphicTools": true
  }
}
```

## .stylelintrc

```
{
    "plugins": [
        "stylelint-order"
    ],
  "processors": ["stylelint-processor-styled-components"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-styled-components"
  ],
  "syntax": "scss",
    "rules": {
        "order/order": [
            "custom-properties",
            "declarations"
        ],
        "order/properties-alphabetical-order": true
    }
}
```

## For vim `vimrc` (my dotfiles)
```
" MORE CODE
Plug 'prettier/prettier'
Plug 'mitermayer/vim-prettier'
Plug 'pangloss/vim-javascript'

" MORE CODE
" ESLint through Vim
" Fix eslint on save
let g:ale_lint_on_text_changed = 'never'
" disable the Ale HTML linters
let g:ale_linters = {
\   'html': [],
\}
let g:ale_set_highlights = 0

let g:ale_fixers = {}
let g:ale_fixers['javascript'] = [
\ 'prettier', 'eslint'
\]
let g:ale_fix_on_save = 1
let g:ale_javascript_prettier_options = '--single-quote --trailing-comma es5'

" let g:ale_linters = {
"   \ 'javascript': ['stylelint', 'eslint'],
"   \}

" shortcut to run :ALEFix (<space>d)
nmap <leader>d <Plug>(ale_fix)
" MORE CODE
```
