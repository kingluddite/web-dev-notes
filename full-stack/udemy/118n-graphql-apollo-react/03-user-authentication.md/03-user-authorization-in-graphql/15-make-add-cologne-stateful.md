# Make AddCologne stateful
* `Signin` and `Signup` were stateful components because we needed them to handle `onChange` and `onSubmit`

## SFC or CBC
* SFC is optimized but I find converting from SFC to CBC (which happens often) so I prefer just creating all my components as CBCs first
* But knowing how to convert from SFC to CBC is important and here's how you do this conversion:

## 5 steps to Convert from SFC to CBC (Class Based Component)
1. Wrap parentheses in curly braces
2. Prefix parentheses with a `return()`
3. Wrap `return()` in a `render() {}`
4. Change `const` to `class`
5. Change `= () =>` to `extends React.Component`

`AddCologne.js` (before conversion)

```
import React from 'react';

const AddCologne = () => (
  <div className="App">
    <h2 className="App">Add Cologne</h2>
   // MORE CODE
    </form>
  </div>
);

export default AddCologne;

```

`AddCologne.js` (after conversion)

```
import React from 'react';

class AddCologne extends React.Component {
  render() {
    return (
      <div className="App">
       // MORE CODE
      </div>
    );
  }
}

export default AddCologne;
```

## Create a state object
```
// MORE CODE
class AddCologne extends React.Component {
  state = {};
  
  render() {
    // MORE CODE
```

## Set all states to empty values
```
import React from 'react';

class AddCologne extends React.Component {

state = {
  scentName: '',
  scentPrice: '',
  description: '',
  username: ''
};

// MORE CODE
```

* You could set a default value too:

```
state = {
  scentName: '',
  scentPrice: 0,
  description: '',
  username: '',
};
```

## Test
* Use **React Dev Tools** to view `AddCologne` component
* Type in fields and watch the `state` populate with the `value` typed in the fields

### Problem
* We do not set the `state` when we type in the fields
* The reason is we need to create an `onChange` event and an event handler to take the values in the text fields and set the state for that field

#### We'll add the onChange event to all fields
`AddCologne.js`

```
// MORE CODE

<form className="form">
  <label htmlFor="scentName">Scent Name</label>
  <input
    type="text"
    id="scentName"
    name="scentName"
    placeholder="Scent Name"
    onChange={this.handleChange}
  />
  <label htmlFor="scentPrice">Scent Price</label>
  <input
    type="text"
    id="scentPrice"
    name="scentPrice"
    placeholder="Scent Price"
    onChange={this.handleChange}
  />
  <label htmlFor="description">Scent Description</label>
  <textarea
    id="description"
    name="description"
    placeholder="Scent Description"
    onChange={this.handleChange}
  />
  <button className="button-primary">Add Cologne</button>
</form>

// MORE CODE
```

* Enter in fields and nothing appears in the console
* Let's log the values in the field to the console handling the onChange event using a event handler called `handleChange`

## Add event handler
* Grab the target `event.target`
* Destructure the `name` and `value` off the event target

```
// MORE CODE

class AddCologne extends Component {
  state = {
    scentName: '',
    scentPrice: 0,
    description: '',
    username: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, ':', value);
  };

// MORE CODE
```

* Type in the fields and the name and value of the fields is entered in the console

### Add to state
* When we type in fields we need to populate the state with those values
* When fields are filled in we'll set the `state` we'll use [brackets] to dynamically update the property based on the `name` of the input that we are typing in as well as the corresponding `value`

`AddCologne.js`

```

// MORE CODE

handleChange = event => {
  const { name, value } = event.target;
  // console.log(name, ':', value);
  this.setState({
    [name]: value,
  });
};

// MORE CODE
```

## Destructuring
* We destructure to save us typing
  - So instead of typing this `this.state.scentName` we can type `scentName`

```
// MORE CODE

render() {
  const { scentName, scentPrice, description } = this.state;
  return (

// MORE CODE
```

## Controlling form fields
* As the user types in the field we setState and then we set the value of the fields using what is inside the `state`
  - By doing it this we we now can do think like removing spaces in a form field dynamically as the user types
    + If we did not use a controlled form field this would not be possible

```
// MORE CODE

render() {
  const { scentName, scentPrice, description } = this.state;

  return (
    <div className="App">
      <h2 className="App">Add Cologne</h2>
      <form className="form">
        <label htmlFor="scentName">Scent Name</label>
        <input
          type="text"
          id="scentName"
          name="scentName"
          placeholder="Scent Name"
          onChange={this.handleChange}
          value={scentName}
        />
        <label htmlFor="scentPrice">Scent Price</label>
        <input
          type="text"
          id="scentPrice"
          name="scentPrice"
          placeholder="Scent Price"
          onChange={this.handleChange}
          value={scentPrice}
        />
        <label htmlFor="description">Scent Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Scent Description"
          onChange={this.handleChange}
          value={description}
        />
        <button className="button-primary">Add Cologne</button>
      </form>
    </div>
  );
}

// MORE CODE
```

## Test in browser
* Use React Developer Tool and view `AddCologne`
* Type in field and you will see that the state being populated with the field values
* But the `username` is not being populated
* **note** We want price to be a number, it defaults to `0` when the form loads but after we type it turns into a string
  - We'll need to address this at some point
  - We will soon

## Next - How do we populate the `username` field?
* We will get this from our `withSession` HOC
