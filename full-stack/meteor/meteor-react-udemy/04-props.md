# Fun with Props

![Props illustration](https://i.imgur.com/gaVgBsj.png)

In React passing some amount of data from a parent component to a child component is referred to as `Props` (short for properties)

This is what we did:

`<ImageDetail image={image}/>`

Inside this:

```
const RenderedImages = IMAGES.map(function(image) {
      return <ImageDetail image={image}/>
  });
```

* I am passing the `image` object as a `prop` (aka property) to ImageDetail. This prop is called `image`
* This is one-dimensional communication. We are passing information down into ImageDetail
    - The second part of this is we have to somehow receive this data inside the `ImageDetail` component inside the `ImageDetail.js` file

`ImageDetail.js`

* Whenever props are passed into a Component the component gets an argument to the function

`const ImageDetail = (props) => {`

* Now if I make reference to `props.image` inside the function, that is the image object
    - which means I can now make the following references
        + props.image.title
        + props.image.link

```
import React from 'react';

const ImageDetail = (props) => {
  // props.image => this is the image object
  // props.image.title
  // props.image.link

  return (
    <div>
      {props.image.title}
    </div>
  )
}

export default ImageDetail;
```

### View in browser
```
Pen
Skateboard
Dog
```

**note** We used this: `image={image}`
* `image` and `{image}` do not have to have the same name

So if we used that name, our code would change as follows:

```
import React from 'react';
import ImageDetail from './ImageDetail';

const IMAGES = [
  { title: 'Pen', link: 'https://dummyimage.com/600x400' },
  { title: 'Skateboard', link: 'https://dummyimage.com/600x400' },
  { title: 'Dog', link: 'https://dummyimage.com/600x400' }
];

const ImageList = () => {
  const RenderedImages = IMAGES.map(function(image) {
      return <ImageDetail picture={image}/>
  });

  return (
    <ul>
      {RenderedImages}
    </ul>
  )
}

export default ImageList;
```

And update `ImageDetail.js` too with:

```
import React from 'react';

const ImageDetail = (props) => {
  // props.image => this is the image object
  // props.image.title
  // props.image.link

  return (
    <div>
      {props.picture.title}
    </div>
  )
}

export default ImageDetail;
```

### View in browser
```
Pen
Skateboard
Dog
```

We will have the same output as before in the browser

## Review
* Parent to child communication. We alway communicate via `props`
* Props are assigned using something like `<ImageDetail picture={image}/>`
* You can pass many props

### View in browser
you will see an image list and a title. It is not styled nicely

```
import React from 'react';

const ImageDetail = (props) => {
  // props.image => this is the image object
  // props.image.title
  // props.image.link

  return (
    <li>
      <img src={props.image.link} alt="" />
      {props.image.title}
    </li>
  )
}

export default ImageDetail;
```

