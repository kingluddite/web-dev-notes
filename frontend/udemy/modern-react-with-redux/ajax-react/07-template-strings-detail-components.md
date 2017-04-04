# Details Components and Template Strings
## Important question before you create a Component
Do I expect this Component to maintain any type of `state`

## VideoDetail will be a functional Component
This Component only needs to care about the video title, the description and the URL of the video

* Those are all properties that are available through `props` that will be passed down from the `App` Component
* Based on that we do not need any `state`
* We only need and so we'll build just a **functional Component**

`VideoDetail`

```
import React from 'react';

const VideoDetail = (props) => {
  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe src="" frameBorder="0" className="embed-responsive-item"></iframe>
      </div>
        <div className="details">
          <div></div>
          <div></div>
        </div>
    </div>
  );
};

export default VideoDetail;
```

* I always forget to add the `props` argument to functional Components so don't be like me and forget it too :)

### Pull off just the video
We can use an ES6 technique that will keep our code clean and replace `const VideoDetail = (props) {` with `const VideoDetail = ({ video }) {`

#### Adding dynamic data

```
import React from 'react';

const VideoDetail = ({ video }) => {
  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe src="" frameBorder="0" className="embed-responsive-item"></iframe>
      </div>
        <div className="details">
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
    </div>
  );
};

export default VideoDetail;
```

## Youtube video tip
Whenever you want to embed a video or just navigate to a video the only thing that changes in the URL is the actual `id` of the video

We have the `id` inside our `video` object `({video})` so we can actually craft our own embed URL

```
const VideoDetail = ({ video }) => {
  const videoId = video.id.videoId;
  const url = 'https://www.youtube.com/embed/' + videoId;
```

And the above will work for any Youtube video

## Template strings
We can use ES6 and template strings to improve our link

```
const VideoDetail = ({ video }) => {
  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;
```

Then we plug in the `url` variable into our `iframe`

```
import React from 'react';

const VideoDetail = ({ video }) => {
  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;
  
  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe src={url} frameBorder="0" className="embed-responsive-item"></iframe>
      </div>
        <div className="details">
          <div>{video.snippet.title}</div>
          <div>{video.snippet.description}</div>
        </div>
    </div>
  );
};

export default VideoDetail;
```
