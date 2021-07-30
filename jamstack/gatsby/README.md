# Gatsby (frontend)
* Static site generator
* `static` folder contents do not "go through" gatsby
* App pages go in `pages` folder
* Use JavaScript files instead of HTMl files
    - And we export a function that will be rendered out to the page
* Gatsby uses React


## Install cli globally
`$ npm i gatsby@latest -g`

## What version?
`$ gatsby -v`

## Start react
`$ npm start` (but gatsby default is `$ gatsby develop`)

* package.json scripts
* custom scripts to use ES Modules instead of Common JS

## West Practices
* Page names are lowercase
* Separate folders for frontend and backend

## Questions
* When we update to latest React can omit `import React from 'react'`
    - React 17
* prop-types (I think we should use them until we jump to TypeScript + React - thoughts?)
* Wes talks about VS tab issue with expanding for emmet? Did anyone have issues with this and switch to how he expands for emmmet (expand on the `e` key? 

## Troubleshooting

# Sanity (backend)
## Install cli globally
`$ npm i gatsby-cli @sanity/cli -g`

## What version
`$ sanity -v`

## Session error

`$ sanity logout && sanity login`
