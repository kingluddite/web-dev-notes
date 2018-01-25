# Branching
## How do I delete a Git branch both locally and remotely?
```
$ git push -d <remote_name> <branch_name>
$ git branch -d <branch_name>
```
* **Note** that in most cases the remote name is origin
* [source](https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-both-locally-and-remotely)

## How do I pull down a specific branch?
1. Get the name of all the branches

`$ git branch -a`

1. Fetch branch

`$ git fetch <remote> <rbranch>:<lbranch>`

3. Checkout that branch

`$ git checkout <lbranch>`

## How do I push all branches to remote?
`$ git push origin --all`
