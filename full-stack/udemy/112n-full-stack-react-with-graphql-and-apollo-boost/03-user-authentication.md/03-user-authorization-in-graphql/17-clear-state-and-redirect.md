# Clear State and Redirect upon addGenealogy Mutation
## Sorting
* change query to sort by date
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
* You will see list of genealogies
* Click on link of genealogy and you will see in console `getGenealogy` and there is no `username`
* Let's add that now to the GET_RECIPE query

`queries/index.js`

```
// MORE CODE
export const GET_GENEALOGY = gql`
  query($_id: ID!) {
    getGenealogy(_id: $_id) {
      _id
      firstName
      lastName
      dateOfBirth
      description
      createdDate
      likes
      username
    }
  }
`;
// MORE CODE
```

* **caution** Now you will see username in console (but my value of username is null (and it should not be null be rather the name of the user that created the genealogy))
    - This happens when you are not logged in
    - The navbar lets you know if you are logged in or not (if you see Signout in navbar you are logged in)
    - Check the console for username when logged in
    - When you click on a console you should see a log id

`http://localhost:3000/genealogy/5b833a3946583584c79bde28`

* When logged in and on a single genealogy page, you will see the username now populated

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
