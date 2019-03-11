# Typescript at compile time with parcel
* Now we'll figure out how to get the compiler to alert us of errors in our code instead of just our text editor

## You could use TSC (typescript's own compiler)
* We won't use TSC compiler in this section
* Instead we'll use a plugin for parcel that does use the TSC "Typescript Compiler"

## Install plugin
`$ npm i -D parcel-plugin-typescript`


##  Troubleshooting - If you get error also install
* Currently as of 3/10/2019 we also have to install the parcel bundler plugin and that is just because we need a specific version of this parcel package for this thing to work and the current latest version doesn't work
* There is a bug that gives you **unexpected token** with the latest version of parcel

`$ npm i -D parcel-bundler@1.9.4`
