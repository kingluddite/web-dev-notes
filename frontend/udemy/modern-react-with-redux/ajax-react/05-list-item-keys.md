# List item keys
React is very clever with rendering arrays but sometimes it is a little too clever

Whenever we render an array of items of the same type, React correctly assumes that we are building a list

React has a bunch of logic built in to optimize the process of building a list

Imagine you have a deck of 1000 index cards with notes on them. Every minute someone comes in and tells you to update a specific card's notes but they don't know which one and you have to find it and update it

You're best option would be throw away all the index cards and recreate them but if you had an ID for each card, then the person could say, I need you to update card id 5 with these notes. Then you could update the cards without regenerating all of them. The process would be much faster this way

So whenever you build a list in React, make sure you give each list item a unique ID

## Adding a key to a list is easy and straight forward
It just needs to be a unique and persistant piece of information, unique to the record

A common strategy when rendering a list of data is to use the `id` for the piece of data

### etag
If we check out the React tab, and search `App` we can open the `videos` in our state and we'll see that each video has a very unqiue key called `etag`. That is what we'll use for our unique key

```
import React from 'react';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return <VideoListItem video={video} key={video.etag} />
  });

  return (
    <ul className="col-md-4 list-group">
     {videoItems}
    </ul>
  );
};

export default VideoList;
```

And here is what it looks like in the React tab

![unique key](https://i.imgur.com/bkhr5Vr.png)
