# Dummy Data

`ImageDetail.js`

```
import React from 'react';

const ImageDetail = () => {
  return (
    <div>Image Detail</div>
  )
}

export default ImageDetail;
```

`ImageList.js`

```
import React from 'react';
import ImageDetail from './ImageDetail';

const ImageList = () => {
  return (
    <ul>
      <ImageDetail />
    </ul>
  )
}
export default ImageList;
```

## Forming a tree
* `main` is showing `ImageList`
    - `ImageList` is showing ImageDetail
* React app nested components look like trees

## Getting Dummy data
[dummyimage.com](https://dummyimage.com/)

[simple image](https://dummyimage.com/600x400)

`ImageList.js`

```
import React from 'react';
import ImageDetail from './ImageDetail';

const IMAGES = [
  { title: 'Pen', link: 'https://dummyimage.com/600x400' },
  { title: 'Skateboard', link: 'https://dummyimage.com/600x400' },
  { title: 'Dog', link: 'https://dummyimage.com/600x400' }
];

const ImageList = () => {
  return (
    <ul>
      <ImageDetail />
    </ul>
  )
}

export default ImageList;
```

## Map through each of our `ImageDetails`

```
import React from 'react';
import ImageDetail from './ImageDetail';

const IMAGES = [
  { title: 'Pen', link: 'https://dummyimage.com/600x400' },
  { title: 'Skateboard', link: 'https://dummyimage.com/600x400' },
  { title: 'Dog', link: 'https://dummyimage.com/600x400' }
];

const ImageList = () => {
  return (
    <ul>
      <ImageDetail />
    </ul>
  )
}
export default ImageList;
```

* We use UPPERCASE to designate a **constant** where the data never changes
* We use older JavaScript code to simplify what is happening with `.map()` but will soon refactor it to use the ES6 arrow function

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
      return <ImageDetail />
  });

  return (
    <ul>
      {RenderedImages}
    </ul>
  )
}

export default ImageList;
```

### View in browser
You will see:

```
Image Detail
Image Detail
Image Detail
```

## Houston, we have an error!
And we get an error about unique "keys"

[how a .map() works](https://i.imgur.com/XqOwxb2.png)

* IMAGES is an array of image objects
* When we map over an array we pass in a function

```
function(image) {
    return <ImageDetail />
}
```

* That function will be run one time for each element in the array
* Whatever gets returned from this function will get put into a brand new array (_which is what gets returned from the map call_)
* We end up with an array of `ImageDetail` components

### {} in JSX
Whenever we want to make a reference to a JavaScript variable inside of **JSX** we do so by placing curly braces around the variable `{RenderedImages}`

### One needed task completed!
We figured out how to create one **ImageDetail** for each Image in our app. We have three images and we have three **ImageDetail** components

### Next problem
How can we get image detail information down into our nested **ImageDetail** component (_the image title and the image itself_)


