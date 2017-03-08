# Displaying Redux State inside our Components
Why does our `PhotoGrid` component have access to our `store` and all the stuff our `Main` component had access to?

`client/components/Main.js`

`{React.cloneElement(this.props.children, this.props)}`

Because we used the above line of code and that line passes the `props` down from `Main` to the first child

`PhotoGrid.js`

```
import React from 'react';
import { Link } from 'react-router';

class PhotoGrid extends React.Component {
  render() {
    return (
      <div className="photo-grid">
       {JSON.stringify(this.props.posts, null, ' ')}
      </div>
    )
  }
}

export default PhotoGrid;
```

That will output all our **data** (not in a nice readible way)

This will format the **data** (but how can we update our **UI**?)

```
<pre>
  {JSON.stringify(this.props.posts, null, ' ')}
</pre>
```

Not a good idea to loop over that data inside `PhotoGrid`, rather we should create our own Component to loop over it

## Create `Photo` Component `client/components/Photo.js`

```
import React from 'react';

class Photo extends React.Component {
  render() {
    return (
      <figure className="grid-figure">
        I am a photo!
      </figure>
    )
  }

}

export default Photo;
```

Then update `PhotoGrid`

`client/components/PhotoGrid.js`

```
import React from 'react';
import Photo from './Photo';

class PhotoGrid extends React.Component {
  render() {
    return (
      <div className="photo-grid">
          {this.props.posts.map((post, i) => <Photo />)}
      </div>
    )
  }
}

export default PhotoGrid;
```

That will output a nice list of photos

## Photo
Check Photo element inside the React console tab

* We have all the Photo elements but they don't have `props`, which means they don't have access to the photo we want
* **Does it have Props?** Nope
* **How can we pass down props to it?** Using ES6 spread
  - `<Photo {...this.props} />`

**note** We could just pass down what we need to `Photo` Component but in this case we'll just pass down all of them to `Photo`

`PhotoGrid.js`

```
class PhotoGrid extends React.Component {
  render() {
    return (
      <div className="photo-grid">
          {this.props.posts.map((post, i) => <Photo {...this.props} />)}
      </div>
    )
  }
}
```

* We need to give it a key (_all those **photos**, **React** has a hard time telling the difference between them so we need to give it a unique key, the `index` is a unique key that we can use_)
* We also have to pass an **index** value that goes along with our **unique key**. This seems strange because why can't we just use `key`? The reason is `key` is used in **React** and you can't actually access it once we're in the photo (you can't say `{this.props.key}`). So if you need the actual **index** of the element you have to pass it along like we just did there
* We need to say `post={post}` and that will pass down the specific information about that `post`

```js
class PhotoGrid extends React.Component {
  render() {
    return (
      <div className="photo-grid">
          {this.props.posts.map((post, i) => <Photo {...this.props}
            key={i}
            i={i}
            post={post} 
          />)}
      </div>
    )
  }
}
```

* Now view one of the `Photo` elements inside the **React** tab and you'll see the `index` and the `post` which has all the good info about each `post` that we will use in our `Photo` Component

```
import React from 'react';
import { Link } from 'react-router';

class Photo extends React.Component {
  render() {
    return (
      <figure className="grid-figure">
       <div className="grid-photo-wrap">
         <Link to={`/view/${post.code}`}>
           {post.caption}
         </Link>
       </div>
      </figure>
    )
  }

}

export default Photo;
```

## Error - post is not defined

## Use ES6 deconstructs to refactor

```
import React from 'react';
import { Link } from 'react-router';

class Photo extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <figure className="grid-figure">
       <div className="grid-photo-wrap">
         <Link to={`/view/${post.code}`}>
           {post.caption}
         </Link>
       </div>
      </figure>
    )
  }

}

export default Photo;
```

## Click one of the captions
You will be taken to the single page, the `route` update (check out the **URL**) and it is pointing to that unique post

Search for `PhotoGrid` in **React** tab of Chrome dev tools and click on link, then click back and forth and you'll see how the `PhotoGrid` Component and `Single` Component are getting swapped out and in

```
import React from 'react';
import { Link } from 'react-router';

class Photo extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <figure className="grid-figure">
       <div className="grid-photo-wrap">
         <Link to={`/view/${post.code}`}>
           <img src={post.display_src} alt={post.caption} className="grid-photo" />
         </Link>
       </div>
      </figure>
    )
  }

}

export default Photo;
```

## Add cool animation
```
import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Photo extends React.Component {
  render() {
    const { post, comments } = this.props;
    return (
      <figure className="grid-figure">
       <div className="grid-photo-wrap">
         <Link to={`/view/${post.code}`}>
           <img src={post.display_src} alt={post.caption} className="grid-photo" />
         </Link>

         <CSSTransitionGroup transitionName="like"
           transitionEnterTimeout={500}
           transitionLeaveTimeout={500}>
             <span key={post.likes} className="likes-heart">{post.likes}</span>
           </CSSTransitionGroup>
       </div>

       <figcaption>
         <p>{post.caption}</p>
         <div className="control-buttons">
           <button className="likes">&hearts; {post.likes}</button>
           <Link className="button" to={`/view/${post.code}`}>
             <span className="comment-count">
               <span className="speech-bubble"></span>
               {comments[post.code] ? comments[post.code].length : 0 }
             </span>
           </Link>
         </div>
       </figcaption>
      </figure>
    )
  }

}

export default Photo;
```

* We add `comments` to the **ES6 destructuring**
* Since we are using **animations** we import `CSSTransitionGroup` and add our `CSSTransitionGroup` element

```
<CSSTransitionGroup transitionName="like"
           transitionEnterTimeout={500}
           transitionLeaveTimeout={500}>
  <span key={post.likes} className="likes-heart">{post.likes}</span>
</CSSTransitionGroup>
```

## Show Comment number
`{comments[post.code] ? comments[post.code].length : 0 }`

* `comments` is an object so we can't show it, but we want to point to the `comments` for the particular `photo`
* If you click on a `post` you'll see the `URL` has a unique `code` (_that is `post.code`_) 
* By pointing to `comments[post.code]` we find the specific `comments` for that `photo` and we use the **ternary operator** to either get the `count` of all the comments (_by finding the length of the comments object_) or if there are no comments, **return 0**


