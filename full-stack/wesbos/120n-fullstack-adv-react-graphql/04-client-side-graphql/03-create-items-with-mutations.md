# Create Item With Mutations
## Create Feature Branch
`$ git checkout -b feature-branch`

* Replace `feature-branch` with the name of your feature branch

## The C in Crud
* We will create an item
* We will be on the sell page
* We'll have a form that lets us enter info about our item

## Create a new Component: CreateItem
* Use VS Code to quickly create a CBC with prop types using `rcc` snippet

`components/CreateItem.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CreateItem extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return <div>CreateItem</div>;
  }
}
```

* Export at bottom (makes it easier to adjust later on)

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateItem extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return <div>CreateItem</div>;
  }
}

export default CreateItem;
```

* Add the imports we'll need

`CreateItem.js`

```
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// graphql
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// libs
import formatMoney from '../lib/formatMoney';

// custom styles
import Form from './styles/Form';

class CreateItem extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <Form>
        <h2>Sell an Item</h2>
      </Form>
    );
  }

}

export default CreateItem;
```

* Here is `Form.js`

```
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

Form.displayName = 'Form';

export default Form;
```

### Import CreateItem into Sell page and instantiate
`Sell.js`

```
import React, { Component } from 'react';

// custom components
import CreateItem from '../components/CreateItem';

class Sell extends Component {
  render() {
    return (
      <div>
        <CreateItem />
      </div>
    );
  }
}

export default Sell;
```

## Take for test drive in browser
* Click on sell page
* You should see a basic form

## Where will the data come from?
* CreateItem will have a local `state` inside it
* But we are using Apollo, we have no use for `state`? Not true
    - `state` is a great tool when you want to contain data locally
    - Before we store our data we need to store it somewhere

`CreateItem.js`

```
// MORE CODE

class CreateItem extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    title: '',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  render() {
    const { title, description, image, largeImage, price } = this.state;
    return (
      <Form>
        <fieldset>
          <label htmlFor="title">
            Title
            <input type="text" id="title" name="title" placeholder="Title" required value={title} />
          </label>
        </fieldset>
      </Form>
    );
  }
}

// MORE CODE
```

## Watch out for this common error with inputs in React
```
// MORE CODE

class CreateItem extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    title: 'Awesome Shirt',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

// MORE CODE
```

* We get this warning:

```
Warning: Failed prop type: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
```

* Why do we get this error?
    - We changed the value of our title in state and we tied our state value of title to that form field
    - If you ever tie something that is changeable in the DOM to `state` than you are in trouble because now there is two places that data lives
        1. The data lives in your text field
        2. The data lives in state too
    - **remember** - When working with React you ALWAYS want:
        + A single source of truth
        + Your data to live in one spot

## 5 steps to working with controlled forms in React
* (_It's a bit of a round about way of doing things_)
    1. You first listen for the change event on the input
    2. You intercept that event
    3. You grab the value the user had hoped they had typed
    4. Then you set that to `state`
    5. That will update the form text field

### Add our onChange handler for the textfield event
`CreateItem.js`

```
// MORE CODE

handleChange = () => {
  // why is this an arrow function?
}

render() {
  const { title, description, image, largeImage, price } = this.state;
  return (
    <Form>
      <fieldset>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            value={title}
            onChange={this.handleChange}
          />
        </label>
      </fieldset>
    </Form>
  );
}

// MORE CODE
```

### Our event handler function is a arrow function... why?
```
handleChange = () => {
  // why is this an arrow function?
}
```

* It is called an **instance property**
    - This is great because inside of that arrow function we will be able to access `this`
    - That is very important because we need to update state and that means we need to call `this.setState({})`

## What if we didn't use an arrow function?
```
handleChange() {
  // if this were a regular method
  // like it is here
  // ES6 classes do not bind regular methods to
  //  the instance of the property
}
```

* So the above is the old way to do things and it was a pain
* In order to bind doing it the old way you would need to add a constructor with `super()` and have to code it like this:

```
// MORE CODE

class CreateItem extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    title: 'Awesome Shirt',
    description: '',
    image: '',
    largeImage: '',
    price: 0,
  };

  handleChange() {
    // if this were a regular method
    // like it is here
    // ES6 classes do not bind regular methods to
    //  the instance of the property
  }

