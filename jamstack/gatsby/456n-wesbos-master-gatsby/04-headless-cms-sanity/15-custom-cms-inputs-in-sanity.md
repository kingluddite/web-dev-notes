# Custom CMS inputs in Sanity
* Price is just cents
    - We want the UI editors
    - We have full control over sanity
    - We are running it locally and can host it on sanity

## Challenge
* Loop over all the toppings and say if the pizza is vegetarian

## ES7 React/Readux/GraphQL snippets
```
import React from 'react';

const PriceInput = () => (
  <div>
    <h2>test</h2>
  </div>
);

export default PriceInput;
```

## Add to pizza.js

```
import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

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
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      inputComponent: PriceInput,
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000),
      // TODO: add custom input component
    },
```

* Inspect and you'll see that our React `PriceInput` component has a bunch of different props
    - Under `props.type` you see all the properties
* Anytime in react that you put a value into an input YOU MUST ALSO supply an onChange handler
* For sanity to work with react we need to import some stuff

```
import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    {/* eslint-disable-next-line react/prop-types */}
    <h2>{type.title}</h2>
    <p>{type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
    />
  </div>
);

PriceInput.focus = function () {
  this._inputElement.focus();
};

export default PriceInput;
```

* Now we can get the price to work

## Format money
* Intl is built into browser and it is a great way to format money based on the location of the user 
