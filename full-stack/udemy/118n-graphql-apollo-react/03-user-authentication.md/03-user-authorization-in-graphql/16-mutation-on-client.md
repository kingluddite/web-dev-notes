# Implement `AddCologne` Mutation on Client
## Where are we getting our user info from?
* We get all our user info from the `withSession` component and we pass down the query

`withSession.js`

```
// MORE CODE

const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      if (loading) return null;
      // console.log(data);

      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);
// MORE CODE
```

## Where did we start using our `withSession` component?
* We put it at the top of our client side react app inside `index.js` the first file our app hits when we start
* This is the file where we import react and ReactDOM and we render everything to the `root` element so this is the top of our app
* We store ReactRouter inside `Root` and then wrap `withSession` around `Root` and store that in `RootWithSession`
* We then wrap `ApolloProvider` around `RootWithSession`
* So after all this we know that withSession has passed our session (userinfo) to the Root of our apo

`index.js`

```
const RootWithSession = withSession(Root);
```

`index.js`

* We destructure `session`

```
const Root = ({ refetch, session }) => (
```

## We pass props to a route
* We can do this by changing a `component` route attribute to a `render` attribute

```
// MORE CODE

<Switch>
  <Route exact path="/" component={App} />
  <Route path="/search" component={Search} />
  <Route path="/profile" component={Profile} />
  <Route
    path="/cologne/add"
    render={() => <AddCologne session={session} />}
  />


// MORE CODE
```

* Just to see the big picture open up `index.js` and see how all the above visually look inside the file

### Our AddCologne route now has user data!
* So all the above helps facilitate passing the user data to our AddCologne route
* Now when we visit that route (`http://localhost:3000/cologne/add`) we have `data` about the **user**

```
<Route
  path="/cologne/add"
  render={() => <AddCologne session={session} />}
/>
```

## Add LifeCycle method
* When our component mounts let's log the `props`
* We do this with the `componentDidMount` LifeCycle method

`AddCologne.js`

```
// MORE CODE

class AddCologne extends Component {
  state = {
    scentName: '',
    scentPrice: 0,
    description: '',
    username: '',
  };

  // add our LifeCycle method here
  componentDidMount = () => {
    console.log('AddCologne mounted!');
    console.log(this.props.session);
    console.log(this.props.session.getCurrentUser.username);
  };

// MORE CODE
```

* We just want to see if when we view this route and our `AddCologne` component is mounted we will see that it has access to our user data

## Test in browser
`http://localhost:3000/cologne/add`

* **Caution** If you are not logged in you will get an error so make sure you are logged in

### We have 3 logs
1. We just want to log when the `AddCologne` is mounted
2. We log out the `session` and expand it in the console to see that `getCurrentUser` is the object inside `session` and inside `getCurrentUser` is our currently logged in user `username`
3. We just point out how we actually get the `username` directly

`console.log(this.props.session.getCurrentUser.username);`

### Use React Dev Tools
* Search for `AddCologne` component
* Select `AddCologne`
* Look to the right and see `Props` and there you will see `session`
* Expand it and you will see `getCurrentUser`
* Expand that and you will see the user object `email`, `joinDate` and `username` properties inside the user object

* **note** You may have to refresh the browser window to see `username`

## Add `username` to our `state`
* Here we simple add the currently logged in user's `username` to the `state`

```
// MORE CODE

componentDidMount = () => {
  // console.log(this.props.session.getCurrentUser.username);
  this.setState({
    username: this.props.session.getCurrentUser.username,
  });
};

// MORE CODE
```

## Test in React Dev Tools
* Now view component in react dev tools
* You will see current `username` is populating the `state`

