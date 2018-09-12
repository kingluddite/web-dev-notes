# Mutations as Prop Function
## Starting point

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

## Cut form from `NewPost` and past into `PostForm`

`NewPost`

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

`PostForm`

```
import React, { Component } from 'react';

export class PostForm extends Component {
  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          createPost()
            .then(() => {
              this.setState({ title: '', body: '' });
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
    );
  }
}

export default PostForm;
```

## Move all the `state` and `handleInput` to PostForm
* This will enable us to reuse whether this is an update or a create form

`PostForm.js`

```
import React, { Component } from 'react';

export class PostForm extends Component {
  state = { title: '', body: '' };

  handleInput = event => {
    const formData = [];
    formData[event.target.name] = event.target.value;
    this.setState({ ...formData });
  };

  render() {
    const { title, body } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          createPost()
            .then(() => {
              this.setState({ title: '', body: '' });
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
    );
  }
}

export default PostForm;
```

`NewPost.js`

```
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// components
// import PostForm from './PostForm';

export class NewPost extends Component {

  render() {

    return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
          {createPost => (

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

* We want to keep the Mutation component inside `NewPost`

## Comment in `PostForm`
* We used it before but to keep things simple and all in one file we commented it out

`NewPost.js`

```

// MORE CODE

// components
import PostForm from './PostForm';

export class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST} variables={{ title, body }}>
          {createPost => <PostForm />}
        </Mutation>
      </div>
    );
  }
}

// MORE CODE
```

## Add Prop on PostForm component
`NewPost`

```
// MORE CODE

<Mutation mutation={NEW_POST} variables={{ title, body }}>
  {createPost => <PostForm onSubmit={createPost} />}
</Mutation>

// MORE CODE
```

### What did we just do here?
* We defined our Mutation in a wrapper
* And we are passing the function for our `Mutation` down into the form component
    - This way all we would have to do to have an `UpdatePost` is to have another component that looks just like `NewPost` with an `UPDATE_POST` mutation rather than a `NEW_POST` mutation and then that could just be passed in the `onSubmit`
    - This gives us a generic component for our form that now instead of rendering an `onSubmit > createPost` we will run an `onSubmit={event => { onSubmit()`

## Pick up the onSubmit using props of `PostForm`

`PostForm.js`

```
// MORE CODE

export class PostForm extends Component {
  state = { title: '', body: '' };

  handleInput = event => {
    const formData = [];
    formData[event.target.name] = event.target.value;
    this.setState({ ...formData });
  };

  render() {
    const { onSubmit } = this.props;
    const { title, body } = this.state;

    return (

// MORE CODE
```

## Use `onSubmit` now
`PostForm.js`

```
// MORE CODE
export class PostForm extends Component {
  // MORE CODE

  render() {
    const { onSubmit } = this.props;
    const { title, body } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit()
            .then(() => {
              this.setState({ title: '', body: '' });
            })
        }}
      >

// MORE CODE
```

* **note** Do you have eslint setup to tell you about not having validation?
    - **best practice** You should have prop types and default props set up
    - They are not used here for the sake of brevity

## What did we just accomplish?
1. We created our Mutation
2. We have the function `createPost`
3. And we passed that function `createPost` into `PostForm`
    * PostForm doesn't care what that function is
    * All we are doing is submitting a function and setting the state of the form to empty
    * So whether this is a create or update function it is irrelevant
    * It's named `onSubmit` it's what the form is doing on submit

## Houston we have a problem
* We have an error that `title` and `body` are not defined in `NewPost`
* The reason is they are defined on the `state` of the child `PostForm`component
* `title` and `body` do not live in `NewPost` but yet we are passing them into the Mutation `variables` prop

### Temporarily remove the variables prop
* That will remove the error
* And give us back our form

### Test
* Fill out form and submit
* We get an error that obviously lets us know that `title` and `body` have yet to be defined

## Solution - Pass variables through the function of the `onSubmit` itself
* This turns `onSubmit` to a universal function that needs the same input
* But this won't work

`PostForm.js`

```
// MORE CODE

return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit({
          title,
          body,
        })

// MORE CODE
```

* We get the same error as before that `body` and `title` are not defined

## Try this:

`PostForm.js`

```
// MORE CODE

return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
            },
          })

// MORE CODE
```

* This makes sense since before we had a `variables` prop and now we need it again so that it works as it did before

## Final code
`NewPost.js`

```
import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// components
import PostForm from './PostForm';

export class NewPost extends Component {
  render() {
    return (
      <div>
        <h1>New Post</h1>
        <Mutation mutation={NEW_POST}>
          {createPost => <PostForm onSubmit={createPost} />}
        </Mutation>
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

`PostForm.js`

```
import React, { Component } from 'react';

export class PostForm extends Component {
  state = { title: '', body: '' };

  handleInput = event => {
    const formData = [];
    formData[event.target.name] = event.target.value;
    this.setState({ ...formData });
  };

  render() {
    const { onSubmit } = this.props;
    const { title, body } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
            },
          })
            .then(() => {
              this.setState({ title: '', body: '' });
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
    );
  }
}

export default PostForm;
```

## Next
* We will create an UPDATE_POST
    - We will have to do a query
    - Then we need to pass that data into a component for the mutation
    - This means we'll need both a Mutation component and a Query
