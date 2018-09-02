# Make AddGenealogy stateful
* `Signin` and `Signup` were stateful components because we needed them to handle `onChange` and `onSubmit`

## 5 steps to Convert from SFC to CBC (Class based stateful component)
1. wrap parentheses in curly braces
2. prefix parentheses with a `return()`
3. wrap `return()` in a `render() {}`
4. change `const` to `class`
5. Change `= () =>` to `extends React.Component`

`AddGenealogy.js` (before conversion)

```
import React from 'react';

const AddGenealogy = () => (
  <div className="App">
    <h2 className="App">Add Genealogy</h2>
   // MORE CODE
    </form>
  </div>
);

export default AddGenealogy;

```

`AddGenealogy.js` (after conversion)

```
import React from 'react';

class AddGenealogy extends React.Component {
  render() {
    return (
      <div className="App">
       // MORE CODE
      </div>
    );
  }
}

export default AddGenealogy;
```

## Create a state object
```
// MORE CODE
class AddGenealogy extends React.Component {
  state = {};
  
  render() {
    // MORE CODE
```

## Add event handler
* grab the target `event.target`
* destructure the `name` and `value` off the event target

```
// MORE CODE
class AddGenealogy extends React.Component {
  state = {};

  handleChange = event => {
    const { name, value } = event.target;
    console.log(name, ':', value);
  };
  // MORE CODE
```

## Test
* `http://localhost:3000/genealogy/add`
* Enter fields and see the values are output in console

## set all states to empty values
```
import React from 'react';

class AddGenealogy extends React.Component {

state = {
  firstName: '',
  lastName: '',
  description: '',
  username: '',
};

// MORE CODE
```

* You could set a default value too:

```
state = {
  firstName: '',
  lastName: '',
  category: 'Breakfast'
};
```

## Set state
* When fields are filled in we'll set the `state` we'll use [brackets] to dynamically update the property based on the `name` of the input that we are typing in as well as the corresponding `value`

## Test
* Use react dev tools to view `AddGenealogy` component
* Type in fields and watch the state populate with the value typed in the fields

`AddGenealogy`

```
handleChange = event => {
  const { name, value } = event.target;
  // console.log(name, ':', value);
  this.setState({
    [name]: value,
  });
};
```

## Destructure and pass value to fields

```
// MORE CODE

render() {
  const { firstName, lastName, description } = this.state;
  return (
    <div className="App">
      <h2 className="App">Add Genealogy</h2>
      <form className="form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={this.handleChange}
          value={firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={this.handleChange}
          value={lastName}
        />
        <textarea
          name="description"
          placeholder="Add Description"
          onChange={this.handleChange}
          value={description}
        />
        <button type="submit" className="button-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

// MORE CODE
```

## Next - How do we populate the username field?
* We will get this from our `withSession` HOC
