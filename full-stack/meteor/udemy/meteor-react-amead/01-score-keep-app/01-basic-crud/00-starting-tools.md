# Starting Tools
* Introduced in 2013 by Nicholas C. Zakas
* Philosophy of having a linting tool where everything was pluggable, every rule is stand-alone, and it's agenda-free in that it doesn't enforce any particular coding style
* Robust set of default rules covering all of the rules that exist in **JSLint** and **JSHint**, making a migration to this tool fairly easy
* Configurable rules - including error levels, allowing you to decide what is a warning, error, or simply disabled
* Rules for style checking, which can help keep the code format consistent across teams
* The ability to write your own plugins and rules

[Why use ESLint?](http://blog.rangle.io/understanding-the-real-advantages-of-using-eslint/)

## [Eslint with React and Meteor](https://github.com/Firfi/meteor-react-bootstrap/blob/master/.eslintrc)

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
    "react/jsx-wrap-multilines": 2,
    "react/jsx-uses-vars": 2,
    "strict": 0
  }
}
```

## We will use `yarn` instead of `npm`
* [video to learn yarn](http://www.mead.io/yarn/)
* My notes on this are located inside `development/tools/node/yarn/amead-tutorial`

### Intialize yarn
`$ yarn init -y`

This will created `package.json`

```
{
  "name": "name-in-the-happ",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

## Install meteor inside an existing project
`$ meteor create .`

## Overwrite `package.json` with yarn
We installed meteor and it overwrote our yarn so we just add it again

### Intialize yarn
`$ yarn init -y`

`$ yarn add -D eslint eslint-plugin-react babel-eslint`

* We didn't have a `yarn.lock` file
* After installing we now have our `yarn.lock` file

`$ git status`
`$ git add .`
`$ git commit -m 'Install eslintrc, yarn, meteor and initialize git repo'`
`$ hub create`
`$ git push`

### Using my git alias I would type
`$ gs`
`$ ga .`
`$ gc -m 'Install eslintrc, yarn, meteor and initialize git repo'`
`$ hub create`
`$ gpush`

## Problems getting eslint to work
If you followed the above steps, you should not have any errors but here are the steps if you get errors

### Say no to global linters
* Install [linter-eslint](https://github.com/AtomLinter/linter-eslint)
* I don't like using a global `.eslintrc` as it is problematic if you are switching different types of JavaScript project
* I find it best to use an `.eslintrc` file in each of your projects.
* Remove if you have a global `.eslintrc` file

`$ rm -rf ~/.eslintrc`

If you get this error: (_do the following_)

![eslint error](https://i.imgur.com/xcIoars.png)

### Add eslint as a [dev dependency](https://i.imgur.com/lm5pEZW.png)
`$ yarn add -D eslint`

You will still see the error and if you follow the instructions and go to `view` > `Developer` > `Toggle Developer Tools` you will see you also need to install [`eslint-plugin-react`](https://i.imgur.com/c7jl7F6.png)

`$ yarn add -D eslint-plugin-react`

And we also see that (from `view` > `Developer` > `Toggle Developer Tools`), we need to install [`babel-eslint`](https://i.imgur.com/aFQpAZe.png)

`$ yarn add -D babel-eslint`

Close and open a JavaScript file and you should see eslint working

### Great Sass Linter file
`.scss-lint.yml`

```
linters:

  BangFormat:
    enabled: true
    space_before_bang: true
    space_after_bang: false

  BemDepth:
    enabled: true
    max_elements: 1

  BorderZero:
    enabled: true
    convention: zero

  ChainedClasses:
    enabled: false

  ColorKeyword:
    enabled: true

  ColorVariable:
    enabled: false

  Comment:
    enabled: false

  DebugStatement:
    enabled: true

  DeclarationOrder:
    enabled: true

  DisableLinterReason:
    enabled: true

  DuplicateProperty:
    enabled: false

  ElsePlacement:
    enabled: true
    style: same_line

  EmptyLineBetweenBlocks:
    enabled: true
    ignore_single_line_blocks: true

  EmptyRule:
    enabled: true

  ExtendDirective:
    enabled: false

  FinalNewline:
    enabled: false
    present: true

  HexLength:
    enabled: true
    style: long

  HexNotation:
    enabled: true
    style: lowercase

  HexValidation:
    enabled: true

  IdSelector:
    enabled: true

  ImportantRule:
    enabled: false

  ImportPath:
    enabled: true
    leading_underscore: false
    filename_extension: false

  Indentation:
    enabled: true
    allow_non_nested_indentation: true
    character: space
    width: 2

  LeadingZero:
    enabled: true
    style: include_zero

  MergeableSelector:
    enabled: false
    force_nesting: false

  NameFormat:
    enabled: true
    convention: hyphenated_lowercase
    allow_leading_underscore: true

  NestingDepth:
    enabled: true
    max_depth: 1

  PlaceholderInExtend:
    enabled: true

  PrivateNamingConvention:
    enabled: true
    prefix: _

  PropertyCount:
    enabled: false

  PropertySortOrder:
    enabled: false

  PropertySpelling:
    enabled: true
    extra_properties: []

  PropertyUnits:
    enabled: false

  PseudoElement:
    enabled: true

  QualifyingElement:
    enabled: true
    allow_element_with_attribute: false
    allow_element_with_class: false
    allow_element_with_id: false

  SelectorDepth:
    enabled: true
    max_depth: 3

  SelectorFormat:
    enabled: false
    convention: hyphenated_lowercase
    class_convention: '^(?:u|is|has)\-[a-z][a-zA-Z0-9]*$|^(?!u|is|has)[a-zA-Z][a-zA-Z0-9]*(?:\-[a-z][a-zA-Z0-9]*)?(?:\-\-[a-z][a-zA-Z0-9]*)?$'

  Shorthand:
    enabled: true

  SingleLinePerProperty:
    enabled: true
    allow_single_line_rule_sets: false

  SingleLinePerSelector:
    enabled: true

  SpaceAfterComma:
    enabled: true

  SpaceAfterPropertyColon:
    enabled: true
    style: one_space

  SpaceAfterPropertyName:
    enabled: true

  SpaceAfterVariableColon:
    enabled: true
    style: at_least_one_space

  SpaceAfterVariableName:
    enabled: true

  SpaceAroundOperator:
    enabled: true
    style: one_space

  SpaceBeforeBrace:
    enabled: true
    style: space
    allow_single_line_padding: true

  SpaceBetweenParens:
    enabled: true
    spaces: 0

  StringQuotes:
    enabled: true
    style: single_quotes

  TrailingSemicolon:
    enabled: true

  TrailingZero:
    enabled: true

  TransitionAll:
    enabled: false

  UnnecessaryMantissa:
    enabled: true

  UnnecessaryParentReference:
    enabled: true

  UrlFormat:
    enabled: false

  UrlQuotes:
    enabled: true

  VariableForProperty:
    enabled: false

  VendorPrefixes:
    enabled: true
    identifier_list: base
    include: []
    exclude: []

  ZeroUnit:
    enabled: true
```

# Cool Sass stuff
Developing with Sass doesn't have to hurt

## Sass Resources
Here are some places to help speed up your Sass workflow

* [Sass Guidelines](https://sass-guidelin.es/)
* [scss-lint](https://github.com/brigade/scss-lint)
* [atom linter-scss-lint](https://atom.io/packages/linter-scss-lint)
* [CSScomb](http://csscomb.com/)
* [CSS line explanation](http://davidtheclark.com/scss-lint-styleguide/)

## My Setup when working with Sass, React, Meteor and Atom
* Install `scss-lint`
    - `$ gem install scss_lint`
* Install atom plugin
    - `$ apm install linter-scss-lint`
* [atom-beautify settings](https://i.imgur.com/Kif4IIG.png) for SCSS
* Place this file in the root of your project `.scss-lint.yml`
* Save your `*.scss` files and correct changes
* Rinse and repeat

`.scss-lint.yml`

* Save this file in the root of your project
* It is a `.yml` file which means it conveys information through indentation

`package.json`

```
{
  "name": "name-in-the-happ",
  "private": true,
  "scripts": {
    "start": "meteor run"
  },
  "dependencies": {
    "babel-runtime": "^6.20.0",
    "meteor-node-stubs": "~0.2.4",
    "prop-types": "^15.5.8",
    "react": "^15.5.4",
    "react-addons-pure-render-mixin": "^15.5.2",
    "react-dom": "^15.5.4",
    "react-flip-move": "^2.9.8",
    "react-router": "3.0.0"
  },
  "version": "1.0.0",
  "main": "index.js",
  "author": "PEH2 <howley.phil@gmail.com>",
  "license": "MIT",
  "devDependencies": {
    "babel-eslint": "^7.2.3",
    "eslint": "^3.19.0",
    "eslint-config-airbnb": "^14.1.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-meteor": "^4.0.1",
    "eslint-plugin-react": "^7.0.0"
  },
  "eslintConfig": {
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": [
      "meteor",
      "react"
    ],
    "extends": [
      "airbnb/base",
      "plugin:meteor/guide",
      "plugin:react/recommended"
    ],
    "env": {
      "browser": true
    },
    "globals": {
      "server": false,
      "browser": false,
      "expect": false
    },
    "rules": {
      "import/no-unresolved": 0,
      "import/no-extraneous-dependencies": 0,
      "import/extensions": 0,
      "arrow-body-style": [2, "always"],
      "import/no-named-as-default": ["off"],
      "no-underscore-dangle": [
        "error",
        {
          "allow": [
            "_id",
            "_ensureIndex",
            "_verifyEmailToken",
            "_resetPasswordToken",
            "_name"
          ]
        }
      ],
      "class-methods-use-this": 0
    }
  }
}
```

### Add .eslintrc inside `package.json`
Here is how you would do this:

```
{
  "name": "application-name",
  "version": "1.0.0",
  "description": "Application description.",
  "license": "MIT",
  "scripts": {
  },
  "devDependencies": {
    "eslint": "^3.8.1",
    "babel-eslint": "^7.2.3",
    "eslint-config-airbnb": "^12.0.0",
    "eslint-plugin-import": "^1.16.0",
    "eslint-plugin-jsx-a11y": "^2.2.3",
    "eslint-plugin-meteor": "^4.0.1",
    "eslint-plugin-react": "^6.4.1"
  },
  "eslintConfig": {
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": [
      "meteor",
      "react"
    ],
    "extends": [
      "airbnb/base",
      "plugin:meteor/guide",
      "plugin:react/recommended"
    ],
    "env": {
      "browser": true
    },
    "globals": {
      "server": false,
      "browser": false,
      "expect": false
    },
    "rules": {
      "import/no-unresolved": 0,
      "import/no-extraneous-dependencies": 0,
      "import/extensions": 0,
      "arrow-parens": ["error", "always"],
      "no-underscore-dangle": [
        "error",
        {
          "allow": [
            "_id",
            "_ensureIndex",
            "_verifyEmailToken",
            "_resetPasswordToken",
            "_name"
          ]
        }
      ],
      "class-methods-use-this": 0
    }
  },
  "dependencies": {
    "babel-runtime": "^6.23.0",
    "bcrypt": "^1.0.2",
    "meteor-node-stubs": "^0.2.6",
    "prop-types": "^15.5.8",
    "react": "^15.5.4",
    "react-addons-pure-render-mixin": "^15.5.2",
    "react-dom": "^15.5.4",
    "react-router": "^3.0.0",
    "react-router-bootstrap": "^0.23.2",
    "simpl-schema": "^0.2.3"
  }
}
```

## Uninstall elint globally
`$ npm uninstall -g eslint`
