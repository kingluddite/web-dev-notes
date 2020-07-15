# Like & Unlike Functionality
* We'll create an action to like and and action to unlike
* In our server side route, it just returns the likes
    - We'll create a new type called `UPDATE_LIKES` and we'll want this to fire off whether we like or unlike a post

`actions/types.js`

```
// MORE CODE

export const UPDATE_LIKES = 'UPDATE_LIKES';

// MORE CODE
```

## addLike action
`actions/post.js`

```
// MORE CODE

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
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

## Remove Like
`actions/post.js`

```
// MORE CODE

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
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

## Now our likes reducer
* We return the state and in our posts we map through them all and wherever the post id is the same as the payload id (we found the post we are liking or unliking) then we bring all the post but update the likes to have the payload we sent it, or we just return the post untouched

`reducers/post.js`

```
// MORE CODE

import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from '../actions/types';

// MORE CODE

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    // MORE CODE

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    default:
      return state;
  }
}

// MORE CODE
```

* Recap:

1. We are going to map through the posts
2. We are going to say for each post check to see if it is the correct one (that matches the payload id)
3. If we have a match them we want to return the new state with all the new stuff that is in that post (we just want to manipulate the likes to the likes that are returned - whether it is an add like or remove like because remember they both just return an array of likes)
4. If it doesn't match the id then just return the regular post (do nothing)

## Now we have our Action and our Reducer
* We are now ready to implement this in our component
* **note** You are allowed to like your own stuff (YouTube allows you to do this)

`Posts.js`

```
// MORE CODE

<div className="posts">
        {posts && posts.map((post) => <PostItem key={post._id} post={post} />)}
      </div>
// MORE CODE
```

`PostItem.js`

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
        </p>
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
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type="button" className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
```

## Test in UI
* You should be able to like and remove your like
* You can not upvote twice

## Error
* I had this in my post reducer

```
// MORE CODE

case POST_ERROR:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
// MORE CODE
```

* I was getting an error when I upvoted something that I already upvoted or unliking
* This was the fix (put the payload in the errors)

```
// MORE CODE

case POST_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false,
      };
// MORE CODE
```

* Now the code works
    - Upvote twice and you'll see teh `POST_ERROR` action fired
    - Downvote twice and you'll see `POST_ERROR` also fired
    - But you can upvote (like) once
    - **note** In our server route request we sent back a 400 error if the user already liked the post (we did the same thin for unliking posts)

## Next - Delete our posts
