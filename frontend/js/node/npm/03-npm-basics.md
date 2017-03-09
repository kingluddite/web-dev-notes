# Updating Packages with npm

software versioning
3 numbers seperated by dots
0.8.3 (aka [semantic versioning](http://semver.org/), aka semver for short)
* first number 0: - major release
    + if you move from version 1 to 2 it means the code for version 1 will not work with version 2
    + version 1 usage is incompatible with version 2
* second digit 8: - minor release
    - going from 1.1 to 1.2 the code will still work on both
        + backward compatitble
        + not 100% guaranteed
        + add new functionality hopefully in a non-destructive way
* third digit 3: - patch releases
    - good idea to always update new patches as they may fix bugs in your project
^ in front of version number: instructs npm to install the latest minor release until the latest major release, minor releases don't tend to break backward compatibility

^1.1.2 would install --> 1.2, 1.3, 1.4... but not 2.0
~0.8.3 tells npm to install all the patch releases until the next minor release
    this will intall all 0.8.4, 0.8.5... but not 0.9
if you don't use ^ or ~ it will install specific version only

you can install older versions of package if you need to work on code when a bug hasn't been fixed yet

how do you know what is outdated?

```
$ npm outdated
```

![npm outdated output](https://i.imgur.com/oT1irtB.png)

## How to update npm packages
put it the ~ or ^ before semver and type

```
npm update
```

* if you type npm update and no feedback, you are up to date
and it will update your package to the latest version

## update global npm

```
$ npm update http-server -g
```

Semantic Versioning

MAJOR.MINOR.PATCH
^ before a version number means install up to the latest MINOR release.
e.g. ^1.1 can install 1.3 if available but not 2.0
~ before a version number means install up to the latest PATCH release.
e.g. ~2.0.1 can install 2.0.9 if available but not 2.1.0

## update npm globally

```
$ npm install npm -g
```

## update npm globally to latest

```
$ sudo npm -g install npm@latest
```

## uninstall packages

```
$ npm uninstall colors
```

to also remove it from package.json

```
$ npm uninstall colors --save
```

or uninstall dev dependencies

```
$ npm uninstall mocha --save-dev
```

uninstall global packages

```
$ npm uninstall http-server -g
```

