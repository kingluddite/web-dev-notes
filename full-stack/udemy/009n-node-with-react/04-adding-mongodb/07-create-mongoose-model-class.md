# Create Mongoose Model Class
* We need to create a Model class using mongoose

![mongoose model class diagram](https://i.imgur.com/HbZtUmM.png)

* This will allow us to create a new collection of records in our `MongoDB` Database

## Where should we create this model class?
`index.js` is for booting up our app

### models
* We'll create a `models` folder
* This will contain all the different model classes that we create using mongoose
* We'll create `models/User.js`
* Naming convention: `Users.js` - Use Capital letter for Model names

`models/User.js`

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
```

### Refactor with ES6 destructuring
```js
const mongoose = require('mongoose');
/* The mongoose object has a property called Schema 
   Take that property and assign it to a new variable called Schema
   That's what the curly braces indicate
   We will be using destructuring A LOT!
*/
const { Schema } = mongoose;
```

* This `const Schema = mongoose.Schema;` and this `const { Schema } = mongoose;` are 100% completely equal in functionality

## All the random properties you want!
* Every record in your collection can have totally different properties
* But when we use Mongoose it puts a stranglehold on that ability
* Mongoose wants to know all the different properties are collection will have
* Mongoose requires us to define that ahead of time with the `Schema` object
* The Schema requires us to to tell is what every single property on a record will look like

`User.js`

```js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// Create a Mongo Model class
// And tell mongoose that it needs to be aware that this new collection
// needs to be created
mongoose.model('users', userSchema);
```

* If Mongo boots up and the `users` collection already exists, mongoose won't delete and remake it will say, "Oh it already exists and it has a userSchema so they probably match up"
* At any time, we can add in Schema properties as we deem fit

## Just because we have a file in our project doesn't mean we can see and use it
* Don't forget to require the files in the files you are using them!

`User.js`

```js
const express = require('express');
const mongoose = require('mongoose');
const secretKeys = require('./config/keys');
require('./services/passport');
require('./models/User'); // add this line

mongoose.connect(secretKeys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
```
