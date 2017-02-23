# Tooling & Editor Setup

## Tooling Needed
### You need Node
`$ node -v` (_must be > 6_)

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

```html
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Soccer Store</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Place favicon.ico in the root directory -->

    </head>
    <body>

      <input type="checkbox" id="fold">
      <label for="fold">Fold</label>

      <div id="main">
        <!-- Main React app goes here -->
      </div>
      <!-- /#main -->
    </body>
</html>
```

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

`src/sample-players.js`

```js
// This is just some sample data so you don't have to think of your own!
module.exports = {
   player1:{
      firstName: "Philip",
      lastName: "Nguyen",
      email: "pnguyen0@cnet.com",
      position: "defender",
      fee: 1000,
      number: null,
      comments:"Duis bibendum, felis sed interdum venenatis",
      image: "http://dummyimage.com/182x226.bmp/dddddd/000000",
      status: "injured"
   },
   player2:{
      firstName: "Walter",
      lastName: "Hicks",
      email: "whicks1@senate.gov",
      position: "defender",
      fee: 1002,
      number: null,
      comments:"Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
      image: "http://dummyimage.com/250x219.png/5fa2dd/ffffff",
      status: "injured"
   },
   player3:{
      firstName: "Roy",
      lastName: "Morales",
      email: "rmorales2@jugem.jp",
      position: "goalie",
      fee: 1004,
      number: null,
      comments:"Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
      image: "http://dummyimage.com/227x179.bmp/5fa2dd/ffffff",
      status: "injured"
   },
   player4:{
      firstName: "Bobby",
      lastName: "Austin",
      email: "baustin3@indiegogo.com",
      position: "midfielder",
      fee: 1005,
      number: null,
      comments:"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
      image: "http://dummyimage.com/146x169.png/ff4444/ffffff",
      status: "active"
   },
   player5:{
      firstName: "Jason",
      lastName: "Garrett",
      email: "jgarrett4@bigcartel.com",
      position: "forward",
      fee: 1000,
      number: null,
      comments:"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
      image: "http://dummyimage.com/114x133.bmp/dddddd/000000",
      status: "inactive"
   },
   player6:{
      firstName: "Frank",
      lastName: "Ramirez",
      email: "framirez5@histats.com",
      position: "midfielder",
      fee: 1006,
      number: null,
      comments:"Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus",
      image: "http://dummyimage.com/209x117.png/5fa2dd/ffffff",
      status: "inactive"
   },
   player7:{
      firstName: "Terry",
      lastName: "Gilbert",
      email: "tgilbert6@storify.com",
      position: "midfielder",
      fee: 1002,
      number: null,
      comments:"Sed ante. Vivamus tortor. Duis mattis egestas metus",
      image: "http://dummyimage.com/113x122.jpg/cc0000/ffffff",
      status: "injured"
   },
   player8:{
      firstName: "Barbara",
      lastName: "Medina",
      email: "bmedina7@youtu.be",
      position: "defender",
      fee: 1009,
      number: null,
      comments:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      image: "http://dummyimage.com/218x104.png/ff4444/ffffff",
      status: "active"
   },
   player9:{
      firstName: "Raymond",
      lastName: "Woods",
      email: "rwoods8@uol.com.br",
      position: "midfielder",
      fee: 1002,
      number: null,
      comments:"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa",
      image: "http://dummyimage.com/126x101.png/5fa2dd/ffffff",
      status: "active"
   },
   player10:{
      firstName: "Deborah",
      lastName: "Kelly",
      email: "dkelly9@sbwire.com",
      position: "midfielder",
      fee: 1008,
      number: null,
      comments:"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis",
      image: "http://dummyimage.com/121x189.png/5fa2dd/ffffff",
      status: "active"
   },
   player11:{
      firstName: "Russell",
      lastName: "Olson",
      email: "rolsona@dyndns.org",
      position: "defender",
      fee: 1007,
      number: null,
      comments:"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
      image: "http://dummyimage.com/240x216.jpg/dddddd/000000",
      status: "active"
   },
   player12:{
      firstName: "Laura",
      lastName: "Phillips",
      email: "lphillipsb@t.co",
      position: "forward",
      fee: 1003,
      number: null,
      comments:"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
      image: "http://dummyimage.com/179x239.jpg/cc0000/ffffff",
      status: "injured"
   },
   player13:{
      firstName: "Alan",
      lastName: "Martin",
      email: "amartinc@statcounter.com",
      position: "midfielder",
      fee: 1003,
      number: null,
      comments:"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
      image: "http://dummyimage.com/114x248.bmp/ff4444/ffffff",
      status: "inactive"
   },
   player14:{
      firstName: "Emily",
      lastName: "Brooks",
      email: "ebrooksd@virginia.edu",
      position: "forward",
      fee: 1003,
      number: null,
      comments:"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere",
      image: "http://dummyimage.com/108x219.jpg/5fa2dd/ffffff",
      status: "injured"
   },
   player15:{
      firstName: "Judith",
      lastName: "Carroll",
      email: "jcarrolle@hao123.com",
      position: "midfielder",
      fee: 1006,
      number: null,
      comments:"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae",
      image: "http://dummyimage.com/149x244.jpg/5fa2dd/ffffff",
      status: "inactive"
   },
   player16:{
      firstName: "Mildred",
      lastName: "Harvey",
      email: "mharveyf@un.org",
      position: "defender",
      fee: 1004,
      number: null,
      comments:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
      image: "http://dummyimage.com/179x209.png/ff4444/ffffff",
      status: "injured"
   },
   player17:{
      firstName: "Jessica",
      lastName: "Harper",
      email: "jharperg@yelp.com",
      position: "goalie",
      fee: 1009,
      number: null,
      comments:"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus",
      image: "http://dummyimage.com/133x190.png/dddddd/000000",
      status: "injured"
   },
   player18:{
      firstName: "Beverly",
      lastName: "Diaz",
      email: "bdiazh@bluehost.com",
      position: "midfielder",
      fee: 1000,
      number: null,
      comments:"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
      image: "http://dummyimage.com/169x116.bmp/5fa2dd/ffffff",
      status: "injured"
   },
   player19:{
      firstName: "Ruth",
      lastName: "Tucker",
      email: "rtuckeri@purevolume.com",
      position: "forward",
      fee: 1008,
      number: null,
      comments:"Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
      image: "http://dummyimage.com/248x129.png/dddddd/000000",
      status: "injured"
   },
   player20:{
      firstName: "Douglas",
      lastName: "Murphy",
      email: "dmurphyj@google.pl",
      position: "defender",
      fee: 1006,
      number: null,
      comments:"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
      image: "http://dummyimage.com/211x235.jpg/5fa2dd/ffffff",
      status: "active"
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
