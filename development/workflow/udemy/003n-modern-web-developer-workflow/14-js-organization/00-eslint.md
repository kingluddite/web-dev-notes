# ESLint
* Eslint seems to be the pick of the js community
* config is broken on [eslint test page](https://eslint.org/demo/#configuration)
  - browser
    + fixes global issues like using `document`
  - node
  - es6
    + cranking ECMA version to 8 gets rid of `const` errors

## Install ESLint
* node is a requirement
* node -v
  - welcome to use yarn or npm
  - `$ npm i -g eslint@4.9.0`
  - `$ yarn i -g eslint@4.9.0`

### which version of eslint is running?
`$ eslint --version`

### Where to install eslint?
* Don't install it globally
* Better to install it on a project by project basis

## Create .eslintrc
* Eslint configuration file
* JSON file

## Run ESLint
`$ eslint app/assets/js/about.js`

`.eslintrc`

```
{
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  }
}
```

## Eslint documentation
[eslint docs](https://eslint.org/docs/user-guide/configuring)

* If working with React make sure to enable support for jsx
* Enable other environments for what you are working in
  - examples
    + commonjs
    + mocha
    + jest
    + meteor
    + mongo

## Save ESlint to your local project
`$ npm i -D eslint@4.9.0`

Or Yarn

`$ yarn add -D eslint@4.9.0`

Code Studio plugin (ESLint - Dirk Beaumer)
[Vim install eslint tutorial](https://medium.com/@hpux/vim-and-eslint-16fa08cc580f)

* Add to `~/.vimrc`

`Plugin 'vim-syntastic/syntastic'`

* then run `:PluginInstall` 
* Add this to your `~/.vimrc`

```
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_javascript_checkers = ['eslint']
let g:syntastic_javascript_eslint_exe = 'npm run lint --'
```

* Now you can run `$ npm run lint`
* Or make life easier with by adding this to your `package.json`

`package.json`

```
"scripts": {
   ...
   "lint": "eslint .",
   ...
}
```

* You are all set
* Running `:SyntasticInfo` should return some information about version and enabled checkers

## Start linting
* Open js file and type away you should she linting working its magic

## AirBnb
* [docs](https://github.com/airbnb/javascript)
* Open the [packages directory](https://github.com/airbnb/javascript/tree/master/packages) of this git repo
  - There are two
    + base version (just javascript)
    + other verison (can include jsx stuff for React)
    + We'll use the [second one](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

# Create package.json
* If it doesn't exist
* `$ npm init -y`

`$ npm i -D eslint-config-airbnb@16.1.0 eslint-plugin-import@2.7.0 eslint-plugin-react@7.4.0 eslint-plugin-jsx-a11y@6.0.1`

* All our required to use Eslint airbnb

`package.json`

```
{
  "name": "aaron-mobile-design",
  "version": "1.0.0",
  "description": "Create a website that will list all US retails stores that have closed in 2017",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint ."
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "gulp-yarn": "^1.0.1",
    "jquery": "^3.2.1",
    "normalize.css": "^7.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "browser-sync": "^2.18.13",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^6.0.1",
    "eslint-plugin-react": "^7.4.0",
    "gulp": "^3.9.1",
    "gulp-postcss": "^7.0.0",
    "gulp-watch": "^4.3.11",
    "postcss-import": "^10.0.0",
    "postcss-mixins": "^6.0.1",
    "postcss-nested": "^2.1.0",
    "postcss-simple-vars": "^4.0.0"
  }
}
```

## Update .eslintrca

`.eslintrc`

```
{
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  }
}
```

* no var
* get rid of comma dangling (if you want)
  - go to rules of eslint page
  - search for dangle
  - click on comma-dangle rule

## Rules
`.eslintrc`

```
{
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": "off"
  }
}
```

## Options
```
{
  "extends": "airbnb",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "rules": {
    "comma-dangle": ["error", "never"]
  }
}
```

* No unsed vars unless they are an arg
```
{
  "extends": "airbnb",
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
    }]
  }
}
```

React rules

[documentation for eslintplugin react](https://github.com/yannickcr/eslint-plugin-react)

Can use numbers instead of strings
* 0 - off
* 1 - warning
* 2 - error

```
{
  "extends": "airbnb",
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
    "react/jsx-filename-extension": 0
  }
}
```
