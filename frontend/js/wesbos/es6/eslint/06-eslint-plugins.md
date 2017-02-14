# eslint plugins

[awesome-eslint](https://github.com/dustinspecker/awesome-eslint)

If you are writing code for a particular framework like Angular or React to mention a few, this page is a collection of linter style codes writter for that framwork

Lint for JavaScript inside HTML script tags and JavaScript inside Markdown

## Install plugins

[eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)

`$ npm i -g eslint-plugin-html`

### Add plugin to your `.eslintrc`

```json
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1
  },
  "plugins": ["html"]
}
```

And then test in an HTML file

`code-in-html.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Linting Code Inside of HTML</title>
</head>
<body>
<script>
  let age = 100;
  alert(age);
</script>
</body>
</html>
```

Then run eslint on that file

`$ eslint code-in-html.html`

And you will see errors like:

![errors on eslint and html](https://i.imgur.com/LA4Gd2h.png)

## Install htmlhint globally

`$ npm install htmlhint -g`

In atom install `linter-htmlhint`

Add this to the root of your site:

```json
{
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": true,
    "tag-pair": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true,
    "title-require": true
}
```

**note** it will not lint until you save. So just `cmd` + `s` and you will see the linter if you have any errors

# Install Markdown plugin for eslint
Now to lint JavaScript inside your Markdown

`$ npm i -g eslint-plugin-markdown`

## Add markdown to your plugins array

`.eslintrc`

```json
{
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": "airbnb",
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1
  },
  "plugins": ["html", "markdown"]
}
```

`fake-markdown.md`

You need to surround var x = 100; with backtics. I couldn't do it because it is markdown inside a markdown file and I'm not sure how to escape backtics properly.

```
# Fake JavaScript Docs

var x = 100;
```

Then run eslint with `$ elint *.md`

* This will search all of your markdown files in the directory
* It is a glob patter
* To find all options for eslint type: `$ eslint --help`

And you will see this error

![error with markdown and eslint](https://i.imgur.com/d87yW3p.png)

**note** currently you can not use `--fix` on html or markdown files

