# Optimistic UI
* This is an advanced topic that will take time and practice to understand and even more time to master

## Illustrate what optimistic UI is
* We'll create a dummy toggle to easily visualize what optimistic UI is

## What is Optimistic UI?
* It is a way the application cache can just assume that the transaction made to the server was successful
* We manually read from and write to the cache

### Practical Example 
* Say you are on a low bandwidth network and you click a toggle button
* You expect the toggle to toggle immediately
* But that toggle is waiting for the DB to come back with response
    - That could be a long delay
    - That is a bad user experience

## GraphCMS
* We will go to Dashboard > Schema
* Drag and drop a Checkbox from Fields
* Name it `Check`
* GraphCMS will give this a No Data value by default for all existing records (that will probably return as a `false` value)

### Test it out in GraphCMS API Explorer
```
query allPosts {
  posts(orderBy: createdAt_DESC, first: 3) {
    id
    title
    body
    check
  }
}
```

* Output will be (check comes back as `null`)
```
{
  "data": {
    "posts": [
      {
        "id": "cjm06fpqnrr6z0940erfz5kuf",
        "title": "asdfas",
        "body": "sdfasdf",
        "check": null
      }
    ]
  }
}
```

* `null` will be as good as `false`

`queries/Post.graphql`

```
query post($id: ID!) {
  post(where: { id: $id }) {
    id
    title
    body
    check
  }
  isEditMode @client
}
```

`Post.js`

* **note** Make sure your checked property is on your checkbox input 

`<input type="checkbox" checked={post.checked} />`

* I used `value` instead of `checked` and it took me 30 minutes to troubleshoot this silly mistake :(

```
// MORE CODE

    <Fragment>
      <h1>{post.title}</h1>
      <input type="checkbox" checked={post.checked} />
    </Fragment>
  )}
</section>

// MORE CODE
```

* Click on list of posts and you will see single post page has an unchecked checkbox

## Create a mutation
* To update this to say checkbox is equal to checked
    - Two new fields we will get from Mutation
        + Optimistic Response
        + Update

`Post.js`

```
import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// components
import UpdatePost from './UpdatePost';
import EditMode from './EditMode';

// graphql
import POST_QUERY from '../queries/Post.graphql';

export class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          const { post, isEditMode } = data;
          return (
            <div>
              <EditMode isEditMode={isEditMode} />
              <section>
                {isEditMode ? (
                  <Fragment>
                    <h1>Edit Post</h1>
                    <UpdatePost post={post} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1>{post.title}</h1>
                    <Mutation
                      mutation={UPDATE_POST}
                      varaibles={{ id: post.id, check: post.check }}
                    >
                      {updatePost => (
                        <input
                          type="checkbox"
                          onChange={updatePost}
                          checked={post.checked}
                        />
                      )}
                    </Mutation>
                  </Fragment>
                )}
              </section>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Post;

const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $check: Boolean) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      title
      body
      id
      check
    }
  }
`;
```

## !null ----> true
* Try it out in the console and you'll see that !null is equal to true
* Checkboxes are initially `null` but if we check them again they will be `true`
* We can tie that into our code to toggle the value of `null` or `true` with:

`Post.js`

```
// MORE CODE

<Mutation
  mutation={UPDATE_POST}
  variables={{ id: post.id, check: !post.check }}
>

// MORE CODE
```

## Test the toggle
* The Network shows it is doing something
* But it is not working
* Restart Apollo to see cache
* We can look at query string
* My checkbox is not check (should be false) but then I check it and it should be true but apollo says it is false
* Nothing is happening? Why?
* Made a mistake

```
// MORE CODE

<input
  type="checkbox"
  onChange={updatePost}
  checked={post.checked}
/>
// MORE CODE
```

* That is the problem
* Should be `post.check`


```
// MORE CODE

<input
  type="checkbox"
  onChange={updatePost}
  checked={post.check}
/>
// MORE CODE
```

## The Online tab (only when Network tab is selected)
* This lets you throttle your Internet speed
* Change it to `Slow 3G`
* You will have to `re-simulate` the slow network

## It takes 4 seconds on slow internet
* You would expect it to work
* How can we update this cache faster and assume that the network is going to take care of it?

## Style checkbox so we can easily see it
`Post.js`

```
// MORE CODE

    {updatePost => (
      <input
        style={{ height: '100px' }}
        type="checkbox"
        onChange={updatePost}
        checked={post.check}
      />
    )}
  </Mutation>
</Fragment>

// MORE CODE
```

* That makes it look big

![big checkbox](https://i.imgur.com/fhUH1Hd.png)

## Time to make our checkbox update instantaneous
* Or as close to instantaneous as we can get

## optimisticResponse and update
* Two tough concepts
* Will be confusing

### What is optimisticResponse
* It is the response you would expect if this action succeeded
* The response will be an object so we put an object inside it

#### Test it out
* Set Network to Online speed
* Click checkbox and check out response in `Response` tab
* We get this:

```
{"data":{"updatePost":{title: "phil rocks", body: "sdfasdf", id: "cjm06fpqnrr6z0940erfz5kuf", "check":true, __typename:"Post"}}}
```

* This is almost the exact shape we are looking for
* The data is the optimistic response
    - Then we will have an object with an `updatePost` property
    - A check value
    - A __typename of `Post`
* And this is the response (`optimisticResponse`) we are expecting to get back from the server

## Update your GraphQL
`Post.js`

```
const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $check: Boolean) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      check
    }
  }
