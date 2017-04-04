# ES6 import statements
`index.js`

```
// Create a new Component. This Component should produce some HTML
const App = function () {
  return <div>Hello</div>;
}
// Take this Component's generated HTML and put it on the page (inside the DOM)
React.render(App);
```

## View in browser
Error: React is not defined

* We are not importing React in our `index.html`

## JavaScript modules
Encapsulates the idea that all the code we write in separate files is **siloed** or separated from other code we write or other libraries that we install in our project

Code that we produce in other files will have zero contact with `index.js` unless we explicitly say 'Hey, I want access to that code in that other file over there'

silo? Meaning, we can't make reference to any variables in that other file. So if we have another file and we want to access the `App` variable in `index.js` we have no access to it

* React is installed in our project. We installed it as a dependency we still have to say 'Hey, I want access to React inside of this file'

## Getting access to React
We need to somehow go inside our `node_modules` folder and grab the React package and give our `index.js` file access to it

`index.js`

`import React from 'react';`

Go find the library called React installed in my application as a dependency. Go and find that library (_you can see it if you open `node_modules` and scroll to the R's and find `react`_) and save it to the variable React
