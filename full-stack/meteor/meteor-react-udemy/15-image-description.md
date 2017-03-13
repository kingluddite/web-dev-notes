# Add Image Description

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
       <p>{props.image.description}</p>
     </div>
    </li>
  )
}

export default ImageDetail;
```

Not all images have descriptions

## Progress bar
Use XHR preview in Chrome to view individual image to see the `ups` and `downs` properties and values

We want to make a progress bar that shows up and down votes

We will make a separate component that we can nest inside the image detail

`ImageScore.js`

```
import React from 'react';

const ImageScore = (props) => {
  // props.ups is the number of upvotes
  // props.downs is the number of downvotes

  const { ups, downs } = props

  const upsPercent = `${100 * (ups / (ups + downs))}%`;
  const downsPercent = `${100 * (downs / (ups + downs))}%`;

  return (
    <div>
      Ups/Downs
      <div className="progress">
        <div style={{ width: upsPercent }}className="progress-bar progress-bar-success progress-bar-striped"></div>
        <div style={{ width: downsPercent }} className="progress-bar progress-bar-danger progress-bar-striped"></div>
      </div>
    </div>
  )
};

export default ImageScore;
```

`ImageDetail.js`

```
import React from 'react';
import ImageScore from './ImageScore';

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
       <p>{props.image.description}</p>
       <ImageScore ups={props.image.ups} downs={props.image.downs}/>
     </div>
    </li>
  )
}

export default ImageDetail;
```

