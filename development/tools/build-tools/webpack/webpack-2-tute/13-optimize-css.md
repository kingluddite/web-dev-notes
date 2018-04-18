# Optimize CSS
* To the bare minimum
* We only want to include the files that are related to our HTML markup
* We will use `purifycss-webpack` plugin to do this

## purifycss-webpack
* [documentation](https://github.com/webpack-contrib/purifycss-webpack)
* Currently we are using all the CSS for the entire twitter bootstrap library
    - We only want stuff that our page is using
    - And exclude everything else

## 2 ways to optimize our css with webpack
1. Manually do it inside `.bootstraprc`
2. purifycss-webpack

## Install purifycss-webpack
* Why?
* It's easier, faster

`$ yarn add -D purifycss-webpack purify-css`

## Add glob and purifycss-webpack
`webpack.config.css`

```
// MORE CODE
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob'); // add this line
// ADD THE NEXT LINE
const PurifyCSSPlugin = require('purifycss-webpack'); 
// MORE CODE
```

## Past plugin after the `ExtractTextPlugin`
`webpack.config.js`

```
// MORE CODE
plugins: [
    new HTMLPlugin({
      title: 'Contact Page',
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html',
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),
  ]
};
```

## Run prod
`$ yarn run prod`

* The `bootstrap.css` is now way smaller and only has 398 lines
* Went from 112kb to 8kb

## Add another Bootstrap Component and watch how the size grows because we just added Twitter Bootstrap forms

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <h1>This should be green now</h1>
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
  </div>
  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</body>
</html>
```

`$ yarn run prod`

## Minify bootstrap.css
`webpack.config.js`

```
// MORE CODE
new PurifyCSSPlugin({
  // Give paths to parse for rules. These should be absolute!
  paths: glob.sync(path.join(__dirname, 'src/*.html')),
  minimize: true,
}),
// MORE CODE
```

`$ yarn run prod`



* Now our prod css is 592 lines


