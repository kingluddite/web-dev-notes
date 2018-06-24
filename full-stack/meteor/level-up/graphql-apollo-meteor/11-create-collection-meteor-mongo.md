# Creating a Collection and Using our DB

`imports/api/resolutions/resolutions.js`

```
import { Mongo } from 'meteor/mongo';

const Resolutions = new Mongo.Collection('resolutions');

export default Resolutions;
```

## Import that db collection into our resolvers
`resolvers.js`

```
import Resolutions from './resolutions';

const res = Resolutions.find({}).fetch();
console.log(res);

export default {
  Query: {
    resolutions() {
      return [
        {
          _id: '12345',
          name: 'Buy eggs',
        },
        {
          _id: '12346',
          name: 'Jump rope',
        },
      ];
    },
  },
};
```

* We store our Collection into a variable `res` just to see that it outputs an emtpy array (you'll see this in the terminal - server side code!)

![our logs](https://i.imgur.com/4ee0Hd7.png)

* Remove the log from `register-api.js` as we don't need it anymore
* .find({}) just returns a cursor which is more data then we need
    - We just want an array of the `ids` and `names` and that is what `.find({}).fetch()` gives us

## Note on our schema
`Resolutions.graphql`

```
type Resolution {
  _id: String!
  name: String!
}
```

* Our schema in our graphql `type` and id is going to mirror what our actual data in our db is in
* But do not think this will always be 1 to 1
* Your schema for graphql does not define the shape of the data in your database
    - Your db could contain a whole bunch of different information
    - Or your graphql schema could include extra information
    - This is simply the schema of your public API (the stuff you can grab publicly)

## Add Data
* This is a quick way for testing

`resolvers.js`

```
import Resolutions from './resolutions';

Resolutions.insert({
  name: 'Test Res',
});

const res = Resolutions.find({}).fetch();
console.log(res);
// MORE CODE
```

* Now the log will show we have one record
* Don't need to add `_id` as mongo adds it automatically when inserting a record

`[ { _id: '7ndAyQ6AbuukGqmgY', name: 'Test Res' } ]`

* Your `_id` will obviously be different than the example above
* Comment out that insert mongo code so it doesn't keep adding records into our resolutions Collection

```
import Resolutions from './resolutions';

// Resolutions.insert({
//   name: 'Test Res',
// });

const res = Resolutions.find({}).fetch();
console.log(res);
// MORE CODE
```

* The log shows that when we run a find and fetch we get a single item back
* We have an array with an object of an `_id` and a `name`
* In `register-api.js` we defined our schema with:
    - resolutions will be an Array of resolutions

```
const testSchema = `
type Query {
 hi: String
 resolutions: [Resolution]
}
`;
```

* Resolution is defined inside the Resolution.graphql

```
type Resolution {
  _id: String!
  name: String!
}
```

* Notes `_id` is a string and `name` is a string
* Out data matches our schema
* Since the data matches how we were statically showing our data we can swap our static tasks with our mongo db dynamic tasks

`resolvers.js`

```
import Resolutions from './resolutions';

// Resolutions.insert({
//   name: 'Test Res',
// });

export default {
  Query: {
    resolutions() {
      return Resolutions.find({}).fetch();
    },
  },
};
```

* Our data doesn't update
* This happens because these are only server side changes so you'll need to refresh the browser and then you should see that our data is now pulling from the mongo db locally installed
* Meteor set this db up when you inserted one record

![mongo db data](https://i.imgur.com/3asDz5E.png)

## We our showing data into our db
* Now we need to insert data into our db

## Next - add a form and write our first mutation




