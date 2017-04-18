# What are React Components?
Problems with our current app and how we coded it

* It is not scalable
* It is not maintainable
* It is not testable

Everything that defines our Application's logic, the rendering logic and the UI interaction logic it is all inside `client/main.js`

As our Application gets more complex this file has to get even more complex because this is where all the code lives

## New Goal
Break our file up into a reusable React Component

* React Components are essential to building any real world React Application
* We are using JSX but React Components will enable us to break up our Application into reusable pieces

### HTML element analogy
Think of the HTML form tag. It will render a form but it also has some interaction built into it like when you submit a form. Because of the architecture/design of the form tag we can use it anywhere in our app and we can recreate the functionality without having to retype the code. It will also enable us to break up our Application into little pieces

#### Example - AddPlayer Component
All this Component will care about will be to render a little bit of JSX and it will have one method and this method will be responsible for doing something when the form gets submitted

* It won't care how many players there are
* It won't care what the page title is
* It is just an isolated React Component responsible for just one job (_rendering that form and responding to user interaction_)

### Adding a Component to a page
`<AddPlayer />`

This is what you type to render a Component to the screen. You will need to import the relitive path to where this Component resides and that file contains the meat and potatoes of what this Component does. This means this `<AddPlayer />` is resuable. Just add it where you need it

### What Components do we need for our Application?
Do this for all of your apps before you start. It can be a paper sketch or a Photoshop mockup. Create it and take that picture and break it up into indivual pieces

Here's the sketch of what we want:

![wireframe](https://i.imgur.com/AtGMJjX.png)

Here are the Components we need:

![wireframe with Component's](https://i.imgur.com/SYoNaqd.png)

* Include html attributes as they will help you set up `props`
    - `props` are things you can pass into a Component when you initialize it
* `App` is parent of all Components
    - The **parent-child** relationship, the hierarchy of Components is essential to building your React Application
    - App doesn't care about the `Player` Component, the only Component that does is the `PlayerList` Component. This means we can reuse our Components anywhere
    - This is also a great way to easily test our Components
    - We need to review about ES6 classes to create Components
