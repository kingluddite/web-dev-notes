# Add git to our project
* In root of project
* `$ git init`
* don't touch .git
* `$ git status`
    - High overview of git project at current point in time
    - branching - pro git book (free)

## .gitignore
* We want git only to track the files we wrote
    - ignore
        + node_modules
            * Can be automatically regenerated from information inside package.json
            * So no need to track it with git

`.gitignore`

```
node_modules
```

## git add
`$ git add`

* Does take arguments (files you want to add)
*   `$ git add package.json`
        - You will see **new file: package.json** that shows `Changes to be committed`
        - You will see files in red under `Untracked files:`

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

### What is the `"working tree"`?
* Your files (the one's you edited in your project)
* It is clean because the current state matches up exactly with last commit

## Remove dummy expenses
* We'll soon be adding a DB and won't need this
* Delete these in `app.js`

```js
store.dispatch(addExpense({ description: 'Water bill', amount: 20000 }));
store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000 }));
store.dispatch(addExpense({ description: 'Rent', amount: 109500 }));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);
```

* The second part above we don't need as it will happen when interacting with app
* We change file but won't see anything new with `$ git status` until we save the file
* Save file
* `$ git status`
    - You will see `Changes not staged for commit`

![changes not staged for commit](https://i.imgur.com/YzIiVOB.png)

`$ git add src/app.js`

* You will see `Changes to be committed:`
    - With green **modified: src/app.js**

### Add commit
`$ git commit -m 'Remove dummy expense data`

## git log
`$ git log`

* Read only
* Shows you all your commits (newest on top)

## SSH
* Stands for "Secure Shell"
* A secure way to communicate between our machine and the github servers
* We have to setup SSH keys

### Do I have SSH keys?
`$ ls -a ~/.ssh`

* If it is emtpy you need to set them up
* If you have `id_rsa` (private) and `id_rsa.pub` (public)
    - The private file you keep on your machine
    - A public one that we give out to 3rd party services (like Github)

### Generate new key (if you need one)
`$ ssh-keygen -t rsa -b 4096 -C 'youremail@gmail.com`

* `-t` flag ---> specifies the type (lots) but we will create the very popular rsa (this is what we will be using to securely communicate with github)
* `-b` (size in bits) 4096 (the bigger the key the harder it is to crack)
* `-C` provide our email address

#### Will ask you what you want to call file
* Stick with the default and just hit enter
* hit enter to skip the passphrase
* then it generates the key
* Shows us where the 2 SSH keys were saved

#### Set up our SSH keys with github
* So our machine can communicate with Github in a secure way

`$ ls -a ~/.ssh` (should now show you your SSH keys)

* We will give our `id_rsa.pub`
* Never give out `id_rsa`
    - This is private
    - Treat this like a password
    - If someone has this they can steal our identity and trick any machine to think that they were us

#### Make sure that when we try to communicate with another service (like Github) it actually knows which SSH keys to use
* This requires us to use a tool called `SSH agent`
    - We need to make sure this tool is running
    - `$ eval "$(ssh-agent -s)"`
        + This will check if an SSH agent is running
            * If it is, it will let us know it is running
                - Will see something like `pid 21842`
                - pid === process id
            * If not running, it will start it up 

##### Add the key
`$ ssh-add ~/.ssh/id_rsa` (we point to the private file)

* We add the name to the private key file
* Hit enter
* The identity has been added
* Now we can give the public key file to 3rd party services like Github

##### Copy contents of id_rsa.pub to the clipboard
* For mac

`$ pbcopy < ~/.ssh/id_rsa.pub`

* Github profile > settings > SSH and GPG keys > New SSH key
    - Title: name your machine ---> like ---> Mac Air laptop
* Paste key in clipboard into `Key`
* Click `Add SSH key`
* Now we are ready to securely communicate with github through our terminal (local machine)

## Test if SSH key is working
`$ ssh -T git@github.com`

* This will try to make a very basic connection to the github servers
    - it will ask if you want to connect to github server
        + Type yes
    - it will then try to make connection
    - and you should see `Hi {your user name}`
* Click to select SSH URL on github

### Adding remote
`$ git remote add URL of new github repo`

* Allows us to provide a remote name and URL
* Now our local repo knows that this external repo exists
* `$ git remote -v`
    - Will show you remote URLs for fetching and pushing

`$ git push -u origin master`

* `-u` creates the association between our local code and the upstream github repo (we only have to use the `u` flag one time)
* We need to supply the remote (origin)
* We need to supply the branch (master)
