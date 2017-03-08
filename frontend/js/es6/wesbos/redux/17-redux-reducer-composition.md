# Redux Reducer Composition

## View React Tab
View `Comments` and you'll see [comments is an object](https://i.imgur.com/LN5eKSG.png) with all our **comments** and each **comment** is referenced with a `key` for that associated `post`

If you expand a **comment** `key` you will see an [array with all of the comments](https://i.imgur.com/XS6AART.png) that live inside of it

When we add a **comment**, we don't need to update the entire **comment** `state`, we just need to work on one specific `code`

## Reducer Composition
We split our `state` into two pieces

1. Our `Big State`

```
{
    posts
    comments
}
```

2. And we had a `reducer` for each of them

We are going to create another **sub reducer** that will handle the updating of just one of these specific **comment** pieces

[Read Redux Documenation](http://redux.js.org/)

## A slice of the state
We are going to have one **function** `comments()` that will handle the entire **function** `state` and we will have a **secondary function** called `postComments()` that will handle (_the slice of comments we talked about in the `slice of state` and that will handle the updates of the individual comments_)

### Currently our `client/reducers/comments.js` looks like:

```
function comments(state = [], action) {

  return state;
}

export default comments;
```

`[action.postId]` - We use square brackets `[]` so that the `key` of the object can be a variable

`[action.postId]: postComments(state[action.postId], action)`

* We pass the second argument `action` (_this is the entire action payload_)
    - This is us paying the sub piece of `state` `postComments[action.postId]`
        + Which will be one of these arrays of **comments**
    - And we want to give it the entire `action` and that is the `reducer` composition where it is wiping its hands of it here (_and saying some other function needs to take care of that individual one and I'll I'm concerned with is returned the entire comment state_)

## `postComments()`

```
function postComments(state = [], action) {
  switch(action.type) {
  case 'ADD_COMMENT':
    // return the new state with the new comment
    return [...state,{
      user: action.author,
      text: action.comment
    }];
  case 'REMOVE_COMMENT':
    return state;
  default:
    return state;
  }
  return state;
}
```

* We'll come back to the `REMOVE_COMMENT`
    + For now it will just return `state`
* ADD_COMMENT
    - We need to return the existing `state` plus the **new comment**
    - What does `state` need to be?
        + It will be an **array** `[]`
        + Take every item from the existing `state` `[...state,]` and it will apply it to this **new array** and then we will tack on our **new comment**
            * What is our **new comment**? (_this data comes off of Instagram_)
                - `user`: **action.author**
                - `text`: **action.comment**

## Test it out in browser
Enter user **name** and **comment** and immediately it will be added

### Add a few comments

### Problem
Remove text after filling out form and pressing `return` key

`client/components/Comments.js`

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
    // clear form after submission
    this.refs.commentForm.reset(); add this line
  }
```

We clear all forms with the default JavaScript `reset()` and by using the `refs` to get the value of all inputs we referenced and then we use the `commentForm` ref which is the ref we gave to the `form` itself

`  <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>`

### Test
Enter **author** and **comment** and press `return`. The **author/comment** are added and the input text fields are both cleared

## Removing a comment
We will add a test to make sure we know it's working

`client/reducers/comments.js`

```
case 'REMOVE_COMMENT':
    console.log('Removing a comment');
    return state;
```

### Hook our remove comment button to an action
`client/component/Comments.js`

**note** Using **React** tab we can search for `Comments` Component and see that `removeComment()` is listed under `Props` so we can do this...

#### React.createClass() vs ES6 class
When switching to **ES6 class** you run into `this` binding problems outside the `render()` method

**solution** - Create a variable holding the button

`client/components/Comments.js`

```
renderComment(comment, i) {
    const removeButton = <button className='remove-comment' onClick={this.props.removeComment.bind(null, this.props.params.postId, i)}>&times;</button>
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          {/* <button className="remove-comment" onClick={console.log(this)}>&times;</button> */}
          {removeButton}
        </p>
      </div>
    )
  }
```

* Need to bind `this` to the `renderComment(comment, i)` method

```
class Comments extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderComment = this.renderComment.bind(this); // add this line
  }
```

### Test in browser
Click on `x` in `Single` component page and you will see `Removing a comment` [appear in the console](https://i.imgur.com/cPkOMch.png)

That is just firing the test `console` string we created inside the `REMOVE_COMMENT` case inside `client/reducers.comment.js`

### Visualize
`['wow', 'neat', 'cool', 'nice']`

If we wanted to delete the third one

We would first take `['wow', 'neat', 'nice']` and then we would skip cool and then return everything until the end of the array

so it would take this array `['wow', 'neat', 'cool', 'nice']`

and then it would return the new `state` (_because we deleted a **comment**_)

`['wow', 'neat', 'nice']`

And that is what we did here:

```
case 'REMOVE_COMMENT':
    console.log('Removing a comment');
    // we need to return the new state without the deleted comment
    return [
      // from the start to the one we want to delete
      ...state.slice(0,action.i),
      // after the deleted one, to the end
      ...state.slice(action.i + 1)
    ]
    // return state; 
```

**note** We delete the `return state` at the end (I commented it out here) because we are returning a **new state**

After those changes, **refresh the page** (_because it is not a Component_)

### Test to see if you can delete the comments
It should work

We have `ADD_COMMENT`, `REMOVE_COMMENT`

* We might also add `EDIT_COMMENT` (_where we would return the modified state, you would replace the actual item with the new text_)
* You can have all types of different `actions` inside `client/reducers/comments.js` and your `reducer` is in charge of actually figuring out what to update and returning that update `state`

