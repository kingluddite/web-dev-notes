# The Mutation Component
* To make our app more user friendly we'll link the `h1` to home

`App.js`

```
// MORE CODE

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// MORE CODE

class App extends Component {
  render() {

    // MORE CODE

              <Link to="/">
                <h1 className="App-title">GraphQL Blog</h1>

                // MORE CODE
```

* Now we can easily navigate home when we need to 

## Add a new route
* This will be a route that will be used to create a new post
* It will have a component with a form that updates our DB

`App.js`

```
// MORE CODE

import NewPost from './Posts/NewPost';

// MORE CODE

</header>

<Link to={'/post/new'}>New Post</Link>

<Switch>
  <Route path="/" exact component={Posts} />
  <Route path="/post/new" component={NewPost} />
  <Route path="/post/:id" component={Post} />
</Switch>

// MORE CODE
```

* The position of the `new` route is important
* It needs to come before the `:id` route
    - We don't want our router to think `new` is an `id` so we place it before and it will never get to the `id` but all other routes that are anything like `/post/anthingbutNEWcangohereandwillcountasanID`

`NewPost.js`

```
import React, { Component } from 'react';

export class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>New Post</h1>
      </div>
    );
  }
}

export default NewPost;
```

## Visit the new route
`http://localhost:3000/post/new`

* You should see `New Post`

## Create simple form
* This will not have label tags (you should have them)
* This will provide a way for the user to enter a `title` and a `body`

`PostForm.js`

```
import React, { Component } from 'react';

export class PostForm extends Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="title" />
        <textarea type="text" placeholder="body" />
        <button>Submit</button>
      </form>
    );
  }
}

export default PostForm;
```

`NewPost.js`

```
import React, { Component } from 'react';

// components
import PostForm from './PostForm';

export class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>New Post</h1>
        <PostForm />
      </div>
    );
  }
}

export default NewPost;
```

## View in browser
* We have a dumb form that does nothing yet

## Making things simple
`NewPost.js`

```
import React, { Component } from 'react';

// components
// import PostForm from './PostForm';

export class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>New Post</h1>
        <form>
          <input type="text" placeholder="title" />
          <textarea type="text" placeholder="body" />
          <button>Submit</button>
        </form>
        {/* <PostForm /> */}
      </div>
    );
  }
}

export default NewPost;
```

* We want to have a form that adds a post with a name and a body
* We need to create a reusable event handler that will take whatever someone enters into their input fields and put them in the state for this component

## STEP BY STEP

```
handleInput = event => {
    const formData = [];
    formData[event.target.name] = event.target.value;
    this.setState({
      ...formData,
    });
  };
```

* We are grabbing the `name` of all input fields

```
<input
  type="text"
  name="title"
/>
```

`formData[event.target.name]` is a way to dynamically grab all names without having to hardcode them

`event.target.value` is a way to grab whatever a user types in any field

## state
We need to set up our default state

```
 // MORE CODE

export class NewPost extends Component {
  state = {
    title: '',
    body: '',
  };

  // MORE CODE
```

## Set form field values using state
### First - pull them off of state

```
// MORE CODE

render() {
    const { title, body } = this.state;

// MORE CODE
```

## Set form value to state values
```
// MORE CODE

<input
    type="text"
    name="title"
    value={title}
    placeholder="title"
  />
  <textarea
    type="text"
    name="body"
    value={body}
    placeholder="body"
  />

// MORE CODE
```

## Use `onChange` to call our method `handleInput`

```
// MORE CODE

<input
    type="text"
    name="title"
    onChange={this.handleInput}
    value={title}
    placeholder="title"
  />
  <textarea
    type="text"
    name="body"
    onChange={this.handleInput}
    value={body}
    placeholder="body"
  />

// MORE CODE
```

## graphql
* We need to store our GraphQL in a variable
* We can great a variable `NEW_POST` (uppercase is common naming convention)
* We store GraphQL in an ES6 template string
* Copy and paste our working mutation from GraphCMS and paste into our GraphQL string

```
const NEW_POST = gql`
mutation addPost {
  createPost (data: {
    status: PUBLISHED
    title: "Mutation added"
    body:"We added our first record using a mutation"
  }) {
    title
    body
    id
  }
}
`
```

## Pass dynamic values
* We have a form where we collected the data
* Now we need to take those values and pass them to GraphQL mutation

```
const NEW_POST = gql`
mutation addPost($title: String!, $body: String!) {
  createPost (data: {
    status: PUBLISHED
    title: "Mutation added"
    body:"We added our first record using a mutation"
  }) {
    title
    body
    id
  }
}
`
```

