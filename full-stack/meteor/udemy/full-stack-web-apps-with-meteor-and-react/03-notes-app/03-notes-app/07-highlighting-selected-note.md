# Highlighting Selected Note
* We want to make sure the individual items know if they are the selected note
    - This will enable them to add custom styles to themselves
    - Or leave themselves in the default state if they are not selected

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

`NoteList`

* We need to get the value for `selectedNoteId`

```
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

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

* shut down test
* run meteor
* click on notes and you will see that selected appears (eventually we'll add a dynamic css class)
* We have a problem
    - Refresh page and the URL stays the same the we lose the selected text because we did not set the session

`routes.js`

import session named export

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

Finished `routes.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Session } from 'meteor/session';

// import App from './../imports/ui/components/App';

import Signup from './../ui/components/Signup';
import Dashboard from './../ui/components/Dashboard';
import NotFound from './../ui/components/NotFound';
import Login from './../ui/components/Login';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
};
const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    // console.log(nextState);
    Session.set('selectedNoteId', nextState.params.id);
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if public page and logged in - let them in
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    // if private page and not logged in - kick them out
    browserHistory.replace('/');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} />
    <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterNotePage} />
    <Route path="*" component={NotFound} />
  </Router>
);
```

`$ add .`

`$ commit -m 'Mark selected note in list'`
