## We need to convert `Login.js` to use `createContainer`
### 1. Import it

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data'; // add this line
```

### 2. Restructure the Exports for Login
We want to export both Components

* We want to export the regular react Component that we originally wrote but now we convert it from the default export to a named export
* We also want to export the **Containerized** version
  - This will have inside it
      + data from the database
      + or functions that it needs
  - Takes two arguments
    + first one is your function
      * Do with this whatever you like
        - Query the Database
        - Access or set Session variables
        - This function is reactive (_so if there is a change this function will automatically re-run_)
    + The second argument is the Component that you are trying to **Containerize**
        - Inside this will be an object that will eventually be added onto the `props` in the Component up above

`export class Login extends Component {`

And at the bottom of `Login.js` make this code update:

```
export default createContainer(() => ({
  //
}), Login);
```

## 3. Tell container what's inside it 
#### Example of setting our object
```
export default createContainer(() => ({
  name: 'Joe',
}), Login);
```

That will give our Component access to the `name` prop and the value will be the string `Joe`

In this case we want to override `Meteor.loginWithPassword()`

We are calling `Meteor.loginWithPassword()` and we want to inject that instead

```
export default createContainer(() => ({
  loginWithPassword: Meteor.loginWithPassword,
}), Login);
```

* Now instead of actually using `Meteor.loginWithPassword()` in the Component all we have to do is access the `prop`
* Be careful not to do this: `loginWithPassword: Meteor.loginWithPassword(),` as that will generate an error
  - YOU DO NOT WANT TO CALL THE FUNCTION INSIDE THE CONTAINER
  - YOU JUST REFERENCE THIS FUNCTION INSIDE THE CONTAINER

## 4. Update our Component with new `props`
And we update:

`Meteor.loginWithPassword({ email }, password, (err) => {`

To this:

`this.props.loginWithPassword({ email }, password, (err) => {`

* Behind the scenes nothing is changing but this makes our component way easier to test
  - We'll be able to inject those `spys`
  - And make sure `spys` are called or not called depending on the actions we take in the test file

## 5. Set up PropTypes
First import them

```
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types'; // add this line
```

Then add them (_we are expecting a function_)

```
Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired,
};
```

* Now we are finished making changes to `Login.js`
* Save and test and make sure it is working like it did before
* We first test if our Component is working in Development
  - You should be able to login to your app
  - If you can it means our Login Component is working as expected
* When that works, we shut down our dev server and start up our testing suite

### Shut Down Development Server `ctrl` + `c`

### Start Up Testing Suite `$ npm run test`

* We create a new test file `Login.test.js`
* We add are usual test imports
  - `{ Meteor }`
  - `React`
  - `expect`
  - `{ mount }`
* We also add comments to turn off errors we don't want to see from eslint when testing with Mocha

```
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
```

### Test only on client
```
if (Meteor.isClient) {
  //
}
```

### Set up our describe block
```
describe('Login', function() {
  //
});
```

* Typical to name describe blocks after Component name

### Write our first Test Case
Make sure setting the error `state` on our Component works correctly

`Login.js`

```
// more code
this.state = {
  error: '',
};
// more code
```

* We'll set an error message and make sure it shows up inside a paragraph tag
* Make sure that when we clear that error that paragraph goes away

```
// more code
import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const wrapper = mount(<Login loginWithPassword={loginWithPassword} />)
    });
// more code
```

* We import the `non-containerized` version of Login (the named export)
* We know Login now takes required `prop` of `loginWithPassword`
  - This particular test case does not care if `loginWithPassword` gets called so we don't need to pass it a `spy` because we won't use it in our assertions
  - Instead we pass and empty function
  - `const wrapper = mount(<Login loginWithPassword={() => {}}/>)`

* Now we need to set state on a component
* We'll set it equal to our `error` variable
* And also verify that the paragraph tag is showing up correctly
* [Enzyme gives us an API for this](http://airbnb.io/enzyme/docs/api/)
  - We want to check out the [Full DOM Rendering](http://airbnb.io/enzyme/docs/api/mount.html) section
  - We will be using `setState` [enzyme setState](http://airbnb.io/enzyme/docs/api/ReactWrapper/setState.html)

```
// more code
if (Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const error = 'Test Error Message';
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);

      wrapper.setState({ error });
    });
// moer code
```

## Exercise
* Select wrapper p tags
* Get text value
* Expect it to equal `error` variable

<details>
  <summary>Solution</summary>
```
it('should show error messages', function () {
  const error = 'Test Error Message';
  const wrapper = mount(<Login loginWithPassword={() => {}}/>);

  wrapper.setState({ error });
  const errorText = wrapper.find('p').text();

  expect(errorText).toBe(error);

  wrapper.setState({ error: '' });
  expect(wrapper.find('p').length).toBe(0);
});
```
</details>
