# Creating Data Relationships
* Open up our Pepperoni pizza
    - There currently is no way to add any toppings

## Let's add our relationship
* We want a 1-to-many so we need an array

`pizza.js`

```js
// MORE CODE
 description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
      // TODO: add custom input component
    },
    {
      title: 'Toppings',
      name: 'toppings',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
```

* That will allow us to add a type of topping and as many as we want and it will store them as an array
    - But this is not what we want
    - We want there to be a relationship to our existing toppings so if we add a topping we'll see it in a list to choose from

## Schema types: Reference
* Note: Not great UI cause you have to add + close + add + close to add multiple toppings

```js
// MORE CODE
    {
      title: 'Toppings',
      name: 'toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
};
```

## Check out the pizza is showing in the UI list
* Let's have our pizza but also show the toppings
* Create a new pizza with an image and 2 toppings

### We'll create a custom preview of our pizza with toppings
* We'll use `console.log()` to troubleshoot this
* Text pastry - https://marketplace.visualstudio.com/items?itemName=jkjustjoshing.vscode-text-pastry (VS Code)
    - example: https://twitter.com/wesbos/status/926484635437228038?lang=en

```js
// MORE CODE

 preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, topping0, topping1, topping2, topping3 }) => {
      console.log(title, media, topping0, topping1, topping2, topping3);
      return 'pizza name';
    },
  },
};
```

## Rest param!
```js
// MORE CODE
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      console.log(title, media, toppings);
      return 'pizza name';
    },
  },
};
```

* View the console and now you see an object with all the toppings inside it

## Filter out undefined and return the preview object
* Watch out for prettier converting the object into an implicit return (we don't want that)

```js
// MORE CODE

prepare: ({ title, media, ...toppings }) => {
      //   1. filter undefined toppings out
      console.log('STAY');
      //   2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: 'yo',
      };
    },
  },
};
// MORE CODE
```

* **tip** Use the log to avoid the implicit return from prettier
* This will show the title, the image (media) and a subtitle

## and the JavaScript
```js
// MORE CODE
    prepare: ({ title, media, ...toppings }) => {
      //   1. filter undefined toppings out
      const myToppings = Object.values(toppings).filter(
        (topping) => topping !== undefined
      );
      console.log(myToppings);
      console.log('STAY');
      //   2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: myToppings.join(', '),
      };
    },
  },
};
```

## Next - Create our Person Data Type
