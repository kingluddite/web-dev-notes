## Gitignore is not working
* You may need to [remove the cache](http://blog.jonathanchannon.com/2012/11/18/gitignore-not-working-fixed/)
* Long story short you have to remove all tracked files and add them back in using the below commands

```
git rm -r --cached .
git add .
git commit -m ".gitignore is now working"
```

# Deploying to GitHub Pages
## Using the Command line:
[use command line to push to github](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)
kA bit of a hack
Free hosting, easy to set up

URL - `kingluddite.GitHub.io/teamsanity`

So that means it will run `kingluddite.com/GitHub.io/teamsanity/team/some-name-team`

So our new part `teamsanity` - how to we account for that?

## Specify a home page
`package.json` (fragment)

```
{
  "name": "cotd",
  "version": "0.0.1",
  "private": true,
  "homepage": "https://kindluddite.GitHub.io/react-wb",
  // MORE CODE
```

This will tell create react app where to make the link path

This change is important because our path won't be `/static/style.css`, it will be `/react-wb/static/style.css`

## Need to modify router
To run in a subfolder

By default router just pushes to `/` and we need to tell it to use `/react-wb/`

**tip**
On your GitHub page, open the console

**Get path name** - In console type `window.location.pathname` will give you something like `"/react-wb/team/elegant-ugliest-children"`

##Split them in an array
on the forward slash

`window.location.pathname.split('/')` 

gives you 

`["", "react-wb", "team", "elegant-ugliest-children"]`


`window.location.pathname.split('/')[1]` - gives you **"react-wb"**

`index.js`

```
const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
  return (
    <BrowserRouter basename={repo}>
      <div>
        <Match exactly pattern="/" component={TeamPicker} />
        <Match pattern="/team/:teamId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}
```

* This will only work for GitHub pages because they will always be your `username.GitHub.io/repo-name`

## Run build
`$ npm run build`

`$ cd build`

We already have a git repo. If we don't we can:

## Initialize a git repo
`$ git init`

## Add remote origin
`$ git remote add origin git@GitHub.com:kingluddite/teamsanity.git`

## Git add and commit
`$ git add -A`

`$ git commit -m 'initialize repo'`

## Push everything up to the master branch
`$ git push -u origin master`

The `build` folder is ready to be deployed.

To publish it at https://kindluddite.GitHub.io/react-wb, run:

```
# commit local changes
  git commit -am "Save local changes"
# checkout 
# If -B is given, <new_branch> is created if it doesn’t exist; otherwise, it is reset.
  git checkout -B gh-pages
  # The git add command can be used to add ignored files with the -f (force) option
  git add -f build
  # This command will add and commit all the modified files, but not newly created files.
  git commit -am "Rebuild website"
  # filter-branch -f (we are just looking at the build directory)
  # --prune-empty (Some kind of filters will generate empty commits, that left the tree untouched. This switch allow git-filter-branch to ignore such commits)
  # --subdirectory-filter <directory> (Only look at the history which touches the given subdirectory. The result will contain that directory (and only that) as its project root.)
  git filter-branch -f --prune-empty --subdirectory-filter build
  # push to GitHub remote branch
  git push -f origin gh-pages
  # checkout and return to original project source files
  git checkout -
```

## GitHub Pages
You want to check settings in GitHub and make sure the source is the `gh-pages` branch. Click on the URL they provide to see your site.

Make sure you add github.io to your domains on Firebase

If you refresh you'll get a 404

Github offers no routing and just offers you an index.html but when we change the URL with pushstate and it refreshes we get a 404

## hackfix
Copy build `index.html` and save it as `404.html` and it will work

## Slight con of doing it this way
We are telling browser healthy page is a 404 which is page not found. So if you were doing anything with SEO this would be bad. So don't use this for production but it is great to get something up and running quickly to show clients or friends or potential bosses
