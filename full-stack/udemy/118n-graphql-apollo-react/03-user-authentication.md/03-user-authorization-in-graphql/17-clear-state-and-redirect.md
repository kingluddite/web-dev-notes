# Clear State and Redirect upon addCologne Mutation
## Add createdDate field in our Cologne so we can sort by it
* To clean up our data wipe out your Cologne db and start with fresh data with this new field
* Add a couple new Genealogies

### Examine our Cologne model

`models/Cologne.js`

```
const CologneSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
});
```

* There is `createdDate`, let's sort by it

## Sorting
* Change query to sort by date
* Since we will sort all our genealogies let's use our `getAllGenealogies` resolver query
* We will sort by `createdDate` indescending order

`resolvers.js`

```
// MORE CODE

exports.resolvers = {
  Query: {
    getAllGenealogies: async (root, args, { Cologne }) => {
      const allGenealogies = await Cologne.find().sort({
        createdDate: 'desc',
      });
      return allGenealogies;
    },

    // MORE CODE
```

## Test
* Log in
* You will see list of `genealogies`
* Click on link of `Cologne` and you will see in console `getCologne` and there is no `username`

## Let's add username now to the `GET_Cologne` query

`queries/index.js`

```
// MORE CODE
export const GET_Cologne = gql`
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

* **caution** Now you will see `username` in console (but my value of username is `null` (and it should not be `null` be rather the name of the user that created the Cologne))
    - This happens when you are not logged in
    - The navbar lets you know if you are logged in or not (if you see Signout in navbar you are logged in)
    - Check the console for username when logged in
    - When you click on a console you should see a long `id` at the end of the URL

`http://localhost:3000/Cologne/5b833a3946583584c79bde28`

* When logged in and on a single `Cologne` page, you will see the username now populated

## clear state
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
* Import `withRouter`

```
import React from 'react';
import { withRouter } from 'react-router-dom';

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
