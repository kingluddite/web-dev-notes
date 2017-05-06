# More Editor Testing
```
handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }
```

Our first test is to make sure all the code in the above block actually happens

```
it('should update the note body on textarea change', function () {
      const newBody = 'This is my new body text';
      const wrapper = mount(
        <Editor
          note={notes[0]}
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);
       wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
       });

       expect(wrapper.state('body')).toBe(newBody);
       expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });
```

## Exercise
Do the same for the title

<details>
  <summary>Solution</summary>
  `Editor.test.js`

```
    it('should update the note title on input change', function () {
      const newTitle = 'This is my new title text';
      const wrapper = mount(
        <Editor
          note={notes[0]}
          selectedNoteId={notes[0]._id}
          browserHistory={browserHistory}
          call={call}
        />);
        wrapper.find('input').simulate('change', {
          target: {
            value: newTitle
          }
        });

        expect(wrapper.state('title')).toBe(newTitle);
        expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });
```
</details>

## Last test for Editor
When our props change `componentDidUpdate()` handles things correctly
* We'll start the Component out with no note and no `selectedNoteId`
* Then we'll update the Component with both of those props to make sure that the `state` correctly gets set

```
it('should set state for new note', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);
      // how can we change the props
      // in our code we would just pass in new props into the Component
      // enzyme gives us a way to do this using `setProps()`
      // setProps does not exist on your components it just exists when using enzyme
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });

       // set up two assertions
       // expect title state to be first notes title
       expect(wrapper.state('title')).toBe(notes[0].title);
       // expect body state to be first notes body
       expect(wrapper.state('body')).toBe(notes[0].body);
    });
```

## Alternative variation of the above code
To insure that when the condition does not pass the `state` does not get set

```
it('should not set state if note prop not provided', function() {
      const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

      wrapper.setProps({
        selectedNoteId: notes[0]._id
      })
       expect(wrapper.state('title')).toBe('');
       expect(wrapper.state('body')).toBe('');
    });
```

