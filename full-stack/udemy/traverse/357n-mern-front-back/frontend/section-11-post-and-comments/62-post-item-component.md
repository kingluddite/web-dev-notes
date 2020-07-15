# Post Item Component
* We want to make sure our Post component is not `loading`

`Posts.js`

```
// MORE CODE

import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? <Spinner /> : <Fragment>test</Fragment>;
};
// MORE CODE
```

## Test in UI
* Login, Click on `Posts` link in navbar and you will see the Spinner on screen briefly (if you do, the Spinner is working as expected)

## Posts
`Posts.js`

```
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
// custom components
import PostItem from './PostItem';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large test-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      {/* PostForm HERE */}
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
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

## PostItem
`PostItem.js`

```
import React from 'react';
import PropTypes from 'prop-types';

const PostItem = (props) => {
  return (
    <div>
      <h1>PostItem</h1>
    </div>
  );
};

PostItem.propTypes = {};

export default PostItem;
```

* Navigate to your logged in posts and you will see 2 posts (just static text)

## More with PostItem
* We'll need to format time so we use react-moment
* We need to link to the particular post so we need Link
* We need to tap into state so we need connect from react-redux
* We will need mapStateToProps because we'll need to bring in the auth state because we need to tell who's who so the delete post button only shows up on posts where the post belongs to them (when they are logged in)

`PostItem.js`

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div>
      <h1>PostItem</h1>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
```

## Grab from our theme
* Use the `posts.html` [theme](https://github.com/kingluddite/devconnector_html_theme/blob/master/posts.html)

```
// MORE CODE

<div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
             <p class="post-date">
                Posted on 04/16/2019
            </p>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>4</span>
            </button>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <a href="post.html" class="btn btn-primary">
              Discussion <span class='comment-count'>2</span>
            </a>
            <button      
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
          </div>
        </div>

// MORE CODE
```

## Let's see what it looks like
`PostItem.js`

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img
            class="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h4>John Doe</h4>
        </a>
      </div>
      <div>
        <p class="my-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint possimus
          corporis sunt necessitatibus! Minus nesciunt soluta suscipit nobis.
          Amet accusamus distinctio cupiditate blanditiis dolor? Illo
          perferendis eveniet cum cupiditate aliquam?
        </p>
        <p class="post-date">Posted on 04/16/2019</p>
        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>
          <span>4</span>
        </button>
        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-down"></i>
        </button>
        <a href="post.html" class="btn btn-primary">
          Discussion <span class="comment-count">2</span>
        </a>
        <button type="button" class="btn btn-danger">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
```

* View and you'll see 2 posts

![two posts](https://i.imgur.com/vf129fm.png)

* **note** Sometimes when you change the code it errors but it's not an error, you need to log in again and click on Posts to see them

### Check if user is the user that owns the posts
```
// MORE CODE

{!auth.loading && user === auth.user._id && (
  <button type="button" class="btn btn-danger">
    <i className="fas fa-times"></i>
  </button>
)}
// MORE CODE
```

### Add a link to the post using a route with the id
```
// MORE CODE

<Link to={`/post/${_id}`} class="btn btn-primary">
          Discussion <span class="comment-count">{comments.length}</span>
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button type="button" class="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
// MORE CODE
```

## Check to make sure there are comments before we show the count of comments
```
// MORE CODE

<Link to={`/post/${_id}`} class="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
// MORE CODE
```

## Let's make likes only show a count if it is greater than 0
```
// MORE CODE

<button type="button" class="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          {likes.length > 0 && (
            <span>{likes.length}</span>
          )}
// MORE CODE
```

## Final PostItem
`PostItem.js`

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({
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
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button type="button" className="btn btn-light">
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
```

## Next
* Add functionality to like and unlike
