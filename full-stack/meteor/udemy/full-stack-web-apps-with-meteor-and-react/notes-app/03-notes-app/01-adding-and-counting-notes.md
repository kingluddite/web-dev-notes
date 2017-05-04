# Adding and Counting Notes
## Two Goals
1. Get a button on the screen that adds a new note
    * Does not require you to provide any information about the note
    * Our Meteor Method takes no arguments we just need to call the method
        - We do not need to provide a title or body on the fly
        - We'll edit those after the note gets created
2. Show a count
    * Count all the notes in the Database so that when we click a button a note gets added

### We'll learn
* New ways to use `createContainer()`
    - We'll be subscribing and fetching data inside that function

## Create two new Components
* `NoteList`
    - `NoteListHeader`
        + Goes inside NoteList
            * Shows things like:
                - filtering options
                - our button for adding a new note

## `NoteList`
* Will be Stateless functional component
* Will use `createContainer()`

```
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
    return (
      <div>
        <NoteListHeader />
        NoteList
      </div>
    );
};

  // export default NoteList;

export default createContainer(() => {
  // we want to fetch the notes from here  
}, NoteList );
```

## What we need to do
```
export default createContainer(() => {
  // we want to fetch the notes from here 
  // 1. subscribe to the subscription (we set up in notes.js) 
}, NoteList );
```

Here is our publication in notes.js
![notes publication](https://i.imgur.com/XMHLPoA.png)

* We have to subscribe to that in order to ever get notes back

```
return {
     // keys in here end up being props on Component
     // we need to access our API to get access to notes so we import it up top
     notes: Notes.find().fetch()
  };
```

* Notes.find() will return an unfiltered collection of all our notes
* The subscription makes sure only notes the user owns can be in this Collection
* We use Notes.find().fetch() to get an array and we store that array inside the `notes` key which passes in the array of notes into our Component and we can access them by `props.notes` (We are using a Stateless functional component so that accesses props via `props.notes` but if were using a class-based Component that would access props via `this.props.notes`)

`NoteListHeader.js`

```
import React, { Component } from 'react';

class NoteListHeader extends Component {
  render() {
    return (
      <div>
        NoteListHeader
      </div>
    );
  }
};

export default NoteListHeader;
```

`NoteList.js`

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from './../../api/notes';

import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
    return (
      <div>
        <NoteListHeader />
        NoteList { props.notes.length }
      </div>
    );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};


export default createContainer(() => {
  // 1. subscribe to the subscription (we set up in notes.js)
  Meteor.subscribe('notes');

  // we want to fetch the notes from here
  return {
     // keys in here end up being props on Component
     // we need to access our API to get access to notes so we import it up top
     notes: Notes.find().fetch()
  };
}, NoteList );
```

## Use NoteList inside Dashboard
* We don't need to pass `<NoteList />` the `notes` prop because we used a Container and it will pass the `notes` array into NoteList for us

`Dashboard.js`

```
import React from 'react';

import Header from './Header';
import NoteList from './NoteList';

export default () => {
      return (
        <div>
          <Header title="Your Links" />
          <div className="page-content">
            <NoteList />
          </div>
        </div>
      );
}
```

Log in and you should see:

![NoteList count](https://i.imgur.com/XDOEuxp.png)

## Goal #2 - Button that creates new notes
* With each new note the NoteList count should automatically be incremented
* Our `createContainer()` code acts like it is inside of `Tracker.autorun()`, so as the query changes, the code re-runs, re-rendering NoteList above
* If we are going to use the `Notes` Collection we should also import `notes.js` into our `server/main.js`

`server/main.js`

```
import { Meteor } from 'meteor/meteor';

import './../imports/api/users';
import './../imports/api/notes'; // add this line
import './../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

});
```

## Exercise
Convert NoteListHeader to a Container Component

Convert the code below by following these instructions:

1. Create **NoteListHeader** `stateless function Component`
2. Render a **button** to the screen '**Create Note**'
3. Setup `onClick` handler for **button**
4. `props.meteorCall` trigger `notes.insert` method
5. Render container Component inside `NoteList`

```
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class NoteListHeader extends Component {
  render() {
    return (
      <div>
        NoteListHeader
      </div>
    );
  }
};

export default createContainer(() => {
  return {
     meteorCall: Meteor.call 
  };
}, NoteListHeader);
```

<details>
  <summary>Solution</summary>
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

* Make sure to import and add an instance of `<NoteListHeader />` to `NoteList`
</details>

