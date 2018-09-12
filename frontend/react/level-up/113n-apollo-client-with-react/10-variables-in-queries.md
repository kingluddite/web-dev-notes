# Variables in Queries
* Where does the `post` in `const { posts } = data` come from?
    - This variable in our object comes from here:

```
const POST_QUERY = gql`
  query post() {
   post(where: { id : $id }) {
     id
     title
     body
   }
  }
`;
```

* `post` doesn't come from the query name `query post()`, not the constant query name `POST_QUERY` but the query type itself `post(where: { id: $id })`

`Posts.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

export class Posts extends Component {
  render() {
    return (
      <ul>
        {/* How to write Apollo queries in React */}
        <Query query={POSTS_QUERY}>
          {({ data, loading }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error</div>;
            // console.log(data);
            const { posts } = data;
            return posts.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ));
          }}
        </Query>
      </ul>
    );
  }
}
```

`Post.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export class Post extends Component {
  render() {
    return (
      <Query query={POST_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          const { post } = data;
          return <h1>{post.title}</h1>;
        }}
      </Query>
    );
  }
}

export default Post;

// Writing our query
const POST_QUERY = gql`
  query post {
    post(where: { id: "cjlvb9xtmjng80940rrulhz73" }) {
      id
      title
      body
    }
  }
`;
```

## Test
* It works but now all of our blog posts links in Posts go to the exact same `id` because it is hardcoded into our GraphQL

```
// Writing our query
const POST_QUERY = gql`
  query post {
    post(where: { id: "cjlvb9xtmjng80940rrulhz73" }) {
      id
      title
      body
    }
  }
`;
```

## We need to work with variables
* **20 thousand dollar question** How do you get data from React into a GraphQL query?
    - We first allow our query to accept a value
    - We need to use temporary vessel variables
    - We need to use this:

```
// Writing our query
const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: "cjlvb9xtmjng80940rrulhz73" }) {
      id
      title
      body
    }
  }
`;
```

* Just get used to the `$` syntax it is what GraphQL uses
* We need to provide a type because GraphQL is a typed language
* `ID` is a type in GraphQL and we always need it for this query or else you would never be able to find a single record
* Since we need it it is required so we use `ID!`

```
// Writing our query
const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
  }
`;
```

* If you forget to `id: $id` than you will get an eror that `$id` was defined but not used

### How do we get the `id`?
* We need to grab it from the URL
* So we would use `this.props.match.params.id`
* In a Class based component we define the variables outside the return but inside the render function
* We will also need to pass our `Query` component a `variables` prop and that prop needs a value with an object

`Post.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query query={POST_QUERY} variables={{ id: match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error</div>;
          const { post } = data;
          return <h1>{post.title}</h1>;
        }}
      </Query>
    );
  }
}

export default Post;

// Writing our query
const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
    }
  }
`;
```

* Where does the `id:` come from?

```
variables={{ id: match.params.id }}>
```

* It comes from the `$id` but we just remove the `$`
## Test
* You now will see when you are on the home page
* Each link takes you to a different post

## Caching is good
* When you first visit links you see the quick loading screen
* But when you return the load is instantaneous
* That is because the data is remaining inside our cache and that is one of the huge benefits of using something like Apollo (because Apollo is fantastic at remembering your data and this is great because it prevents your queries from hitting the DB every single time)

## Review
* Remembering all these steps will take time but keep it simple
* Don't forget the top part

`query post($id: ID!)`

* You need the type and whether it is required
* This is how we pass in variables to our GraphQL queries
* The next part is the name of the query and we pass it an input and our dynamic variable

`post(where: { id: $id }) {`

1. First the query itself needs to accept a type
2. Then we need to use that type
3. But we also need to pass in that value into the Query itself 

```
Query query={POST_QUERY} variables={{ id: match.params.id }}>
// MORE CODE
```
