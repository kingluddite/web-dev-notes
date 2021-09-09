# Troubles with bundling in the browser
* [back to our docs for esbuild](https://esbuild.github.io/api/#transform-api)
* **note** tranform means transpile
* **warning** The transform API call operates on a single string without access to a file system
  - We need a file system
  - We want to use the entire [Build API](https://esbuild.github.io/api/#build-api) inside the browser
    + The build API call operates on one or more files in the file system

## Example
* `import react from 'react'`
* ESBuild Transpile + Bundle - "Sure, I'll just look at the file system and find this 'react' module"
  - But we are in the browser - NOT OUR COMPUTER's FILE SYSTEM
    + When we bundle, ESBuild (and webpack) tries to find dependencies on your hard drive
    + We're running ESBuild in the browser! THERE IS NOT FILE SYSTEM ACCESS!
    + As it stands, ESBuild will throw an error as soon as we tell it to bundle anything

## To get around this
* We will hijack the process with a custom built plugin
* We'll reach out to npm, we'll find the file needed and give it right back to ESBuild
* We are going to get npm to give us a URL with the location of the file `https://npm/react.js` and give it back to ESBuild to complete the bundling
* **note** bundling is the browser is very hard but ESbuild helps make it way easy