// MORE CODE
```

* So the reason that binds the method to this is we overwrite the default `this.handleChange` method and bind it with `this.handleChange.bind(this)`
* The good news is **instance properties** save us from that nightmare

## Let's log the change event
```
// MORE CODE

handleChange = (event) => {
  console.log(event); 
}

// MORE CODE
```

## Take it for a test drive in your browser
* Type in the text field and see what happens in the Chrome console
* The text is frozen and does not change
* But any letter that is typed we fire the `SyntheticEvent`
    - Lots of stuff in that event
    - We are just interested in the event **target** and it is `input#title`

## Get the event target
```
// MORE CODE

handleChange = event => {
  console.log(event.target);
};

// MORE CODE
```

* That will show the input field with every key typed

## Get the event target's value
* This is what the user types in the field

```
// MORE CODE

handleChange = event => {
  console.log(event.target.value);
};

// MORE CODE
```

* Now we see in the console what "we wish we typed" but in the input on the UI we don't see anything
* It tries to add it in the text field but React say "You can't do that!" and back spaces and removes it because you can't have your state in two places
* To fix this we just set the title to be the value of the event target like this:

```
// MORE CODE

handleChange = event => {
  const { name, type, value } = event.target;
  console.log({ name, type, value });

  this.setState({
    [name]: value,
  });
};


// MORE CODE
```

* Type in the form and now it works as expected
* We log out and destructure to get keys to make it easier to see each name, type and value (ES6 trick)
    - same as: `console.log({ name: name, type: type, value: value })`

## Problem with numbers in text fields
* We have a money field and with HTML form fields anything that comes out of them will be a `String` and if it is a String and we need it to be a number, we need to coerce it into a proper number

`const value = type === 'number' ? parseFloat(value) : value;`

* The great thing about above's line is we see if the text input is a type of number and if it is we know we need to coerce it into a number and then we use the `parseFloat(value)` does exactly that!

## Make our handleChange more resilient
* We don't want to create a handleChange event for each and every form field as that would be time consuming and hard to keep track of
* [name] - Here we are using computed property names
* We use `val` because we need to take `value` and store either a number or a string inside it and we can't change `const` values

```
// MORE CODE

handleChange = event => {
  const { name, type, value } = event.target;
  const val = type === 'number' ? parseFloat(value) : value;

  this.setState({
    [name]: val,
  });
};

// MORE CODE
```

## Take it for a test drive
* First we need to add a Price field

```
// MORE CODE

<Form>
  <fieldset>
    <label htmlFor="title">
      Title
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        required
        value={title}
        onChange={this.handleChange}
      />
    </label>
    <label htmlFor="price">
      Price
      <input
        type="number"
        id="price"
        name="price"
        placeholder="Price"
        required
        value={price}
        onChange={this.handleChange}
      />
    </label>
  </fieldset>
</Form>

// MORE CODE
```

## Test in React Dev Tools
* Search for `CreateItem` component
* Type in title and see in React Dev Tools that the title value is a string
* Copy a number and paste it into the Price and you will see in React Dev Tools that the value is a number

