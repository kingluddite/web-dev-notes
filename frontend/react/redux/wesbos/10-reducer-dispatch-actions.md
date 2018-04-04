# Understanding the Reducer's Job and Dispatching Actions
reducer does the editing of state

**note** You will see warnings from **eslint** saying `modules couldn't be hot updated` and that is because only Components can be hot reloaded. If you are editing some of your other logic in JavaScript you'll have to do a refresh to see the changes

`client/reducers/posts.js`

```js
export function posts(state = [], action) {
  console.log('The post will change');
  console.log(state, action);
  return state;
}

export default posts;
```

### View in browser
1. Clear console
2. Switch to React
3. Select Provider and expand `store` under `Props`
4. You will see `dispatch()` and that is what we will be using
5. Switch to console
6. Type `$r.store.dispatch()`

#### What do you dispatch?
An `action`

Inside the action `client/actions/actionCreators.js` you will see this function:

```js
export function increment(index) {
  return {
    type: 'INCREMENT_LIKES',
    index
  }
}
```

So what gets **dispatched** is just an **object** that looks like this:

```js
{
  type: 'INCREMENT_LIKES',
  index
}
```

## Manually recreate action
Instead of hooking it up in a button

1. Open **console**
2. Switch to **React** tab
3. Select `Provider`
4. Then switch to **console**
5. Type `$r.store.dispatch({type: 'INCREMENT_LIKES', index: 0})`

### What happens?

* We see `the post will change` (from inside `client/reducers/posts.js`)
* We log the entire `state` (a whole [bunch of Objects](https://i.imgur.com/6tnXToa.png))
* And the entire `action`
    - `$r.store.dispatch({type: 'INCREMENT_LIKES', index: 0})`
* We also see `comments.js` returning results from our **dispatch**

**note** Everytime your run/dispatch an action, every single `reducer` is going to run (_and whether you choose to act on that `action` or not is up to that `reducer`_)

We need to write logic into our `posts.js` reducer that says if it is one of the `actions` I am interested in (**'INCREMENT_LIKES'** for the posts reducer)
then do something, otherwise we are just going to return `state` and nothing is going to happen

**important** - Remember - Every `reducer` runs every time there is an `action` and whether something changes in `state` is up to you (_we will use a switch statement in order to handle all of the different action types_)

## Next Up - Seeing our UI update with actual stuff!
Viewing change in the **console** is cool but seeing stuff in the **UI** is more fun



