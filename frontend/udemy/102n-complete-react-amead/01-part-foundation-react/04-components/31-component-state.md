# What is Component State?
* `state` is a React core concept
* Let's try to understand React `state` in an abstract way

## What does Component state allow us to do?
* At its base level component state allows us to manage some data

### Think of an object with various key/value pairs
* When that data changes the component will automatically rerender to reflect those changes
* In the `jsx-indecision.js` app we did not have that in place
  - Which means when we changed the array or added something onto app.options we had to call our rerender method

```
const app = {
  title: 'My First React App',
  subtitle: 'Learning About Expressions',
  options: [],
};
const onFormSubmit = e => {
  e.preventDefault();
  const optionEl = e.target.elements.option;
  const option = optionEl.value;

  if (option) {
    app.options.push(option);
    optionEl.value = '';
    rerenderPageEls();
  }
};
// MORE CODE
```

## Component state to the rescue!
* With Component state, all we have to do is manipulate the data and the Component will take care of rerendering itself! This is very helpful!

## Let's review how Component state gets into our components
### The Counter app
![the counter app](https://i.imgur.com/eVAM4zT.png)

* We tracked a single piece of data - it was a variable count who's value started off at 0
* We showed that count value to the screen
* We had a +1, -1 and a reset button
  - Which allowed us to interact with that data based on button clicks

## We'll create the same thing but this time with a React Component with Component state
### Steps to setting up state
#### Come up with a default set of values
  * Our counter app we started the count at 0
  * For our IndecisionApp we'll start our options array off as an empty array
  * We need to come up with our default state value
  * Outside of an React Component we had variables
    - In the case of a React Component, we'll translate that into an object

1. Setup default state object

![default state object set up](https://i.imgur.com/4HOhaDM.png)

```
// <Counter />
{
  count: 0
}
```

* **note** We can have as many properties as we want
* We could also leave state off altogether which is how our Components work by default

2. Component rendered with default state values*
* Our component will render itself for the very first time using those values

![React component rendered first time](https://i.imgur.com/lzPKcER.png)

* **note** The asterisk is because we never call `rener()` manually it happens automatically

## The user must interact with our app or it will never change
* The user clicks a button, an event handler is called and does something

![user interacts with our React component](https://i.imgur.com/OVjoaqw.png)

* **note** The API for interacting with React state we'll discuss later

3. Change state based on event

* User clicks +1 button and eventHandler calls `handleAddOne()` method and state increases by 1

4. The application re-renders itself (after state change) using new state values*

![app rerenders itself](https://i.imgur.com/MNvLdlq.png)

* **note** We don't do anything to get that done, behind the scenes the React Component API is going to see the state changed and it will make sure the UI gets updated

5. Start at 3 again (rinse and repeat)

* **note** React Component state is essential for interactive apps

## Recap
* Our component state is just an object with key/value pairs
* We define our initial data and that allows us to get that rendered to the screen
* The state object can be changed by us
  - Whether a button click, form submission, the finishing of an HTTP request that got some JSON data from an API, or any other event
* When we do change the state the app will automatically rerender itself
  - React will work behind the sense to keep the UI up-to-date with our state

## Next
* We'll build out our app using Component state
