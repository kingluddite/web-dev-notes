# Text Fixtures
* Figure out a better way to structure our test data
* We need our dummy data in multiple files (like our notes array in `NoteList.test.js`)
    - We will break it out as a `fixture` (_aka test fixture_)
    - Just a fancy word for `sample test data`

`imports/fixtures/fixtures.js`

* `fixtures` is common name for fixtures folder

```
export const notes = [
  {
    _id: 'noteId1',
    title: 'Test title',
    body: '',
    updatedAt: 0,
    userId: 'userId1'
  },
  {
    _id: 'noteId2',
    title: 'Test title',
    body: 'Some body content',
    updatedAt: 0,
    userId: 'userId2'
  }
]
```

* Remove the code from `NoteList.test.js` and import it instead

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

import { notes } from '../../fixtures/fixtures';
// more code
```

* shut down meteor and run test suite
* test to make sure we didn't break the test list

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { notes } from './../../fixtures/fixtures';
import { NoteListItem } from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function() {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', function() {
      const wrapper = mount( <NoteListItem note={notes[0] } Session={Session} /> );

      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('5/01/2017');
    });

    it('should set default title if not title set', function() {
       const wrapper = mount( <NoteListItem note={ notes[1] } Session={Session} /> );

       expect(wrapper.find('h5').text()).toBe('Untitled Note');
    });

    it('should call set on click', function() {
      // Render NoteListItem using either note and Session
       const wrapper = mount( <NoteListItem note={ notes[0] } Session={Session} />);
      // Find div and simulate click event
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
      // Expect Session.set to have been called with some arguments
    });
  });
}
```

`$ git add .`

`$ git commit -m 'Integrate selectedNoteId into list items and url'`

`$ git push`
