# Testing the Editor
* Simulate a change event on an input

## Create `Editor.test.js`

```
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from '/.Editor';
import { notes } from '../../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function() {
    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy();
      browserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick note message', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');  
    });

  });
}
```

That should pass the Editor's `should render pick note message`

## Exercise
### Next test
verify when we don't have a note but we do have a selectedNoteId 'Note not found'

<details>
  <summary>Solution</summary>
`Editor.test.js`

```
// more code
  it('should render note note found message', function() {
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} browserHistory={browserHistory} call={call} />);
      expect(wrapper.find('p').text()).toBe('Note not found.');
    });
// more code
```
</details>

### Test
When we click the `Delete Note` the note is removed

## Exercise
```
it('should remove note', function() {
      const wrapper = mount(
        <Editor
          note={note}
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);

      // simulate button click

      // set up asserts for call spy and for push spy
    });
```

<details>
  <summary>Solution</summary>
```
it('should remove note', function() {
      const wrapper = mount(
        <Editor
          note={notes[0]}
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);

      // simulate button click
      wrapper.find('button').simulate('click');
      // set up asserts for call spy and for push spy
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
    });
```
</details>
