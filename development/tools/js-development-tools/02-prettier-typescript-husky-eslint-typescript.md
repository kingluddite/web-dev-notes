# node boilerplate with:
* [babel](https://babeljs.io/)
* [prettier](https://prettier.io/)
* [typescript](https://www.typescriptlang.org/)
* [husky](https://github.com/typicode/husky)
* [ESLint](https://eslint.org/)
* [lint-staged](https://github.com/okonet/lint-staged)

## Install this project
`$ npm i`

## Build
`$ npm run validate`

* That will run the type check with TypeScript, check the format with prettier, run ESLint with the recommended settings and transpile the TypeScript to ES5 using babel

## Info on this Boilerplate contents
* [Much of this knowledge has come from this fantastic course from Kent C. Dodds](https://testingjavascript.com/) which if you truly want to learn about testing with JavaScript this is course you need to take

## Install ESLint as a dev dependency
* ESLint will help catch bugs in your code early

`$ npm i -D eslint`

### Add ESLint configuration file
* In root of project

`$ touch .eslintrc`

### CLI fix for ESLint

`$ npx ESLint . --fix`

* This can't fix all broken rules but it does fix a lot

## VS Code + ESLint
* Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-ESLint) and it will underline your ESLint errors
* Hover over error `cmd` + click and it will give you choices like "fix" the error code

### What if you want to disable ESLint?
* ESLint has comments you can use to turn ESLint rules off for a line of code or the entire file
    - In VS Code hover over the infraction line and choose `disable ESLint for this line`
    - You can also choose to disable ESLint for entire file
    - And you can choose to show documentation

## Add ESLint script

`package.json`

```
// MORE CODE

"scripts": {
    "lint": "eslint .",
  },

// MORE CODE
```

* Run with `$ npm run eslint`

## Install babel
* Babel will transpile our modern JavaScript to ES5 for browser compatibility

`$ npm i =D @babel/cli @babel/core @babel/preset-env`

* And `.babelrc` in project root

`$ touch .babelrc`

`.babelrc`

```
{
  "presets": ["@babel/preset-env"]
}
```

## Add babel build script
* This will take our code inside `src` and transpile it to the `dist` folder

`packge.json`

```
// MORE CODE

  "scripts": {
    "build": "babel src --out-dir dist",

    // MORE CODE

  },
// MORE CODE
```

## Build
`$ npm run build`

* That created a file with `"use strict"` in the `dist` directory
* And we get an error so we can use a `.eslintignore` file to ignore that error but we can save creating a new file that will just duplicate the contents of our `.gitignore` and we can use two for the price of one with this script
* I recommend creating a .eslintignore as not using it can be buggy
    - Just duplicate your `.gitignore` content with `.eslintignore`

`package.json`

```
// MORE CODE

"scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore ."
  },
// MORE CODE
```

* And our `.gitignore` and `.eslintignore` each have:

```
node_modules
dist
```

* The error from the file inside `dist` should not be gone

## Prettier
* Tool that enables us to format our code

`$ npm i -D prettier`

### Run Prettier
`$ npx prettier src/example.js --write src/index.js`

* That command updates the file with the formatted changes

### Add a script to format with prettier
* We'll use a `glob` to match files so it will format all of them
    - We'll use all the files we want prettier to format

`package.json`

```
// MORE CODE

"scripts": {
    "lint": "ESLint src",
    "format": "prettier --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\""
  },

// MORE CODE
```

* Now we can format

`$ npm run format`

## We don't want to format our `dist` directory
* So to avoid doing that we'll use the same technique we used for `.eslintignore` when linting but we'll use that flat for our `format` script

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\""
  },
// MORE CODE
```

## Prettier playground
* [If you want to customize your prettier rules use this playground](https://prettier.io/playground/)

### Create `.prettierrc` in root of project

`.prettierrc`

```
{
  "arrowParens": "always",
  "bracketSpacing": false,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": false,
  "printWidth": 80,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

### Test it out
`$ npm run format`

* `prettier` will now format your code based on those rules
* **reminder** Check to make sure that you do not see the `dist` folder being formatted

## VS Code and Prettier Extension
* We need to get `VS Code` to play nice with our prettier settings

### (tip) Easier to update using `.json` settings
1. Open settings `cmd` + `,`
2. Then on top right click the `open settings` icon (_top right of VS Code UI_)

### Add `esbenp.prettier-vscode`
* `esbenp.prettier-vscode` is the formatter that the `prettier` extension exposes to VS Code

### Format our code on save
* `editor.formatOnSave` formats your code via prettier on save
    - **tip** `cmd` + `shift` + `p` (select Format Document) will also format document

`settings.js`

```
// Place your settings in this file to overwrite the default settings
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,

// MORE CODE
```

## A better way to address ESLint/Prettier conflicts
* Removing all conflicts between `ESLint` and `prettier` manually is tedious
* Use a setting that automatically disables any rules that prettier renders useless

### Install Eslint-config-prettier

`$ npm i -D eslint-config-prettier`

`.eslintrc`

```
// MORE CODE

"extends": ["eslint:recommended", "eslint-config-prettier"],
"rules": {
  "strict": ["error", "never"]
},
// MORE CODE
```

## Disable other software using the eslint-config-prettier
* [docs](https://github.com/prettier/ESLint-config-prettier)
    - Even though we haven't added yet we'll disable typescript and react
    - And we'll add to avoid conflicts with babel

`$ npm i -D @typescript-eslint/eslint-plugin eslint-plugin-babel eslint-plugin-react`

`.eslintrc`

* Have a script that validates our the project is in a good state

`$ npm run validate`

### But we also want to make sure all the files have been properly formatted
* `prettier` exposes a mechanism to accomplish that using `check-format`

`package.json`

```
// MORE CODE

"scripts": {

    // MORE CODE

    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",

    // MORE CODE

  },
// MORE CODE
```

`package.json`

```
// MORE CODE

"scripts": {

// MORE CODE

    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "validate": "npm run check-format && npm run lint && npm run build"
},

// MORE CODE
```

* So you can run `$ npm run validate` to make sure your project is in a good state when that validate script passes

### Don't be DRY
* But our scripts are getting long and violating the DRY coding principle

`package.json`

```
// MORE CODE

    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "validate": "npm run check-format && npm run lint && npm run build"
  },
// MORE CODE
```

* We can convert it to this:

```
// MORE CODE

    "prettier":"prettier --ignore-path .gitignore \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"", 
    "format": "npm run prettier -- --write",
    "check-format": "npm run prettier -- --list-different",

// MORE CODE
```

* `--` tells `npm` to forward all of the remaining arguments to to the script being called
    - In the above example `npm run prettier`
        + The `format` script will pass `--write`
        + The `check-format` script will pass `--list-different`

### Run validate
`$ npm run validate`

* If there are no errors your code is in a good state

## Let's add TypeScript
* A software to encode Types
* Helps us be more explicit with our code to help avoid bugs

`$ npm i -D typescript`

* After installed look for `node_modules/bin/tsc`

### What does `tsc` stand for?
* typescript compiler
* We can use the `tsc` to verify that the types in our project are correct

## Change our `.js` to `.ts` (inside `src` directory)
* Try to run the typescript compiler
`$ npx tsc`

* That gives us a bunch of output
* This happens because we don't have typescript configured yet

### Add TypeScript config file

`$ touch tsconfig.json`

* We need to tell TypeScript where to look for our TypeScript files (and that's in our `src` directory)

`tsconfig.json`

```
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

## We won't use TypeScript to compile our code
* We just use TypeScript for type checking
    - `babel` will compile our code and it already is doing that
    - We tell our compiler to not emit any of our files

`tsconfig.json`

```
{
  "compilerOptions": {
    "noEmit": true,
    "baseUrl": "./src"
  }
}
```

* Now if we run our TypeScript compiler

`$ npx tsc`

* We get 2 errors, I fix the spelling on the function and run `$ npx tsc` again
    - And 2 more errors
* We also see it catches the midd1e error
    - It even asks us did we mean to type `middle`?

### Add our check types script
`package.json`

```
// MORE CODE

"scripts": {
  "build": "babel src --out-dir dist",
  "lint": "eslint --ignore-path .gitignore .",
  "check-types": "tsc", // ADD!

// MORE CODE
```

* And we'll add this to our `validate` script too

`package.json`

```
// MORE CODE

    "check-format": "npm run prettier -- --list-different",
    "validate": "npm run check-types && npm run check-format && npm run lint && npm run build"
  },
// MORE CODE
```

## Run validate script
`$ npm run validate`

* It will show we have errors and we can fix them

## Fix our bad types
* Make sure you add `ts` and `tsx` are adding to what prettier is formatting

`package.json`

```
// MORE CODE

    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
// MORE CODE
```

### One more problem
* We need to tell babel to not only process `.js` files but also `ts` and `tsx` files

`package.json`

```
// MORE CODE

 "scripts": {
    "build": "babel src --extensions .js,.ts,.tsx --out-dir dist",

// MORE CODE
```

## Now we run `$ npm run build`

### We get a parsing error
* And we get a `BABEL_PARSE_ERROR`
* The reason is by default `babel` isn't capable of parsing typescript

### @babel/preset-typescript 
* This will enable babel to parse typescript

`$ npm i -D @babel/preset-typescript`

## And now we have to add that as one of our babel presets

`.babelrc`

```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
      }
    }
  ],
  "@babel/preset-typescript"
  ]
}
```

## Run the build script

`$ npm run build`

* **Note** To avoid an error if there are no `.js` files or `.ts` files inside the `src` add this flag (--no-error-on-unmatched-pattern)

`package.json`

```
// MORE CODE

"lint": "eslint --no-error-on-unmatched-pattern --ignore-path .gitignore .",

// MORE CODE
```

## Validate gives us the following 4 things
1. type checking
2. prettier formatting
3. ESLint checking
4. babel transpiling build

## TypeScript playing nice with ESLint
* Currently, ESLint is configured to run across all of the JavaScript files but it does not work with TypeScript files

`$ npm run lint`

* Will not give us any linting errors at all
* **Note** TypeScript makes lots of rules that ESLint has unnecessary
    - But there are some rules that ESLint has that would be very useful in TypeScript
* ESlint in VS Code may be trying to parse a file but it can't because it is written in Typescript
* We need to enable ESLint to be able to parse a TypeScript file

## Install two plugins to help TypeScript play nice with ESLint
`$ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser`

### Configure ESLint
* We want to make sure ESLint runs across TypeScript files

`package.json`

```
// MORE CODE

    "lint": "eslint --ignore-path .gitignore --ext .js,.ts,.tsx .",

// MORE CODE
```

### Run ESLint

`$ npm run lint`

* We get an error because it still isn't configured to parse TypeScript files properly
* We are running ESLint across multiple files (not just TypeScript files)
* We want to keep the configuration we are using inside `.eslintrc` but we will **override** this configuration for typescript files
  - We'll use `ESLint's` **overrides** property

`.eslintrc`

```
{
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": ["eslint:recommended", "eslint-config-prettier"],
  "rules": {
    "strict": ["error", "never"]
  },
  "env": {
    "browser": true
  },
  "overrides": [
    {
      "files": "**/*.+(ts|tsx)",
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "./tsconfig.json"
      },
      "plugins": ["@typescript-eslint/eslint-plugin"],
      "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ]
    }
  ]
}
```

`.eslintrc`

```
// MORE CODE
"extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint-config-prettier/@typescript-eslint"
      ]
    }
  ]
}
```

## Add husky
* We want to always validate our code before any commits any code
* This will prevent anyone from committing code that violates any of the code that we put in place

### Install `husky`
* **note** You need to be working in a git repo for this to work

`$ npm i -D husky`

* Look inside the `.git/hooks` directory

`$ ls -a .git/hooks`

* You will see a files that `husky` created for us

`$ cat .git/hooks/pre-commit`

* This give us the ability to do what we are about to do

### Create a new .huskyrc file
`$ touch .huskyrc` (in project root)

`.huskyrc`

```
{
  "hooks": {
    "pre-commit": "npm run validate"
  }
}
```

* That hooks directory is built into `git`
* And any time you do a commit `git` is going to run that `precommit` script that is in that `hooks` directory
  - That `precommit` script that husky built for us will look up this configuration and run this script we have above `npm run validate`

## Let's try husky
`$ git add .`

`$ git commit -am 'husky is cool'`

* And your code was added and committed
* If you get an error it will not commit and you'll see:

`husky > pre-commit hook failed (add --no-verify to bypass)`

* **note** If you really wanted to commit bad code you could use:

`$ git commit -am 'really do it! --no-verify`

## Lint-staged
* A better way would be to automatically format as they commit the code
* And so they won't have to install the plugin if they don't want to
* To do this we'll use a tool call `lint-staged`

### Install it
`$ npm i -D lint-staged`

### Create a new config file for lint-staged
`$ touch .lintstagedrc`

* Inside this file we say "any files that you're processing if they match `*.+(js|ts|tsx)`" we run the following scripts: `eslint`
* We'll handle formatting for all files for our project that we support
    + We want to add the changes back to git so that its committed with those changes

`.lintstagedrc`

```
{
  "*.+(js|ts|tsx)": [
    "eslint"
  ],
  "**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)": [
    "prettier --write"
  ]
}
```

## Update
* If you use `git add` you will get a warning `⚠ Some of your tasks use `git add` command. Please remove it from the config since all modifications made by tasks will be automatically added to the git commit index.`
* **note** [From v10 lint-staged onwards](https://github.com/okonet/lint-staged/issues/775#issuecomment-577106594) the git add part is automatic and not necessary to include in your configuration

* Now we'll configure `lint-staged` to be run on commit
  - And what is running on commit?
    + husky

`.huskyrc`

```
{
  "hooks": {
    "pre-commit": "npm run validate"
  }
}
```

* But instead of running the validate script, we'll instead run `lint-staged`
  - `lint-staged` is taking care of our linting and its taking care of our formatting
  - But it's not taking care of our type-checking or our build (`so we're going to want to keep those`)

`.huskyrc`

```
{
  "hooks": {
    "pre-commit": "npm run check-types && lint-staged && npm run build"
  }
}
```

## Add and commit changes
1. it will run our type checking first
2. Then it runs lint-stage
3. Then it runs our build (to make sure all that stuff is still happening)

* `lint-staged` is only running across the files that have been changed
* It is now configured to add files back if they've been changed by prettier
* After running verify the TypeScript file and you'll see it was reformatted for us automatically
* **note** Lint-staged can even handle patched changes (_If you are only committing part of the file it will only update the part of the file that is being changed_)
* **note** So if a team member doesn't have prettier configured for this project their code will get formatted and committed still

## It would be great if I could run these all at the same time
* We can do that with `npm-run-all`

`$ npm i -D npm-run-all`

`package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "validate": "npm-run-all --parallel check-types check-format lint build"
  },
// MORE CODE
```

`$ npm run validate`

* Now it runs all the same scripts at the same time and it's much faster
