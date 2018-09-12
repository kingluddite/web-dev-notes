# Update Local State From Mutations
* We will work on `PostForm` and `UpdatePost` components
* We want to pass in the `client` into the `PostForm`
    - Or maybe some event that takes place after the `PostForm`
    - Maybe it is a function or event
    - Or a post submit event

## Lots of choices
* But at end of day we want to toggle our `isEditMode` after we update our form

## Good news - The Mutation and Query give us access to the `client`
`UpdatePost.js`

```
// MORE CODE

export class UpdatePost extends Component {
  render() {
    const { post } = this.props;

    return (
      <Mutation mutation={UPDATE_POST}>
        {updatePost => <PostForm post={post} onSubmit={updatePost} />}
      </Mutation>
    );
  }
}

// MORE CODE
```

* Update it to look like this:

```
export class UpdatePost extends Component {
  render() {
    const { post } = this.props;

    return (
      <Mutation mutation={UPDATE_POST}>
        {updatePost => {
          return <PostForm post={post} onSubmit={updatePost} />;
        }}
      </Mutation>
    );
  }
}
```

* We are only utilizing the first return from this render prop
    - We also have access to the second argument which is the mutation `result`
        + Let's check out what `result` has inside it

```
export class UpdatePost extends Component {
  render() {
    const { post } = this.props;

    return (
      <Mutation mutation={UPDATE_POST}>
        {(updatePost, result) => {
          console.log(result);
          return <PostForm post={post} onSubmit={updatePost} />;
        }}
      </Mutation>
    );
  }
}
// MORE CODE
```

## Take it for a test drive
* We log and see we get a result object back
    - `data` undefined because we have not completed a mutation
    - We have no `error`
    - `loading` === false
    - `called` === false ... this has not been called yet, but if we call this mutation it will change `called` to true
    - `client`
        + Lots of stuff
        + Do we have access to `client.writeData`?
            * Yes

```
// MORE CODE

export class UpdatePost extends Component {
  render() {
    const { post } = this.props;

    return (
      <Mutation mutation={UPDATE_POST}>
        {(updatePost, result) => {
          const onSuccess = () =>
            result.client.writeData({ data: { isEditMode: false } });
          return <PostForm post={post} onSubmit={updatePost} />;
        }}
      </Mutation>
    );
  }
}

// MORE CODE
```

* Whenever we Update a post we know it will always be `false` so we can just writeData to our cache and set `isEditMode` to false
* We created a function and this function will wr`ite data to the cache
* Now we can pass `onSuccess` into our `PostForm` 

```
// MORE CODE

<Mutation mutation={UPDATE_POST}>
  {(updatePost, result) => {
    const onSuccess = () =>
      result.client.writeData({ data: { isEditMode: false } });
    return (
      <PostForm post={post} onSubmit={updatePost} onSuccess={onSuccess} />
    );
  }}
</Mutation>

// MORE CODE
```

* We should be able to call `onSuccess` every time we have a successful running of this form

`PostForm.js`

```
 // MORE CODE

export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    post: PropTypes.object,
  };

  static defaultProps = {
    post: {},
    onSuccess: () => null,
  };

// MORE CODE

  render() {
    const { onSubmit, onSuccess } = this.props;
    const { title, body, id } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit({
            variables: {
              title,
              body,
              id,
            },
          })
            .then(() => {
              onSuccess();
              this.setState({ title: '', body: '' });
            })
            .catch(error => console.log(error));
        }}
      >

      // MORE CODE

      </form>
    );
  }
}

export default PostForm;
```

## Test it out
* Toggle edit mode
* Make changes
* Save
* Edit mode converts to post mode
* But we have an error that says we can't call `setState` on an unmounted component

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
          id,
        },
      })
        .then(() => {
          onSuccess();
          this.setState({ title: '', body: '' });
        })
        .catch(error => console.log(error));
    }}
  >

// MORE CODE
```

* We need to get rid of `setState()`

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
          id,
        },
      })
        .then(() => {
          onSuccess();
        })
        .catch(error => console.log(error));
    }}
  >

// MORE CODE
```

* But when we create a new post won't that break things?
* Solution
    - We could create a new `onSuccess` function for our new PostForm and that `onSuccess` could be a reroute to the home page (history.push)

## The client is available in mutations and queries
* Let's look at a Query

`Post.js`

```
// MORE CODE

export class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => {

// MORE CODE
```

* We have in our render function `data` and `loading`
* **note** They are all part of one function `({ data, loading, error })`
* The mutation has a (function, result) but how is that different from a Query?
    - Because in a query we have `data`, `loading`... all this stuff and it is inside of an object
    - Well, it's not a lot different except for the fact that the client is just another one of these `{({ data, loading, client})`
    - In the mutations we have 2 arguments coming in here (one is mutation, the other is the result)
    - With Query, we just have the result returned (data, loading, error, status, refetch)

## Next - How to get persistant things where we are storing data in localStorage
* Pagination
* Optimistic UI
* Create 10 new posts (make and name them whatever)
