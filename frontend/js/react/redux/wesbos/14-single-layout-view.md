# Single Photo Component
Building our single **layout view**

The user **clicks** on one of the **posts** and this page will load via the `router` and populate with all the **data** pertaining to that **single** `post`

## Where are we currently
We click on a `post` and we are taking to a page that says `I'm the single` and that is coming from our `Single` Component

`Single.js`

```
import React from 'react';

class Single extends React.Component {
  render() {
    return (
      <div className="single-photo">
        Single
      </div>
    )
  }
}

export default Single;
```

[`findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) - Fairly new to the browser
    * If it is an **older browser** we can use a **polyfil** to fill that in

`this.props.params.postId` - Gives us access to the value we see in the **URL** because it is provided to us via our `router` and this is the same number as the `code`

So when [`post.code`](https://i.imgur.com/0G4Lmfj.png) === [`this.props.params.postId`](https://i.imgur.com/72k6IHf.png) then we know we found a match which means we are on the **single** `post` page we need

### Console out the index
```
class Single extends React.Component {
  render() {
    const i = this.props.posts.findIndex((post) => post.code === this.props.params.postId );
    // show the index
    console.log(i);
    return (
      // index of the post
      // get us the post
      <div className="single-photo">
        Single
      </div>
    )
  }
}
```

Now when on the `posts` page and you **click** on any individual `post`, you will be taken to the `Single` page and that will [show you the `index` of that post](https://i.imgur.com/54DoPmK.png) in the list of `posts`. So the first `post` would be `index = 0` and the 10th post would be `index = 9`

## Now that we have the index of the post
We can use that to get the actual `post`

```
class Single extends React.Component {
  render() {
    const i = this.props.posts.findIndex((post) => post.code === this.props.params.postId );
    // show the index
    const post = this.props.posts[i];
    console.log(post);
    return (
      // index of the post
      // get us the post
      <div className="single-photo">
        Single
      </div>
    )
  }
}
```

That show us the [entire post data](https://i.imgur.com/XfRUQLs.png)

## Update the Single UI with the post
```
class Single extends React.Component {
  render() {
    // index of the post
    const i = this.props.posts.findIndex((post) => post.code === this.props.params.postId );
    // get us the post
    const post = this.props.posts[i];

    return (
      <div className="single-photo">
        <Photo post={post} {...this.props} />
      </div>
    )
  }
}
```

And now when on `posts` page, click any `post` and you will be taken to that individual `post`

## But likes doesn't work???
To get likes to work when you **click** on it in the `Single` and it will need the `index` of the `post`

```
return (
  <div className="single-photo">
    <Photo i={i} post={post} {...this.props} />
  </div>
)
```

**note** - We use `{...this.props)` - This will pass all `props` to the `Photo`

**note** We could cherry pick only the ones we need but here since we'll be using them all it's easier to pass them all on down from the `Single` Component to the `Photo` Component

## Add the comments to our team on the Single Component layout

### Create the Comments Component
`$ touch client/components/Comment.js`

`Comment.js`

```
import React from 'react';

class Comments extends React.Component {
  render() {
    return (
      <div className="comment">
        I'm the comments
      </div>
    )
  }
}

export default Comments;
```

### Import and Use the Comment Component inside the Single Component

`Single.js`

```
import React from 'react';
import Photo from './Photo';
import Comments from './Comments';

class Single extends React.Component {
  render() {
    // index of the post
    const i = this.props.posts.findIndex((post) => post.code === this.props.params.postId );
    // get us the post
    const post = this.props.posts[i];

    return (
      <div className="single-photo">
        <Photo i={i} post={post} {...this.props} />
        <Comments />
      </div>
    )
  }
}

export default Single;
```