## Replace our hardcoded values with our variables
* We keep PUBLISHED because all posts will be PUBLISHED (not secure but this is a basic open API)
```
const NEW_POST = gql`
mutation addPost($title: String!, $body: String!) {
  createPost (data: {
    status: PUBLISHED
    title: $title
    body: $body
  }) {
    title
    body
    id
  }
}
`
```

* Very similar to a Query component

## Wrap our `form` in a Mutation component
`NewPost.js`

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation>
          <form>

            // MORE CODE
          
          </form>
        </Mutation>
        {/* <PostForm /> */}
      </div>
    );

// MORE CODE
```

## Props we need to add to `Mutation` component
### Call our GraphQL mutation and supply it as the value for `Mutation`s `mutation` prop

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST}>

// MORE CODE
```

## Pass in variables we need from our form
* We already destructured them off of state

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>

// MORE CODE
```

* Last time we needed to pull values off of URL using `match.params.id`

`Post.js`

```
// MORE CODE

export class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>

// MORE CODE
```

## Do the same thing with a render prop for Mutation that we did with a Query
`NewPost.js`

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {() => (
          <form>

          // MORE CODE

          </form>
        </Mutation>
        )}
// MORE CODE
```

* A bit easier
    - We don't have a loading state
    - We need to pass our function as an argument the name of our function `createPost`

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {({ createPost }) => (
          <form>

          // MORE CODE
          
          </form>
        </Mutation>
        )}
// MORE CODE
```

* We can now use `createPost` in our form

## Use onSubmit for when form is submitted
```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {({ createPost }) => (
          <form onSubmit={}>

          // MORE CODE
          
          </form>
        </Mutation>
        )}
// MORE CODE
```

## Pass onSubmit arrow function
```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {({ createPost }) => (
          <form onSubmit={() => {}}>

          // MORE CODE
          
          </form>
        </Mutation>
        )}
// MORE CODE
```

* We pass an arrow functions so we can do multiple operations
    - Our first operation is to run createPost

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {({ createPost }) => (
          <form onSubmit={() => {
            createPost();
            }}>

          // MORE CODE
          
          </form>
        </Mutation>
        )}
// MORE CODE
```

## Promises Promises
* createPost returns a promise
* We can use `.then()` and `.catch()`

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {({ createPost }) => (
          <form
              onSubmit={event => {
                event.preventDefault();
                createPost()
                  .then(() => {
                    this.setState({
                      title: '',
                      body: '',
                    });
                  })
                  .catch(error => console.log(error));
              }}
            >

          // MORE CODE
          
          </form>
        </Mutation>
        )}
// MORE CODE
```

* Very important to prevent form from refreshing with `event.preventDefault()`

## Houston we have a problem - `createPost` is not a function error
* The Mutation and Query components are very similar
* But one jarring difference is unlike Query we are not pulling the `data`, `loading` and `error` from an overall object in a mutation

`Post.js`

```
// MORE CODE

{({ data, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

// MORE CODE
```

* With Query it comes with a whole bunch of stuff and we have to pull out what we want
* But Mutation is different in that it just gives us what we want, in this case it just gives us the function `createPost`
    - So instead of having an object inside of brackets like this:

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {({ createPost }) => (
          <form

// MORE CODE
```

* Instead we are just going to use a simple arrow function where we simply get the `createPost` function out of this

```
// MORE CODE

return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
        {createPost => (
          <form

// MORE CODE
```

### Final NewPost.js

```
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// components
// import PostForm from './PostForm';

export class NewPost extends Component {
  state = {
    title: '',
    body: '',
  };

  handleInput = event => {
    const formData = [];
    formData[event.target.name] = event.target.value;
    this.setState({
      ...formData,
    });
  };
  render() {
    const { title, body } = this.state;

    return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
          {createPost => (
            <form
              onSubmit={event => {
                event.preventDefault();
                createPost()
                  .then(() => {
                    this.setState({
                      title: '',
                      body: '',
                    });
                  })
                  .catch(error => console.log(error));
              }}
            >
              <input
                type="text"
                name="title"
                onChange={this.handleInput}
                value={title}
                placeholder="title"
              />
              <textarea
                type="text"
                name="body"
                onChange={this.handleInput}
                value={body}
                placeholder="body"
              />
              <button>Submit</button>
            </form>
          )}
        </Mutation>
        {/* <PostForm /> */}
      </div>
    );
  }
}

export default NewPost;

const NEW_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(data: { status: PUBLISHED, title: $title, body: $body }) {
      title
      body
      id
    }
  }
`;
```

## Next
* Put `PostForm.js` to use
* Separate `PostForm.js` from `Post.js` that way we can pass in the `createPost` function directly into PostForm and set up variables for this too


