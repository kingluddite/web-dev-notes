# VideoListItem
* Let's make our list of videos inside `VideoList` look a lot nicer
* Do you remember in `VideoList`?

```
const videoItems = props.videos.map((video) => {
    return <VideoListItem video={video} key={video.etag} />
  });
```

* We passed in the `video` as property (aka `prop`) video
* So to get access to the `video` inside of `VideoListItem` we do this:

`VideoListItem`

```
const VideoListItem = (props) => {
  const video = props.video;
  return (
    <li>Video</li>
  );
};
```

* Doing the same thing but using ES6

```
const VideoListItem = ({video}) => {
  // const video = props.video;
  return (
    <li>Video</li>
  );
};
```

* This new way is completely identical to doing `const video = props.video;`
* But now we are saying this first object `props` in the arguments array of `VideoListItem`, has a property `video`, please grab that `video` and declare a new variable called **video**
* It is just another bit of ES6 sytnax to clean up your code a little bit

## Test to see what's inside `video`
```
import React from 'react';

const VideoListItem = ({video}) => {
  // const video = props.video;
  console.log(video);
  return (
    <li>Video</li>
  );
};

export default VideoListItem;
```

#### Test in browser
![You will see](https://i.imgur.com/0zSebKp.png)

* We get one `console.log()` for each video
  - etag
  - id
      + videoId
  - snippet
      + title
      + description
      + thumbnails
* We need to get at the `snippet` property

`VideoListItem`

```
import React from 'react';

const VideoListItem = ({video}) => {

  return (
    <li className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img src="" alt="" className="media-object" />
        </div>

        <div className="media-body">
          <div className="media-heading"></div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
```

* We use Bootstrap 4 classes to build our HTML structure

## View in browser
You will see **heading** and **thumbnails** of 5 `soccer` videos

`VideoListItem.js`

```
import React from 'react';

const VideoListItem = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }
  const url = video.snippet.thumbnails.default.url;
  const title = video.snippet.title;
  console.log(video);

  return (
    <li className="list-group-item">
      <div className="video-list media">
        <div className="media-left">
          <img src={url} alt={title} className="media-object" />
        </div>

        <div className="media-body">
          <div className="media-heading">{title}</div>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
```


