# Person data type
`schemas/person.js`

```
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

```
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

```
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

## Next - Create custom react components for inputs
* For the price
