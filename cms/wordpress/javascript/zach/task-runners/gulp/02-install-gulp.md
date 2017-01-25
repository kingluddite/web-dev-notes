# Install Gulp
Need two things

1. Install Gulp as a dev dependency
2. Install Gulp globally for CLI

## Do I have gulp installed globally?
Check with:

`$ gulp -v`

**note** If you had it installed and reinstalled it, it is not a problem.

## Install Gulp globally for CLI
`$ npm i -g gulp`

## Add `package.json`
`$ npm init -y`

## Install Gulp as dev dependency
`$ npm i -D gulp`

## Add `.gitignore`
`$ touch .gitignore`

`.gitignore`

```
.DS_Store
.sass-cache
node_modules
```

## Run gulp
`$ gulp`

Will get `No gulpfile found` error.

We need to create the `gulpfile.js` configuration file
