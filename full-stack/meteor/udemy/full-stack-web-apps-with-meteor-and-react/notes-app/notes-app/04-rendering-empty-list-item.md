# Rendering Empty List Item
With Meteor running let's clear our collection

`$ meteor mongo`

Empty the collection

`> db.notes.remove({})`

## Exercise
1. Create new file named `NoteListEmptyItem`
    * This will show when there are no notes
    * Setup default export for Stateless functional component
    * Make up some text that will appear when no notes exist
    * Setup `NoteList` to render empty note message when notes array is empty

<details>
  <summary>Solution</summary>
`NoteListEmptyItem.js`

```
import React from 'react';

export default () => {
   return (
     <div>
       <h1>There are currently no notes. Feel free to add one</h1>
     </div>
   )
};
```

`NoteList.js`

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from './../../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {

    const renderNotes = props.notes.map((note) => {
       return <NoteListItem key={note._id} note={note} />;
    });

    return (
      <div>
        <NoteListHeader />
        {(props.notes.length === 0) ? <NoteListEmptyItem /> : undefined }
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

* Test with no notes you should see the `NoteListEmptyItem` Component and when you add a note you should see the notes. Remove the notes using the Mongo shell and they should come back
</details>

## Write test cases for `NoteList` Component
### First Test
When there are notes in the **notes** array we do get items rendered to the screen

### Second Test
When there are no notes in the **notes** array, if that occurs there should be zero instances of `NoteListItem` and one instance of `NoteListEmptyItem`


### Some fix ups
If you use React tools in Chrome you'll see `<Unknown />` like this:

![unknown](https://i.imgur.com/jYmETRV.png)

But if we change the code like this, React Tools will [give us better info](https://i.imgur.com/5g2G5uo.png):

```
import React from 'react';

import Header from './Header';
import NoteList from './NoteList';

export default Dashboard = () => {
      return (
        <div>
          <Header title="Dashboard" />
          <div className="page-content">
            <NoteList />
          </div>
        </div>
      );
}
```

### Digging into React structure
* `MeteorDataContainer` is a Component
    - `Header` is a nested Component

Add 4 notes and check out React tab again. Look for NoteList Component

![NoteListItem](https://i.imgur.com/eIPWLTv.png)

* enzyme gives us a way to check that `NoteList` renders `n` instances of a given Component
* But things get more difficult when we have no notes
    - Observe what happens when you use Mongo shell to remove all notes

* `<Unknown>` and `<StatelessComponent>` - You may see either one. It is a Component that was created completely anonymously
* This is problematic for testing but we can improve it by changing this:

`NoteListEmptyItem.js`

```
import React from 'react';

export default () => {
   return (
     <div>
       <h1>There are currently no notes. Feel free to add one</h1>
     </div>
   )
};
```

To this:

```
import React from 'react';

const NoteListEmptyItem = () => {
   return (
     <div>
       <h1>There are currently no notes. Feel free to add one</h1>
     </div>
   )
};

export default NoteListEmptyItem;
```

* This is slightly more verbose but is makes things for testing easier to manage

![nicer code structure](https://i.imgur.com/jBZxcLo.png)

`NoteList.test.js`

* Grab the usual 4 imports we use for testing from another file and paste at the top

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
```

* Import the named export `NoteList`
* This is very important if you accidentally import the default export, your test won't work

`import { NoteList } from './NoteList';`

## Add check for client and describe block
```
if (Meteor.isClient) {
  describe('NoteList', function() {
      
  });
}
```

* We name our describe block after our Component

### First test
* See what happens when we do pass notes into NotesList
* We need dummy data to make it look realistic to match up with those props

```
// more code
const notes = [
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

if (Meteor.isClient) {
// more code
```

```
// more code
if (Meteor.isClient) {
  describe('NoteList', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {

    });
  });
}
```

* Shut down mongo
* Shut down meteor
* Run test suite

It should pass the test but if you add another `<NoteListEmptyItem />` like this:

```
  return (
      <div>
        <NoteListHeader />
        {(props.notes.length === 0) ? <NoteListEmptyItem /> : undefined }
        <NoteListEmptyItem />
        {renderNotes}
        NoteList { props.notes.length }
      </div>
    );
```

* You will get a fail because it expects 0 and it got 1 instance

## Ex
* You will pass in an empty array as the notes prop
* You don't want to use the dummy `notes` array we used to test
* This test case is trying to see what happens when the array is empty
* There should be zero instances of `NoteListItem` because there are no notes in the array
* There should be one instance of `NoteListEmptyItem`

<details>
  <summary>Solution</summary>
```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

const notes = [
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

if (Meteor.isClient) {
  describe('NoteList', function() {

    it('should render NoteListItem for each note', function() {
      const wrapper = mount(<NoteList notes={notes} />);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', function() {
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
}
```
</details>

Test and second NoteList test should pass

`$ git add .`

`$ git commit -m 'Render empty item if no notes`

`$ git push`
