# Cool Time saving Web techniques
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
