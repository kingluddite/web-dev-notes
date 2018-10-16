# Intro
## frontend and backend
* Create a folder for each
* Use `.vscode` folder with `settings.json`

### frontend - .vscode/settings.json
* yellow bg

```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeForeground": "#000",
    "titleBar.inactiveForeground": "#000000CC",
    "titleBar.activeBackground": "#FFC600",
    "titleBar.inactiveBackground": "#FFC600CC"
  }
}
```

### backend - .vscode/settings.json
```json
{
  "workbench.colorCustomizations": {
    "titleBar.activeBackground": "#FF2C70",
    "titleBar.inactiveBackground": "#FF2C70CC"
  }
}
```

## custom
* Make sure you set your VS Code title to `custom`
* By default it is `native`
* `cmd` + `,` search for `title` and change to `custom`

## Open terminal in 2 tabs
* One for frontend
* One for backend

### Install dependencies in each folder
`$ cd frontend && npm i`

`$ cd ../ && cd backend && npm i`


