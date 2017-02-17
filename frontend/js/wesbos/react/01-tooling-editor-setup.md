# Tooling & Editor Setup

## Tooling Needed
### Node
You need Node
node -v (must be > 6)

### React Dev Tools
You need [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for Chrome

* Enables you to look at the components, state, props
* It will add another tab to the inspector called `React`

### Babel
Syntax definitions for ES6 JavaScript with React JSX extensions

#### Sublime Text
babel

#### Atom
react

#### Vim
vim-jsx

## Terminal
* Windows - [cmder](http://cmder.net/)
* iTerm2 (OSX)
* Built in terminal (OSX)
* [Hyper Terminal](https://hyper.is/)

## Module Bundler
Will take all of our JavaScript files and deal with imports and exports and pack in into this one nice-and-tidy JavaScript file.

### Webpack
The most popular bundler with React

### create-react-app
Simplifies all the tooling you need to get up and running

* Uses Webpack behind the scenes
* You can eject from create react app and get all the details of what you were using for your webpack data

**note**

`index.html` is located inside `/public/`. You can put images and other css that you'd like to have public

All of our code will be written in `index.js` and all the components we'll be creating and we'll import all of the libraries as we need them. We'll import `react`, `reactDOM`, and all others we need

`package.json` (root of project)

```json
{
  "name": "cotd",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
    "autoprefixer-stylus": "0.10.0",
    "babel-eslint": "^7.1.1",
    "concurrently": "3.0.0",
    "eslint": "^3.12.2",
    "eslint-plugin-flowtype": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^3.0.2",
    "eslint-plugin-react": "^6.8.0",
    "react-scripts": "0.6.1",
    "stylus": "0.54.5"
  },
  "dependencies": {
    "history": "4.2.0",
    "re-base": "2.2.0",
    "react": "15.3.2",
    "react-addons-css-transition-group": "15.3.2",
    "react-dom": "15.3.2",
    "react-router": "4.0.0-alpha.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "watch": "concurrently --names \"webpack, stylus\" --prefix name \"npm run start\" \"npm run styles:watch\"",
    "build": "react-scripts build",
    "eject": "react-scripts eject",
    "styles": "stylus -u autoprefixer-stylus ./src/css/style.styl -o ./src/css/style.css",
    "styles:watch": "stylus -u autoprefixer-stylus -w ./src/css/style.styl -o ./src/css/style.css"
  },
  "eslintConfig": {
    "extends": "./node_modules/react-scripts/.eslintrc"
  }
}
```

* react-scripts - what create-react-app uses

### Install with npm
`$ npm install`

### Run our server
`$ npm start` - This is in `package.json` - `react-scripts start`

`$ npm watch` - Will run our start command and watch our styles

`$ npm build` - For production

`$ npm eject` - Remove from create-with-react

## Create `/src/index.js` (empty file)

## Sample data

`src/sample-fishes.js`

```js
// This is just some sample data so you don't have to think of your own!
module.exports = {
  fish1: {
    name: 'Pacific Halibut',
    image: 'http://i.istockimg.com/file_thumbview_approve/36248396/5/stock-photo-36248396-blackened-cajun-sea-bass.jpg',
    desc: 'Everyones favorite white fish. We will cut it to the size you need and ship it.',
    price: 1724,
    status: 'available'
  },

  fish2: {
    name: 'Lobster',
    image: 'http://i.istockimg.com/file_thumbview_approve/32135274/5/stock-photo-32135274-cooked-lobster.jpg',
    desc: 'These tender, mouth-watering beauties are a fantastic hit at any dinner party.',
    price: 3200,
    status: 'available'
  },

  fish3: {
    name: 'Sea Scallops',
    image: 'http://i.istockimg.com/file_thumbview_approve/58624176/5/stock-photo-58624176-scallops-on-black-stone-plate.jpg',
    desc: 'Big, sweet and tender. True dry-pack scallops from the icey waters of Alaska. About 8-10 per pound',
    price: 1684,
    status: 'unavailable'
  },

  fish4: {
    name: 'Mahi Mahi',
    image: 'http://i.istockimg.com/file_thumbview_approve/12556651/5/stock-photo-12556651-mahimahi.jpg',
    desc: 'Lean flesh with a mild, sweet flavor profile, moderately firm texture and large, moist flakes. ',
    price: 1129,
    status: 'available'
  },

  fish5: {
    name: 'King Crab',
    image: 'http://i.istockimg.com/file_thumbview_approve/18294110/5/stock-photo-18294110-king-crab-legs.jpg',
    desc: 'Crack these open and enjoy them plain or with one of our cocktail sauces',
    price: 4234,
    status: 'available'
  },

  fish6: {
    name: 'Atlantic Salmon',
    image: 'http://i.istockimg.com/file_thumbview_approve/56241842/5/stock-photo-56241842-salmon-fish.jpg',
    desc: 'This flaky, oily salmon is truly the king of the sea. Bake it, grill it, broil it...as good as it gets!',
    price: 1453,
    status: 'available'
  },

  fish7: {
    name: 'Oysters',
    image: 'http://i.istockimg.com/file_thumbview_approve/58626682/5/stock-photo-58626682-fresh-oysters-on-a-black-stone-plate-top-view.jpg',
    desc: 'A soft plump oyster with a sweet salty flavor and a clean finish.',
    price: 2543,
    status: 'available'
  },

  fish8: {
    name: 'Mussels',
    image: 'http://i.istockimg.com/file_thumbview_approve/40450406/5/stock-photo-40450406-steamed-mussels.jpg',
    desc: 'The best mussels from the Pacific Northwest with a full-flavored and complex taste.',
    price: 425,
    status: 'available'
  },

  fish9: {
    name: 'Jumbo Prawns',
    image: 'http://i.istockimg.com/file_thumbview_approve/67121439/5/stock-photo-67121439-fresh-tiger-shrimp-on-ice-on-a-black-stone-table.jpg',
    desc: 'With 21-25 two bite prawns in each pound, these sweet morsels are perfect for shish-kabobs.',
    price: 2250,
    status: 'available'
  }
};
```

## Create `src/components` folder

Add `.gitkeep` so it will stay in git even though it is empty

## Create `src/helpers.js`
Used to solve common problems

```js
export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function getFunName() {
  const adjectives = ['adorable', 'beautiful', 'clean', 'drab', 'elegant', 'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'old-fashioned', 'plain', 'quaint', 'sparkling', 'ugliest', 'unsightly', 'angry', 'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 'obnoxious', 'panicky', 'repulsive', 'scary', 'thoughtless', 'uptight', 'worried'];

  const nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
```

## Start the server
`$ npm start`

Will open a browser window. It will just be blank

Open `src/index.js` and add:

`alert('yo');`

You will see it shows the alert without a page refresh

You are read to go to the next step!
