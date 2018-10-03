# Clear State and Redirect upon addGenealogy Mutation
## Add createdDate field in our Genealogy so we can sort by it
* To clean up our data wipe out your Genealogy db and start with fresh data with this new field
* Add a couple new Genealogies

### Examine our Genealogy model

`models/Genealogy.js`

```
const GenealogySchema = new Schema({
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
    getAllGenealogies: async (root, args, { Genealogy }) => {
      const allGenealogies = await Genealogy.find().sort({
        createdDate: 'desc',
      });
      return allGenealogies;
    },

    // MORE CODE
```

## Test
* Log in
* You will see list of `genealogies`
* Click on link of `genealogy` and you will see in console `getGenealogy` and there is no `username`

## Let's add username now to the `GET_GENEALOGY` query

`queries/index.js`

```
// MORE CODE
export const GET_GENEALOGY = gql`
  query($_id: ID!) {
    getGenealogy(_id: $_id) {
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

* **caution** Now you will see `username` in console (but my value of username is `null` (and it should not be `null` be rather the name of the user that created the genealogy))
    - This happens when you are not logged in
    - The navbar lets you know if you are logged in or not (if you see Signout in navbar you are logged in)
    - Check the console for username when logged in
    - When you click on a console you should see a long `id` at the end of the URL

`http://localhost:3000/genealogy/5b833a3946583584c79bde28`

* When logged in and on a single `genealogy` page, you will see the username now populated

## clear state
`AddGenealogy`

```
// MORE CODE

const initialState = {
  firstName: '',
  lastName: '',
  description: '',
  username: '',
};

class AddGenealogy extends React.Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({ ...initialState });
  };

  // MORE CODE
```

## Redirect after adding genealogy
* Import `withRouter`

```
import React from 'react';
import { withRouter } from 'react-router-dom';

// MORE CODE

  handleSubmit = (event, addGenealogy) => {
    event.preventDefault();
    addGenealogy().then(({ data }) => {
      console.log(data);
      this.clearState();
      this.props.history.push('/'); // add this
    });
  };

 // MORE CODE

export default withRouter(AddGenealogy); // add this
```

## Test
* Add Genealogy
* You will be redirected to home page with new genealogy
