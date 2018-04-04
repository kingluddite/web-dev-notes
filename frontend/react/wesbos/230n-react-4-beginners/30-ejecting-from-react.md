# Ejecting from create-react-app

Create React App hides all the hard parts of the tooling behind building a react app and it does it all for you

The nightmare of tooling is removed so people can just code react apps. It is all inside something called react scripts

## Going custom
If you want to add your stuff into WebPack you can by injecting

How do I get a custom ESLint set up?
How do I customize my webpack setup?
How do I do custom babel plugins?

## Ejecting
You can't undo eject so do it on a branch in git

`$ git checkout -b "ejected"`

This is great because if I eject I can roll branch back

`$ npm run eject`

## Check status
`$ git status`

## eslint
* recently taken out of `.eslintrc` and put inside `package.json`

```
"eslintConfig": {
    "extends": "react-app"
  },
```

## jest
Used to test React components
