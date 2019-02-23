# Clear State and Redirect upon `addCologne` Mutation
## Add `createdDate` field in our Cologne so we can sort by it
* **Reminder** You should just have 3 fresh copies of colognes in your colognes collection

### Examine our Cologne model

`models/Cologne.js`

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CologneSchema = new Schema({
  scentName: {
    type: String,
    required: true,
  },
  scentPrice: {
    type: Number,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model('Cologne', CologneSchema);
```

* There is `createdDate`, let's sort by it

## Sorting (Let's sort by `createDate`)
* Change query to sort by date
* Since we will sort all our colognes let's use our `getAllColognes` resolver query
* We will sort by `createdDate` in **descending** order

`resolvers.js`

```
// MORE CODE

exports.resolvers = {
  Query: {
    getAllColognes: async (root, args, { Cologne }) => {
      const allColognes = await Cologne.find().sort({
        createdDate: 'desc',
      });
      return allColognes;
    },

    // MORE CODE
```

## Test
* Log in
* You will see list of `colognes`
* Click on link of `cologne` and you will see in console `getCologne` and there is no `username`
  - We can easily fix this but updated our `GET_COLOGNE` query

## Let's add username now to the `GET_COLOGNE` query

`queries/index.js`

```
// MORE CODE
export const GET_COLOGNE = gql`
  query($_id: ID!) {
    getCologne(_id: $_id) {
      _id
      firstName
      lastName
      description
      createdDate
      likes
      username
    }
  }
`;
// MORE CODE
```

* **caution** Now you will see `username` in console (but my value of username is `null` (_and it should not be `null` be rather the name of the user that created the cologne_))
    - This happens when you are not logged in
    - The navbar lets you know if you are logged in or not (if you see Signout in navbar you are logged in)
* When logged in and on a single `Cologne` page, you will see the `username` now populated

## clear state
* We did this with `Signin` and `Signup` and we'll use the same technique for AddCologne

### Try it out on your own
* See if you can add the clear form technique we used for Signin and Signup and apply it to AddCologne

`AddCologne`

```
// MORE CODE

const initialState = {
  firstName: '',
  lastName: '',
  description: '',
  username: '',
};

class AddCologne extends React.Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  // MORE CODE
```

## Redirect after adding Cologne
* After we add a cologne we want to be taken to the home page automatically
* This is a perfect job for the react-router-dom package `withRouter`
* After we import it and wrap it around our `AddCologne` default export we will have access to `history` through `this.props.history` and that gives us access to the `push()` method that will enable us to programmatically go to a different URL (we'll go to the home route `/`)

* Import `withRouter`

```
import React from 'react';
import { withRouter } from 'react-router-dom'; // add this line

// MORE CODE

  handleSubmit = (event, addCologne) => {
    event.preventDefault();
    addCologne().then(({ data }) => {
      console.log(data);
      this.clearState();
      this.props.history.push('/'); // add this
    });
  };

 // MORE CODE

export default withRouter(AddCologne); // add this
```

## Test
* Add Cologne
* You will be redirected to home page with new Cologne
* But the bad news is when we do, we do not see the cologne we added on the home page (We'll fix that next)

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Clear state and redirect`

## Push to github
`$ git push origin auth`

## Next - Optimistic UI

