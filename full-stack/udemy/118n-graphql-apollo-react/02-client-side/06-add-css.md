# Add CSS
* Use skeleton
* [cdnjs.com](https://cdnjs.com/)
* Search for `skeleton`
* Copy this URL `https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css` (you get from this site)

`public/index.html`

```html
<!-- MORE CODE -->

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
  <title>Recipes App</title>
</head>

<!-- MORE CODE -->
```

## Test in browser
* New styles are added (skeleton)

## Add CSS 
`App.css`

```css
.App {
  text-align: center;
}

nav {
  text-align: center;
  margin-bottom: 1em;
  padding-bottom: 0.2em;
  padding-top: 2em;
  background-color: #efefef;
}

nav ul {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
  font-size: 1.2rem;
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
```

## Test
* Slight visual change but we now have lots of styles baked into our app

## Git stuff

### Add to staging with git
`$ git add -A`

### Commit with git
`$ git commit -m 'Add CSS`

## Push to github
`$ git push origin add-react`

### Log into your github account
* You will see there is a PR ready for merge

![PR](https://i.imgur.com/TW2HdKe.jpg)

* Click `Compare & pull request` button
* Scroll down until you see the commits and you can click on the `add add-react feature`

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
* Locally your master branch doesn't have the new feature `add-react` added
* To prove this checkout of your `add-react` branch and check into your `master` branch

`$ git checkout master`

* You will see your branch name now says `master`

## Open your text editor
* You will see that all your changes by adding `add-react` are gone!
* View your app in the browser and it also shows now sign of your `add-react` feature!
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

* You now see that our `add-react` feature is back and working!

## Clean up unused branch and sync remote with local
* You deleted the branch on your github (origin/master)
* You should also delete the branch on your local

`$ git branch -d add-react`

* That will let you know the branch was deleted with something like:

`Deleted branch add-react (was 14504fc).`

* View your branches again:

`$ git branch`

* Now only the `master` branch exists
* Press `q` to exist list of branches page in terminal

## Congrats
* Our local repo is perfectly in sync with our remote Github repo
