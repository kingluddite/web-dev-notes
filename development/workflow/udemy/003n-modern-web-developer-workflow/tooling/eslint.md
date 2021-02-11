# Eslint
## If using [wes bos eslint with Create React app](https://github.com/wesbos/eslint-config-wesbos)
* You need to delete eslint from parent folder node_modules

`$ rm -rf node_modules/eslint`

* [source](https://stackoverflow.com/questions/60124662/create-react-app-eslint-error-while-deployment-on-local-machine)

* Using airbnb styleguide

`/.eslintrc`

```json
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0
    }
}
```

## Sublime Text
* You need to install these packages
    - `sublinter`
    - `sublinter contrib eslint`

* You must have eslint globally installed
* After installing those 3 you must do a full Sublime Text 3 shutdown
* Make setting to every time you hit save it will lint

`cmd` + `shift` + `p`

type sublimelinter
* select choose lint mode
* select load/save (when you open a new file you also want to lint it)

If you choose manual, you could type all your code than `cmd` + `shift` + `p` and type `lint this view` and it would lint it

You should have eslint installed globally already

Check with `$ eslint --version`

Don't have it? 

## Install Eslint
Install with `$ npm i -g eslint`

```
$ (
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install -g "$PKG@latest"
)
```

These are all peer dependencies for eslint. Event if you are not using React, you still need them

Close your javacript file and open it and eslint should be working
