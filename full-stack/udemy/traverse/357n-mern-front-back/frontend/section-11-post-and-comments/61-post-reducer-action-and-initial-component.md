# Post Reducer, Action & Initial Component
## Create a post reducer
`reducers/post.js`

* Since we created a reducer we need it into our combineReducers

`reducers/index.js`

```
// rootReducer
// 3rd party dependencies
import { combineReducers } from 'redux';
// custom reducers
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post'; // add 

export default combineReducers({
  alert,
  auth,
  profile,
  post, // add
});
```

## This is our Workflow for any new functionality to our app
* Whenever you add anything to your app (any other resources or functionality, you can:)
* This is the flow of Redux

1. Create a new reducer
2. Create a new actions file
3. And then the Components

## There will be lots of types that are needed for `post`
`reducers/post.js`

```
// add our types
import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};
```

* We get an error because we need to add our types

`actions/types.js`

```
// MORE CODE
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
export const GET_POSTS = 'GET_POSTS'; // add
export const POST_ERROR = 'POST_ERROR'; // add
```

`reducers/post.js`

```
// add our types
import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    default:
      return state;
  }
}
```

`actions/post.js`

```
import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR } from './types';

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
```

## Now in our components folder
* We'll create a folder called `posts`
    - **note** We'll also have a folder called `post` (singular)
* Snippet `rafcp`

`components/posts/Posts.js`

```
import React from 'react';
import PropTypes from 'prop-types';

const Posts = (props) => {
  return <div></div>;
};

Posts.propTypes = {};

export default Posts;
```

* We need `useEffect` (react hooks) because we need to call the `getPosts` action we just created
* We need to import `connect` because we will be adding 

`componsents/posts/Posts.js`

```
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/profile';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return <div>POSTS</div>;
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
```

* Add our Posts component route
    - It will be a `PrivateRoute` because you have to be logged in to see posts

`App.js`

```
// MORE CODE

import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';

// MORE CODE

<PrivateRoute
   exact
   path="/add-education"
   component={AddEducation}
 />
 <PrivateRoute exact path="/posts" component={Posts} />
 <Route exact path="/" render={null} />
 <Route component={NotFound} />
</Switch>

// MORE CODE
```

## Add the link to our auth navbar
`Navbar.js`

```
// MORE CODE

<li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <span className="hide-sm">Posts</span>
        </Link>
      </li>
// MORE CODE
```

* When logged in you will see `Posts` in navbar
* Click on it and you'll just see `Posts`
    - Use Redux DevTools State tab
    - I deleted the posts I created before using Postman so I'll create 2 more posts using
        + Use login to get token and paste token into Add post request route
        + Generate 2 posts so we can see the data
* Log out and Navbar Posts disappears

### View posts in state
* On the `localhost:3000/posts` page you should see State has `post` > `posts` and and array of objects which are your posts

![react-redux posts](https://i.imgur.com/bqoiVYc.png)

## Next - Create PostItem component
* That will represent each item that load from our posts array of objects
