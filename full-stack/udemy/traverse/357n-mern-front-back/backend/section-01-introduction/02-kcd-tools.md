# KCD Tools
## VS Code
* Install Eslint extension and it will underline your eslint errors
* Hover over error `cmd` + click and it will give you choices like "fix" the error code

### CLI fix for eslint
`$ npx eslint . --fix`

* It can't fix all broken rules but does fix many
* Great for if you are adding eslint to an existing project

### Would if you want to disable eslint?
* Hover over infraction line and choose `disable eslint for this line`
* You can also chose to disable eslint for entire file
* And you can choose to show documentation

## The problems with semi-colons
* no-unexpected-multiline
* [great article explaining it](https://codesnatchers.com/using-semicolons-never-use-them-cjz8abwfx001o4gs16sfaxtdr)
* This is bad

```
[(1, 2, 3)].forEach((x) => console.log(x));
```

* Add a `;` at the beginning

```
;[(1, 2, 3)].forEach((x) => console.log(x));
```

* Or avoid the problem with this code:

```
const nums = [1, 2, 3]
nums.forEach(bar)
```

## Add eslint script
`package.json`

```
// MORE CODE

"scripts": {
    "lint": "eslint .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
// MORE CODE
```

* Run with `$ npm run eslint`

## babel
`$ npm i @babel/cli @babel/core @babel/preset-env -D`

* And add basic `.babelrc` in project root

```
{
  "presets": ["@babel/preset-env"]
}
```

`packge.json`

```
// MORE CODE

  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
// MORE CODE
```

## Problem if we build
`$ npm run build`

* That created a file with `"use strict"` in the dist directory

`dist/example.js`

```
// MORE CODE

"use strict";

var name = "Freddy";
typeof name === "string";
// MORE CODE
```

* Now if we lint we get an error so we need to ignore our `dist` folder for linting

`.eslintignore`

* We'll just ignore everything in our `.gitignore`

```
node_modules
dist
```

* Run lint again and there will be no errors

`$ npm run lint`

* **note** We ignore dist in our gitignore as we don't need to keep track of generated code

## Better way
* We can get rid of our `.eslintignore` file because it will be the exact same as our `.gitignore`
* By doing this:

1. Delete the `.eslintignore` file
2. Add this to `package.json`

```
// MORE CODE

  "scripts": {
    // MORE CODE

    "lint": "eslint --ignore-path .gitignore .",

// MORE CODE
```

* Above is just saying "Hey ESLint" when you are looking for the ignore file for the list of directories of and files that you should ignore I want you to use the `.gitignore` file
    - That way as I make updates to the `.gitignore` file I'm not linting anything which is ignored in git anyway which is the case for the lifetime of the project
* Now run lint and it works the same but with one less file (and we remove having do have two files with duplicate content)

`$ npm run lint`

* No errors!

## Prettier
`$ npm i -D prettier`

### Run it with npx
`$ npm prettier src/example.js`

* But that will just log that out
* If I want to write to the file the formatting

`$ npm prettier src/example.js --write src/example.js`

* Above updates the file with the formatted changes

### Add a script to format with prettier
* We'll use a glob to match files so it will format all of them

`package.json`

```
// MORE CODE

"scripts": {
    "lint": "eslint src",
    "format": "prettier --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\""
  },
// MORE CODE
```

* Now we can format with `$ npm run format`
* **note** If it is greyed out, it was not changed
* But we are formatting the dist folder which we don't want to
    - So to avoid doing that we'll use the same technique we used for eslintignore when linting but we'll use that flat for our `format` script

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
* Grab your code and configure until the code looks the way you want it to be
* Click the options button to show your options
* skip `--parser` as prettier will automatically determine what parser to use based on the file extension
* `--print-width`: 80
* `--tab-width`: 2
* Uncheck `--use-tabs`
* `--single-quote`: checked
* `--no-bracket-spacing`: checked
* `--prose-wrap`: always (this is for markdown)

### Javascript
* `--no-semi` checked
* `--jsx-single-quote` unchecked (nice to have jsx have double quotes)
* `--jsx-bracket-same-line` unchecked
* `--quote-props`: as-needed
* `--arrow-parens`: avoid
* `--trailing-comma`: all (this makes our git diffs look nicer)

### HTML
`--html-whitespace-sensitivity`: css

### Special
`--insert-pragma` and `--require-pragma` (comment that goes above the code - so we'll just leave that off)

### formatting is done
* Click `Copy config JSON`

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

* And prettier will now format your code based on those rules

## VS Code and Prettier Extension
* **tip** Easier to update using `.json` settings
* Open settings `cmd` + `.`
* Then on top right click the `open settings` icon (top right of UI)

`settings.js`

* `esbenp.prettier-vscode` is the formatter that prettier extension exposes to VS Code
* `editor.formatOnSave` formats your code via prettier on save
    - cmd + shift + p (select Format Document) will also format document

```
// MORE CODE

  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
// MORE CODE
```

## Watch out for classes between eslint and prettier
```
if (!('serviceWorker' in navigator)) {
  // you have an old browser :-(
};;
```

* You'll see eslint error `unecessary semicolon`
* We just turn that rule off

`.eslintrc`

```
// MORE CODE

  "rules": {
    "strict": ["error", "never"],
    "no-extra-semi": "off"
  },
// MORE CODE
```

## A better way
* Removing all conflicts between eslint and prettier 1 by 1 is tedious
* There is a better way to automatically fix them based on a setting that automatically been configure to disable any rules that prettier renders useless

### Install eslint-config-prettier
* Than we add `eslint-config-prettier` at the end of all our other extensions

`.eslintrc`

* We can now safely remove the `no-extra-semi` rule

```
// MORE CODE

"extends": ["eslint:recommended", "eslint-config-prettier"],
"rules": {
  "strict": ["error", "never"]
},
// MORE CODE
```

* Now if you add `;;` like before you won't get the semi-colon error

## Disable other using the eslint-config-prettier
* [docs](https://github.com/prettier/eslint-config-prettier)

`$ npm i -D @typescript-eslint/eslint-plugin eslint-plugin-babel eslint-plugin-react`

* So if you are using some other configurations you can disable some of them (see docs) using eslint-prettier

`package.json`

```
// MORE CODE

  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^4.4.0",
    "eslint": "^7.10.0",
    "eslint-config-prettier": "^6.12.0",
    "eslint-plugin-babel": "^5.3.1",
    "eslint-plugin-react": "^7.21.3",
    "prettier": "^2.1.2"
  },
// MORE CODE
```

`.eslintrc`

## validate
* Have a script that validates that the project is in a good state
* We'll run lint and build

`package.json`

```
// MORE CODE

  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "test": "echo \"Error: no test specified\" && exit 1",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "validate": "npm run lint && npm run build"
  },
// MORE CODE
```

`$ npm run validate`

* That runs all the linting and building to make sure this project is in a "good" state

### We also want to make sure all the files have been properly formatted
* prettier exposes a mechanism for that `check-format`

`package.json`

```
// MORE CODE

"scripts": {
    // MORE CODE

    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "validate": "npm run lint && npm run build"
  },
// MORE CODE
```

* To see this work we will temporarily disable `format-on-save` to see what this looks like:

`settings.json`

```
// MORE CODE

// Place your settings in this file to overwrite the default settings
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // "editor.formatOnSave": true,
  // turn it off for JS and JSX, we will do this via eslint
  "[javascript]": {
    // "editor.formatOnSave": true
// MORE CODE
```

* It generates an error showing if it were to format which files would actually change (be formatted)
* So we'll add it to our `validate` script

`package.json`

```
// MORE CODE

    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "validate": "npm run check-format && npm run lint && npm run build"
// MORE CODE
```

* So you can run `$ npm run validate` to make sure your project is in a good state when that validate script passes

### But our scripts are getting long and not DRY
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

* Above when we use `--` that tells `npm` to forward all of the remaining arguments to to the script I am calle (in the above example it would be the `npm run prettier` so for the `format` script we'll pass `--write` and for the `check-format` script we'll pass `--list-different`)
* Now run `$ npm run validate` and if there are no errors you know your code is looking good
* Here is where our `package.json` is right now

`package.json`

```
// MORE CODE

 "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
    "format": "npm run prettier -- --write",
    "check-format": "npm run prettier -- --list-different",
    "validate": "npm run lint && npm run build"
  },
// MORE CODE
```

## TypeScript
```
// MORE CODE

function add(a, b) {
  return a + b
}

function getFullname(user) {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join('')
}

add(1, 'two')

getFullName({name: {first: 'Joe', midd1e: 'Bud', last: 'Matthews'}})

// MORE CODE
```

* We have 2 mistakes we are trying to add a number and a string
* And we misspelled the function `getFullname`
* And we spelled middle `midd1e` (a 1 instead of a `l`) - a mistake that could be hard to catch unless you were using TypeScript

### Add typescript
* A software to encode Types, be more explicit to help avoid bugs like above

`$ npm i -D typescript`

* We'll add a typescript annotated script (of what we have above)

`typescript-example.ts`

```
function add(a: number, b: number): number {
  return a + b
}

interface User {
  name: {
    first: string
    middle: string
    last: string
  }
}
function getFullName(user: User): string {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join(' ')
}

add(1, 2)

getFullName({name: {first: 'Joe', middle: 'Bud', last: 'Matthews'}})
```

## After installing typescript as a dev dependency
* Open `node_modules/bin` and you will see `tsc`

### What does `tsc` stand for?
* typescript compiler
* We can use the `tsc` to verify that the types in our project are correct

### Try to run the typescript compiler
`$ npm tsc`

* That gives us a bunch of output because we don't have typescript configured

`$ touch tsconfig.json`

* We need to tell typescript where to look for our typescript files (and that's in our `src` directory)

`tsconfig.json`

```
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

* I don't want typescript to actually compile my code - I just want it to do type checking
    - Because I already have babel and it does a great job compiling my code
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

* Now if we run our typescript compiler

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
    "validate": "npm run check-types && npm run lint && npm run build"
  },
// MORE CODE
```

## Run validate script
`$ npm run validate`

* It will show we have errors and we can fix them

## Fix our bad types
`typescript-example.ts`

```
function add(a: number, b: number): number {
  return a + b
}

interface User {
  name: {
    first: string
    middle: string
    last: string
  }
}
function getFullName(user: User): string {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join(' ')
}

add(1, 2)

getFullName({name: {first: 'Joe', middle: 'Bud', last: 'Matthews'}})
```

## Run validate script
`$ npm run validate`

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
* And we get a `BABEL_PARSE_ERROR`
* The reason is by default `babel` isn't capable of parsing typescript

### You need to install as a dev dependency `@babel/preset-typescript`
`$ npm i -D @babel/preset-typescript`


* This will enable bable to parse typescript
* And now we have to add that as one of our babel presets

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

* Run build

`$ npm run build`

* Now we have 3 total files (2 js and 1 ts) compiling

## Now run validate script
`$ npm run validate`

* Now we get:
    - Out type checking
    - Our prettier formatting
    - Our eslint checking
    - Our babel transpiling build

## TypeScript playing nice with ESLint
* Currently, ESLint is configured to run across all of the JavaScript files but it does not work with TypeScript files

`$ npm run lint`

* Will not give us any linting errors at all
* **Note** TypeScript makes lots of rules that ESLint has unnecessary
    - But there are some rules that ESLint has that would be very useful in TypeScript
* We are getting an error

```
function add(a: number, b: number): number {
  return a + b
}
```

* ESlint in VS Code is trying to parse this file but it can't because it is written in Typescript
* We need to enable ESLint to be able to parse this type of TypeScript file

## Install 2 plugins
`$ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser`

* Now we can configure ESLint
  - We want to make sure ESLint runs across TypeScript files

`package.json`

```
// MORE CODE

    "lint": "eslint --ignore-path .gitignore --ext .js,.ts,.tsx .",

// MORE CODE
```

* Now run eslint

`$ npm run lint`

* We get an error because it still isn't configured to parse typescript files properly
* We are running eslint across multiple files (not just typescript files)
* We want to keep the configuration we are using inside .eslintrc but we will **override** this configuration for typescript files
  - We'll use `eslint's` **overrides** property

`.eslintrc`

```
// MORE CODE
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

## Don't forget to autosave with VS Code again
`settings.json`

```
// MORE CODE

// Place your settings in this file to overwrite the default settings
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true, // UNCOMMENT THIS LINE!
// MORE CODE
```

## Let's see what it does
* Comment out these two lines

`.eslintrc`

```
// MORE CODE
      "plugins": ["@typescript-eslint/eslint-plugin"],
      "extends": [
        // "plugin:@typescript-eslint/eslint-recommended",
        // "plugin:@typescript-eslint/recommended"
      ]
    }
  ]
}
```

`typescript-example.ts`

```
// MORE CODE

const username = 'Freddy'
typeof username === 'sring' // we misspell this!
// MORE CODE
```

![two warnings](https://i.imgur.com/Ns31zqy.png)

* We get a warning from eslint and typescript (typescript has a much better picture of what our code is supposed to be)
* So that's why we enable the `plugin:@typescript-eslint/eslint-recommended`

`.eslintrc`

* Now that will disable some eslint rules that typescript renders unnecessary

```
// MORE CODE
      "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        // "plugin:@typescript-eslint/recommended"
      ]
    }
  ]
}
```

* Comment in the other plugin line above

`.eslintrc`

```
// MORE CODE
      "extends": [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
      ]
    }
  ]
}
```

* That will deal with other rules for TypeScript like dealing with `interfaces`
* fix the spelling on the string

`typescript-example.ts`

```
const username = 'Freddy'
typeof username === 'string'
// MORE CODE
```

* Run lint

`$ npm run lint`

## semi-colon error in the interface
* **NOTE** Did not get the semi-colon error but adding this anyway
* But we'll add `eslint-config-prettier/@typescript-eslint`

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

## We want to always validate our code before any commits any code
* This will prevent anyone from committing code that violates any of the code that we put in place

### We will install `husky`
`$ npm i -D husky`

* Husky sets up git hooks when it installs

### Inside `.git` directory there is a `hooks` directory
* Woops!
* We don't have a git directory (that is why husky could not set up a git hook)
* Add git

`$ git init`

* Look inside your `.git` directory`

`$ ls -a` (show all files (regular and hidded))

`$ ls -a .git`

* Look inside the `.git/hooks` directory

`$ ls -a .git/hooks`

* You will see a whole bunch of files that husky just created for us
* Let's look inside one of those files

`$ cat .git/hooks/pre-commit`

* Lots of stuff there but long story short it enables what we are about to do

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

* That hooks directory is built into git
* And any time you do a commit git is going to run that precommit script that is in that `hooks` directory
  - That pre-commit script that husky built for us will look up this configuration and run this script we have above `npm run validate`

### woops - i need to install a package that was missing
`$ npm i -D @babel/preset-typescript`

## Let's try husky
`$ git add .`

`$ git commit -am 'husky is cool'`

* And your code was added and committed

## Let's add bad code and see if husky works
`typescript-example.ts`

```
// MORE CODE

add(1, '2')

// MORE CODE
```

* And and commit again
* It will not commit
* You'll get this error `husky > pre-commit hook failed (add --no-verify to bypass)`

* if you really wanted to commit bad code you could use:

`$ git commit -am 'really do it! --no-verify`

* 99.9% of the time you'll want that validate script to pass

## Lint-staged
* in VS code temp disable formatOnSave option
* Mess our code up

`typescript-example.ts`

```
const username = 'Freddy'
typeof username === 'string'

function add      (


               a: number, b: number): number {
  return a + b
}
// MORE CODE
```

`$ git status`

* And if you add and git commit -am 'bad formatting'
* and you'll get this error again

`husky > pre-commit hook failed`

* But what about a team member that's on an emac 
* They'll be frustrated because they forgot to format a file

## A better way would be to automatically format as they commit the code
* And so they won't have to install the plugin if they don't want to
* To do this we'll use a tool call `lint-staged`

### Install it
`$ npm i -D lint-staged`

### Create a new config file for lint-staged
`$ touch .lintstaged`

* Inside this file we say "any files that you're processing if they match *.+(js|ts|tsx)" I want to run the following scripts: `eslint`
* We'll also handle formatting for all files for our project that we support
  - And for any files that match this we'll run it through prettier and also `git add` because after writing the files will be changed
    + We want to add the changes back to git so that its committed with those changes

`.lintstaged`

```
{
  "*.+(js|ts|tsx)": [
    "eslint"
  ],
  "**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)": [
    "prettier --write",
    "git add"
  ]
}
```

* Now we'll configure lint-staged to be run on commit
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
  - lint-staged is taking care of our linting and its taking care of our formatting
  - But it's not taking care of our type-checking or our build (so we're going to want to keep those)

`.huskyrc`

```
{
  "hooks": {
    "pre-commit": "npm run check-types && lint-staged && npm run build"
  }
}
```

* add

`$ git add .`

`$ git commit -am 'stuff'`

### Here's what happens
1. It will run our type-checking first

## Important install typescript globally
`$ npm i typescript -g`

* Above did not work so I used homebrew

`$ brew install typescript`

## I mispelled `lintstagedrc` (i forgot the rc!!!!!)

`$ git add .`

`$ git commit -m 'stuff'`

1. it will run our type checking first
2. Then it runs lint-stage
3. Then it runs our build (to make sure all that stuff is still happening)

* Cool thing about lint-staged is it is only running across the files that have been changed
* And we configured it to add files back if they've been changed by prettier
* look at our typescript file and you'll see it was reformatted for us automatically
* **note** Lint-staged is super cool because it can even handle patched changes (If you are only committing part of the file it will only update the part of the file that is being changed)

### so if a teammember doesn't have prettier configured for this project their code will get formatted and committed still

## It would be great if I could run these all at the same time
* We can do that with `npm-run-all`

`$ npm i -D npm-run-all`

* Inside `node_modules/bin` you'll see `npm-run-all` so now we can use that in our `scripts`

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
