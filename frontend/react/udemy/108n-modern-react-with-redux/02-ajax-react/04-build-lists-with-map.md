# Building lists with `map()`
```
import React from 'react';

const VideoList = (props) => {
  return (
    <ul className="col-md-4 list-group">
     {props.videos.length}
    </ul>
  );
};

export default VideoList;
```

* Our `VideoList` Component receives **props** 
    - (`props.videos` - that contains an array of videos)
* So we just need to loop over each video and for each iteration we need to generate one instance of `<VideoListItem />`

## JavaScript for loops are "for the birds"
* It is advised to stay away from `for loops` as much as possible
* Instead try to use built-in iterators instead
    - Like the built-in `.map()` iterator

## Old way working with arrays
```js
var array = [1, 2, 3];
for(var i = 0; i < array.length; i++) {
    // code here
}
```

### Problem with the old way
* That code is confusing
* Easy to make a typo

## Better way `.map()`
* This is a built-in helper
* A `.map()` is a property of an array

### In console
```js
var array = [1, 2, 3];
array.map // returns a function
```

* If I pass `array.map(function(){})`
* It will get called with each item in the array

```js
var array = [1, 2, 3];
array.map(function(number) { return number * 2 }); // [2, 4, 6]
```

* Each element of the array will be passed into this function `function(number) { return number * 2 }`, one at a time (so this function will be run a total of 3 times)
* `array.map()` will return a new array, where each `index` is the return value of the function
    - So [1, 2, 3] becomes [2, 4, 6]
        + 1 * 2 = 2
        + 2 * 2 = 4
        + 3 * 2 = 6

## So using `.map()` is really fantastic when building lists in React
* So we could do something like this (let's pretend it is JSX)

```js
var array = [1, 2, 3];
array.map(function(number) { return '<div>' + number + '</div>' }); 
// ["<div>1</div>", "<div>2</div>", "<div>3</div>"]
```

### The fat arrow way in ES6
```js
var array = [1, 2, 3];
array.map((number) => { return '<div>' + number + '</div>' }); 
// ["<div>1</div>", "<div>2</div>", "<div>3</div>"]
```

## Set up our VideoListItem Component
```
import React from 'react';

const VideoListItem = (props) => {
  return (
    <li>Video</li>
  );
};

export default VideoListItem;
```

## Update VideoList

```
import React from 'react';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
  return (
    <ul className="col-md-4 list-group">
     {props.videos.map(video => {
       return <VideoListItem video={video} />
     })}
    </ul>
  );
};

export default VideoList;
```

* Another way to use `.map()` by setting a variable
    - Which is a bit cleaner

```
import React from 'react';
import VideoListItem from './VideoListItem';

const VideoList = (props) => {
  const videoItems = props.videos.map((video) => {
    return <VideoListItem video={video} />
  });

  return (
    <ul className="col-md-4 list-group">
     {videoItems}
    </ul>
  );
};

export default VideoList;
```

![output of video items](https://i.imgur.com/F3P8JsI.png)

## Next Challenge
* Dealing with the error `Each child in an array or iterator should have a unique 'key' prop. Check the render method of 'VideoList'`

