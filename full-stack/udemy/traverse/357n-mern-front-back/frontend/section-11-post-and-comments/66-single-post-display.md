# Single Post Display
* Add new type GET_POST

`actions/types.js`

```
// MORE CODE

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST'; // add

// MORE CODE
```

## Deal with actions
* Copy getPosts and paste at the bottom

`actions/post.js`

* Make sure to import `GET_POST`

```
// MORE CODE

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// MORE CODE
```

## Add our Reducer
`reducers/post.js`

```
import {
  GET_POSTS,
  GET_POST, // add

// MORE CODE

case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
// MORE CODE
```

## Create a new folder in components called `post` (singular)
`Post.js`

```
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';

const Post = ({getPost, post: { post, loading}, match}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return <div>post</div>
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
```

## Add to App as a route
* Make sure to import it (make sure it is singular)

`App.js`

* The route is `posts/:id` (plural) and it links to `<Post />` singular

```
// MORE CODE

import Posts from './components/posts/Posts';
import Post from './components/post/Post'; // add

// MORE CODE

<PrivateRoute exact path="/posts" component={Posts} />
<PrivateRoute exact path="/posts/:id" component={Post} />

// MORE CODE
```

* But if we click on Discussion button it will take us to `post/` singular (let's change that for consistency)

`PostItem.js`

```
// MORE CODE

 <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
// MORE CODE
```

* To this: (just add an `s` to /post to make it `/posts/$_id}`)

```
// MORE CODE

 <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
// MORE CODE
```

* Now click on Discussion button in UI and it will take you to post/THEPOSTID and you will just see static text `post`
* In the Post component UI in state you will see `post` > `post` and inside you'll see the `text` and the text of the post
    - Now we have the data we can put inside our component

## Reusing a component
* We are going to reuse the PostItem component
    - We just want the comments but not the up votes or other buttons
    - But we'll add a prop to it called `showActions`
        + if `showActions` is true the extra stuff will show
        + If it's false they won't show
        + We'll have it true by default and we'll pass in false if we don't want it to show
    - We could create a whole new component but it's so similar we should just reuse it

`PostItem.js`

```
// MORE CODE

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/proflle/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={(e) => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
// MORE CODE
```

## defaultProps
* We want showActions to be true by default so we'll add `defaultProps`

`PostItem.js`

```
// MORE CODE

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
// MORE CODE
```

* **note** If you navigate from the PostItem page back to the Posts page they should look the same

## Single Post page
* We'll use the PostItem component but we'll pass in showActions false
* We want to make sure that the post has loaded first

`Post.js`

```
// MORE CODE

import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostItem post={post} showActions={false} />
    </Fragment>
  );
};
// MORE CODE
```

* Navigate to the single post page (click Discussion button) and you'll see the PostItem component without the likes and other buttons
    - We just used the same component but made it look different based on it's state

## Let's link back to posts
`Post.js`

```
import { Link } from 'react-router-dom';

// MORE CODE

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={`/posts`}>Back To Posts</Link>
      <PostItem post={post} showActions={false} />
    </Fragment>
// MORE CODE
```

## Next
* All comments on a post
* And a form tag to make a new comment on a post