![number or string](https://i.imgur.com/8lndTb1.png)

## Add a textarea
* Normally you are not allow to self close a `textarea` but React is smart enough to know
* Also the `textarea` can not have a **value** prop but in React it can because we can bind that to our specific `state`
* **note** Remove any default text from the **title** `state`

```
// MORE CODE

          </label>
          <label htmlFor="description">
            Description
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter A Description"
              required
              value={description}
              onChange={this.handleChange}
            />
          </label>
        </fieldset>
      </Form>
    );
  }
}

export default CreateItem;
```

* Test in React Dev Tools and it should work as expected

## Add a submit button
`CreateItems.js`

```
// MORE CODE

        </fieldset>
        <button type="submit">Submit</button>
      </Form>
    );
  }
}

export default CreateItem;
```

* Fill in form and hit `submit`
* By default it will update our URL to have the form field values inside it like this:

`http://localhost:7777/sell?title=aaa&price=22&description=asdfasdfasdf`

### Add a submit event and submit event handler
* We don't want default form behavior
* Instead we need to listen for the submit event on this form and push it up to our server
* We will add this event handler inline be it is a short piece of code

`CreateItems.js`

```
// MORE CODE

render() {
  const { title, description, image, largeImage, price } = this.state;
  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        console.log(this.state);
      }}
    >

// MORE CODE
```

## Test it out
* Fill out form
* Press Submit
* Look at console and it will show you all values for form field

## I don't like inline code and prefer doing it this way:

`CreateItem.js`

```
// MORE CODE

handleSubmit = event => {
  event.preventDefault();
  console.log(this.state);
};

render() {
  const { title, description, image, largeImage, price } = this.state;
  return (
    <Form onSubmit={e => this.handleSubmit(e)}>

// MORE CODE
```

* Test the form again and the result should be the same as before

## Default state values - Time Saving Testing tip
* Instead of spending time typing test stuff in form fields give the `state` default values for each so the form will be `pre-filled`

`CreateItems.js`

```
// MORE CODE

class CreateItem extends Component {
  // static propTypes = {
  //   prop: PropTypes,
  // };

  state = {
    title: 'Test Title',
    description: 'Test Description',
    image: 'test-image.jpg',
    largeImage: 'test-large-image.jpg',
    price: 1000,
  };

// MORE CODE
```

* Now submit form
* You will see we are stopping our form from submitting
* And we have our `state` (see the console)

## Question: How do we get our `state` data to push to our GraphQL server?
* We do that with a Mutation

### But how do I do that with a Mutation?
* Where do I send the data? Do I send it to Mutation?

### Steps to submit data
1. Write a query that will submit the data
2. Then we need to "expose" that queries' function to our `<form>` via a Mutation component

### Write our query for the Mutation
* **remember** The best practice is to keep the Mutation in the file you are using that mutation
* **tip** Always end your Mutation or Query variable name with `_MUTATION` or `_QUERY`
    - This `tip` becomes even more valuable once we get into testing because it will let you know you have to mock it up in a specific way

#### Create our variable
`CreateItem.js`

```
// MORE CODE

// GraphQL queries
const CREATE_ITEM_MUTATION = gql``;

class CreateItem extends Component {

// MORE CODE
```

#### Export it
* We need to remember to export this so we can use it in testing and in other files

`CreateItem.js`

```
// MORE CODE

// GraphQL queries
export const CREATE_ITEM_MUTATION = gql``;

class CreateItem extends Component {

// MORE CODE
```

* We forgot to export `ALL_ITEMS_QUERY` so let's do that now

`Items.js`

* We just add the `export` below

```
// MORE CODE

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
      price
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

// MORE CODE
```

* You can do above to export it or you could also not use the export word there and do this instead

```
// MORE CODE

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
      price
    }
  }
`;

// MORE CODE

class Items extends Component {

 // MORE CODE

}

// MORE CODE

export default Items;
export { ALL_ITEMS_QUERY };

```

* I will use the latter example as it keeps all the exports in one place
  - Default exports and named exports

#### Alternate way to export a named export
`Items.js`

```
// MORE CODE

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      description
      price
      image
      largeImage
      price
    }
  }
`;

// MORE CODE

export default Items;
export { ALL_ITEMS_QUERY };

// MORE CODE
```

## Test it out
* We get an error because our GraphQL is empty

### Test out query in Playground:4444
* You need to get the data back in Playground and then you know it works
* Then you can just copy and past it into your exported GraphQL variable

#### This is what we used before:
```
mutation createGreatitem {
  createItem(
    title: "test"
    description: "testing desc"
    image: "test.jpg"
    largeImage: "testlarge.jpg"
    price: 1000
  ) {
    id
    title
  }
}
```

* But that isn't going to help us
* We need to write it in a way that it will except variables
* We can set dynamic variables in Playground

```
mutation createGreatItem($title: String!, $description: String!, $image: String, $largeImage: String, $price: Int) {
  createItem(
    title: $title
    description: $description
    image: $image
    largeImage: $largeImage
    price: $price
  ) {
    id
    title
    description
    image
    largeImage
    price
  }
}
```

* And add your `QUERY VARIABLES` in your Playground

```
{
  "title": "Playground Test Title",
  "description": "Playground Test Description",
  "image": "Playground test image",
  "largeImage": "Playground test large image",
  "price": 2000
}
```

* Hit prettify to clean it up
* Hit play to test if it works
* It should be successful and give this `output`

