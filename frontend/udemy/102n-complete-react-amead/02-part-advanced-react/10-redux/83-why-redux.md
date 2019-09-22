# Why Redux?
* It is a state management library
* Integrates well with React
* Allows us to track changing data
* Similar to component state

## If we just use Component `state` we will hit a wall
* Both solve problem of tracking/changing data

![diagram of simple vs complex app](https://i.imgur.com/oxcHCoP.png)

* Simple app has one parent container and easy to know where to save `state`
* Complex app has no parent as it is using ReactRouter, the idea of `state` and where to save it becomes difficult

## Other issue
* Components we are creating aren't reusable
* If we have 4 levels deep passing props down becomes cumbersome
* The components in our simple app are closely tied to their props and that is why it is hard to reuse them

![reusable components](https://i.imgur.com/uelg6fq.png)

* By using Redux and a central location for our store of state we create components that truly can be used anywhere

## Where do I store my app state in a complex React app?
* Use Redux

## How do I create components that are actually reusable?
* Use Redux

### Are props bad?
* No
* Continue to use them when you are passing from parent to child component
* Avoid props when passing it down a long chain of components
    - If you don't do this you'll create a tight bonding in your components which makes them not reusable

## What is redux?
![shows how redux works](https://i.imgur.com/5KNYmSb.png)

* It is a `state` container    

## Next - Install Redux
