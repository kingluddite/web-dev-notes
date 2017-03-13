# Add some css
* Doesn't look nice
* need to refactor our code
* unique key missing problem

## Make it look prettier
Import twitter bootstrap library

stop meteor `ctrl` + `c`

### Use meteor package manager
`$ meteor add twbs:bootstrap@3.3.6`

* We add a specific version 3.3.6

Start meteor again with `$ meteor`

React uses `className` not `class`

`ImageDetail.js`

```
import React from 'react';

const ImageDetail = (props) => {
  // props.image => this is the image object
  // props.image.title
  // props.image.link

  return (
    <li className="media list-group-item">
     <div className="media-left">
       <img src={props.image.link} alt="" />
     </div>
     <div className="media-body">
       <h4 className="media-heading">
         {props.image.title}
       </h4>
     </div>
    </li>
  )
}

export default ImageDetail;
```

`ImageList`

```
// more code
const ImageList = () => {
  const RenderedImages = IMAGES.map(function(image) {
      return <ImageDetail image={image}/>
  });

  return (
    <ul className="media-list list-group">
      {RenderedImages}
    </ul>
  )
}
// more code
```

## Add custom css file
`client/style/main.css`

```css
img {
  width: 300px;
}
```

Now images look better, with a box and a nice title

