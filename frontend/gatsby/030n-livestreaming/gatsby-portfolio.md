# Gatsby Porfolio Site
[sanity.io](https://www.sanity.io/)

`$ take sanity-gatsby-portfolio`

## install sanity.io
`$ npm install -g @sanity/cli && sanity init`

* Install with github
* project name: sanity-gatsby-portfolio
* It is creating the cms locally on your computer
    - different from other headless cms
    - you can customize and set up everything locally
    - then you can build it to a static bundle of html js and css
    - you can host it at sanity.io or anywhere
* database
    - you can have multiple
    - maybe it is for different environments (local, staging, deploy)
    - they recommend `production` as first thing to get up and running
* world readable
* output path: ../sanity-portfolio-studio
* Select project template
    - Good to first start with Blog(schema)
* It then will run npm/yarn to install dependencies

`$ cd ../sanity-portfolio-studio`

## The initial sanity init command needs the cli to be global
* This is why we install the cli globally and not as a dependency for the project

`$ yarn start`

* This will start a web server
* Will start compiling a bunch of stuff with webpack

## Visit the site
`http://localhost:3333`

* Redirects you to:

`http://localhost:3333/desk`

* Click Github to authenticate
* You have to do this twice because you need a new session
* The previous session was for the CLI
* Now we are logging in to the actual project

### These are the default content types that are available with the default blog schema
* Post
* Author
* Category

## Create new `project` schema
`schemas/project.js`

```
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Project Screenshot',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'}
    }
  ]

  // TODO play with previews
}
```

## Update schema.js
```
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
// import blockContent from './blockContent';
// import category from './category';
// import post from './post';
import author from './author';
import project from './project';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    // post,
    author,
    // category,
    project,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    // blockContent,
  ]),
});
```

* **note** Live reloads when you change the schema


`$ sanity deploy`

## give it a host name
`$ gatsbypeh2`

* Name has to be unique (obviously)
* Now it will build what you have locally in production

## Invite other developers
* To help you build this project
* `Team` add email of person you want to add

stop at 3:34
