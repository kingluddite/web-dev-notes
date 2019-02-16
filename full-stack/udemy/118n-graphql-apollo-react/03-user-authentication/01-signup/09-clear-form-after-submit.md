# Clear form fields after form submission
* We successfully submit our form
* Right after we get back our data we want to clear our form

## Create new function `clearState()`
* We want our `state` object to look like it does initially
* All fields are empty

`Signup.js`

```
// MORE CODE
state = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
// MORE CODE
```

## create new variable
* This will be outside our class
* We'll call it `initialState` and copy and paste our object we assigned to `state` to `initialState`

```
// MORE CODE

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

// MORE CODE
```

### Use `object spread` to save us typing
* This will give us the same values inside an object into another object

```
// MORE CODE

  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  state = {
    ...initialState,
  };

// MORE CODE
```

## Set the state inside our `clearState` function to the value of `initialState`
* Just use the `object spread` one more time
* This saves you typing again!

`Signup.js`

```
// MORE CODE

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

class Signup extends Component {
  state = {
    ...initialState,
  };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    // call our signupUser function
    // it is a promise so we can use `then()`
    // within `then()` we get our return `data`
    signupUser().then(data => {
      console.log(data);
      this.clearState();
    });
  };

// MORE CODE
```

## Houston we have a problem
* After clearing our form we can still hit submit and we get a nasty error

```
GraphQL error: User validation failed: username: Path `username` is required., email: Path `email` is required., password: Path `password` is required.
```

## Prevent blank form submission
* We need a way to prevent submitting if all fields are empty

## Prevent our form from submitting
* Disable our button on two occasions

1. If we are still loading the Mutation (still in the process of executing)
2. It failed our client side validation (we'll create a new function for this called `validateForm`

`Signup.js`

```
// MORE CODE

<button
  className="button-primary"
  disabled={loading || this.validateForm()}
>Submit
</button>

// MORE CODE
```

## validateForm function
* Make sure all form fields have some value
* Make sure `password` and `passwordConfirmation` are equal to each other

```
// MORE CODE

validateForm = () => {
  const { username, email, password, passwordConfirmation } = this.state;
  const isInvalid =
    !username ||
    !email ||
    !password ||
    password !== passwordConfirmation;

  return isInvalid;
};

render() {

// MORE CODE
```

## Test
### Try to submit empty form
* Try to submit an empty form and you will not be able to
* The submit button has been disabled

### Try submitting with passwords that don't match
* Try to submit with not matching passwords and it won't let you
* Try submitting with empty fields and it won't let you

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add Clear form after submit`

## Push to github
`$ git push origin signup`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add signup feature`

![commit](https://i.imgur.com/a8cXTgy.png)

* That will take you to a page of all changes in that commit
    - Green is code added
    - Red is code removed
    - All other code has not been modified
* Review all your changes
* If all looks good hit the `back` button in the browser
* Create a PR
* And click `Merge pull request` button
* Click `Confirm merge` button
* Then click Delete branch (You will see the color purple and that `Pull request successfully merged and closed`)

![PR successful](https://i.imgur.com/ota3hx1.png)

* Click `Delete branch` button to delete the remote branch
    - You don't need it anymore
    - Get in the habit of `pruning` your branches so they don't grow uncontrollably

## Time to sync up
* Right now your master branch on your remote GitHub is different than your master branch locally
* Locally your master branch doesn't have the new feature `signup` added
* To prove this checkout of your `signup` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `signup` are gone!
* View your app in the browser and it also shows now sign of your `signup` feature!
* If you stop your server `ctrl` + `c`

## Check the status
`$ git status`

* You will see this:

```
On branch master
nothing to commit, working tree clean
```

## But this doesn't make sense?
* Your remote master branch and your local master branch are different

## Time to fetch
* You need to do a fetch

`$ git fetch`

## Compare local with remote
`$ git diff master origin/master`

* That will compare the local branch `master` with the github remote branch `origin/master`
* Now just press `spacebar` to navigate through all the changes
    - Red is removed
    - Green is added
    - No color is unchanged
* Press `q` to quit out of git `diff`

## Show local branches
`$ git branch`

* The asterisk is the currently selected branch
* Type `q` to exit out of list of branch pages

## Pull down remote origin master branch
`$ git pull origin master`

## Test your site now
`$ npm run dev`

* You now see that our `signup` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d signup`

* That will let you know the branch was deleted with something like:

`Deleted branch signup (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo


