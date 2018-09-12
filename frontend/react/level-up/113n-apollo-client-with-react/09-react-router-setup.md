## Install and import React Router DOM
`$ yarn add react-router-dom`

`App.js`

```
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// MORE CODE
```

* Wrap our app in Router
* We use `react-router-dom`'s switch to only show one route components at a time

## Set up so we have a route pointing to a single `post`

### Create Post component
* Use ES7 React snippets plugin for VS code
* Use `rce` + tab to quickly generate class based component

`src/Posts/Post.js`

```
import React, { Component } from 'react';

export class Post extends Component {
  render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
}

export default Post;
```

* Add Post route

```
// MORE CODE
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// MORE CODE

// components
import Post from './Posts/Post'; // add this

// MORE CODE

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;

// MORE CODE

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>

            <Switch>
              <Route path="/post/:id" component={Post} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;

// MORE CODE
```

## Test in browser
You will see

```
Hi
Intro Video
```

* We get a warning on `unique "key`

## Create Posts.js
`Posts.js`

```
import React, { Component } from 'react';

export class Posts extends Component {
  render() {
    return (
      <div>
        {/* How to write Apollo queries in React */}
        <Query query={POSTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error</div>;
            // console.lg(data);
            const { posts } = data;
            return posts.map(post => <h1>{post.title}</h1>);
          }}
        </Query>
      </div>
    );
  }
}

export default Posts;
```

* But now we get warnings on `Query` and `POSTS_QUERY` not defined

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export class Posts extends Component {
  render() {
    return (
      <div>
        {/* How to write Apollo queries in React */}
        <Query query={POSTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error</div>;
            // console.lg(data);
            const { posts } = data;
            return posts.map(post => <h1>{post.title}</h1>);
          }}
        </Query>
      </div>
    );
  }
}

export default Posts;

const POSTS_QUERY = gql`
  query allPosts {
    posts {
      id
      title
      body
    }
  }
`;
```

* Usually GraphQL are at bottom or in their own graphql file
* We need to move import of `gql`, `Query`, and the actual `Query` to this page

`App.js`

```
import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

// components
import Post from './Posts/Post';
import Posts from './Posts/Posts';

const client = new ApolloClient({
  uri: 'https://api-uswest.graphcms.com/v1/cjlvat5yu2e8001f853x10qgj/master',
});

// client
//   .query({
//     query: testQuery,
//   })
//   .then(res => console.log(res));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>

            <Switch>
              <Route path="/" exact component={Posts} />
              <Route path="/post/:id" component={Post} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
```

* We add a home route
* We now have 2 working routes
    - http://localhost:3000/
    - http://localhost:3000/post/123

## Link single post to an actual route
* We will grab the `id` and not a hardcoded fictional `id`
* Then we can use that query to grab the rest of the information about the post
* We'll add a `Link` to the Posts component and when that link is clicked it will have the `id` in the link url so that when it is clicked it will go to that single `Post` page

`Posts.js`

```
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

export class Posts extends Component {
  render() {
    return (
      <div>
        {/* How to write Apollo queries in React */}
        <Query query={POSTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            // if (error) return <div>Error</div>;
            // console.lg(data);
            const { posts } = data;
            return posts.map(post => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                {post.title}
              </Link>
            ));
          }}
        </Query>
      </div>
    );
  }
}
// MORE CODE
```

* Now you will see a link on the home page
* Click and you will be taken to a new page with a long ID in the URL

## Next
* We will use GraphQL that we wrote to get a particular `id`
* How to get variables from a variable in React into a variable in our GraphQL query and from that we'll be able to get the individual post data directly in your app 
