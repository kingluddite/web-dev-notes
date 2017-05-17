# Setting up Modal Errors
We submit a bad URL and get a console.log() error with a very user friendly error notification under `reason`

## Add error `state` and default to empty
`Header`

```
// more code
class Header extends Component {
  constructor(props) {
    super(props);

    // add modalIsOpen to state
    this.state = {
      url: '',
      modalIsOpen: false,
      error: ''
    };
// more code
```

### Reevaluate our AddLink `onSubmit` handler
```
// more code
onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '', modalIsOpen: false });
        }
      });
    }
  }
// more code
```

* We currently check for a `url` before we call our **Meteor Method**
* We will remove that and let our **Meteor Method** check for it
    - We do this so that if someone submits no URL they will see our error message which is what we want

```
// more code
onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.setState({ url: '', modalIsOpen: false, error: '' });
      } else {
        this.setState({ error: err.reason });
      }
    });
  }
// more code
```

* If we <u>have no error</u>, we clear the **error** `state`
* If we <u>have an error</u> we set the **error** `state` to **err.reason**
* When we close the modal we set the **error** `state` to empty

```
closeModal() {
    this.setState({modalIsOpen: false, url: '', error: ''});
  }
```

## Exercise
Render a `p` element with the error `state` inside of it when there is something in the message and if the message is empty then render nothing

<details>
  <summary>Solution</summary>
Using custom function
```
renderError() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
  }
```

And you call that function

```
<h1>Add Link</h1>
{this.renderError()}
```

Or you could use a one line ternary operator with:

```
<h1>Add Link</h1>
{this.state.error ? <p>{this.state.error}</p> : undefined}
```
</details>

## Make sure to test that the error appears

## Add focus
When Modal opens we want to bring focus to the input field where user will add **url**

`onAfterOpen` This is provided by `react-modal` and it lets you provide a function and that function gets called right after the modal is open

* We want to focus on the input but since we switched over to a controlled input we have no way to access it
* We got rid of the `ref` React attribute (_but let's add it back in now_)

```
// more code
  render() {
    return (
      <div>
        <button onClick={this.openModal}>+ Add Link</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}>
            <input
              type="text"
              placeholder="URL"
              ref="url"
              value={this.state.url}
              onChange={this.onChange.bind(this)}
            />
// more code
```

* We use this to add focus after we open the modal 
    - `onAfterOpen={() => this.refs.url.focus()}`

## Test
Open modal and you'll see input is in focus

![in focus modal](https://i.imgur.com/OeJkUjO.png)

## Close Modal when click in gray area
Nice usability improvement

`onRequestClose` - also provided by **react-modal** and it let's us provide a function that is run when the Modal Component is requesting that the Modal be closed (_this just means when someone Clicks off the Modal_)

```
<Modal
  isOpen={this.state.modalIsOpen}
  contentLabel="Add link"
  onAfterOpen={() => this.refs.url.focus()}
  onRequestClose={this.closeModal}
>
```

## Test
Open Modal and click in gray area and the Modal will close

## Improve Readability
Feel free to space out your custom functions to improve code readability
```
closeModal() {
    this.setState({
      modalIsOpen: false, 
      url: '', 
      error: ''
    });
  }
```

## Call our `closeModal()` to refactor code
```
Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.modalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
```

* It was the same code why not just use our one function for all so that if we ever have to change the code we just have one place to change all code related to the closing of Modals
* **note** We can also close the Modal using the `esc` key

## Add link to visit shortUrl
`LinksListItem`

```
// more code
Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.modalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
// more code
```

### Test
Click visit and it will take you to the shortUrl
