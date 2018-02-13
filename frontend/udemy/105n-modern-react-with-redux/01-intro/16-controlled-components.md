# Controlled Components
A controlled field is a form element, like an `input`, who's value is set by the `state` (rather than the other way around)

```
render() {
    return (
      <div>
        <input onChange={event => this.setState({ term: event.target.value})} />
      </div>
    )
  }
```

In the above chunk of code our input change tells the state to change. Think of it like the angry input guy is trying to tell his boss `state` to change but it really should be the other way around. The boss `state` should tell the input to change

## input gets value from state
We will update our text input to get its value from the state

```
<div>
        <input
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value})} />
      </div>
```

## Test and it works as it did before
* We added `value={this.state.term}`
* But if we remove the event handler like this:

```
render() {
    return (
      <div>
        <input
          value={this.state.term}
           />
      </div>
    )
  }
```

### And test in browser
Now we can't type in the input box at all

What just happened?

When we tell the input that it's value is provided by `this.state.term`, we turn it into a **controlled component** and a **controlled component** has its values set by `state`, so it's value only changes when it's `state` changes

So what is happening is:

```
render() {
    return (
      <div>
        <input
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value})} />
      </div>
    )
  }
```

When we change the input and update state the new value of state is set to the value of the input

## Flow review
Our app starts up and renders `SearchBar` Component

`index.js`

```
const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  )
}
```

`SearchBar`

A new instance of SearchBar is created so the contructor() function is called

And `this.state` is set to and empty `term` (empty string)

```
class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }
```

The component renders

```
render() {
    return (
      <div>
        <input
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value})} />
      </div>
    )
  }
```

The value of the input is accessed through `this.state.term` which is currently an empty string

The Component sits on string doing nothing and waiting for the user to enter some text into the `input`

When the user enters some text, the `state` is updated and term is set to what the user typed into the input field (at this point in time, the value of the input has not changed (this is a key point to understand)), but since state has been updated the SearchBar Component will re-render and then the input field value will look into the state and grab the latest value of `term` and populate the input field value with that state value of `term`

## Why is this important?
In React, this is how we treat data, we don't have an **imperative** flow of data throughout our application when the user changes something I don't have to run around and try to find out what the value is, it is a much more **declarative** syntax, the value of the input is equal to the state

So things the **declarative** way makes our lives easier

What if we wanted a starting value

```
constructor(props) {
    super(props);

    this.state = { term: 'We Begin' };
  }
```

We can read the value out of the input much more easier than if we were using **jQuery** 

If we have a button inside our render() and we want to read the value of the input whenever the user clicks the button (instead of using jquery to find the input and then get the value out of it, which is a hassle, we can just say `this.state.term` and we always know that is the correct value of the input at any given time)

**note** A functional component can contain a class based Component
