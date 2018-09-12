# Importing .graphql Files
* Create a new file `Posts.graphql`

`Posts.graphql`

```
query allPosts {
  posts {
    id
    title
    body
  }
}
```

## Import it to the file you want to use

`Post.js`

```
import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// graphql
import POSTS_QUERY from './Posts.graphql';

// MORE CODE
```

* That is it

## Ejecting from Create React App
* Not long ago you had to eject from create react app to get this working
    - Whenever you enject from create react app you can't go back
    - This is a big decision

`$ yarn eject`

* What did we just do?
    - This removes the app from create react app and takes it into Webpack land
    - It will ask if you are sure you want to do this (y/N)
    - If you type `y` you will eject
    - You may have to do a:

```
$ git add .
$ git commit -m 'before eject'
```

## Try to eject again
`$ yarn eject`

* That should lead you to a successful ejection from create react app
* Now you will see a ton of additional dependencies
* It is a lot more complex

`$ yarn start` will work like it did before

* Now you are ok as long as you don't plan on adjusting your configuration
* Now you will get errors so you will need to install all the packages

`$ yarn` - That will install everything

* That will install babel-loader and everything else
* `$ yarn start` will give us the same errors as before

## babel-plugin-import-graphql
* Add a plugin to make this work
`$ yarn add babel-plugin-import-graphql`

### Add to our package.json `import-graphql`
```
// MORE CODE

"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      "import-graphql"
    ]
},
"eslintConfig": {

// MORE CODE
```

* You don't need the long name like in package.json, just `import-graphql` will suffice

## Stop and restart server
* Good idea whenever updating majore config features

## Advantage of importing .graphql files
* You can use the same named queries in other places