`;
```

* The only thing we care about is the check value so we removed the other fields

`Post.js`

```
// MORE CODE

<Fragment>
  <h1>{post.title}</h1>
  <Mutation
    mutation={UPDATE_POST}
    variables={{ id: post.id, check: !post.check }}
    optimisticResponse={{
      __typename: 'Mutation',
      updatePost: {
        __typename: 'Post',
        check: !post.check,
      },
    }}
  >

// MORE CODE
```

* If everything proceeded as expected we would expect that this mutation would return some data that looks just like above
    - updatePost.check === the opposite of what it currently is

## Test it out
* Things are broken
* Problem: We told it what the optimisticResponse was to be but we were not updating our query
* There is an issue with the cache because we haven't done the update yet
* We haven't told the query itself the cache that the info is actually coming in from, "don't forget that the post.check is actually coming in from a Query (The POST_QUERY up top"
    - So we need to tell this cache that the POST_QUERY has changed with some new data

`Post.js`

```
<Fragment>
  <h1>{post.title}</h1>
  <Mutation
    mutation={UPDATE_POST}
    variables={{ id: post.id, check: !post.check }}
    optimisticResponse={{
      __typename: 'Mutation',
      updatePost: {
        __typename: 'Post',
        check: !post.check,
      },
    }}
    update={(cache, { data: { updatePost } }) => {
      const data = cache.readQuery({
        query: POST_QUERY,
        variables: {
          id: post.id,
        },
      });
      data.post.check = updatePost.check;
      cache.writeQuery({
        query: POST_QUERY,
        data: {
          ...data,
          post: data.post,
        },
      });
    }}
  >
    {updatePost => (
      <input
        style={{ height: '100px' }}
        type="checkbox"
        onChange={updatePost}
        checked={post.check}
      />
    )}
  </Mutation>
</Fragment>
```

## Let's dive into the update part
* update takes a function `update={() => {}}`
* The first argument is the cache

```
    update={(cache) => {

    }}
>
```

* The second argument is the actual data coming out of here
* We'll code it like we saw in the console
    - We destructure `data`
    - We will pull out of data the actual optimisticResponse which is `updatePost` (that is the name of our mutation)

```
    update={(cache, { data: { updatePost }}) => {

    }}
>
```

* This would still work if you didn't have the optimisticResponse but it would be bringing in what the actual network response is
* But since we have an `optimisticResponse` it is coming in hot as `updatePost`
* We had `updatePost.check` and so we should be able to set the value in the cache to the optimisticResponse value (gets a bit trickier if you are working with an array of things!)
    - But we just have one item and just have to replace that one item in the object

## But how do we get to that?
1. First thing we need to do is grab a copy of the data from the cache itself

```
    update={(cache, { data: { updatePost }}) => {
      const data.cache.readQuery({
          query: POST_QUERY,
          variables: {
            id: post.id
          }
        })
    }}
>
```

* `readQuery()` is a method that allow you to paste in a query and actually get the data back
* The query we are updating is the POST_QUERY (we are not updating the Mutation UPDATE_POST)
    - We also have to include that Query's variables if they exist
    - POST_QUERY has an `id` variable so we need to use that from `post.id`

### Now we need to access the data from the post
* We grab the value of post in the cache we are currently reading
* But we need to set that value to the value of the updatePost optimisticResponse

```
    update={(cache, { data: { updatePost }}) => {
      const data.cache.readQuery({
          query: POST_QUERY,
          variables: {
            id: post.id
          }
        });
        data.post.check = updatePost.check;
    }}
>
```

### Write to the query

```
    update={(cache, { data: { updatePost }}) => {
      const data.cache.readQuery({
          query: POST_QUERY,
          variables: {
            id: post.id
          }
        });
        data.post.check = updatePost.check;
        cache.writeQuery({
          query: POST_QUERY,
          data: {
            ...data,
            post: data.post
          }
        })
    }}
>
```

* We are not saying what data goes into the query
    - Remember, the optimisticResponse data structure was that of the Mutation `updatePost`
    - Now that we are dealing with the data structure it is that of the Query QUERY_POST
        + This is the post as well as isEditMode (we must be mindful of the entire query structure)
        + We will grab all the data using `...data` then we set post equal to `data.post`

```
data: {
  ...data,
  post: data.post
}
```

* Grab all the `data` and then set `post` equal to `data.post` (which will have the updated `check` value, and won't touch the rest of our data so nothing else gets messed up)

## This is great
* No flashing
* Instantaneous
* This is an optimistic interface
* Look at the network tab and see the lightening fast POSTs
* **note** It gets even more trickier when you are modifying an item in an array

### Summary
* At the end of the day we have the `data` for the `query`
* We will modify those values
* Then we will write that data back into our `cache`
* And that is the key to update an `optimisticResponse`

## Next - Apollo Persistent Cache
