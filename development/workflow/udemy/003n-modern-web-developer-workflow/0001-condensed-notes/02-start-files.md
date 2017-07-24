# Github
* Create account on Github

### Clone starter files
* We'll use an existing Github repo
    - We will clone it to our local folder and it will give us all our starter files (images and other files)
    - `$ git clone https://github.com/kingluddite/mobile-design.git`

### Remove Git
* Be careful with the following command!

`$ rm -rf .git`

### Initialize our own Git
`$ git init`

#### Important to add and commit first before creating new branches
`$ git add -A`

`$ git commit -m 'initialize repo`

### Now you can create new branches with `$ git checkout -b BRANCHNAME`

### Install Homebrew and Node
* Install [homebrew](https://brew.sh/)
* Install node using homebrew `$ brew install node`
* Upgrade node `$ brew upgrade node`
* What version of node do you have? `$ node -v`

### NPM
`$ npm init -y`

* Install jquery

`$ npm install jquery normalize.css -S`

## Project already has `.gitignore`

### Create branch
`$ git checkout -b add-npm`

* Add changes to git

`$ git add -A`

* Commit changes to git

`$ git commit -m 'add npm jquery and normalize`

* Checkout master

`$ git checkout master`

* Merge branch into master

`$ git merge add-npm`

* Create a Github repo and name it `mobile-practice`

* Push your changes

`$ git push origin master`

* You will get an error
* We will fix this by adding a remote origin
