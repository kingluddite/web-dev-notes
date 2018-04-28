# Helper and Utility Functions
* Things you need to use throughout your app
* There are not big enough to be a module
* But are useful and can be used anywhere

`src/helpers.js`

```js
export function formatPrice(cents) {
  return (cents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getFunName() {
  const adjectives = [
    'adorable',
    'beautiful',
    'clean',
    'drab',
    'elegant',
    'fancy',
    'glamorous',
    'handsome',
    'long',
    'magnificent',
    'old-fashioned',
    'plain',
    'quaint',
    'sparkling',
    'ugliest',
    'unsightly',
    'angry',
    'bewildered',
    'clumsy',
    'defeated',
    'embarrassed',
    'fierce',
    'grumpy',
    'helpless',
    'itchy',
    'jealous',
    'lazy',
    'mysterious',
    'nervous',
    'obnoxious',
    'panicky',
    'repulsive',
    'scary',
    'thoughtless',
    'uptight',
    'worried',
  ];

  const nouns = [
    'women',
    'men',
    'children',
    'teeth',
    'feet',
    'people',
    'leaves',
    'mice',
    'geese',
    'halves',
    'knives',
    'wives',
    'lives',
    'elves',
    'loaves',
    'potatoes',
    'tomatoes',
    'cacti',
    'foci',
    'fungi',
    'nuclei',
    'syllabuses',
    'analyses',
    'diagnoses',
    'oases',
    'theses',
    'crises',
    'phenomena',
    'criteria',
    'data',
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
```

## TeamPicker
* We don't want to set a `value` attribute of the `input` because that would be tied to something called `state`
* We just want a default value when we load the page
* We are using a `named export` from `helpers.js`

`TeamPicker.js`

```
import React from 'react';
import { getFunName } from '../helpers';

class TeamPicker extends React.Component {
  render() {
    return (
      <form className="team-selector">
        {/* Look here */}
        <h2>Please Enter a Team</h2>
        <input type="text" required placeholder="Team Name" defaultValue={getFunName()} />
        <button type="submit">Visit Team</button>
      </form>
    )
  }
}

export default TeamPicker;
```

### defaultValue
* If you just want default text in input you need to use the `defaultValue`
* Notice how we import the `getFunName()` **named export**
* We set a `defaultValue={getFunName()}` and that will call the function

## View the page in browser
* You will see it randomly generates a fun name
* Every time you refresh a new random fun name will appear on the home page


