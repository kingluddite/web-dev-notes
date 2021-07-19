# Creating the Toppings Content Type and custom previews
## Use the sanity docs!
* [sanity docs](https://www.sanity.io/docs)

## 1-to-many relationship
* 1 pizza has many toppings
    - You could reverse that and say show me pizzas that have that topping

## Topping schema
* Create `topping.js`
* react-icons is cool
    - **VERY COOL** You can pull 1 icon from 1 library and 1 icon from another icon... but it just imports that 1 icon
    - **rule** use single lowercase for machine name
        + `name: 'topping,`

`schemas/topping.js`

```
import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // Computer Name
  name: 'topping',
  // visible title
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'What is the name of the topping?',
    },
  ],
};
```

### We don't see it yet in sanity
Update our main schema

`schemas/schema.js`

```
// MORE CODE
import pizza from './pizza';
import topping from './topping';

export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([pizza, topping]),
});
```

* View sanity UI and you'll see Toppings with a hot pepper icon

### typing tip in VS Code
* Double click and hit `cmd` + `d` and then type with multiple cursors
    - Two for the price of one!

### Tip - click the edit button
* You won't see the fields if you click on Pizzas or Toppings button in the sanity UI
    - After click either button you then need to click the edit button too (then you'll see the fields you created)

## Add boolean
`topping.js`

```
// MORE CODE
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Vegetarian?'
    },
  ],
};

```

### Add checkbox instead of switch
* **note** If you don't want a switch then use `options` and pass an object

`topping.js`

* Now you'll see a checkbox

```
// MORE CODE
 {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Vegetarian?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
};
```

## Create a custom prepared view
* Create two toppings
    - Onions - veg
    - Pepperoni - not veg
    - Mushrooms - veg
    - Bacon - not veg
* **note** To create a new button click the button that looks like edit (but if you hover over it you'll see it says create topping)

## Preview
* This lets you show up what shows up under Toppings
* **note** Since we are working in the UI look for "Sanity Studio"
* docs here (search site using magnifying glass)

`toppings.js`

```
// MORE CODE
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Vegetarian?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: (fields) => ({
      title: 'This is the title',
    }),
  },
};
```

* Now you'll see `This is your title` 4 times

## Template literal to make the `name` pull from the field object

```
preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: (fields) => ({
      title: `This is the title ${fields.name}`,
    }),
  },
};
```

* Show a leaf if vegetarian

```
// MORE CODE

  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: (fields) => ({
      title: `${fields.name} ${fields.vegetarian ? '🌱' : ''}`,
    }),
  },
};
```

## Destructure field
```
// MORE CODE
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? '🌱' : ''}`,
    }),
  },
};
```

## Next - relate these 2 content types
