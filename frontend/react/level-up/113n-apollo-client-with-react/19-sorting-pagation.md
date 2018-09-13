# Sorting & Pagination
## API Explore in GraphCMS

```
{
  posts {
    title
    createdAt
  }
}
```

* createdAt comes baked in with Prisma and GraphCMS
* But you have to create it yourself in your own GraphQL server
    - You have to add this to your DB calls

## Sorting
* Will be API specific
* Hover over `posts` and you'll see the arguments
    - GraphQL uses `orderBy`
    - Click on it and you'll see all items you can sort by

```
{
  posts(orderBy: createdAt_DESC) {
    title
    createdAt
  }
}
```

* Whatever you are working with you have to analyze that API to decide how things will work in that API
* A benefit of Prisma and GraphCMS is they write stuff in their API for you otherwise you would have to write it yourself

## Limiting
* But GraphCMS has a strange name for this and it is `first`
* Give me 1st 3 records

```
{
  posts(orderBy: createdAt_DESC, first: 3) {
    title
    createdAt
  }
}
```

## skip
```
{
  posts(orderBy: createdAt_DESC, first: 3, skip: 3) {
    title
    createdAt
  }
}
```

## Update allPosts query
* I pulled these out into their own files
* I ejected from create react app
* Look ahead to `importing-graphql-files.md`

`/queries/Posts.graphql`

```
// MORE CODE
query allPosts {
  posts(orderBy: createdAt_DESC, first: 3) {
    id
    title
    body
  }
}

// MORE CODE
```

## Turn on list-style
`App.css`

```
// MORE CODE

.posts-listing {
  /* list-style: none; */
  padding: 0;
  margin: 2rem auto;
}

// MORE CODE
```

### Ordered list
* We'll see how many items we have

### Troubleshooting
* I was getting posts is not defined
* I logged out and back in to GraphCMS
* I converted to an ordered list
* I had a title missing in one of my posts (not sure how this could happen as I thought it was required??? - I just deleted that record
* I shut down console and opened it again
* I added `error` and logged out `data` and saw 3 posts inside an array so I knew it was now working

`Posts.js`

```
// MORE CODE

<ol className="posts-listing">
  {/* How to write Apollo queries in React */}
  <Query query={POSTS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;
      // console.log(data);
      const { posts } = data;
      return posts.map(post => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
      ));
    }}
  </Query>
</ol>

// MORE CODE
```

## Test
* You now should see 3 records in the browser

## Load More
* I want to create a Load More button
* When we click a button we will load more posts

### fetchMore
* We have access to this within our query
* It will run whenever we tell it to

## Modify our posts.map()
* Before

```
// MORE CODE

<Query query={POSTS_QUERY}>
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    // console.log(data);
    const { posts } = data;
    return posts.map(post => (
      <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </li>
    ));
  }}
</Query>

// MORE CODE
```

* After

```
// MORE CODE

<Query query={POSTS_QUERY}>
  {({ data, loading, error, fetchMore }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    // console.log(data);
    const { posts } = data;
    return (
      <Fragment>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
        <li>
          <button onClick={fetchMore}>Load More</button>
        </li>
      </Fragment>
    );
  }}
</Query>

// MORE CODE
```

* We have our posts and at the end we have a `Load More` button
* We are using fetchMore but it does nothing
* We are going to need to use `skip`
    - `skip` will come from React
    - Whenever something comes from react in GraphQL we will use the `$`

`/queries/Post.js`

```
query allPosts {
  posts(orderBy: createdAt_DESC, first: 3, skip: $skip) {
    id
    title
    body
  }
}
```

* But we need to define `$skip` and type it like this (it is not required):

```
query allPosts($skip: Int) {
  posts(orderBy: createdAt_DESC, first: 3, skip: $skip) {
    id
    title
    body
  }
}
```

* Right now there is no `$skip` passed in and that is fine, GraphQL will just ignore it

## Back to fetchMore
* We will use fetchMore as a function `fetchMore()`
* Since we are doing this we need to pass the onClick an arrow function
    - The reason we do this is so that `fetchMore()` doesn't automatically run
    - We will pass into `fetchMore` and object
        + This is a bit confusing but it takes some practice
        + We need to pass 2 variables
            * skip: 10
            * updateQuery will be equal to a function and this is where the magic happens
            * Apollo doesn't do everything for us and in this case we need to tell Apollo specifically what it needs to do when this new data comes in
                - When we click the `fetchMore` it should get the data
                - `(prev, { fetchMoreResult })`

```
// MORE CODE

<Fragment>
  {posts.map(post => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))}
  <li>
    <button onClick={() => fetchMore({
      variables: {
        skip: 10
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // if there is nothing else give us what
        // is already there
        if(!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          // inside this object will be what we
          // are actually assigning
          // remember posts is an array of all the posts
          posts: [...prev.posts, ...fetchMoreResult.posts]
        })
      }
    })}>Load More</button>
  </li>
</Fragment>

// MORE CODE
```

* What is this doing `posts: [...prev.posts, ...fetchMoreResult.posts]`
    - `posts` is going to be equal to a new array which is the old posts concatenated with the new posts

## Test it out
* We get more records when we click More button
* But we have same key errors and duplicate content
* We are telling it to skip 3 every time
* We are not telling it to skip 3 every time and then 3 more
* So this means the offset will always be the same
* We need a way to modify the `skip` value every single time

## But there is an easy way around that
* How can we start at the last item every single time
* We just need to know the length of the array like `posts.length`

```
// MORE CODE

<button
  onClick={() =>
    fetchMore({
      variables: {
        skip: posts.length,
      },

// MORE CODE
```

## Test it again
* Believe it or not we are now getting 3 posts everyhing time there are 3 more
* And at then end when there are no more, it stops
* **tips** You could use this on your blow, if you have a scroll with infinity loading, you could build an infinit loading blog
