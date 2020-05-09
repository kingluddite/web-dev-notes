# Handle null props
* We first need to import `VideoDetail` into our `App` Component

```
import React, { Component } from 'react';
// MORE CODE
import VideoDetail from './components/VideoDetail'; // add this line
```

* And add it to our `App` Component `render()` function

```

// MORE CODE

render() {

    return (
      <div>
        <SearchBar />
        <VideoDetail />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
// MORE CODE
```

### Problem - We need a video to pass to `VideoDetail`
* Currently, we just have an array of videos without any ability to just select one out of the list
* Just to see it is working let's pass in the first video using:

`<VideoDetail video={this.state.videos[0]} />`

### View in browser
* The console error says `Cannot read property 'id' of undefined at new VideoDetail`
    - **note** We also have a nastly looking 2nd error that is probably a result of the first error
    - Most likely if we fix the first error, we'll also fix the second error at the same time

#### What is the problem here?
* When the `App` first renders, it runs the `App` **constructor()** function which initializes the `state` to be an empty array and then it kicks off the request to go and get some more videos
* While still waiting for the request to the Youtube API to render a response, the `App` Component `render()` method still tries to render itself
* It doesn't pause and say "Oh, I'm still waiting for data, I don't want to render myself yet"
    - It just goes ahead and tries to render itself and at that time `this.state.videos` is still an empty array and when we try to access index `0` of videos `this.state.videos[0]` and so when we pass in `video=undefined` into `VideoDetail` Component
* So then we go inside `VideoDetail` to see what is manifested when we pass it a value of `undefined` for **video**

`VideoDetail`

* Here, **video** will be `undefined`

```
const VideoDetail = ({ video }) => {
```

* And then when we try to called `const videoId = video.id.videoId;`
* We will get the error `cannot read property 'id' of undefined`

## How do we deal with null values in React?
* You will run into issues like this all the time with `React`
* `React` has no patience and it always wants to render instantly
* It never wants to wait!!!!

## Add a check!
* Some parent objects can't fetch information fast enough to satisfy the needs of a child object
* So to handle this case, we will add a check inside of our `VideoDetail` Component to make sure a video has been provided in the `props` before it attempts to render

`VideoDetail`

```
const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading...</div>;
  }
```

* Now if no `video` is provided, we return `Loading...` in a **div**
    - It's a **return** statement
    - So the other code inside this functional Component won't run, but if a video is provided, then we don't show `Loading...` and instead render the Component with the **video**

## View in browser
* We see our large video with a title and a description
* The CSS needs to be improved but we are well on our way to completing our app

### Problem and next challenge
* We still can't select a video yet
* We'll do that next

