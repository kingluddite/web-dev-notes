# Add more CSS
## Add feature branch
`$ git checkout -b css`

## We need to fix our form
* How can we hide our labels and keep the text accessible?

`AddCologne.js`
* You would make these changes to all forms

```
// MORE CODE

<label htmlFor="scentPrice">
  <input
    type="text"
    id="scentPrice"
    name="scentPrice"
    placeholder="Scent Price"
    onChange={this.handleChange}
    value={scentPrice}
  />
  <span className="hide">Scent Price</span>
</label>

// MORE CODE
```

* And update the CSS

`App.css`

```css
/* hide all labels but they are still accessible */
.hide {
  position: absolute !important;
  top: -9999px !important;
  left: -9999px !important;
}

/* Modal */
```

## Add inline styles in jsx
* Just added here to show you how to add inline CSS
* No dashes like `margin-bottom` but use camel case `marginBottom` instead
* It is an object inside a JavaScript express so it will look like `style={{ put rules here }}`

`UserColognes.js`

```
<p style={{ marginBottom: '0' }}>Likes: {cologne.likes}</p>
```

`App.css`

* Replace the file's current CSS with the text block below

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.App {
  text-align: center;
}

nav {
  text-align: center;
  padding-bottom: 0.2em;
  padding-top: 2em;
  background-color: #efefef;
  box-shadow: -3px 3px 10px 0px rgba(168, 168, 168, 0.7);
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

p,
li {
  font-size: 2rem;
}

ul {
  list-style: none;
}

input,
select,
textarea {
  padding: 0.4em 0.2em;
  font-size: 2rem;
}

nav a,
nav a:link {
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: 100;
}

.active {
  font-weight: bold;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.delete-button {
  color: red;
  cursor: pointer;
}

/* App */

.main-title {
  padding: 0.5em;
  color: #1eaedb;
  margin: 0;
  text-decoration-line: underline;
  text-decoration-style: dotted;
}

.cards {
  display: grid;
  margin: 1.5em 3em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 150px;
  grid-auto-flow: row dense;
  grid-gap: 2em;
  grid-auto-rows: 300px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: -3px 3px 10px 0px rgba(168, 168, 168, 0.4);
  text-align: center;
  background: #ddd;
  transition: all 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.25;
  transition: opacity 0.3s ease-in-out;
}

.card:hover:after {
  opacity: 0;
}

.card-text {
  position: relative;
  z-index: 1;
  color: rgb(39, 37, 37);
  background: whitesmoke;
  letter-spacing: 1px;
}

.card-text a {
  text-decoration: none;
}

.card-text h4 {
  margin: 0;
  padding: 0.2em;
}

.Floral {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  border-radius: 5px;
  color: white;
  background: #24c6dc;
  background: linear-gradient(to right, #514a9d, #24c6dc);
}

.Oriental {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  border-radius: 5px;
  color: white;
  background: #50c9c3;
  background: linear-gradient(to right, rgb(80, 146, 143), rgb(2, 105, 100));
}

.Woody {
  width: 100px;
  margin: 20px;
  z-index: 1;
  color: white;
  padding: 7px;
  background: #9d50bb;
  border-radius: 50px 120px 120px;
}

.Fresh {
  width: 20%;
  margin: 20px;
  z-index: 1;
  padding: 7px;
  color: white;
  background: linear-gradient(to right, #b24592, #f15f79);
  border-radius: 50px 120px 120px;
}

/* cologne Page */

.cologne-image {
  height: 60vh;
  width: 100%;
}

.cologne-image:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 60vh;
  opacity: 0.25;
  transition: opacity 0.3s ease-in-out;
}

.cologne {
  text-align: center;
  background: whitesmoke;
  padding: 1em;
}

.cologne h1 {
  font-size: 2.5rem;
  text-align: center;
}

.cologne-header {
  overflow: hidden;
  background-image: url(https://bit.ly/2JqRbuI);
}

.cologne-header > p {
  margin: 0;
}

.cologne-description {
  font-size: 2rem;
  color: darkslategray;
  padding: 1em;
  font-weight: 200;
  background: white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  font-style: italic;
}

.cologne-name {
  color: #1eaedb;
  text-decoration: underline;
  text-decoration-style: wavy;
}

.cologne-instructions {
  text-align: left;
  padding: 0 2em;
}

.cologne-instructions * {
  padding-bottom: 0.5em;
}

.cologne-instructions__title {
  font-weight: 200;
  letter-spacing: 2px;
  color: #1eaedb;
  text-decoration: underline;
}

.like-button {
  position: fixed;
  right: 1em;
  bottom: 1em;
  font-size: 2rem;
  background-color: #f15f79;
  color: white !important;
}

/* Search */

.search {
  font-size: 3rem;
  transition: width 0.2s ease-in;
  margin: 2em;
  width: 10em;
}

.search:focus {
  width: 12em;
}

.spinner {
  text-align: center;
  padding: 5em;
}
```

## Add Sass
* In an earlier version of create-react-app we had to eject to get Sass capability
* Now we can easily use sass by install sass and renaming our CSS to SCSS

## Rename App.css to App.scss
`App.scss`

* We just nest some code to make sure Sass is working

```
.App {
  text-align: center;
  h1 {
    color: red;
  }
}

// MORE CODE
```

`App.js`

```
// MORE CODE

// styles
import './App.scss';

class App extends Component {

// MORE CODE
```

* You will get this warning:

`To import Sass files, you first need to install node-sass`

* Install node-sass with:

`$ npm install node-sass`

* Stop and run server

`$ npm run dev`

## Test
* Vist the home page and you'll see `Five Star Colognes` is red which means your Sass is working

## Remote vs Local
* Now you will see our development site has a bit nicer CSS
* But our production environment looks the same as before
  - That is because we didn't push our changes into production
  - To do this you would need to make the changes again to deploy to production
    + Update `variables.env` file
    + Update Apollo client URI for production
    + `$ git push heroku master`

## Git time
* Add and commit the changes

`$ git add -A`

`$ git commit -m 'add css feature`

### Push the branch to origin
`$ git push origin css`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add css feature`

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
* Locally your master branch doesn't have the new feature `css` added
* To prove this checkout of your `css` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `css` are gone!
* View your app in the browser and it also shows now sign of your `css` feature!
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

* You now see that our `css` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d css`

* That will let you know the branch was deleted with something like:

`Deleted branch css (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo
