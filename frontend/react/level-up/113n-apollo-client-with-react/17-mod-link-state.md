# Modify Local State
* Create new file `EditMode.js`

`EditMode.js`

```
import React, { Component } from 'react';

export class EditMode extends Component {
  render() {
    return <button className="button">Toggle Edit Mode</button>;
  }
}

export default EditMode;
```

`Post.js`

```
// MORE CODE

import EditMode from './EditMode';

export class Post extends Component {

       // MORE CODE

            <div>
              <EditMode />
              <section>
                {isEditMode ? (
                  <Fragment>
                    <h1>Edit Post</h1>
                    <UpdatePost post={post} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1>{post.title}</h1>
                  </Fragment>
                )}
              </section>

// MORE CODE
```

* You should see your Toggle Edit Mode button

## Let's modify the state
* In a typical GraphQL situation you have a mutation and on the server side you have what's called a mutation `resolver`
    - That mutation resolver is what actually does the operation
    - You can do the same thing with Apollo Link State
        + You can have a mutation
        + You can write a mutation query
        + You can fire that mutation off
        + Inside that mutation:
            * You read the cache
            * You make the changes
            * You write the cache
            * **note** This is a long process and it shouldn't be this hard to toggle a button

## Apollo Link State to the rescue!
* One of the recept updates to Apollo Link State brought us is the ability to write to the cache directly! (from let's say a button click)

## ApolloProvider vs ApolloConsumer
* We already used ApolloProvider here:

`App.js`

```
// MORE CODE

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>

// MORE CODE
```

### Now let's use ApolloConsumer
* This will be wrapped around our button
* Just like the Query and Mutation this will use a render prop to get access to something
    - In this case it needs to get access to the client
    - Just like any render prop we have the function returned as the child and this will give us access to the client

`EditMode.js`

```
import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

export class EditMode extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => <button className="button">Toggle Edit Mode</button>}
      </ApolloConsumer>
    );
  }
}

export default EditMode;
```

## Time to write to some data
* When we click we want to write data
* You might think we just have do do this:

`EditMode.js`

```
// MORE CODE

export class EditMode extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <button
            className="button"
            onClick={() => {
              client.writeData({ isEditMode: true });
            }}

// MORE CODE
```

* But that won't work because all our stuff is inside the `data` object
* Anytime we worked with our cache (aka `data`) it always comes back inside `data` object

## The correct way
`EditMode.js`

```
// MORE CODE

export class EditMode extends Component {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <button
            className="button"
            onClick={() => {
              client.writeData({ data: { isEditMode: true } });
            }}
          >
            Toggle Edit Mode
          </button>
        )}
      </ApolloConsumer>
    );
  }
}

// MORE CODE
```

* This will set our global `isEditMode` to true when it is clicked

## Test
* Click Edit toggle and you will see the edit form
* But click again and it is not toggling
* **note** Don't trust Apollo Dev Tools, we know the cache has been written to and is updated but it is not showing us in real time, close and reopen Apollo Dev tools and you will see `isEditMode` is true

## How do we get this button to toggle isEditMode to true
* We could write a query that is writing the current state of isEditMode and then we could use `client.readQuery` where we run the query, then we get access to the data and set the inverse value for the data
    - Useful in some cases where you really need to work with that data
* Easier way (in most cases with a simple toggle like in our case) we are just getting the value coming directly down the line from react
    - Let's just pass in `isEditMode` directly into `<EditMode isEditMode={isEditMode} />`

`Post.js`

```
// MORE CODE

const { post, isEditMode } = data;
          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              <section>
                {isEditMode ? (
                  <Fragment>

// MORE CODE
```

`EditMode.js`

```
import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';

export class EditMode extends Component {
  render() {
    const { isEditMode } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <button
            className="button"
            onClick={() => {
              client.writeData({ data: { isEditMode: !isEditMode } });
            }}
          >
            Toggle Edit Mode
          </button>
        )}
      </ApolloConsumer>
    );
  }
}

export default EditMode;
```

## Test
* Your edit/post is now working
* Apollo Dev tools appears to be working in real time (may break so don't trust and close and reopen if you need to see fresh data)
* View Cache to see this in real time inside Apollo Dev tools

## Great Pro of this technique
* We can take this button and put it anywhere
* We could throw in the header of the site or anywhere since it is storing the state globally and apollo is grabbing the state globally it will always work

## One improvement we need to make
* We make an update and click Update button, the form should switch from editMode to post mode
* Lot's of ways to do this but the coolest way would be to modify the client upon completion of that mutation

## Next - Make a mutation to the DB (not the state)

