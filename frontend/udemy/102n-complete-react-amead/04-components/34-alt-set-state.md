# Alternative this.setState()
* `this.setState()` also allows you to pass an object directly in instead of a function
  - This is the older approach
  - Passing an object in has existed since the React.Component state has existed

## Passing in a function is now the preferred method
* Rumors are future versions of React will only let state be set using this way

### Here is the old way - passing in an object
```
// MORE CODE

  handleReset() {
    // this.setState(() => ({
    //   count: 0,
    // }));
    this.setState({
      count: 0,
    });
  }
// MORE CODE
```

* Nothing is wrong with the above
* It works just like it did before

### But there is a problem
* And that happens when you are trying to update the state based on the current state values
* **note** In most of your react apps you will have setState() firing all over the place (but not in the same method - this is just an test)

```
// MORE CODE

  handleReset() {
    // this.setState(() => ({
    //   count: 0,
    // }));
    this.setState({
      count: 0,
    });

    this.setState({
      count: this.state.count + 1,
    });
  }
// MORE CODE
```

* With this change you would expect the number to be 1 but when you try it, the number is just 1 more than the last time you clicked button

### Why is this happening?
* Our calls to `this.setState()` are asynchronous
  - That means that just because we started this count with the first call to setState, the second call doesn't mean the count will be changed on the very next line
  - We start the process by setting count to 0 but it hasn't completed so when we call again it wills still be the old number so that is why the number always goes up 1
  - Why is this.setState() asynchronous?
    + Because there is a lot more going on behind the scenes than updating an object
      * Yes React does merge the old state object with the new one but then it goes ahead and does all the virtual DOM update UI stuff to make React as efficient as it is
        - Only when a virtual DOM representation of your component is created and it figures out all the stuff that needs to change then AND ONLY THEN is this.state brought up to speed
          + Because React is really efficient and batches our setState operations allowing it to re-render less often we can get into weird situations like this one where we are accessing **state** and **outdated** data

### So what is the solution?
* Simple. Always pass a function to `this.setState(() => {})` and never just pass `this.setState({})`
  - This is called an updater function
    + Because it does not suffer from the same problems because we never access this.state, instead React passes in `prevState`

#### Let's use prevState in our example to see how it affects it
```
// MORE CODE

  handleReset() {
    this.setState(() => ({
      count: 0,
    }));

    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
    // this.setState({
    //   count: 0,
    // });

    // this.setState({
    //   count: this.state.count + 1,
    // });
  }
// MORE CODE
```

* Now we get the count to a non-0 number by clicking +1 and then we hit reset and the counter is set to 1
  - What happened?
    + The first call uses setState to set the state.count to 0
    + Then it goes off and does it's async stuff
      * Completes the Virtual DOM
      * Figures out what needs to change to get component updated
    + Now before the component gets re-rendered it runs another this.setState()
      * React sees this and says do I want to render twice or just once? And so React will try to batch the 2 setStates together and this will get it to prevent updating a bunch of times which would lead to inefficiency
    + React is smart enough to know its state for this component it just computed was 0 and it is out of date, then it goes and tries to figure out what changes were made and then it passes that state in, where the count was zero, not the original state where the count was 15, so this means it takes a count of 0 and updates it to 1 instead of 15 and updating to 16
* **note** There is nothing wrong passing an object to `this.setState()` as long as you don't need access to previous state values
  - But to be safe just always use the updater function as passing in an object may be deprectated in future versions of React

## Take away
* Whenever you use ALWAYS pass an updater function!

## Here is the final handleReset() method
```
// MORE CODE

  handleReset() {
    this.setState(prevState => ({
      count: 0,
    }));
  }
// MORE CODE
```

## Next
* Convert visibility toggle over to components and component state
