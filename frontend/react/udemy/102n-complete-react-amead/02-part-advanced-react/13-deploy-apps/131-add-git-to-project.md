# Add git to our project
* In root of project

`$ git init`

* **Note** Never touch `.git`

## How to know the current status of Git?
* `$ git status`
    - Prints out a high level overview of git project at current point in time
    - `branching` - pro git book (free)

## .gitignore
* We want git only to track the files we wrote
    - ignore
        + `node_modules`
            * Can be automatically regenerated from information inside package.json
            * So no need to track it with git

`.gitignore`

```
node_modules
```

## git add
`$ git add`

* Does take arguments (files you want to add)

`$ git add package.json`
* You will see **new file: package.json** that shows `Changes to be committed`
* You will see files in red under `Untracked files:`

### shortcut --> `$ git add .`
* This will add everthing in current directory and all subdirectories

## git commit
`$ git commit -m 'Initial commit`

* You will see lots of output
* how many lines were change
* How many insertions
    - create mode 100644 (new files added and not files that existed and we are tracking their changes)
* `$ git status`
    - Shows `nothing to commit, working tree clean`

## working tree
* What is the `"working tree"`?
* Your files (the one's you edited in your project)
* It is clean because the current state matches up exactly with last commit

## Remove dummy expenses
* We'll soon be adding a DB and won't need this
* Delete these in `app.js`

`app.js`

```
store.dispatch(addExpense({ description: 'Water bill', amount: 20000 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);
```

* The second part above we don't need as it will happen when interacting with app
* We change file but won't see anything new with `$ git status` until we save the file

## Save file
`$ git status`

* You will see `Changes not staged for commit`

![changes not staged for commit](https://i.imgur.com/YzIiVOB.png)

`$ git add src/app.js`

* You will see `Changes to be committed:`
    - With green **modified: src/app.js**

### Add commit
`$ git commit -m 'Remove dummy expense data`

## git log
`$ git log`

* Read only
* Shows you all your commits (**newest on top**)

## Git commands
* `$ git init` - Create a new git repo
* `$ git status` - View the changes to your project code
* `$ git add` - Add files to staging area
* `$ git commit` - Creates a new commit with files from staging area
* `$ git log` - View recent commits
