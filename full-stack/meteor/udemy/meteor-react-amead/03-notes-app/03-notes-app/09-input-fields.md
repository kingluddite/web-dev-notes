# Editor Input and Textarea
* input for title
* textarea for body
* button to remove whatever note is currently shown

* We won't use a form
* The fields will be automatically updating the Database

```
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { Notes } from './../../api/notes';

export class Editor extends Component {
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }

  render() {

    if (this.props.note) {
      return (
        <div>
          <input type="text" />
          <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
          <button>Delete Note</button>
        </div>
      )
    } else {
      return (
        <p>
          { this.props.selectedNoteId ? 'Note note found.' : 'Pick or create a note to get started.'}
        </p>
      )
    }

  }
};

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);
```

* Select a note
* Type in the text area
    - Click another note, text disappears
    - Click same note again and text returns
    - Refresh page and note remains
    - This shows we saved it persistently to the Database

## Exercise
Go through same steps for the `input`

<details>
  <summary>Solution</summary>
```
// more code
export class Editor extends Component {
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }

  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }

  render() {

    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder="Note Title" type="text" onChange={this.handleTitleChange.bind(this)} />
// more code
```
</details>

* You can not type in input and you'll see the text appear and remain
* Changing the title input changes the title in the notes list

`$ git status`

`$ git add .`

`$ git commit -m 'Setup editor to change title/body'`
