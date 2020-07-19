# Comment Display & Delete
* We'll want to loop through our comments
* We'll loop through and output `CommentItem` component

`Post.js`

```
// MORE CODE

<CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>

// MORE CODE
```

`CommentItem.js`

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const CommentItem = ({
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  return <div></div>;
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CommentItem);
```

* Grab [from theme](https://github.com/kingluddite/devconnector_html_theme/blob/master/post.html)

`CommentItem.js`

```
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const CommentItem = ({
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CommentItem);
```

## Test in UI
* Does it show up?
* If it did it should look like this:

![comment showing up](https://i.imgur.com/1GDJMIo.png)

## Delete a comment
* We already created the action

### Misc
* Remove `res` from deleteComment

`actions/post.js`

```
// MORE CODE

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
// MORE CODE
```

* Remove `Fragment` import from `CommentItem.js`
