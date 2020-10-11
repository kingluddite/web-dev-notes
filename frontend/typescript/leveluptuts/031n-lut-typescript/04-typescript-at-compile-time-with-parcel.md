# Typescript at compile time with parcel
* Now we'll figure out how to get the compiler to alert us of errors in our code instead of just our text editor

## You could use TSC (typescript's own compiler)
* We won't use TSC compiler in this section
* Instead we'll use a plugin for parcel that does use the TSC "Typescript Compiler"

## Install plugin
`$ npm i -D parcel-plugin-typescript`

* I was getting an error `Unexpected token` and this is a bug

##  Troubleshooting - If you get error also install
* Currently as of 3/10/2019 we also have to install the parcel bundler plugin and that is just because we need a specific version of this parcel package for this thing to work and the current latest version doesn't work
* There is a bug that gives you **unexpected token** with the latest version of parcel

`$ npm i -D parcel-bundler@1.9.4`

* I did an audit fix and that updated my parcel-bundler to `1.12.0` and that gave me the Unexpected token error again
* I change this:

`package.json`

```
// MORE CODE

"devDependencies": {
    "parcel-bundler": "^1.9.4",
    "parcel-plugin-typescript": "^1.0.0",
    "typescript": "^3.3.3333"
  },
// MORE CODE
```

* To this

```
// MORE CODE

"devDependencies": {
    "parcel-bundler": "1.9.4",
    "parcel-plugin-typescript": "^1.0.0",
    "typescript": "^3.3.3333"
  },
// MORE CODE
```

* I remove the carrot `^` in front of `1.9.4` to lock in that version
* Hopefully this bug is fixed soon but until then just use this version

## Test out
`index.ts`

```
// MORE CODE

const isOpen: boolean = 1;
// MORE CODE
```

* Now you will see an error in the terminal letting you know that isOpen should have a boolean value and it currently does not
* This means we are now getting compile time errors
* We do not see an error in the browser
* And we see the error in our text editor

## Other ways to do this
* TSE (Typescript Editor) but you lose out on all our parcel goodness
* If you are using Webpack you can use the Typescript loader
