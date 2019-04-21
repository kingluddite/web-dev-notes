# Gatsby
* Youtube video by Andrew Mead - https://www.youtube.com/watch?v=8t0vNu2fCCM&t=394s
* based on React, GraphQL and Node.js
* Write markdown posts and have gatsby convert them to individual pages to site (plugin to do this)
* You can use Gatsby with WordPress or Contentful (among a ton of others) to manage that content

## Install Node
## Install Gatsby
`$ npm i -g gatsby-cli`

## Create a new Gatsby project
`$ gatsby new PROJECT NAME https://github.com/gatsbyjs/gatsby-starter-hello-world`

* Let's create a project called gatsby-bootcamp

`$ gatsby new gatsby-bootcamp https://github.com/gatsbyjs/gatsby-starter-hello-world`

* That will create a folder
* Will install all modules
* Takes a while to install all the packages

`$ cd gatsby-bootcamp`

## Run Gatsby
`$ npm run develop` (or `$ gatsby develop`)

* Will give you `http://localhost:8000`
* View it in browser and you will see `Hello world`

## src > pages > index.js
`index.js`

```
import React from "react"

export default () => <div>Hello world!</div>
```

