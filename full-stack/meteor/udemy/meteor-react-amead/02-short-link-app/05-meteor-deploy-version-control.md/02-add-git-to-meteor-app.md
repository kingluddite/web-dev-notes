# Add Git to Meteor App
## Intialize new Git repository
`$ git init`

* Never edit `.git`
    It should only be edited with running Git commands

## `$ git status`

## Git terms
* Your `working directory`
    These are your current files and all of what we are doing will not change your `working directory`
    All of our changes are stored in the `.git` folder

### Untracked Files
* After you run `$ git init` all current files will be placed in `Untracked Files` (except for `.gitignore`)

![Untracked Files](https://i.imgur.com/s7efNc2.png)

### Adding Files
![Staged Changes](https://i.imgur.com/bSbkCIU.png)

* `$ git add FILES` takes files and moves over to `Staged Changes`
    - This does not change file at all
    - We're ready to make a commit (save a snapshot)

### Committing files
![Commit files](https://i.imgur.com/c0gXPRh.png)

* `$ git commit -m 'YOUR COMMIT MESSAGE HERE'`

### Working Directory clean
![clean working directory](https://i.imgur.com/n8xvep1.png)

### Dirty Working Directory
![Dirty Directory](https://i.imgur.com/cmxlhRo.png)

When you make changes to files they are moved to Unstaged Changes

### More Untracked Files
![Untracked Files](https://i.imgur.com/6x6jSDY.png)

But if you create new files they are marked as `Untracked Files`

### `$ git add` works double shift
![git add double shift](https://i.imgur.com/rZCeHQV.png)

`git add` will add both **Untracked Files** and **Unstaged Files** to `Staged Changes`

## Ignore some files
![git ignore](https://i.imgur.com/dh53va6.png)

* You can tell git not to add files to staged changes
* Meteor adds `.gitignore` by default
    - has `node_modules` inside it

## Add another commit
![add another commit](https://i.imgur.com/hHu42Vg.png)

* Snapshots show up in linear form

## Git add lets you add files by name
`$ git add package.json`

`$ git status` - shows you that you have untracked files and one new file ready to be committed

`$ git add .` - Add all files to Staging

`$ git commit -m 'initialize repo'`

`$ git status` - clean working directory

`$ git log` - shows you all your commits
