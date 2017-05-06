# Removing Notes
We will work inside `Editor` for these notes

## Fix a bug
1. Log in
2. Add a note
3. Select that note
4. Type `Hello World` in title
5. Place cursor in middle of two word and type
6. Your cursor is taking to end of text. This is the bug

* We will fix using Component `state`
* We'll also wire up delete note

## [Here is the problem](http://codepen.io/andrewjmead/pen/MJzEPa)
* Put your cursor in beginning of input and it moves to end

## Add `state` to `Editor`
* Add `constructor()` function with `super()` and pass `props`

```
// more code
export class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    };
  }
// more code
```

### Update our handlers
```
handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

handleTitleChange(e) {
  const title = e.target.value;
  this.setState({ title });
  this.props.call('notes.update', this.props.note._id, { title });
}
```

## Update our form elements
* We switch from `this.props.note.title` to `this.state.title` (and for body too)

```
<input value={this.state.title} placeholder="Note Title" type="text" onChange={this.handleTitleChange.bind(this)} />
<textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} />
```

## View in app
We see that we fixed our bug from kicking us to the end of the input when we are in the middle

But we broke our app because our fields are not populating when we select a note or refresh the page

Why was this a problem when using `this.props`?
* It has to do with the time it takes when the key gets pressed and when we rerender the Component with a new value
    - With `this.props`
        + We needed to called `notes.update`
        + We had to wait for that update to happen
        + Then the Component got rerendered and we got new data
        + Then the input value changed
        + By that point, React thinks you changed the value completely so it moves the cursor to the end (this is the default browser behavior)
* When we switched to using state, we update that value almost immediately and this lets React preserve the cursor position

## Let's fix what we broke
### Using a Lifecycle method
#### componentDidUpdate()
Gets called right after either the `props` or the `state` for the Component gets changed

```
componentDidUpdate() {
   // this.props --- would be new `props`
   // this.state --- would be new `state` 
}
```

##### If you need access to oldProps or old state
They are available as arguments

```
componentDidUpdate(prevProps, prevState) {
    
}
```

If you has a `prop` name **Joe** and it got switched to **Tom**

```
componentDidUpdate(prevProps, prevState) {
 this.props.name // would be Tom
 prevProps.name // would be Joe    
}
```

* This is so we can use both the old and new values inside the Lifecycle method
* We want to watch for changes on `this.props.note`, if we switch from a new note or not having a note at all and rendering a message to having a note, we need to make sure we update the `state` (otherwise the new `notes` **body** and **title** will never get rendered to the screen --- which is what is currently happening when we load the page -- we load the page, the body and title never get updated and we have an empty input and textarea on our app)

```
componentDidUpdate(prevProps, prevState) {
  const currentNoteId;
  const prevNoteId;
}
```

* currentNoteId - will try to fetch the current note's id, if it exists we know we are about to show a note and we'll need to render our input and textarea
    - If it doesn't exist, we'll show our message

```
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
  }
```

## Ternary Operator safety net
* We are using a ternary operator instead of just using `prevProps.note._id` because `prevProps.note._id` would fail if notes is `undefined` (the error would be you are trying to access `_id` of undefined)
* The Ternary Operator is a way to make sure **note** exists before we try and pull a property off of note

When Component updates and `componentDidUpdate()` fires we don't always want to take **title** and **body** from prop and set that equal to the state we only want to do that when we're switching to a page that has a note to show and when we're switching to a new note

```
if (currentNoteId && currentNoteId !== prevNoteId) {
    this.setState({
        title: this.props.note.title,
        body: this.props.note.body
    });
}
```

* We want to make sure there is a note to show
    - currentNoteId needs to be defined
    - If it is undefined, there was no note, and we should not run this code
* If currentNoteId does not equal prevNoteId (if they do they are the same and we don't need to rerun it)
    - We only want to set our `state` **title** and **body** when we're switching notes

## Exercise
Remove Note

* Add an `onClick` handler to **Delete Note** button
    - to call a method or define an inline function
* Call `notes.remove` Meteor Method
* There is an edge case we'll deal with later

<details>
  <summary>Solution</summary>

```
// more code
  handleDeleteNoteClick() {
    this.props.call('notes.remove', this.props.note._id);
  }

// more code
          <button onClick={this.handleDeleteNoteClick.bind(this)}>Delete Note</button>
// more code
```
</details>

## Houston we have a Problem
When you delete a note, the URL doesn't change and we get the 'Note not found' message

### browserHistory to the rescue!


## Make testing easier
```
// more code
Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
```

### Add the redirect in our handler
```
handleDeleteNoteClick() {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }
```

* We don't use `.replace()` (and use `.push()` instead) as we don't want to replace the history, we just want to add to it

`$ git status`

`$ git add .`

`$ git commit -m 'Setup state for title/body. Add handleDeleteNoteClick method`

