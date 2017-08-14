# Installing Production Dependencies and Types
## Angular2 dependencies
`package.json`

```
// more code
"dependencies": {
    "@angular/common": "2.0.1",
    "@angular/compiler": "2.0.1",
    "@angular/compiler-cli": "^0.6.3",
    "@angular/core": "2.0.1",
    "@angular/forms": "2.0.1",
    "@angular/http": "2.0.1",
    "@angular/platform-browser": "2.0.1",
    "@angular/platform-browser-dynamic": "2.0.1",
    "@angular/platform-server": "2.0.1",
    "@angular/router": "3.0.1",
    "@angular/upgrade": "2.0.1",
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "hbs": "~4.0.1",
    "morgan": "~1.8.1",
    "serve-favicon": "~2.4.2"
  }
}
```

* Angular2 also needs polyfills to work correctly

`$ yarn add zone.js rxjs core-js`

* Above are the 3 dependencies I need to install to have my Application work correctly

## Now add Types
* Types are the bridge between JavaScript libraries and JavaScript code
* Angular2 is written in TypeScript
* We are using TypeScript
* But we are also using some commands from JavaScript libraries
    - Like from core.js
    - I need to install these types to have that bridge so my Angular2 code correctly uses these JavaScript packages

### Install them
`$ yarn add -D @types/node @types/core-js` 

`package.json`

```json
{
  "name": "peh2-seed-project",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "@angular/common": "~4.3.1",
    "@angular/compiler": "~4.3.1",
    "@angular/core": "~4.3.1",
    "@angular/forms": "~4.3.1",
    "@angular/http": "~4.3.1",
    "@angular/platform-browser": "~4.3.1",
    "@angular/platform-browser-dynamic": "~4.3.1",
    "@angular/platform-server": "~4.3.1",
    "@angular/router": "~4.3.1",
    "body-parser": "~1.17.1",
    "cookie-parser": "~1.4.3",
    "core-js": "^2.5.0",
    "debug": "~2.6.3",
    "express": "~4.15.2",
    "hbs": "~4.0.1",
    "morgan": "~1.8.1",
    "rxjs": "^5.4.3",
    "serve-favicon": "~2.4.2",
    "zone.js": "^0.8.16"
  },
  "devDependencies": {
    "@types/core-js": "^0.9.42",
    "@types/node": "^8.0.20"
  }
}
```

## Next - Work on our frontend build process
