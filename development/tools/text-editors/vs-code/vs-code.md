# VS Code


keyboard shortcuts
alt + up/down moves lines
shift + alt + up/down copy lines

## Sync VS code across your computers
* [https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync](link to sync vs code)
    - have problems with this
    - make sure no errors in vs user settings (fix them all)
    - create your unique gist key like it shows you (save in safe spot)
    - open vs code
    - reset with cmd pallette and select reset
    - restart vs code
    - upload settings and provide gist code
    - that should create a gist with all your settings
    - restart vs code just to be safe
    - download your settings on another machine and provide same gist api # and it should sync

## Choose cool theme
1. Install Material Theme and Reload
2. cmd shift p > type theme
3. choose material theme palenight high contrast

## Essential Configurations for React Apps

### Make VS Code use Sublime Text keyboard shortcuts
1. code > preferences > key map extensions
2. Click to **install** Sublime Text
3. Click **reload** for the changes to take effect

### Open your project inside VS Code from inside Terminal
* `shift` + `command` + `p` and select this:

![code command in path](https://i.imgur.com/pyuAEdH.png)

* Type `shell` and install
    - Now you can open VS code inside terminal using `$ code .` (`.` means current directory)
* **important** make sure you install VS code inside Applications folder!

## Preview Markdown files (icon top right)

## Split Screen (icon top right)

## Show/Hide sidebar
cmd + b

## Show/Hide Terminal
cmd + ~

## Search
cmd + shift + f

## Search through folder
cmd + shift + p

## go to line
cmd + p +type `:` and line number

## f1
* gives you list of stuff you can use

### language mode === React
* You will get tired of choosing JavaScript react or your react project files
* Follow these instructions to avoid that:
    - Within VS Code, in the bottom right of the window you will see a smiley face
        + To the left of that is the language the currently visible file is associated with (e.g. JavaScript)
        + Ensure your currently opened file is a `.js` file
* Clicking this will reveal a menu at the top
* Click the Configure File Association for '.js'..., and then choose "JavaScript React"

### How to Setup VS Code + Prettier + ESLint
* Watch this short Wes Bos video
    - [link to video tutorial](https://www.youtube.com/watch?v=YIvjKId9m2c)

### How to change tab selection to CMD+1, CMD+2, and CMD+3 (instead of CTRL+1, CTRL+2, CTRL+3)
* In Mac OS:
    - `Preference` > `Keyboard Shortcuts`
    - See `For advanced custo ... and edit keybindings.json` and click `keybindings.json`
    - Modify the config information in the file with the content below:

```
// Place your key bindings in this file to overwrite the defaults
[ 
{"key":"cmd+0", "command":"workbench.action.openLastEditorInGroup"},
{"key":"cmd+1", "command":"workbench.action.openEditorAtIndex1"}, 
{"key":"cmd+2", "command":"workbench.action.openEditorAtIndex2"}, 
{"key":"cmd+3", "command":"workbench.action.openEditorAtIndex3"},
{"key":"cmd+4", "command":"workbench.action.openEditorAtIndex4"}, 
{"key":"cmd+5", "command":"workbench.action.openEditorAtIndex5"}, 
{"key":"cmd+6", "command":"workbench.action.openEditorAtIndex6"},
{"key":"cmd+7", "command":"workbench.action.openEditorAtIndex7"},
{"key":"cmd+8", "command":"workbench.action.openEditorAtIndex8"}, 
{"key":"cmd+9", "command":"workbench.action.openEditorAtIndex9"}
]
```

* Save and you can use `cmd+[1-9]` to switch tab groups
