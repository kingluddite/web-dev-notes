# Create a one-off store settings page
<!-- MarkdownTOC -->

- [Let's jump to our sanity folder!](#lets-jump-to-our-sanity-folder)
- [Now run your sanity backend](#now-run-your-sanity-backend)
- [Click on Settings](#click-on-settings)
- [sidebar](#sidebar)
- [Now we'll build a custom sidebar](#now-well-build-a-custom-sidebar)
- [View in backend](#view-in-backend)
- [Add an icon](#add-an-icon)
- [Create an editor for the schema type](#create-an-editor-for-the-schema-type)
- [Add the rest of our settings in the sidebar](#add-the-rest-of-our-settings-in-the-sidebar)
- [Test](#test)
- [Next - pull in current slicers and pizzas into the front end](#next---pull-in-current-slicers-and-pizzas-into-the-front-end)

<!-- /MarkdownTOC -->

## Let's jump to our sanity folder!
* Duplicate `sanity/schemas/pizza.js` to `sanityschemas/storeSettings.js`

`sanity/schemas/storeSettings.js`

```js
import { MdStore as icon } from 'react-icons/md';

export default {
  // computer name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
  ],
};
```

`sanity/schemas/schema.js`

```js
// First, we must import the schema creator
// eslint-disable-next-line import/no-unresolved
import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
// eslint-disable-next-line import/no-unresolved
import schemaTypes from 'all:part:@sanity/base/schema-type';
// Then we give our schema to the builder and provide the result to Sanity

import pizza from './pizza';
import topping from './topping';
import person from './person';
import storeSettings from './storeSettings';

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([pizza, topping, person, storeSettings]),
});
```

## Now run your sanity backend
* Navigate to Sanity folder root
* `$ npm start`
* `http://localhost:3333/desk` URL will open and you will now see `Settings`

## Click on Settings
* We can manually add a person

`storeSettings.js`

```js
import { MdStore as icon } from 'react-icons/md';

export default {
  // computer name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'slicemaster',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: 'Hot Slices available in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};

```

* Now we can select which pizzas are available
* We add a store name (if we open multiple stores)

## sidebar
* In root of sanity create `sidebar.js`

`sanity/sidebar.js`

```js
import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
```

* Update our `sanity.json`
    - From this:

```js
// MORE CODE
  },
  "parts": [
    {
      "name": "part:@sanity/base/schema",
      "path": "./schemas/schema"
    }
  ]
}
```

* To this:

```js
// MORE CODE
  "parts": [
    {
      "name": "part:@sanity/base/schema",
      "path": "./schemas/schema"
    },
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./sidebar.js"
    }
  ]
}
```

## Now we'll build a custom sidebar
`sidebar.js`

```js
import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`ZA ZA Pie`)
    .items([
      // create new sub item
      S.listItem().title('Home Page'),
    ]);
}
```

* Shut down and restart sanity `$ npm start`

## View in backend
* You see we now have a custom sidebar with 'Home Page'

## Add an icon
* Now you will see the options we had before to the stores, slicers and available pizzas

```js
// MORE CODE

import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`ZA ZA Pie`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>),
    ]);
}

// MORE CODE
```

## Create an editor for the schema type
```js
import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`ZA ZA Pie`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID, so we don't have a random string of numbers
            .documentId('downtown')
        ),
    ]);
}
```

## Add the rest of our settings in the sidebar
```js
import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`ZA ZA Pie`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID, so we don't have a random string of numbers
            .documentId('downtown')
        ),
      // add in the rest of our document items
      ...S.documentTypeListItems(),
    ]);
}

```

* Remove settings (we don't need it anymore)
    - We only want users to be able to edit the home page data from the sidebar

```js
import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

// build a custom sidebar
export default function Sidebar() {
  return S.list()
    .title(`ZA ZA Pie`)
    .items([
      // create new sub item
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🔥</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new document ID, so we don't have a random string of numbers
            .documentId('downtown')
        ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
```

## Test
* Fill out with 4 pizzas and 4 people and publish

## Next - pull in current slicers and pizzas into the front end
