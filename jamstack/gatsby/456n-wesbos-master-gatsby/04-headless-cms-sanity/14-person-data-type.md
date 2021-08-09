# Person data type
<!-- MarkdownTOC -->

- [Add to schema](#add-to-schema)
- [View in Sanity Studio \(UI\)](#view-in-sanity-studio-ui)
- [You can easily add fields \(let's add a person description\)](#you-can-easily-add-fields-lets-add-a-person-description)
- [Next - Create custom react components for inputs](#next---create-custom-react-components-for-inputs)

<!-- /MarkdownTOC -->

`schemas/person.js`

```js
import { MdPerson as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'person',
  // visible title
  title: 'Slicemasters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
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

## Add to schema
`schema.js`

```js
// MORE CODE
import topping from './topping';
import person from './person';

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([pizza, topping, person]),
});
```

* **VS Code Tip** Copy Line Up/Down
    - On Windows: Shift + Alt + Up/Down
    - On Mac: Shift + Option + Up/Down

## View in Sanity Studio (UI)
* Add a person

## You can easily add fields (let's add a person description)

```js
// MORE CODE

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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short bio on person',
    },
// MORE CODE
```

* Add New Slicemaster
  - Slick
  - slick (slug)
  - bio from text-data.md
  - Slick b/w image with grey bearded guy
  
## Next - Create custom react components for inputs
* For the price
