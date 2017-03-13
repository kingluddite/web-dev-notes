# Build first app

## mockup

![mockup of image app](https://i.imgur.com/lzJM6pk.png)

## Challenges
* Figure out how to break our app into separate components
* Show multiple compononents on screen at once
* Create a list of images to show
    - make our own
    - or make an API call to get the images
* Create image detail for each image we have in the list

## Break app into several components
![mockup break up of components](https://i.imgur.com/ho1uAVF.png)

* Image List components
    - an array of images that builds one image detail for each image
    - Image Detail component will be a component that has an image, an image title, an image description, and a progress bar
    - Progress Bar - will be a component as well
    - We made Image Detail and Progress Bar separate components because we can use them several times in different projects

## Set up components
We always put components in a single file
Name the file after the name of the component
Put all inside `components` folder
You will see components are repetitive

## 3 steps when you create a react component
1. Import
2. Create Component
3. Export Component

```
// Create our image List component
// import react

import React from 'react';

// create our component
const ImageList = () => {
  return (
    <ul>
      <li>Image Detail</li>
    </ul>
  )
}

// export our component
export default ImageList;
```

* anyone who imports the file ImageList file, should get the ImageList Component by default

**note** In any React app we make we will only use ReactDOM **only one time** inside our **root** component

## Component Nesting
All other Components will use component nesting - We can take a collection of small components and compose something larger out of them

* Just like we can next HTML elements inside other HTML elements we can also nest JSX Components inside other JSX Components

`main.js`

```
// Any JS in here is automatically ran for us

// import the React library
import React from 'react';
import ReactDOM from 'react-dom';

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
});
```

### the current directory
* `./` inside the current directory
* no need for `.js` suffix
    - instead of `./components/ImageList.js` use `./components/ImageList`
* Why do we need to poing our custom Component to a path?
    - To avoid naming collisions. There may be a chance that I use ImageList multiple times in my app and so to ensure I am use the correct ImageList, I need to explicitly point out where it is located relative to the file that is importing it
    - You can not import duplicate Components

update `main.html`

```html
<head>
  <title>Image Bucket</title>
</head>

<body>

  <div class="container"></div>
  <!-- /.container -->
</body>
```

View in browser and you'll see `Image Detail`