```
{
  "title": "Playground Test Title",
  "description": "Playground Test Description",
  "image": "Playground test image",
  "largeImage": "Playground test large image",
  "price": 2000
}
```

* Open dashboard in Prisma
* You should see your Playground test data has been entered successfully

## Paste your successful mutation inside the export query variable
`CreateItems.js`

* We set up our mutation to accept arguments

```
// MORE CODE

// GraphQL queries
export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $image: String, $largeImage: String, $price: Int!) {
    createItem(title: $title, description: $description, image: $image, largeImage: $largeImage, price: $price) {
      id
      title
      description
      image
      largeImage
      price
    }
  }
`;

class CreateItem extends Component {

// MORE CODE
```

* Remember to name the exported variable the same as the mutation name (to keep them from being anonymous)
* When we call this mutation we will pass it arguments with the specified types and they will be available as variables inside `createItem() {}`

```
// MORE CODE

// GraphQL queries
export const CREATE_ITEM_MUTATION = gql`
   mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, 

// MORE CODE
```

## Our Mutation Query is written

## Expose this CREATE_ITEM_MUTATION function to our Component
* Wrap our entire form inside the `<Mutation>` component
* Pass the Mutation component the `mutation` prop
* Set the value of the `mutation` prop to be `CREATE_ITEM_MUTATION`
* Pass the variables when the mutation runs, they can be specified in the component itself
    - The variables will be `this.state`
        + This is a time saving technique as it will send all the variables along for the ride instead of having to name each one individually
            * So this:

```
// MORE CODE

<Mutation mutation={CREATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}></Mutation>

// MORE CODE
```

* Becomes this:

```
// MORE CODE

<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}></Mutation>

// MORE CODE
```

## Just like query - The only child of a Mutation can be a function
```
// MORE CODE

<Mutation mutation={CREATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
  {(payload) => {

  }}
</Mutation>

// MORE CODE
```

* But this is different than the one before because instead of just taking a payload
    - It gives us the `mutationfunction`, `payload`
    - And instead of calling it `mutationfunction` and `payload`
    - We should call mutationfunction match up with the name of the GraphQL function on the server side `createItem`
    - Then you can destructure the `payload` similarly to before but we only need `{ loading, error }`
    - There is also `called` and `data`
        + `called` will give a boolean if its been run or not (but we don't need `called` in this case)
        + `data` gives you the data that has actually come back (but we don't need `data` in this case)

```
// MORE CODE

<Mutation mutation={CREATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
  {(createItem, { loading, error }) => {
     return jsx;
  }}
</Mutation>

// MORE CODE
```

* Now we are trying to return jsx
* But what we want to return is everything in our `form`
* We could have an explicit return like `return <p>you this is jsx</p>`
* We can replace our `{}` with parentheses `()`

```
// MORE CODE

<Mutation mutation={CREATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
  {(createItem, { loading, error }) => (
     <Form onSubmit={e => this.handleSubmit(e)}>
       <fieldset>
         <label htmlFor="title">
           Title
           <input
             type="text"
             id="title"
             name="title"
             placeholder="Title"
             required
             value={title}
             onChange={this.handleChange}
           />
         </label>
         <label htmlFor="price">
           Price
           <input
             type="number"
             id="price"
             name="price"
             placeholder="Price"
             required
             value={price}
             onChange={this.handleChange}
           />
         </label>
         <label htmlFor="description">
           Description
           <textarea
             type="text"
             id="description"
             name="description"
             placeholder="Enter A Description"
             required
             value={description}
             onChange={this.handleChange}
           />
         </label>
       </fieldset>
       <button type="submit">Submit</button>
     </Form>
  )}
</Mutation>

// MORE CODE
```

* Using `()` instead of `{}` will give us an **implicit** return
    - This is from ES6
    - It just means you can return whatever was there without using the `return` keyword

## Analyze ErrorMessage.js
`ErrorMessage.js`

```
import styled from 'styled-components';
import React from 'react';

import PropTypes from 'prop-types';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;

```

* This takes in any error that comes in
    - A singular error
    - Or an array of errors

### Apollo gives us two types of errors
#### Network Error
* Which will always have multiple errors
  - It will loop over and display each one
  - We also replace the text `GraphQL error` with an empty string `''`
* Or a singular error
  - A `p` tag with nice styles and shows us the actual error message
* We can reuse this in our entire app

### Let's use the Error in our CreateItem Form
* We import it and instantiate it

`CreateItem.js`

```
// MORE CODE

// libs
import formatMoney from '../lib/formatMoney';

// custom components
import ErrorMessage from './ErrorMessage'; // add this line

// MORE CODE

class CreateItem extends Component {

 // MORE CODE

  render() {
    const { title, description, image, largeImage, price } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={{ title, description, image, largeImage, price }}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={e => this.handleSubmit(e)}>
            <ErrorMessage error={error} /> {/* add this line */} 

// MORE CODE
```

## Let's take care of `loading`
* `loading` works different here
* We click `submit` button and it will go off to the backend (we hope quickly but it could take time depending on network and server issues) so we want to prevent the user from editing the form or hit the submit button again
    - **tip** A cool trick to prevent the user from editing the form data or resubmitting the form, you can use the `fieldset`s **disabled** attribute to **true** and it will grey out the form and prevent the form from being edited or submitted by the user
    - We can tie `loading` to this with `<fieldset disabled={loading}>`
        + So if `loading` is true, we disable the form
        + If `loading` is false our form is able to be edited and submitted

### Also add accessibility
* `aria-busy` - This tells the user if this group of fields is busy or not
    - We use `loading` on this as well
    - When both are true, it will do a form animation for us

#### How the animation works
`styles/Form.js`

```
// MORE CODE

  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

Form.displayName = 'Form';

export default Form;
```

* The `fieldset` has a `&::before` has a height of `10px` and a bg of some linear gradient
    - But if the `fieldset` also has a `aria-busy='true'` value we apply an animation using keyframes 
    - `&[aria-busy='true']::before`
    - Below is how we use keyframes in styled-components

```
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;
```

* See our animation working with this temp code:

```
// MORE CODE

<Form onSubmit={e => this.handleSubmit(e)}>
  <ErrorMessage error={error} />
  <fieldset disabled aria-busy>
    <label htmlFor="title">

// MORE CODE
```

* This animation is great because Apollo will be taking care of it for us because we just tap into the `loading` property it gives us
* Put the form back to:

```
// MORE CODE

<fieldset disabled={loading} aria-busy={loading}>

// MORE CODE
```

## Finally, take care of the actual `submit`
* Currently, if we submit we just get a `console.log(this.state)`
* Because we are waiting for the server we will use a Promise and make that Promise look nice using `async/await` with:

```
// MORE CODE

handleSubmit = async event => {
  event.preventDefault();
  // console.log(this.state);
  const res = await createItem();
  console.log(res);
};

// MORE CODE
```

* Test it out and submit the form
* We get an error because `createItem()` is not defined
* We need to pass the method to our event handler like this:

```
// MORE CODE

handleSubmit = async (event, createItem) => {
  event.preventDefault();
  // console.log(this.state);
  const res = await createItem();
  console.log(res);
};

// MORE CODE
```

* Test the form
* You will see a data object in the console
* Expand it to see:

![data object expanded](https://i.imgur.com/UqjA4e3.png)

### View in Prisma dashboard
* Open the Item collection and you will see your new data that was added via your form

### Redirect
* We want to programmatically redirect user to single page after item successfully created

#### next/router
`CreateItem.js`

```
// MORE CODE

import Router from 'next/router'; // add this

// MORE CODE

class CreateItem extends Component {

   // MORE CODE

  handleSubmit = async (event, createItem) => {
    // stop the from from submitting
    event.preventDefault();
    // call the mutation
    const res = await createItem();
    // change them to the single item page
    console.log(res);
    // we add the Router here!!!!
    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id },
    });
  };

// MORE CODE
```

### Test it out
* Submit the form and it will take you to single page
* **note** We will revisit this when we tackle **pagination** as an issue will develop that we will need to address

## IT 13
1. Check Status
2. Add to staging
3. Commit with useful commit message
4. Push Branch to Origin
5. Create PR on Origin
6. Code Review on Origin
7. Merge to master branch on Origin (or reject and don't merge)
8. Locally check out of feature branch and into master branch
9. Fetch locally
10. Git Diff to see changes
11. Pull Locally
12. Run and test code
13. Delete local branch

## Next - images
* We'll learn how to interface with external upload APIs (We'll use cloudinary)
