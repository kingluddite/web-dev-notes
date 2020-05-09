# Install live-server
* This will automatically refresh your browser
* Install globally

`$ npm i live-server -g`

* On Macs you may get a permissions error if so:

`$ sudo npm i live-server -g`

* Then type in your Mac password

`$ live-server .`

* Now we are no longer using the file protocol
    - In URL you'd see `file:///`
* Now we are using HTTP protocol
    - http://127.0.0.1:8080
    - 8080 is the default port (can be changed in live-server config)

## Download npm package `concurrently`
* Let's you run both the sass compliler and live-server in one terminal

`package.json`

```
// MORE CODE

  "scripts": {
    "serve": "live-server",
    "compile": "concurrently \"node-sass sass/main.scss css/style.css -w\" \" npm run serve\""
  },

// MORE CODE
```

### Run with
`$ npm run serve`

* This works to get sass compiled and watched

```
// MORE CODE

  "scripts": {
    "sass": "node-sass -w sass/main.scss -o dist"
  },

// MORE CODE
```


