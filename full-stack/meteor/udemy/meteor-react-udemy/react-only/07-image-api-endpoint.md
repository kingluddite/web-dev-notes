# Image API Endpoint
We will switch from a static list of images to a more dynamic list of images

## [imgur](http://imgur.com/)
Site where anyone in community can add images

* That will be our source for our images
* **imgur** has a robust API

### Exploring imgur's API documenation
[imgur API endpoints](https://api.imgur.com/endpoints)

Find imgur's `gallery` endpoint located [here](https://api.imgur.com/endpoints/gallery)

* The imgur **gallery** is just a collection of images. By default approx 50 images get returned in a single **gallery**

Browse to [link to gallery](https://api.imgur.com/3/gallery/hot/viral/0)
**note** we intentionally did not include the `.json` suffix

[You can add a JSON formatter to Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)

* Top level property is `data`
    - The value for data is an array of image objects
        + That object represents a singular image
        + We have a bunch of properties we can use if we want

We will use this EndPoint to give us the images we need for our app
couple problems we need to solve here:

1. We have a URL, we need someway to make an AJAX request to that URL `https://api.imgur.com/3/gallery/hot/viral/0`

**note** In a normal **Meteor** and **React** application, we will not use **React** to make any **AJAX** requests like this. We are only doing this because we are building an application only with **React** (_think of what we are doing as a one off situtation where we are going to rely upon **React** to make a AJAX request for us_)

Again. We need to figure out:

1. How can we make an AJAX request?
2. And then, once we made that request, how we make use of the data from our Endpoint

`main.js`

We just want to see if we can get the response back

```
// Any JS in here is automatically ran for us

// import the React library
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ImageList from './components/ImageList';
// Create a component
const App = () => {
  return (
    <div>
      <ImageList />
    </div>
  );
};

// Render the component to the screen
Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
  axios.get('https://api.imgur.com/3/gallery/hot/viral/0')
      .then(response => console.log(response));
});
```

And presto! We get our response back!

`main.js:22 Object {data: Object, status: 200, statusText: "OK", headers: Object, config: Object…}`

![Our list of 60 images](https://i.imgur.com/oK4XE2T.png)

**note** The data that we care about will be accessible via `response.data.data`



