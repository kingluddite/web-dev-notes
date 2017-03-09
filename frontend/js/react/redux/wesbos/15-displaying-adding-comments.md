# Displaying and Adding Comments
## Passing Props down to Comments from Single
We need to find the `comments` for that `post`

### Destructure
`const { postId } = this.props.params;`

When we are using something twice, we should make a variable out of it to save us time from typing them all out all the time (_also keeps our code neater_)

`const postComments = this.props.comments[postId];`

That works but is not perfect because what if one post doesn't have `comments`?

Go to home page of **reduxtagram** and click on `lifewithsnickers` and you will see that we have logged `undefined`

We need to code this so that if there are `no comments`, we **return an empty array** (_and that will allow us to loop over nothing as well as when we do add our first `comment` to this post, we are able to push that `comment` onto that specific **array_**_)

```
import React from 'react';
import Photo from './Photo';
import Comments from './Comments';

class Single extends React.Component {
  render() {
    const { postId } = this.props.params;
    // index of the post
    const i = this.props.posts.findIndex((post) => post.code === postId );
    // get us the post
    const post = this.props.posts[i];
    // get comments for post
    const postComments = this.props.comments[postId] || [];
    console.log(postComments);
    return (
      <div className="single-photo">
        <Photo i={i} post={post} {...this.props} />
        <Comments postComments={postComments} />
      </div>
    )
  }
}

export default Single;
```

## Test to see if it is working
Open **React dev tools** and select the `Comments` Component and you will see [how many **comments** are associated with that **post**](https://i.imgur.com/pCoeBIG.png)

### Looping over comments
We need to loop over each of those **comments** and render it out

#### Two ways to do this
1) Create a `Comment` Component that will render out a single **comment** and renders out the **name**, the **hello** and the **close button**

2) Or you can use a `render()` function in **React**, which is you still stay inside the `Comments` Component but you just create another `render()` function (_with a different name then `render()`_)

**note** Inside **classes**, methods are NOT separated by **commas** (_but if you were using the old way of `React.createClass`, methods are separated by commas_)

```
import React from 'react';

class Comments extends React.Component {
  renderComment(comment, i) {
    return (
      console.log(comment, i)
    )
  }

  render() {
    return (
      <div className="comments">
        {this.props.postComments.map(this.renderComment)}
      </div>
    )
  }
}

export default Comments;
```

* We can use `postComments` because we passed it down through the `Comments` Component inside the `Single` Component (`Single.js`)

```
return (
      <div className="single-photo">
        <Photo i={i} post={post} {...this.props} />
        <Comments postComments={postComments} />
      </div>
    )
```

### renderComment()

```
renderComment(comment, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className="remove-comment">&times;</button>
        </p>
      </div>
    )
  }
```

As we loop through each **comment** we do the following to each one

### Add the form to post comments

```
render() {
    return (
      <div className="comments">
        {this.props.postComments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form">
          <input type="text" ref="author" placeholder="author" />
          <input type="text" ref="comment" placeholder="comment" />
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
```

### Our final Comments.js
```
import React from 'react';

class Comments extends React.Component {
  renderComment(comment, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className="remove-comment">&times;</button>
        </p>
      </div>
    )
  }

  render() {
    return (
      <div className="comments">
        {this.props.postComments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form">
          <input type="text" ref="author" placeholder="author" />
          <input type="text" ref="comment" placeholder="comment" />
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
}

export default Comments;
```

