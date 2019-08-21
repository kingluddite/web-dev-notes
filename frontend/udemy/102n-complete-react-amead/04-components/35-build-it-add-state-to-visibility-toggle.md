# Add state to visibility toggle
## Challenge
* Convert build-it-visible to component and render to the screen
* Set up state
* Make sure everything renders correctly
* Comment out all starting code from `build-it-visible.js` and start fresh

### Instructions
* Create new component `VisibilityToggle`
    - Define 3 methods
        + constructor
            * We add this for 2 reasons
                - We want to bind one of our methods for the button click
                - We also want to set up our default state
                    + We will have one single piece of state that will be visibility and it will have a default value of false
        + handleToggleVisiblity
            * The method we will be firing on click
                - We will toggle through our `visibility` state property depending on how many times the user clicks the button
                    + When visibility is false: the button text will read `show details`
                    + When visibility is true: we'll see the content and the button text will read `hide details`
        + render
            * We always need this method
            * We always need to render something to the screen
* Test work when finished

## Solution
* Point babel to file and run live-server

`$ babel src/playground/build-it-visible.js --out-file=public/scripts/app.js --presets=env,react --watch`

`$ live-server public`

```
class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);

    this.state = {
      visibility: false,
    };
  }
  handleToggleVisibility() {
    this.setState(prevState => ({
      visibility: !prevState.visibility,
    }));
  }

  render() {
    return (
      <div>
        {this.state.visibility && <p>This is the content we want to show</p>}
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('root'));
```


