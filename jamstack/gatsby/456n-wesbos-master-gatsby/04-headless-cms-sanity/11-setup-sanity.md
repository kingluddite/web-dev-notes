## What is a Headless CMS
* Install sanity as a CLI (done) `$ npm i -g @sanity/cli`

## The URL
* https://www.sanity.io/

## sanity init
* Normally with a new sanity project you:

`$ sanity init`

* That will download all the start files
* We use `npm` instead of `yarn` (yarn may not be around for a long time according to wes)

## We have a project already setup
* In order to:
    - Initialize our app
    - Log in
    - And create a new data set

`$ sanity init --reconfigure` (must be in the sanity folder)

* If you are not already signed in with sanity and created an account
* You need to sign in and follow those steps on the sanity web site - https://www.sanity.io/

## Troubleshooting
* I had a session error and had to `$ sanity logout` and `$ sanity login`
* Then typed the above command and all was good

### sanity terminal questions
* project name: `slicks-slices-peh2`
* The dataset will by default be called `production` (you can have multiple datasets - staging, development, production... feel free)
* Select `Y` to accept the default dataset
* Answer the dev community email fluff question

`$ ll`

* If you see `yarn.lock` feel free to delete
    - Since we are using `package-lock.json` and npm we don't need the yarn.lock file

## Start up sanity
`$ npm start`

* sanity is the API
* sanity studio is the UI we log into to to CRUD all of our data

### You will see a local URL
`http://localhost:3333/`

* Visit it (you may have to log in)

### After logging in to sanity
* You will see an empty schema (we didn't create anything yet)

### Open sanity in VS Code
* Color coded (pink for sanity - yellow for gatsby)
* View `sanity.json`
    - shows the path to `./schema/schema`
    - Open `./schema/schema`
        + **important** You'll see in this fill we take all of our data types and incorporate them into our own schema

`schemas/pizza.js`

```
export default {
  // Computer Name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
};
```

### Add this to schema.js
* We point to the pizza schema we just created
* Very important to add the custom schema you imported to the schema

```
// MORE CODE

import pizza from './pizza';

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([pizza]), // VERY IMPORTANT TO ADD THIS!!!!!
});

```

## You will get an error because we need to add `fields`
`schemas/pizza.js`

```
export default {
  // Computer Name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
  ],
};

```

* Nothing happens until you add pizza to the `concat()`

## Now you see your new content added in the UI
* You can edit and see the title - just look at it and lets add more

## Everthing in sanity studio is a React component
* So you can pass an icon

`pizza.js`

```
export default {
  // Computer Name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon: () => `🍕`,
  fields: [
// MORE CODE
```

* And there is a pizza icon in the mene for the Pizza's content

## react-icons
* [https://react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/)
* 15 different icon libraries built into it
* md (material design)
* Use aliases to make it easier to reference

## Hotspot
```
import { MdLocalPizza as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};

```

* For images you can make sure an important part of the image is always the center (for all the different sized images that are created for devices)
* We will leave off toppings - we'll add a new content type and create a relationship between toppings and pizza

## Add a number with validation
```
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
      // TODO: add custom input component
    },
  ],
};
```

* Test the price validation, anything less than 1000 and you get an error
    - minimum $10 pizza

## Hit Publish
