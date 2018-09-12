# Update Mutations
## We are going to make an edit an add form page (2 for the price of 1!)
`Post.js`

```
// MORE CODE

<Query query={POST_QUERY} variables={{ id: match.params.id }}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    const { post } = data;
    return (
      <div>
        <section>
          <h1>{post.title}</h1>
        </section>
        <section>
          <h1>Edit Post</h1>
        </section>
      </div>
    );
  }}
</Query>

// MORE CODE
```

## Create new UpdatePost.js
```
import React, { Component } from 'react';

// components
import PostForm from './PostForm';

export class UpdatePost extends Component {
  render() {
    return <PostForm />;
  }
}

export default UpdatePost;
```

`Post.js`

```
// MORE CODE

// components
import UpdatePost from './UpdatePost';

export class Post extends Component {

    // MORE CODE

          return (
            <div>
              <section>
                <h1>{post.title}</h1>
              </section>
              <section>
                <h1>Edit Post</h1>
                <UpdatePost />
              </section>
            </div>
          );
        }}
      </Query>

// MORE CODE
```

## Test 
* You should see form
* We see both `Post` and `EditPost`
* When in Application state we can use apollo to determine if we should show the `Post` or `EditPost`

### Houston we have a problem
* But when you fill out the form you get the `onSubmit is not a function`
* The reason is we didn't pass `onSubmit` to UpdatePost
    - We could have used default props to automatically pass it
    - Let's do that now

#### Add prop-types
`PostForm.js`

```
// MORE CODE

import PropTypes from 'prop-types';

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { title: '', body: '' };

// MORE CODE
```

## Test
* Now we get a warning because `onSubmit` is required and we didn't pass it

## How do we id a post when we need to update it?
* Usually with an `_id`
* We have the `id` (GraphCMS uses `id`)

`Post.js`

```
// MORE CODE

return (
   <div>
     <section>
       <h1>{post.title}</h1>
     </section>
     <section>
       <h1>Edit Post</h1>
       <UpdatePost id={post.id} />
     </section>
   </div>
 );

// MORE CODE
```

## Mutation time
* We will need to import Mutation gql
* We will need to write a new GraphQL, name it and use it in our Mutation

## Practice in API Explorer
* Our form isn't working but this is a great way to test if our update mutation is working

```
mutation updatePost {
  updatePost(
    where: {id: "cjlvb9xtmjng80940rrulhz73"}, 
    data: {
      status: PUBLISHED, 
      title: "Updated Post", 
      body: "we updated it yo"}) {
    title
    body
    id
  }
}
```

* If you highlight over updatePost you will see it needs `data` and `where`
    - `data` is status, title, and body
    - `where` is `ID`
    - Documentation Explorer gives you this information

## Test it out
* You will see that when you hit execute play button and check your posts one of the posts with the matching `id` has been updated

## Ok our GraphQL update mutation works
* What do we do now?
* Plug it in to our UpdatePost

`UpdatePost.js`

```
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// components
import PostForm from './PostForm';

export class UpdatePost extends Component {
  render() {

    return (
      <Mutation mutation={UPDATE_POST}>
        {updatePost => <PostForm onSubmit={updatePost} />}
      </Mutation>
    );
  }
}

export default UpdatePost;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      title
      body
      id
    }
  }
`;
```

### Tip
`mutation updatePost($id: ID!, $title: String!, $body: String!) {`

* This line in our GraphQL is what the variables prop of our Query or Mutation is execting

## Pass in `id`, `title` and `body` into our post
* But we have a problem
* We want to do this but we don't have `id`

`PostForm`

```
// MORE CODE

render() {
  const { onSubmit } = this.props;
  const { title, body, id } = this.state; // where can we get `id` from???

return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
              id, // we don't have id???
            },
          })
            .then(() => {
              this.setState({ title: '', body: '' });
            })
            .catch(error => console.log(error));
        }}
      >
// MORE CODE
```

## Don't forget to add a default value for `id` in state
```
// MORE CODE

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { title: '', body: '', id: '' };

// MORE CODE
```

## Big Problem
* How the heck to we get the correct data in here when it exists and when it doesn't exist show an empty string
    - **note** We have access to `this.props` inside our state object
    - We only passed `<UpdatePost id={post.id} />` but we need to bring in the entire post like this `<UpdatePost post={post} />`

`Post.js`

```
// MORE CODE

<div>
  <section>
    <h1>{post.title}</h1>
  </section>
  <section>
    <h1>Edit Post</h1>
    <UpdatePost post={post} />
  </section>
</div>

// MORE CODE
```

## Now Pass that prop down into PostForm like this:

`UpdatePost.js`

```
// MORE CODE

export class UpdatePost extends Component {
  render() {
    const { post } = this.props; // add this

    return (
      <Mutation mutation={UPDATE_POST}>
        {updatePost => <PostForm post={post} onSubmit={updatePost} />}
      </Mutation>
    );
  }
}

// MORE CODE
```

* And we pass `post={post}` into PostForm
* Now we have access to `post` inside PostForm and we can do this which says store `id` in state if it exists and leave it blank if it does not

`PostForm.js`

```
// MORE CODE

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

    state = {
    title: this.props.post.title || '',
    body: this.props.post.body || '',
    id: this.props.post.id || '',
  };

// MORE CODE
```

* This is great because initial values will be set if they exist and will be blank if they are not
* Now when we are filling an update form with the current state values it will make one form for update or adding a post really simple to manage

## Test it out
* Now look at your form and it is being populated by the actual values in the GraphCMS DB
* It does reset the value in our DB
* Go in and refresh GraphCMS and check
* Form does clear after updating

## Houston we have a problem
* If you go to new post there is an error `cannot read property 'id' of undefined`

### Solution
* Set a default value for defaultProps
* We will set a defaultProps for `post` and set it to an empty object like this:

```
// MORE CODE

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.object,
  };

  static defaultProps = {
    post: {},
  };

// MORE CODE
```

* eslint may say `  post: PropTypes.object` is not in the shape of various data but that is not a major problem
* Form will work now for new posts and not generate an error
    - Because it is not looking for an id when we are creating a new post and it will it ignore that it exists

## We build a reusable form system

## Next - Application state
* Improve the UI
