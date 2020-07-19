# Adding Comments
## Add types to add and remove comments
`actions/types.js`

```
// MORE CODE
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
```

## Import the types int our actions
`actions/post.js`

```
import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT, // add 
  REMOVE_COMMENT, // add
} from './types';

// MORE CODE
```

* Copy and paste the `addPost` to the bottom of `actions/post.js`

`post.js`

* When writing actions doublecheck your server route to make sure the `post` request is a `POST`

`routes/api/posts.js`

* We can see it was a POST request
* And if you scroll down in `posts.js` you'll also see we use a `DELETE` request to remove the comment

```
// MORE CODE

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Please add text").not().isEmpty()]],
  async (req, res) => {
    // error checking
    const errors = validationResult(req);

// MORE CODE
```

* **note** When we add a comment it sends back the comments array

`routes/api/posts.js`

```
// MORE CODE

      post.comments.unshift(newComment);

      // No need to save the post in a variable
      // But we do need to save it to our Database
      await post.save();

      // Send back all the comments
      res.json(post.comments); // we send back and array of comments
    } catch (err) {

// MORE CODE
```

* So in our actions we will dispatch the payload with `res.data` with the comments array

`actions/post.js`

```
// MORE CODE

dispatch({
      type: ADD_COMMENT,
      payload: res.data, // here is our comments array
    });
// MORE CODE
```

* Update the alert with "Comment Added"

`actions/post.js`

```
// MORE CODE

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert('Comment Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// MORE CODE
```

* And since we're here let's also do the `deleteComment` action as well
* No form data means no `config` with Headers to send
* The payload will be the commendId (so we know which one to remove in the state and within the UI)

`actions/post.js`

```
// MORE CODE
// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
```

## Now we go to our post reducer
### Add our types imports into the reducer
`reducers/post.js`

```
// add our types
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT, // add
  REMOVE_COMMENT, // add
} from '../actions/types';
// MORE CODE
```

* We will return our state
* We will only need to edit the post part (the single post - since this will be on the single post page)
    - We want to grab the state's post `...state.post` and we want to add to it all our comments and so we just set `comments` equal to `payload` (payload is all the comments)

`reducers/post.js`

```
// MORE CODE

case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
// MORE CODE
```

### And to remove a comment
* We return the state
* We need to filter out the comments
    - To do this:
        + We get the current stuff from the post `...state.post`
        + In comments we filter through `state.post.comments.filter(comment => {})`
            * And we want to filter out anything that is the comment with the specific `id`

```
// MORE CODE

case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false
      };
// MORE CODE
```

* In our reducer we want to filter out wherever `comment._id !== payload` because we want to bring in all the comments except that one because that was just deleted from the server and in turn we want to delete it from the state and the UI

## Now we'll create CommentForm component
`components/post/CommentForm.js`

* `rafcp`

`CommentForm.js`

```
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../action/post';

const CommentForm = ({ addComment }) => {
  return <div></div>;
};

CommentForm.propTypes = {};

export default connect(null, { addComment })(CommentForm);
```

* Copy from [theme](https://github.com/kingluddite/devconnector_html_theme/blob/master/post.html)

```
// MORE CODE

<div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
// MORE CODE
```

`CommentForm.js`

```
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../action/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment })(CommentForm);
```

## And add to our `Post.js`
* And we'll place this just below our `PostItem` component

`Post.js`

```
// MORE CODE

import CommentForm from './CommentForm'; // add
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to={`/posts`}>Back To Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  );
};

// MORE CODE
```

## Test in UI
* Log in and add a comment
* You won't see the comment added to the UI but make sure you see it in the Redux DevTools
    - Expand post > post > comments > 0 > and you'll see:
        + _id
        + text
        + name
        + avatar
        + user (id)
        + date

## Next - Display the comments
