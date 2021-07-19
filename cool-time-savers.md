# Cool Time saving Web techniques

## Connect Zoom to Calendly
* When someone books an appointment, automatically create the zoom link
    + Simple but great time saver
    + Youtube vid walking through the steps (https://www.youtube.com/watch?v=ot95scVBMoU)

## VS Code Settings
`settings.json`

```
{
  "workbench.startupEditor": "newUntitledFile",
  // These are all my auto-save configs
  "editor.formatOnSave": true,
  // turn it off for JS and JSX, we will do this via eslint
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  // show eslint icon at bottom toolbar
  "eslint.alwaysShowStatus": true,
  // tell the ESLint plugin to run on save
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "editor.formatOnPaste": true,
  "window.zoomLevel": 1,
  "prettier.singleQuote": true,
  "editor.tabSize": 2,
  "explorer.confirmDragAndDrop": false,
  "files.autoSave": "afterDelay",
  "editor.renderIndentGuides": false,
  "editor.highlightActiveIndentGuide": false,
  "workbench.colorCustomizations": {
    "editor.lineHighlightBackground": "#1073cf2d",
    "editor.lineHighlightBorder": "#9fced11f"
  },
  "editor.wordWrap": "on",
  "diffEditor.wordWrap": "on",
  "[markdown]": {
    "editor.wordWrap": "off",
    "editor.quickSuggestions": false
  }
  // Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
  // "prettier.disableLanguages": ["javascript", "javascriptreact"],
}
```

## VS Code Snippet Generator
* [link to snippet generator](https://snippet-generator.app/)

## JavaScript common snippets
* [gist of common js](https://gist.github.com/bradtraversy/c3d5c35e77633601bc0ce5646d584fc9)
  - [youtube review of how to use them](https://www.youtube.com/watch?v=JIqk9UxgKEc)

## VS Code
* Word Wrap
  - I got tire of constantly setting this with alt + z and just wanted to set it by default
  - Easy just use:

`editor.wordWrap` and set to "on"

* Auto Save
* Open in Browser
  - If you are using live server you don't need this but it's good to have
* Live Server
  - Saves you from having to refresh all the time

## Replace space with underscore recursively
```
replace a space with an underscore recursively
```

## Replace all spaces or underscores with hyphens
```
find ./ -depth -name "*-*" -execdir rename 's/-/_/g' "{}" \;
```

## Replace spaces with hyphens in mac file names
```
for i in *; do mv "$i" "`echo $i | sed -e 's, ,-,g'`"; done
```

## Rename all files to lowercase

```
$ for f in *; do mv "$f" "$f.tmp"; mv "$f.tmp" "`echo $f | tr "[:upper:]" "[:lower:]"`"; done
```

## Globally ignore .DS_Store files
* Wouldn’t it be nice if you forgot to add `.gitignore` to your `.gitignore` file in the future, that you would still be protected? You can protected yourself against this by creating a global gitignore file

Add a `.gitignore_global` file to your Home Directory by running this command

```
$ touch ~/.gitignore_global
```

* Now open that file in your favorite text editor and put in some common file patterns that you’ll most likely want to remain out of your Git history

`.gitignore_global`

```
# Logs and databases #
######################
*.log
*.sql
*.sqlite

# OS generated files #
######################
.DS_Store
.DS_Store?
.Trashes
Thumbs.db
```

* The last thing we need to do is tell Git about our global gitignore file
  - Do this by running this command:

`$ git config --global core.excludesfile ~/.gitignore_global`

* [reference](https://chrisblackwell.me/removing-ds_store-files-from-git)

## Vimium
* [Chrome](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en)
* [Firefox](https://chrome.google.com/webstore/detail/vimium/dbepggeogbaibhgnhhndojpepiihcmeb?hl=en)

## Emmet
### 3 radio buttons with labels snippet
`(input[type='radio'][id="radio$"][name="radioGroup"]+label[for="radio$"]{radio$})*3`

## Make all branches `main` by default

`$ git config --global init.defaultBranch main`

* **note** If the command executes successfully, no confirmation message will appear; it will simply return back to the command-line prompt

## MacOS needs Git version 2.28 or later
* What verion of git `$ git --version`

## How do I add animated gifs to Github?
* [recordit](https://recordit.co/)
* [other ways Paul Irish to screencapture and make animated gifs for whatever you have](https://gist.github.com/paulirish/b6cf161009af0708315c)

## Speed up Youtube
* Great for tutes:

![speed up youtube chrome extension](https://chrome.google.com/webstore/detail/youtube-playback-speed-co/hdannnflhlmdablckfkjpleikpphncik/reviews?hl=en)
## Make github look like VS Code
This is super super super cool "The Github 1s trick"
https://github.com/conwnet/github1s

## Get rid of favicon error
* Just refresh browser (fastest way)

## JSON viewer
* I like [JSONFormatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa) over [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc) because I can easily view to raw mode to copy and paste JSON

## Upgrade all homebrew stuff
`$ brew upgrade --cask`

## Remove heroku
`$ git remote remove heroku`

## Add a GitHub remote repo
`$ git remote add origin YOUR_GITHUB_URL`

## Install nodemon
`$ npm i nodemon -D`

`package.json`

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js",
    "dev": "nodemon server"
  },

```

* And the script to run it is now `$ npm run dev`

## How to I change name of `master` branch to `main`
`$ git branch -M main`


## Searching keywords in Chrome
`ctrl` + `f` (win)
`cmd` + `f` (mac)

find next work
`ctrl` + `g` (win)
`cmd` + `g` (mac)

## If you accidentilly tracked `node_modules` by git
* Use this command to remove the tracking

`$ git rm -r --cached node_modules`

## How do copy from the terminal and paste somewhere else
## Kill port 300[n]

# kill port faster from command line (free up port easily)
* This is a function in my dotfiles

# usage: Running: `killport 3000` will free up port 3000
function killport(){ lsof -nti:$1 | xargs kill -9 };

## Search alias
* You forget what aliases you are using?

`$ alias` and search through them

## Recursively delete .DS_Store files
```
cleanupds='find . -type f -name '\''*.DS_Store'\'' -ls -delete'
```

## Back
```
b='cd ..'
```

## Use function in dotfiles to quickly create .gitignore
`$ gi node,macos >> .gitignore`

* Below is the function in my dotfiles

```
// MORE CODE

# Generate .gitignore
# `$ gi node,macos >> .gitignore`
function gi() { curl -sLw "\n" https://www.gitignore.io/api/\$@ ;}

// MORE CODE
```

## Search all files in project (ignore node_modules) to find a specific function

`$ grep -R --exclude-dir=node_modules 'console.log(' .`

## Grep inside nvim
`:grep -F '.ad' **/*.css`

* grepping in Vim comes with some bonuses over the command line
* After running the above command, we’re whisked away to a buffer looking at the first matched pattern
* Vim ran a grep search behind the scenes, parsed the results, and populated your quickfix list with all those matches
* You can use `:cn` and `:cp` to go browse forward/backward through the quickfix list, `:copen` to see it and `:cclose` to close it.
* **recommend** using Tim Pope’s u`nimpaired.vim` plugin or at least stealing his bindings for any prolonged exposure to the quickfix lista
* [source](https://seesparkbox.com/foundry/demystifying_multi_file_searches_in_vim_and_the_command_line)

## vim
## annoying highlight of search terms after searching
* Now after adding the below just hit return (carriage return) and it goes away
```
// MORE CODE

"This unsets the "last search pattern" register by hitting return
nnoremap <silent> <CR> :nohlsearch<CR><CR>

// MORE CODE
```

## Use Google Canary for dev
* [download chrome canary](https://usefyi.com/chrome-canary/)

```
/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --auto-open-devtools-for-tabs
```

* Add always open dev tools
* [resource](https://addyosmani.com/blog/automatically-open-chrome-devtools-in-each-new-tab)

## Vimium in Chrome
```
j/k: Scroll down/up
h/l: Scroll right/left
gg (in succession): Jump back to the top of a page
G (note the capital): Jump to the bottom of a page
d/u: Scroll a half page down/up
```

```
J/K: Switch tabs left/right
/: Enter "find" mode (type in search terms to instantly jump to them)
n/N: Jump forward/back between occurrences of search term (after pressing "/")
yy: Copy the current page's URL to your clipboard.
```

* [Vimium how to](https://lifehacker.com/make-chrome-less-distracting-with-vimium-and-these-set-5925220)
