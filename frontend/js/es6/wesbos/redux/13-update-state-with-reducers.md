# Updating State with Reducer
When someone clicks `Like` button, we need to call `increment()`

## Add `i` for index to destructured ES6

`const { post, comments, i } = this.props;`

Then we add **onClick** handler with:

`<button onClick={this.props.increment(i)} className="likes">&hearts; {post.likes}</button>`

But that will run on page load (which is not what we want)

### Couple ways to pass an argument to a function on click

`<button onClick={this.props.increment.bind(null, i)} className="likes">&hearts; {post.likes}</button>`

## .bind(null, then pass the first parameter as the second one here)
Pass `null` as the first argument because React does all the binding for us

`<button onClick={this.props.increment.bind(null, i)} className="likes">&hearts; {post.likes}</button>`

## Click one Photo
You will see `The post will change`

### What happened?

All of our `reducers` are now running. We just created an `action` that just got fired off (aka `dispatched` in **Redux**) and now we need to open up our `posts` **reducer** and start handling the `increment()` of the `like`

`client/reducers/posts.js`

**In Redux we using functional programming**

This means **we do not mutate our state** and we use what is called '**pure functions**'

```js
function posts(state = [], action) {
  console.log('The post will change');
  console.log(state, action);
  return state;
}

export default posts;
```

You would think all we would have to do to `increment` our **likes** would be:

```
function posts(state = [], action) {
    state[action.i].likes++;
    return state;
}

export default posts;
```

But we do not want to do that because we are simply mutating something that is outside of this individual function (and that is not a pure function)

### pure function
A pure function is a predictable function

#### Example:

```
console.clear();

function addLike(picture) {
    picture.likes++;
    console.log(picture);
    return picture;
}

var post = { name : 'A cool picture', likes: 10};

addLike(post);
```

So everytime we'd pass `addLike` with `10 likes` it should always return `11` likes

**That is a pure function**

This makes it easier for testing, as well as open up the whole world of **Redux dev tools** and **time travel** and all this great stuff

## What is an impure function
```
console.clear();

function addLike(picture) {
    picture.likes++;
    console.log(picture);
    return picture;
}

var post = { name : 'A cool picture', likes: 10};

addLike(post);
addLike(post);
addLike(post);
```

We call the function three times with same post but every time we call it we get a different result `11, 12, 13`

And that is what makes it an **impure** function

## How do we fix this?
1. We take a copy of the object (_or array_)
2. We modify it
3. Then we return the new state

We don't modify the old state

## Here's how we fix our impure function and make it pure
```js
console.clear();

function addLike(picture) {
  // we take a copy
    // object spread ES6 way
  //var pic = {...picture};
  // here is the old way
    // take an empty object and applying each of the properties onto this
    // blank object
  var pic = Object.assign({}, picture);
  // then we increment the likes
  pic.likes++;
  console.log(pic);
  // then we return it
  return picture;
}

var post = { name: 'A cool picture', likes: 10};

addLike(post);
addLike(post);
addLike(post);
```

That will give us `11`, `11`, `11`. We now have a pure function!

## Update our posts reducer

`posts.js`

```
function posts(state = [], action) {
  switch(action.type) {
    case 'INCREMENT_LIKES' :
    // return the updated state
    default:
      return state;
  }
}

export default posts;
```

### Why did we do this?
All `reducers` always run for every single one and if we are not acting on that specific one (_like the comments reducer will run but if it doesn't care about INCREMENT_LIKES then it will just return the default `state` and not do anything_)

## Remove `console.log()` from `comments.js` reducer
To keep our console nice and clean

### Click likes
And you'll see `incrementing likes` increase by one in the console every time you click it

### Now update the `state`
* We want to return our entire `posts` array but only change one of them with the like
* We could do that with `array.concat()` and take a copy of the array and return it but we are using **ES6 spread**, which will do the exact same thing

```
return [
  ...state.slice(0, i), // everything before the one we are updating
  {..state[i], likes: state[i].likes + 1}, 
  ...state.slice(i + 1), // everything after the one we are updating
]
```

* `slice()` from `0` to wherever the `i` (_index_) is
* Use spread to make a copy (_the 1st line and 3rd line are references but this line is making a new copy_)
* `slice()` after

1. When we make a copy
2. When we click one of the **likes**, we want to **copy that object** `{...state[i]}` and that will take everything but we also want to tack on the new number of likes `likes: state[i].likes + 1`

`{..state[i], likes: state[i].likes + 1},`

If you click it won't update the **likes** because it won't **hot reload** things that are not Components so you need to give it a quick **browser refresh**

## i is not defined error
We need to add `const i = action.index;` - Because we sent over that `index` value

```
function posts(state = [], action) {
  switch(action.type) {
    case 'INCREMENT_LIKES' :
      console.log('incrementing likes');
      const i = action.index;
    // return the updated state
    return [
        ...state.slice(0, i), // everything before the one we are updating
        {...state[i], likes: state[i].likes + 1},
        ...state.slice(i + 1), // everything after the one we are updating
    ]
    default:
      return state;
  }
}

export default posts;
```

Give it a **page refresh**. Click to like an image and it will **increment**!

And we get the animated Like!
