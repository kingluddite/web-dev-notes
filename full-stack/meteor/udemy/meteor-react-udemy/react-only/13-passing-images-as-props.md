# Passing Images as Props
Let's trash our static images and pull in our API image list

## We want to pass data
Specifically we want to pass our data down from the `App` Component to the `ImageList` Component

### Parent to Child Communication (props)
This is classic **parent-to-child communication** in a React application. Whenever we try to talk from a parent to a child relationship, we want to be thinking `props`

To pass data down to our child we just add it as a property to the child tag

`main.js`

```
render() {
    return (
      <div>
        <ImageList images={this.state.images} />
      </div>
    );
  }
```

**note** We also removed the `console.log()` test

**note** Because we defaulted our images `state` to an empty array

`this.state = { images: [] };` - the `images` **prop** (when it shows up to `ImageList` is always going to be an array (and that means we can do stuff like... map over it, or find the length of it, or whatever we want to do with it because we never have to worry about `images` ever not being an array - like it being undefined or something like that)

 So we just passed the list of images down into `ImageList`. So we have to open that file up and make sure that it is using our API data and not the static data

 `ImageList.js`

 Delete this code:

```
 const IMAGES = [
  { title: 'Pen', link: 'https://dummyimage.com/600x400' },
  { title: 'Skateboard', link: 'https://dummyimage.com/600x400' },
  { title: 'Dog', link: 'https://dummyimage.com/600x400' }
];
```

Now the data we care about is available on teh `props` object

**note** In a **functional component**, we get access to that `props` object as the first argument into the function

Change this

`const ImageList = () => {`

To this

`const ImageList = (props) => {`

Now we can make use of `props.images`

```
import React from 'react';
import ImageDetail from './ImageDetail';

const ImageList = (props) => {
  const RenderedImages = props.images.map(image =>
    <ImageDetail key={image.title} image={image} />
  );

  return (
    <ul className="media-list list-group">
      {RenderedImages}
    </ul>
  )
}

export default ImageList;
```

### View in browser
You will see images updated!

### Problem - we have some broken images
