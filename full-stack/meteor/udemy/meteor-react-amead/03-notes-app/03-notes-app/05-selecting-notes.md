# Selecting Notes

![Mockup/wireframe](https://i.imgur.com/zTxV7wN.png)

* Focusing on Editor area
    - Be able to change:
        + `title`
        + `body`

* **Add note** button on left hand side
* List of notes (**already have**)
* On the right will be area asking us to pick a note

## When we select on note three things happen
1. We have a visual indicator of which note is selected
    - We'll apply a custom class to indicate that the todo note is currently selected
2. The URL is currently updated
    - `localhost:3000/dashboard/ad830dld`
    - we have some `id` at the end of the `URL`
    - you can bookmark and share that link
3. The entire editor area showed up
    - `title` - you can change it
    - `body` - you can change it

* No save button
* <u>All three points mentioned above will be handled by a single Meteor Session variable</u>
    - It will be called `selectedNoteId`
        + It will be equal to the string `_id` of the currently selected note
        + By default it will be `undefined`
            * There will be no `_id` in the URL
            * No selected item in the notes list
            * Editor area will say **'pick a note to get started'**
        + When there is a note for that Session
            * We'll update URL to contain that notes `_id`
            * We'll highlight that based on some CSS in notes list
            * We'll show editor for that note

## Set up our Session
`client/main.js`

**note** make sure you add these imports at the top:

```
import { Session } from 'meteor/session';
import { browserHistory } from 'react-router';
```

```
// more code
Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
```

## Separate Tracker.autorun()
* Watch for a change in `selectedNoteId` and when it does change update the URL
    - So when a note gets picked, the URL changes to have that note `_id` inside of it

```
Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});
```

* The above code handles all three points mentioned above
* We just created a new route so we need to set that up inside `routes.js`

`routes.js`

```
export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage} />
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
    <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage} />
    <Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterPrivatePage} />
    <Route path="*" component={NotFound} />
  </Router>
);
```

* When we want to set up URL parameters we use `:some-value`
    - `<Route path="/dashboard/:id" component={Dashboard} onEnter={onEnterPrivatePage} />`
    - Now we have access to anything after last forward slash and we'll get that access through a variable called `id`
    - So if someone visits that page we can fetch that `id` and show that **note** to the screen

## Handle note click
* When you **click** on `note` we want to show that `note` and update the **URL**
    - To do this we just have to use `Session.set()`

Normally we would do something like this:

`NoteListItem`

```
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

const NoteListItem = (props) => {
   return (
    <div onClick={() => {
      Session.set()
    }}>
      <h5>{ props.note.title || 'Untitled Note' }</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
    </div>
   );
 };

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;
```

But that would be hard to test so to facilitate this we will add a Container

```
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListItem = (props) => {
   return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5>{ props.note.title || 'Untitled Note' }</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
    </div>
   );
 };

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, NoteListItem);
```

Now when you click on either note, the URL will update with the note `_id` appended
