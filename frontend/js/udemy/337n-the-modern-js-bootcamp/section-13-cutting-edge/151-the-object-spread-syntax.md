# The Object Spread Syntax
* We know how to use the spread operator with arrays

```
// MORE CODE

// array of cities
let cities = ['Philly', 'LA', 'Clemson', 'Arlington'];
cities = [...cities, 'Dublin', 'Killasser'];
console.log(cities);

// MORE CODE
```

* Now we'll learn how to use the spread operator with arrays

## To do this we need to update babel
* **note** We configured babel in `webpack.config.js`

`webpack.config.js`

* We configured how babel works in the `options` object
* All we need to do to get support for the spread operator on objects is to install one new babel plugin and set it up on this options object

```
// MORE CODE

      {
        // all js except for node_modules
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // use babel to transpile modern js into old js
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

// MORE CODE
```

### babel-plugin-transform-object-rest-spread
* Install the new plugin

`$ npm i babel-plugin-transform-object-rest-spread`

#### Now we have to add a plugins key and a value
* This will let us start using the object spread operator in our projects

`webpack.config.js`

```
// MORE CODE

      {
        // all js except for node_modules
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // use babel to transpile modern js into old js
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['transform-object-rest-spread']
          },
        },
      },

// MORE CODE
```

## Start the server
`$ npm run dev`

## View in browser
* We'll create a simple object with a few properties

whatever comes last will take precedent
so if you change bedrooms before it will get overwritten by spread operator
You can also override a property directly

`index.js`

```
const house = {
  bedrooms: 4,
  bathrooms: 2.5,
  garage: true,
  yearBuilt: 1970,
}

const newHouse = {
  basement: true,
  ...house,
  washer: true,
  dryer: true,
}
newHouse.dryer = false
newHouse.yearBuilt = 2000
console.log(house)
console.log(newHouse)
```

## Challenge
* Create a person object with name and age
* Create a location object with city and country
* create a new overview object and use the spread operator to add all 4 properties from both objects
