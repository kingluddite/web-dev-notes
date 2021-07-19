# Create a repo
`$ gh repo create`

## Create an issue
`$ gh issue create`

## View issue on web
`$ gh issue view [number of issue] --web`

### Close issue
`$ gh issue close [issue number]`

## Delete a repo
* gh-cli doesn't make it easy because deleting a repo is dangerous so here are the steps:

* In main settings, go to developer > Personal access tokens (PATs)
* Create a token with:
    - repo checked
    - read:org checked
    - delete_repo checked
    save token and paste to file on local machine (token.txt)
* In that directory use:

`$ gh auth login --with-token < token.txt`

* Then run delete command:

`$ gh repo-delete kingluddite/marvel-vs-dc`

* To see list of all your repos use:

`$ gh repo list`

## Change editor to nvim
`$ gh config set editor nvim`

## Add a pr
* [docs on create a pull request](https://cli.github.com/manual/gh_pr_create)
* **note** When the current branch isn't fully pushed to a git remote, a prompt will ask where to push the branch and offer an option to fork the base repository. Use '--head' to explicitly skip any forking or pushing behavior
* A prompt will also ask for the title and the body of the pull request
* Use '--title' and '--body' to skip this, or use '--fill' to autofill these values from git commits

1. Add and commit
2. gh pr create
3. Where should we push? (this is your remote repo)

## Merge a pr
`$ gh pr merge 8 -d`

* That deleted the remote and local branch, checked you out of that branch into main branch and merged the feature branch into main
    - TODO - I want to merge the branch into the develop branch

