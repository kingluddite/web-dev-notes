## Step 1: Install Prettier and the ESLint Plugin

```
$ yarn add -D prettier eslint-plugin-prettier
```

## Step 2: Install the Prettier and ESLint VS Code Extensions
* ESLint
* Prettier

## Step 3: Create the Prettier and ESLint Configuration files

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

* If you are not happy with the default Prettier configuration then you can create a `.prettierrc` file with your own [options](https://prettier.io/docs/en/options.html), for example:

`prettierrc`

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

## Step 4: Apply Prettier Formatting on Save (Optional)
* You most likely want to apply the Prettier formatting whenever you save your files
* To do so, add the following to your Visual Studio Code Workspace Settings:

`"editor.formatOnSave": true`

## Step 5: Prevent Prettier Violations from being Committed (Optional)
* To prevent unformatted code from being committed to Git you can add a pre-commit hook
* pretty-quick respects the `.prettierrc` file

`$ yarn add -D pretty-quick husky`

```
{
  "scripts": {
    "precommit": "pretty-quick --staged"
  }
}
```
