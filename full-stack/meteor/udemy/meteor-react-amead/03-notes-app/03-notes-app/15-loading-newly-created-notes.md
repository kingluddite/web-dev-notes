# Loading Newly Created Notes

## Sorting our Notes
By `updatedAt`

`NoteListComponent`

```
// more code
export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  // 1. subscribe to the subscription (we set up in notes.js)
  Meteor.subscribe('notes');

  // we want to fetch the notes from here
  return {
     // keys in here end up being props on Component
     // we need to access our API to get access to notes so we import it up top
     notes: Notes.find().fetch().map((note) => {
       return {
         ...note,
         selected: note._id === selectedNoteId
       };
     })
  };
}, NoteList );
```

We will update this line: `notes: Notes.find().fetch().map((note) => {`

* MongoDB has documentation that is different than how to sort when using Meteor. [Here is a good reference](http://meteor.hromnik.com/blog/how-to-sort-collections-in-meteor) to show you how to sort with Meteor
* We want to sort so that the note we most recently updated is at the top of our notes list

`NoteList`

```
export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {

     notes: Notes.find({}, {
       sort: { updatedAt: -1 }
     }).fetch().map((note) => {
       return {
         ...note,
         selected: note._id === selectedNoteId
       };
     })
  };
}, NoteList );
```

* Notes.find({}, {})
    - That first argument (is an object) makes sure we still return our entire notes Collection
    - The second argument (is an object) where we can customize our query

### Test in Browser
* The most recently modified note is now at the top
* Make some new notes, modify notes, watch the list update

## Houston we have a problem
* When you create a note:
    - The note is not selected
    - The URL doesn't change
    - Our old note data still shows up inside the input and textarea
    - This is not good and bad design - doesn't make much sense

### What should happen when we create a new note
* The URL should update with the id of the new note
* The input and text area should be empty
* That new note should be selected

`NoteListHeader`

* We will provide a callback function
* We'll use Session so import it:

`import { Session } from 'meteor/session';`

That means we have to update our Container

```
export default createContainer(() => {
  return {
     meteorCall: Meteor.call,
     Session,
  };
}, NoteListHeader);
```

and our PropTypes

```
NoteListHeader.propTypes = {
   meteorCall: PropTypes.func.isRequired,
   Session: PropTypes.object.isRequired
};
```

So change this:

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
   const handleButtonClick = () => {
      props.meteorCall('notes.insert');
   }
   return (
     <div>
       <button onClick={handleButtonClick}>+ Add Note</button>
     </div>
   );
};

NoteListHeader.propTypes = {
   meteorCall: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
     meteorCall: Meteor.call
  };
}, NoteListHeader);
```

And our code that will grab the note id from the new note (from **res** (result)) To this:

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
   const handleButtonClick = () => {
      props.meteorCall('notes.insert', (err, res) => {
        if (res) {
          props.Session.set('selectedNoteId', res);
        }
      });
   }
   return (
     <div>
       <button onClick={handleButtonClick}>+ Add Note</button>
     </div>
   );
};

NoteListHeader.propTypes = {
   meteorCall: PropTypes.func.isRequired,
   Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
     meteorCall: Meteor.call,
     Session,
  };
}, NoteListHeader);
```

## Add Test
To make sure Session.set gets called correctly

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { notes } from './../../fixtures/fixtures';

import { NoteListHeader } from './NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader', function() {
    let meteorCall;
    let Session;

    beforeEach(() => {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      };
    });

    it('should call meteorCall on click', function() {
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });
  });
}
```

## Next test
When we pass in an error and no response, the `spy` never gets called

```
it('should not set session for failed insert', function() {
      const wrapper = mount( <NoteListHeader meteorCall={meteorCall} Session={Session} />);

      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1]({}, undefined);

      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
```

* All 24 tests should be passing on the Client

`$ git status`

![git status](https://i.imgur.com/ye9OI4L.png)

`$ git commit -a -m 'Select newly created note. sort notes by updatedAt'`

`$ git push`
