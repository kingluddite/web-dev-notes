Syntax in Vim

* These notes are from this great [source](https://drivy.engineering/setting-up-vim-for-react/)

Syntastic has been the go-to solution for syntax checking in Vim for a while, but it has the major flaw of being synchronous. That means that you can’t do anything - not even move your cursor - while it is running. For large files, this gets annoying rather quickly. The good news is that Vim now has support for async tasks, and you can switch to Ale, which is short for Asynchronous Lint Engine. You will never be interrupted by your linter again, hurray!

Arguably, this isn’t specific to React, but since you’ll need syntax checking for JSX, it’s a good opportunity to improve your overall setup.

`Plugin 'w0rp/ale'`

# Install ESLint

`$ yarn add --dev eslint babel-eslint eslint-plugin-react`

# Configure ESLint with 

`$ eslint --init`

* This will create an .eslintrc file, which you should check in to version control so that everybody is using the same style guide. You may want to have a chat with the other people working on your project, to make sure everybody agrees on which rules you’ll enforce

Ale works out of the box with ESLint, so there’s no further setup needed. However, I found Ale more pleasant to use with a couple tweaks in my vimrc:

## Install prettier

`$ yarn add --dev prettier eslint-config-prettier eslint-plugin-prettier`

Now, you should be able to run `$ eslint --fix src/App.js`, and `src/App.js` will be reformatted automatically.

* Good, now let’s make that happen in vim each time you save a file

* Cool
    - A naive way of doing this would just be to set an autocommand to run ESLint, but that would have the downside of being synchronoue
    - Rather than digging into Vim’s async job api, the easiest way of doing this is to use asyncrun, a plugin to easily run shell commands in the background

`Plugin 'skywind3000/asyncrun.vim'`

`autocmd BufWritePost *.js AsyncRun -post=checktime ./node_modules/.bin/eslint --fix %`
