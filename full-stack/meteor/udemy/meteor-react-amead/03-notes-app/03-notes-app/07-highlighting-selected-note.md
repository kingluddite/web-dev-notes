# Highlighting Selected Note
* We want to make sure the individual items know if they are the <u>selected note</u>
    - This will enable the individual items to add custom styles to themselves
    - Or leave themselves in the default `state` if they are not selected

We added this inside of `routes.js`

`<Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterPrivatePage} />`

* This enables us to add a note `_id` in the URL
* Inside of `onEnter` for this route we will set the Session value for `selectedNoteId`
    - That will insure that when a user visits the URL with an `_id` that note gets selected in the sidebar and it gets shown in the editor (_so we can make changes to that note_)

`NoteListItem`

```
// more code
<h5>{ props.note.title || 'Untitled Note' }</h5>
{ props.note.selected ? 'selected' : undefined }
<p>{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
// more code
```

`NoteList.js`

* We need to get the value for `selectedNoteId`

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session'; // add this line

// more code

// update the rest of this code
export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
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

1. Shut down test `ctrl` + `c`
2. run meteor `$ meteor`
3. Click on **notes** on the screen and you will see that the word **selected** appears (_eventually we'll add a dynamic css class_)

### House we have a problem - We forgot to set the session
Refresh page and the URL stays the same but we lose the selected text because we did not set the session

`routes.js`

Import session named export

`import { Session } from 'meteor/session';`

Create new variable

```
const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    // console.log(nextState);
    Session.set('selectedNoteId', nextState.params.id);
  }
};
```

update route

`<Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage} />`

Update the following in `routes.js`

```
import { Meteor } from 'meteor/meteor';
// more code
import { Session } from 'meteor/session';

// more code

const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    // console.log(nextState);
    Session.set('selectedNoteId', nextState.params.id);
  }
};

// more code
    <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage} />
// more code
```

`$ add .`

`$ commit -m 'Mark selected note in list'`
