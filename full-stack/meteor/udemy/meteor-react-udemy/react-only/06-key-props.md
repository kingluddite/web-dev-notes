# Key Props
We have a **unique** key prop

## RenderedImages
Is an array of `ImageDetail` Components

**note** - Whenever we render an array of components in **React**, **React** expects that each component will have a `key` property. This is needed just for performance concerns. It makes **React** much better at re-rendering a list of items which each item in the array has a **unique key**

## Let's make the error go away
* We just need to add another `prop` to `ImageDetail` and we'll name the new prop `key`
* Only requirement for `key` is that it is unique compared to any other elements in the array
* For now we will use the `title` because it is the most unique thing we have (_for now_)

`ImageList.js`

```
const RenderedImages = IMAGES.map(function(image) {
      return <ImageDetail image={image} key={image.title}/>
  });
```

## Error be gone!
That gets rid of our unique key error

### Refactor our code to use ES6 arrow function
Change this:

```
const RenderedImages = IMAGES.map(function(image) {
      return <ImageDetail image={image} key={image.title}/>
  });
```

To this:

```
  const RenderedImages = IMAGES.map((image) => {
      return <ImageDetail image={image} key={image.title}/>
  });
```

## Look Ma! No parenthesees!
Since we only have one argument we can remove the extra set of parenthesees

```
  const RenderedImages = IMAGES.map(image => {
      return <ImageDetail image={image} key={image.title}/>
  });
```

## Implict Returns Yo!
And we can refactor even more by adding an implicit return (_since we have a single element or a single JavaScript expression_)

```
const RenderedImages = IMAGES.map(image =>
  <ImageDetail image={image} key={image.title}/>
);
```

After all this refactoring our code output looks the exact same but we are learning ways to make our code a lean, mean fighting machine!
