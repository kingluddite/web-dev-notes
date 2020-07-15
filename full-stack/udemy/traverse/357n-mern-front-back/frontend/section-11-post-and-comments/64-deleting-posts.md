# Deleting Posts
* **note** If you don't have any posts add them with postman

## Add new type
`actions/types.js`

```
// MORE CODE

export const DELETE_POST = 'DELETE_POST';

// MORE CODE
```

## Add our deletePost action
`actions/post.js`

* We send the `id` for the payload so that in the reducer how to filter out the post that got deleted from the UI
* Import `DELETE_POST`

```
// MORE CODE

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// MORE CODE
```

## In the reducer we want to filter out the post that got deleted
`reducers.js`

* **remember** The `payload` is just the `id` (we are returning all posts except the one that returns in our check because we are using `filter()` array method)
* Once we find the matching `id` we immediately remove that from the UI

```
// add our types
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST, // add
} from '../actions/types';

// MORE CODE

case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false
      };
// MORE CODE
```

## Add the action to our component
* Import `deletePost`
* Destructure `deletePost`
* Add deletePost to PropTypes

`PostItem.js`

```
// MORE CODE

import { addLike, removeLike, deletePost } from '../../actions/post'; // update

const PostItem = ({
  addLike,
  removeLike,
  deletePost, // add
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (

    // MORE CODE

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deletePost(_id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {

  // MORE CODE

  deletePost: PropTypes.func.isRequired, // add
};

// MORE CODE

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
```

## Test in UI
* You should now be able to delete a post
    - Actions in Redux DevTools
        + DELETE_POST
        + SET_ALERT
        + REMOVE_ALERT
* To test it out you could remove the logic that shows the delete button only if the user is logged in and owns that button
    - If removed and you tried to delete a post that is not yours you would still get an error that you are not authorized (we made this the rule in our server route - we protected this route on the backend)

## Next - Create a post
* We'll need to add an action for that
* We'll need to handle it in the reducer
* We'll need a new component to accomplish adding a new post using the UI
