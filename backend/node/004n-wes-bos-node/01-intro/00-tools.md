# Tools
* Tools to make Pug easier to work with

## pug-lint
### `pug-lint` for Atom
* language-pug (_syntax highlighting_)

`.pug-lintrc` [github](https://www.npmjs.com/package/pug-lint)

```
{
  "extends": "./node_modules/coding-standard/.pug-lintrc",
  "disallowIdLiterals": null
}
```

* You need to have `Node.js` installed
* Install `pug-lint` globally

`$ npm install -g pug-lint`

## Emmet and Pug work well together

#### Sublime Text 3
If you use SublimeLinter 3 with Sublime Text 3, you can install the SublimeLinter-pug-lint plugin using Package Control.

#### Atom
If you use Atom, you can install the `linter-pug` package.

#### VS Code
If you use `VS Code`, you can install the `vscode-puglint` extension.

* Atom Text Editor
To get pug and emmet to play nice open `config.json` and add

```
"file-types":
    pug: "source.jade"
```

Just like this:

![add pug to emmet](https://i.imgur.com/yI8EAKV.png)

### Emmet to the rescue
**! + [tab]**

```
<!DOCTYPE html>
html(lang="en")
head
  meta(charset="UTF-8")
  title Document
body
```

**ul.dogs>li.dog.dog.$$*10**

```
ul.dogs
  li.dog.dog.01
  li.dog.dog.02
  li.dog.dog.03
  li.dog.dog.04
  li.dog.dog.05
  li.dog.dog.06
  li.dog.dog.07
  li.dog.dog.08
  li.dog.dog.09
  li.dog.dog.10
```

## Mongod troubleshoot
* Find what is running
`$ lsof -Pi | grep LISTEN`

* Kill the node process with extreme prejudice

`$ kill -9 $PID`
