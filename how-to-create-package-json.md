# How to create package.json

Create `package.json` in the root of your custom theme

`$ npm init -y`

**note** the `-y` flag is a way to save you from answering all the questions npm usually asks you when it creates `package.json`.

### Grab Bootstrap 4

**note** This code may change so this is the site where you can the most updated `npm` code.

`$ npm install bootstrap@4.0.0-alpha.5 --save`

**note** the `--save` flag saves this to your `package.json`

Bootstrap 4 requires the `tether` and `jQuery` dependencies

You don't need to grab jQuery because it comes bundled with WordPress.

`$ npm install tether --save`

Check out your `package.json` and you should see Bootstrap 4 and tether are now listed in the `dependencies` portion of the JSON file.

## package.json

After installing bootstrap and saving it, `package.json` will look something like this:

```js
{
    "name": "thunder-tube-theme",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "peh2",
    "license": "ISC",
    "dependencies": {
        "bootstrap": "^4.0.0-alpha.5",
        "tether": "^1.3.7"
    }
}
```

* Your version numbers may be different
