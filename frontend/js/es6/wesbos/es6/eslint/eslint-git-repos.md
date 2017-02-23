# Only allow eslint passing code into your git repos
Will help maintain code quality for your team on that project

## Intialize git for your project
`$ git init es6git`

That creates a folder called `es6git`

`$ cd es6git`

Create a file

`$ cd code.js`

```js
var x= 100;
```

Run eslint `$ eslint code.js`

## Does eslint have a parent?
You will see even though we don't have an eslintrc file in our project it is picking up the `.eslintrc` from the parent folder. That's how it works. It will always check the parent for a `.eslintrc` until it finds one. That's how it eventually finds your global `.eslintrc` located at `~/.eslintrc`

# git hooks
Code that runs in git before things happen. We can stop certain things from happening unless they pass a specific use case. 

Inside the `.git` folder you will find a `hooks` folder with sample hook files

Open `commit-msg-sample`

This is a hook example of something that will run before someone commits. Rename this file `commit-msg`

Delete all code inside `commit-msg`

[Copy this gist](https://gist.github.com/wesbos/8aec9d2ff7f7cf9dd65ca2c20d5dfc23)

And paste it into `commit-msg`

```
#!/bin/bash
files=$(git diff --cached --name-only | grep '\.jsx\?$')

# Prevent ESLint help message if no files matched
if [[ $files = "" ]] ; then
  exit 0
fi

failed=0
for file in ${files}; do
  git show :$file | eslint $file
  if [[ $? != 0 ]] ; then
    failed=1
  fi
done;

if [[ $failed != 0 ]] ; then
  echo "🚫🚫🚫 ESLint failed, git commit denied!"
  exit $failed
fi
```

```
$ git status
$ git add -A
$ git commit -m 'Add new code'
```

And you will get an error like:

![git hook error](https://i.imgur.com/zgP6FS6.png)

You can not commit until your eslint passes. Fix your errors and you then can commit.
