# Improve UI
* We will not use styled components

`App.css`

* Delete of App, App-logo
* Delete servicesworker stuff
* Delete test file

`App.js`
* delete the image pointing to svg and its import
* Wrap switch in `<main>`

```
// MORE CODE

 <main>
  <Switch>
    <Route path="/" exact component={Posts} />
    <Route path="/post/new" component={NewPostForm} />
    <Route path="/post/:id" component={Post} />
  </Switch>
</main>

// MORE CODE
```

`App.css`

```
.App-header {
  background-color: #524763;
  padding: 20px;
  text-align: center;
}

.App-header a {
  color: #fff;
  text-decoration: none;
}

.App-title {
  font-size: 1.5em;
}

.App-intro {
  font-size: large;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

main {
  width: 90%;
  margin: 1rem auto;
}

.posts-listing {
  list-style: none;
  padding: 0;
  margin: 2rem auto;
}

.posts-listing li {
  margin-bottom: 2rem;
  font-size: 1.6rem;
}

.button {
  text-decoration: none;
  background: #524763;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
}

input,
textarea {
  width: 100%;
  margin-bottom: 1rem;
}

input {
  font-size: 1.6rem;
}

textarea {
  font-size: 1.2rem;
  height: 50vh;
}
```

* PostForm add a class of `button` to the button

`Posts.js`

```
// MORE CODE

import React, { Component, Fragment } from 'react';

export class Posts extends Component {
  render() {
    return (
      <Fragment>
        <Link className="button" to={'/post/new'}>
          New Post
        </Link>
        <ul className="posts-listing">
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
      </Fragment>
    );
  }
}

export default Posts;

// MORE CODE
```