![sample username in State](https://i.imgur.com/tHXZJm4.png)

* The great thing about what we did with all that work is now our `username` of the currently logged in user is associated with the cologne they are adding
* This means we now have a way of keeping track of what user added what cologne which is a fundamental aspect of our app
* We only want a user who created a cologne to be able to update or delete that cologne
  - Imagine the problems that would arise if we let anyone edit or remove any cologne

## Build Mutation
### Think about what we are trying to accomplish right now
#### Let's review what we have built to let us add colognes using GraphQL, MongoDB and Mongoose

* We have already created our `Cologne` model that will hold all the data we want to store about a cologne

`Cologne.js`

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

* We used **mongoose** to help create a schema to limit the type of data each property/field will store

`schema.js`

```
# MORE CODE

const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
  scalar ObjectID
  type Cologne {
    _id: ObjectID
    scentName: String!
    scentPrice: Int
    createdDate: String
    description: String
    likes: Int
    username: String
  }

# MORE CODE
```

* We are using GraphQL to create a Mutation so we have created our GraphQL schema to match up with our mongoose schema for adding colognes

`schema.js`

```
# MORE CODE

  type Mutation {
    addCologne(
      scentName: String!
      scentPrice: Int
      description: String
      username: String
    ): Cologne

    # MORE CODE
  }
`;
```

* We wrote or resolver that will communicate with our MongoDB to add the colognes collection

`resolvers.js`

```
// MORE CODE

Mutation: {
  addCologne: async (
    root,
    { scentName, scentPrice, description, username },
    { Cologne }
  ) => {
    const newCologne = await new Cologne({
      scentName,
      scentPrice,
      description,
      username,
    }).save();

    return newCologne;
  },

// MORE CODE
```

* All of the above was done server side
* Now we will move to the client side

### Now we need to add our client side mutation
* The best place to build this is in the GraphQL GUI
* So open that up in the browser:

`http://localhost:4444/graphql`

* And this is where we will write our client side Mutation
* This is a great practice because if we do it properly we'll see that our cologne will actually get added to our mLab remote MongoDB

```
mutation(
    $scentName: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
```

* Remember that we could hard code our values for the cologne fields that we want but what we need is a way to add dynamic variables because our end goal is to create a UI that will take in the user form field data and insert that into our colognes collection
* To do that on the GraphQL GUI we need to expand and add variables

### Add our query variables
```
{
  "scentName": "junk",
  "scentPrice": 100,
  "description": "very smelly"
}
```

* Click the Play button and you should get back the data object:

```
{
  "data": {
    "addCologne": {
      "scentName": "junk",
      "scentPrice": 100,
      "description": "very smelly",
      "createdDate": "1538884428637",
      "likes": 0
    }
  }
}
```

* You can assume this gets added into your mLab but if you check there too you will see something like this in the `colognes` collections:

```
{
    "_id": {
        "$oid": "5bb9834c1db0b2190a60a54c"
    },
    "likes": 0,
    "scentName": "junk",
    "scentPrice": 100,
    "description": "very smelly",
    "createdDate": {
        "$date": "2018-10-07T03:53:48.637Z"
    },
    "__v": 0
}
```

* This means that you mutation and all the code is working properly and now we can just copy and paste this code into `queries/index.js`
  - But if you received an Error the GUI will let you know what went wrong and you can use that error to troubleshoot
  - You can also check your terminal window for additonal errors to troubleshoot

## We will send our client form data to the backend (server side)
### Create the new Mutation inside our `queries` folder

`queries/index.js`

* Remember to first create your export

```
// Colognes Mutations

export const ADD_COLOGNE = gql`
  
`;
```

* Now just paste the copy GraphQL GUI mutation you just wrote and tested that it worked properly

```
// Colognes Mutations

export const ADD_COLOGNE = gql`
  mutation(
    $scentName: String!
    $scentPrice: Int
    $description: String
    $username: String
  ) {
    addCologne(
      scentName: $scentName
      scentPrice: $scentPrice
      description: $description
      username: $username
    ) {
      scentName
      scentPrice
      description
      createdDate
      likes
    }
  }
`;
```

* But in our GUI of GraphQL we hardcoded variables
* We can't use that inside `AddCologne` but what we have done is we captured all the values in the `state`
* We use destructuring to grab those values off of `state` and pass them into our Mutation (we import this component from `react-apollo`) and we we also import the Mutation we just wrong in `queries/index.js` called `ADD_COLOGNE` and we pass that as a `mutation` attribute of the `Mutation` component
* We also can pass `ADD_COLOGNE` the variables it needs (that we pulled from our `state`) using the Mutation's `variables` attribute

## Add render prop
```
import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import { ADD_COLOGNE } from '../../queries';

class AddCologne extends Component {
  
  // MORE CODE

  render() {
    const { scentName, scentPrice, description } = this.state;

    return (
      <div className="App">
        <h2 className="App">Add Cologne</h2>
        <Mutation
          mutation={ADD_COLOGNE}
          variables={{ scentName, scentPrice, description }}
        >
          {(addCologne, { data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            console.log(data);

            return (
              <form className="form">

                // MORE CODE

              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}
// MORE CODE

```

### Here is a closer look at the render prop we added

`AddCologne.js`

```
// MORE CODE

<Mutation
  mutation={ADD_COLOGNE}
  variables={{ scentName, scentPrice, description }}
>
  {(addCologne, { data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    // console.log(data);

    return (
      <form
        className="form"
      >

      // MORE CODE

        <button className="button-primary">Add Cologne</button>
      </form>
    );
  }}
</Mutation>

// MORE CODE
```

* Inside our render prop we pass it our `addCologne` method that we get access to as the first argument thanks to the `Mutation` component
* We then get access to `data` (holds our form data)
* `loading` lets us wait till our data comes back
* `error` lets us know if something went wrong

## Add onSubmit event
* We add a `onSubmit` event to when someone submits our form and we pass it an arrow function
* We do this because we don't want `handleSubmit` to run until we click the submit button and we want to pass it our event object and the `addCologne` function we want to run that will insert our data into MongoDB

`AddCologne.js`

```
// MORE CODE

return (
  <form
    className="form"
    onSubmit={event => this.handleSubmit(event, addCologne)}
  >
    <label htmlFor="scentName">Scent Name</label>

// MORE CODE
```

## Add our handleSubmit event handler

`AddCologne.js`

```
// MORE CODE

handleSubmit = (event, addCologne) => {
  event.preventDefault();
  console.log(addCologne);
};

render() {

// MORE CODE
```

## Test it out
* Fill out the form and submit
* Open up the console and you will see `addCologne` and inside it you will see all our fields have been added (_We actually need to add one more but back to that in a moment_)
* The `event.preventDefault()` keeps us on the same page and turns off the default form action
* The `addCologne()` method returns a Promise so we tie on a `then()` where we pull off the `data` through destructuring and log it out
* Add a cologne

## Problem

* After we log it out we see that our user is not added to this cologne
  - The reason is we have it in our `state` we just have to pluck it off our `state` and pass it to our `addCologne` mutation as a `variable`

`AddCologne.js`

* We add `username`

```
// MORE CODE

render() {
  const { scentName, scentPrice, description, username } = this.state;

  return (
    <div className="App">
      <h2 className="App">Add Cologne</h2>
      <Mutation
        mutation={ADD_COLOGNE}
        variables={{ scentName, scentPrice, description, username }}
      >

// MORE CODE
```

## Test it out in browser
* Add a cologne and look in console
* You may see two logs (comment out this log)

`AddCologne.js`

* We are only commenting out this log to clear up space in our console

```
// MORE CODE

    <Mutation
      mutation={ADD_COLOGNE}
      variables={{ scentName, scentPrice, description, username }}
    >
      {(addCologne, { data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        // console.log(data); // comment out this line

// MORE CODE
```

* Fill out form again and you will see `addCologne` and inside you will see all the fields you specified in GraphQL
* You will see you stay on the same page after form submit `event.preventDefault()`
* You'll see the cologne you add is added to your MongoDB on mLab

## Test - Check for two things to happen
* Run it
* And see if two things happen:

1. When you fill form out it will populate the database
2. Also see if when you visit home page the item you added is on the home page

## Clean up database
* Log into mLab and remove all colognes

![delete all documents in a collection](https://i.imgur.com/9JpjY5m.png)

* Open your app in the browser
* Signout if you haven't already
* Log back in
* Add 3 more colognes but leave the `Scent Price` field empty

### Things you should notice
* Our form doesn't clear after submitting, this is not good UX design (We'll fix that next)
* If we submit an empty form we get a nasty error (We'll fix this with form validation, the good news is we already have server side validation to keep us from inserting an empty cologne into mongodo (aka empty document)
* When we view the home page we only see our newly added cologne when we refresh the page (This is not good UX and we'll fix that later)
* We can't enter a price yet (if we did, we'd get an error because our price filed is expected to be an integer and we are passing it a string (all form fields are strings by default) - we'll fix that later)
* After we add a cologne and view our remote mongodb on mlab we see that our cologne has a `username` associated with it - this is good!
* After we add a cologne we see that the addCologne console log does not have a username? Why?

## Next - Clear form and redirect to home page after adding a record

## Additional Resources
* [React SSR](https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4)
* [The correct way to structure a react app](https://hackernoon.com/the-100-correct-way-to-structure-a-react-app-or-why-theres-no-such-thing-3ede534ef1ed)
* [Render Props explained with example](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2)
