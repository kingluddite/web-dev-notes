# Rendering Notes
* We will focus on rendering something for each note
* Will be a clickable list
* The note you click will be the note you see over in the editor
* We'll write test cases for:
    - `NoteListHeader`
    - And for a new component yet to be created

`NoteListItem.js`

* Will render 1 time for every note in the Database

```
import React from 'react';
import moment from 'moment';
 
 export default (props) => {
   return (
    <div>
      <h5>{ props.note.title || 'Untitled Note' }</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
    </div>   
   );
 };
```

* We need to use PropTypes so we'll need to export a name so we'll change the above code to:

```
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const NoteListItem = (props) => {
   return (
    <div>
      <h5>{ props.note.title || 'Untitled Note' }</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YYYY  ') }</p>
    </div>
   );
 };

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;
```

## Exercise
* In `NoteList.js` use `.map()` method to convert notes array into JSX array
* Make sure to also pass in the `key` prop
* Setup **note** `prop`

<details>
  <summary>Solution</summary>
```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from './../../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {

    const renderNotes = props.notes.map((note) => {
       return <NoteListItem key={note._id} note={note} />;
    });

    return (
      <div>
        <NoteListHeader />
        {renderNotes}
        NoteList { props.notes.length }
      </div>
    );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
     notes: Notes.find().fetch()
  };
}, NoteList );
```

![rendered notes](https://i.imgur.com/lJfGysj.png)
</details>

## Test `NoteListItem`
`NoteListItem.test.js`

* We'll pass in an **object** to the Component
* That will be the **note** `prop`
* Make sure the **title** shows up in a `h5`
* Make sure **timestamp** shows up in `p`

```
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PresentationsListItem from './PresentationsListItem';

if (Meteor.isClient) {
  describe('PresentationsListItem', function () {

  });
}
```

### Time to write our test cases
1. Confirms when we pass in a **title** and **updatedAt** properties that they get rendered to page in a `h5` and `p`
2. If we don't pass in a **title**, that '**Untitled note**' will get rendered to the page inside an `h5` tag

* We need to use `moment` in console to get **timestamp**
    - This is just one of many ways to generate a **timestamp**

`> require('moment')().valueOf()`

`< 1493705539257` (_timestamp number moment generated for me_)

### Alternate way to get timestamp
`> new Date().getTime()` (_1493705675548_)

Grab your generated **timestamp** and paste it in your code:

`const updatedAt = 1493705539257;`

* Take note of your personal date, time and year

```
// more code
it('should render title and timestamp', function() {
  const title = 'My Title Test';
  const updatedAt = 1493705539257;
  const wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> );

  expect(wrapper.find('h5').text()).toBe(title);
  expect(wrapper.find('p').text()).toBe('5/01/2017');
});
// more code
```

## Exercise
* Pass in a **title** but it will be an empty string
* Make sure the output **title** (_inside `h5`_) is **'Untitled Note'**

<details>
  <summary>Solution</summary>
```
it('should set default title if not title set', function() {
       const title = '';
       const updatedAt = 1493705539257;
       const wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> );

       expect(wrapper.find('h5').text()).toBe('Untitled Note');
    });
```
</details>

## Final Code
```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function() {

    it('should render title and timestamp', function() {
      const title = 'My Title Test';
      const updatedAt = 1493705539257;
      const wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> );

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('5/01/2017');
    });

    it('should set default title if not title set', function() {
       const title = '';
       const updatedAt = 1493705539257;
       const wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> );

       expect(wrapper.find('h5').text()).toBe('Untitled Note');
    });
  });
}
```
