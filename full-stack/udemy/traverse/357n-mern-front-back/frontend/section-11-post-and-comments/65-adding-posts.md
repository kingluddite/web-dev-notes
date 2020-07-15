# Adding Posts
`actions/types.js`

```
// MORE CODE

export const ADD_POST = 'ADD_POST';
// MORE CODE
```

## Adding the addPost action
* It will take in formData
    - So in our post we'll pass in our formData and our config
* Since we are sending data we have to send Headers (we can do this building a config object)
* **MODERN DEV TIP** Just use backticks all the time
* `payload` is the data we get back so `res.data`
 
`actions/post.js`

```
// MORE CODE

  ADD_POST, // add
} from './types';

// MORE CODE

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
```

## Add our Reducers
* We make a copy of our current array `...state.posts` and just add our new post `payload`

```
// add our types
import {
  // MORE CODE

  ADD_POST, // add
  DELETE_POST,
} from '../actions/types';

// MORE CODE

case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };
// MORE CODE
```

* Above will return the posts down to our components
    - Any component that uses the `posts` part of the state it is going to return that down with the new post

## Create a new component called PostForm
`components/posts/PostForm.js`

* We won't use formData for this and just use a string

## Theme
* Grab the [theme](https://github.com/kingluddite/devconnector_html_theme/blob/master/posts.html) from posts.html
* We grab the `post-form` fragment

`posts.html`

```
// MORE CODE

<div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
// MORE CODE
```

`PostForm.js`

```
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text }); // add the form data
          setText(''); // clear the form
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
```

* Now we'll replace the `POSTFORM comment` ({/* PostForm HERE */}) in `Posts.js` with our form
* Make sure to import it

`Posts.js`

```
// MORE CODE

{/* PostForm HERE */}
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
// MORE CODE
```

## Test in UI
* Log in and navigate to posts and Add a post and you should see it added to the page

### Slight problem
* The post is showing up last and we want it to be first
* Just make this small change and make the payload come BEFORE the array state of posts

```
// MORE CODE

case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
// MORE CODE
```

* Delete last post and create another post and you'll see your latest posts are on top

## Update avatar to link
* Currently links to hard coded html page `profile.html`
* Let's update that to link to the user's profile
* Old

`PostItem.js`

```
// MORE CODE

<div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
// MORE CODE
```

* To this:

```
// MORE CODE

<div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/proflle/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
// MORE CODE
```

* Click on the avatars in the ProfileItem page and it will take you to the user's profile page

## Next
* Take to single post page where we deal with the discussion



