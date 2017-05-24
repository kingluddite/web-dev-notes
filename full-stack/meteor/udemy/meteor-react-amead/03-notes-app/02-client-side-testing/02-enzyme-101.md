# Enzyme 101
`Header`

## How we can test things about this Component?
* Can we test that the title on a page shows up in the proper location? Yes!

## Enzyme
* [Documentation](https://github.com/airbnb/enzyme)
* We will be using Enzyme with Mocha

**note** Shut down your current `Test` running

### Install Enzyme
`$ yarn add -D enzyme`

### You also have to install `react-addons-test-utils`

`$ npm i --save-dev react-addons-test-utils`

## Create first Client-side test cases
**note** Not all Components get tested (_some are too simple_)

### Create Header test file
`$ touch imports/ui/components/Header.test.js`

#### `mount()`
* Enables us to mount our Components to the DOM
* Then we can assert stuff about them
    - `mount()` takes a single argument - **JSX**
    - Any time we test a React Component we will be calling `mount()`

### Test #1 - Simple Introduction
Does our Login button have text that says `Login`?

This is a useless test but gives you an idea how it works

`Header.test.js`

```
/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Header from './Header';

if (Meteor.isClient) {
  describe('Header', function() {
    it('should set button text to logout', function() {
      const wrapper = mount( <Header title="Test Title" /> )

      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });
  });
}
```

### Run Test
`$ npm test`

* Our simple test passes

### Make the test fail
* Change `Logout` text to something else and it will fail our test

### Test #2
Create test to ensure `title` is used and placed inside an `h1`

```
/* eslint-env mocha */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import Header from './Header';

if (Meteor.isClient) {
  describe('Header', function() {
    it('should set button text to logout', function() {
      const wrapper = mount( <Header title="Test Title" /> )

      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should have h1 with title', function () {
      const title = 'Test title';
      const wrapper = mount( <Header title={title} /> );

      const h1Text = wrapper.find('h1').text();

      expect(h1Text).toBe(title);  
    });
  });
}
```

If you alter `Header.js` with `<h1 className="header__title">{props.title}a</h1>` (_Added `a` after the title_)

* You'll see our test fails
* But if you remove the **a**, our test will pass
