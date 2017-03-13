# Build first app

## Mockup

![mockup of image app](https://i.imgur.com/lzJM6pk.png)

## Challenges
* Figure out how to break our app into separate Components
* Show multiple compononents on screen at once
* Create a list of images to show
    - Make our own
    - Or make an **API** call to get the images
* Create imagedetail for each image we have in the list

## Break app into several Components
![mockup break up of Components](https://i.imgur.com/ho1uAVF.png)

* `ImageList` Components
    - An array of images that builds one ImageDetail for each image
    - `ImageDetail` Component will be a Component that has:
      - An image
      - An image title 
      - An image description 
      - And a progress bar
    - Progress Bar - will be a Component as well
    - We made ImageDetail and Progress Bar separate Components because we can use them several times in different projects

## Set up Components
* We always put Components in a single file
* Name the file after the name of the Component
* Put all inside `Components` folder
* You will see Components are repetitive

## Three steps when you create a react Component
1. Import
2. Create Component
3. Export Component

```
// Create our image List Component
// import react

import React from 'react';

// create our Component
const ImageList = () => {
  return (
    <ul>
      <li>ImageDetail</li>
    </ul>
  )
}

// export our Component
export default ImageList;
```

* Anyone who **imports** the file `ImageList` file, should get the `ImageList` Component by default

**note** In any **React** app we make we will only use ReactDOM **only one time** inside our **root** Component

## Component Nesting
All other Components will use Component nesting - We can take a collection of small Components and compose something larger out of them

* Just like we can next **HTML** elements inside other **HTML** elements we can also nest **JSX** Components inside other **JSX** Components

`main.js`

```
// Any JS in here is automatically ran for us

// import the React library
import React from 'react';
import ReactDOM from 'react-dom';

import ImageList from './Components/ImageList';

// Create a Component
const App = () => {
  return (
    <div>
      <ImageList />
    </div>
  );
};

// Render the Component to the screen
Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('.container'));
});
```

### the current directory
* `./` inside the current directory
* No need for `.js` suffix
    - Instead of `./Components/`ImageList`.js` use `./Components/`ImageList``
* Why do we need to poing our custom Component to a path?
    - To avoid naming collisions. There may be a chance that I use `ImageList` multiple times in my app and so to ensure I am use the correct `ImageList`, I need to explicitly point out where it is located relative to the file that is importing it
    - You can not import duplicate Components

## Update `main.html`

```html
<head>
  <title>Image Bucket</title>
</head>

<body>

  <div class="container"></div>
  <!-- /.container -->
</body>
```

## View in browser and you'll see `ImageDetail`




