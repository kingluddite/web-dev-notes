# Updating State in our Store

## Current state of our Comments form
If we want to add a **comment** and enter an **author** and a **comment**, we'll see that it does nothing because it is not hooked up to anything

`client/components/Comments.js`

### Add our handler
When we **submit** the **comments** form (_pressing `enter`_) call the `handleSubmit` event handler method

`<form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>`

### Define the handleSubmit event handler
#### And test that it is working
Type stuff in fields and hit `enter`

```
handleSubmit(e) {
 e.preventDefault();
 console.log(`${e} is the event and handleEvent was triggered`);
}
```

**note** When you **submit** any type of event the browser will pass you the `event` object. We collect the **event object** by passing the traditional `e` argument to the `handleSubmit(e)` method

**note** We use `e.preventDefault()` to keep the page from automatically refreshing after we submit the form

### View in browser
Enter something in the fields and hit the `enter` key and you should see the following in your console:

`[object Object] is the event object and handleEvent() was triggered`

### Get the text out of the input
The user entered their **name** and **comment** and we need to grab those field values. That is why we previously gave the input fields `ref` props

**note** When you want to reference a **DOM** element in **React** (generally in **React** you don't reference **DOM** elements, you just change the **data** and **React** will update the **DOM** for you) but when you actually need to get **data** out of input fields one way to do that is to use `ref`

### Look at our refs
```
<input type="text" ref="author" placeholder="author" />
<input type="text" ref="comment" placeholder="comment" />
```

#### Test for our refs
```js
handleSubmit(e) {
    e.preventDefault();
    console.log(`${e} is the event object and handleEvent() was triggered`);
    console.log(this.refs);
}
```

* Test in browser, enter author and comment in form fields and press `enter` key and you will get and Error `Cannot read property 'refs' of null`

## bind this to Component
Outside of render inside **ES6 classes**, we need to specifically bind `this` to the Component. We do that by doing this (and this gets rid of that previous error):

```js
class Comments extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // MORE CODE
}
```

### View in browser and [you will see this](https://i.imgur.com/ScjFAfl.png)

### Grab the postId, the author and the comment
`Comments.js`

```
handleSubmit(e) {
    e.preventDefault();
    // console.log(`${e} is the event object and handleEvent() was triggered`);
    // console.log(this.refs);
    // ES6 destructuring
    const { postId } = this.props.params;
    console.log(postId);
    // grab the author value (that the user typed into form)
    const author = this.refs.author.value;
    console.log(author);
    // grab the comments value
    const comment = this.refs.comment.value;
    console.log(comment);
  }
```

### We get an error that `postId` is not defined

### Troubleshooting
Why is `postId` not defined?

Look at the **React** tab and search for `Comments` and you will see there is no `postId`. We need to pass `postId` down from our `Single` Component. We could just grab the `postId` or we could pass all the `props` down with `{...this.props}`

`Single.js`

```
<Comments postComments={postComments} {...this.props}/>
```

Now view the **React** tab again and search for `Comments` and you'll see we now have access to `params` and inside that `postId`

### Test in browser
Refresh the browser and enter an **author** and a **comment** and press `return` key. You will see the **author**, **comment** and **postId** are now displayed in the **console**

### What do I do with `postId`, `author` and `comment` now that I have it?

#### What are we using to update our `state`?
A reducer

Open `client/reducers/comments.js` and `client/actions/actionCreators.js`

`actionCreators.js`

```
// add comment
export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}
```

This is the **function** that will run and will create an `action` (`it will dispatch the actual action`)

It needs a `postId`, the `author` and the `comment` (all of which we now have!)

### Do we have access the the `addComment()` method inside `actionCreators.js`?
Yes. We know because when we use the React tab and search for `Comments` we can see `addComment()` under `Props` [addComments](https://i.imgur.com/1fr3cPC.png)

`Comments.js`

```
handleSubmit(e) {
    e.preventDefault();
    // ES6 destructuring
    const { postId } = this.props.params;
    // grab the author value (that the user typed into form)
    const author = this.refs.author.value;
    // grab the comments value
    const comment = this.refs.comment.value;
    this.props.addComment(postId, author, comment);
  }
```

`actionCreators.js`

```
// add comment
export function addComment(postId, author, comment) {
  console.log('Dispatching add comment');
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}
```

**Refresh the page** and enter author and comments and hit `enter` and you will see

`Dispatching add comment` in **console**

We can remove that **comment**

```
// add comment
export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  }
}
```

### What's next?
Updating our `reducer`

`client/reducers/comments.js`

```
function comments(state = [], action) {

  return state;
}

export default comments;
```

