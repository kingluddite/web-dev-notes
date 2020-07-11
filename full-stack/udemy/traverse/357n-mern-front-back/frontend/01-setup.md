# Frontend setup
`settings.json`

* Makes emmet work in JSX

```
"emmet.includeLanguages": {
   "javascript": "javascriptreact"
 },
```

`.vscode/settings.json`

```
// MORE CODE

{
  "workbench.colorCustomizations": {
    "titleBar.activeForeground": "#000",
    "titleBar.inactiveForeground": "#000000CC",
    "titleBar.activeBackground": "#FFC600",
    "titleBar.inactiveBackground": "#FFC600CC"
  }
}

// MORE CODE
```

## Gitbash on vscode
* [terminals in vscode](https://code.visualstudio.com/docs/editor/integrated-terminal)
* And gitbash is:

`settings.json`

```
// MORE CODE

// Git Bash
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe"

// MORE CODE
```

## Using Prettier with VS Code and Create React App
1. Install Prettier and the ESLint Plugin
    * **Note**: You will need to install ESLint if you are not using Create React App

`$ npm i -D prettier eslint-plugin-prettier`

2. Install the following VS Code Extensions
    * [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    * [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

3. Create the Prettier and ESLint Configuration files

* **note** Make sure to create this file inside `React` app root

`$ touch .eslintrc .prettierrc`

`.eslintrc`

```
{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

`.prettierrc`

* Will override default prettier settings and make all JavaScript files use single quotes instead of double quotes

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

4. Apply Prettier formatting on Save (Optional but recommended)

* You most likely want to apply the Prettier formatting whenever you save your files. To do so, add the following to your Visual Studio Code [Workplace Settings](https://code.visualstudio.com/docs/getstarted/settings):

```
"editor.formatOnSave": true
```

5. Prevent Prettier Violations from being Committed (Optional but recommended)

* To prevent unformatted code from being committed to Git you can add a pre-commit hook. There are [a few ways to do this](https://prettier.io/docs/en/precommit.html), I will show the steps using [pretty-quick](https://github.com/azz/pretty-quick) and [husky](https://github.com/typicode/husky) setup (option 2). We'll have gone with this option as pretty-quick respects the `.prettierrc` file
* **note**: Your Git repository must already be initialized, otherwise the precommit hooks will not be installed by husky

### Install the packages:
`$ npm i -D pretty-quick husky`

* Then add the husky section to your `package.json` file:

`package.json`

```
// MORE CODE

"husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged"
    }
 }

// MORE CODE
```

6. Test it out

* You should see your React code format on save
* Add to GitHub and it will auto format before committing code

## Reference
* [medium article](https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08)
