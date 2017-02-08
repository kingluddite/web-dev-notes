# Atom Snippets

##### How to create your own custom snippets

Example: I don't like the default snippet for `style`. It adds this
`<style media="screen"></style>` and I just want `<style></style>`

Open snippets in Atom file menu. That will open `snippets.cson`. At the bottom type `snip` (the snippet for creating snippets) and change it to this:

```
'.text.html.basic':
  'Simple Style':
    'prefix': 'style'
    'body': """
        <style>
          ${1:Object}
        </style>
    """
```

This is a multiline snippet (using `"""` and `"""` at beginning and end enable you to do this)

If you just want a one liner use this format

```
'.text.html.basic':
  'Simple Style':
    'prefix': 'style'
    'body': '<style>${1:Object}</style>'
```

[Read this for more details](https://www.sitepoint.com/use-code-snippets-atom/)

* Indentation is important, take care to line up

```
# HTML Snippets
'.text.html.basic':
  'HTML Comment':
    'prefix': '<!'
    'body': '<!-- $1 -->'
  'Simple Style':
    'prefix': 'style'
    'body': """
        <style>
          ${1:Object}
        </style>
    """
  'Simple Script':
    'prefix': 'script'
    'body': """
        <script>
          ${1:Object}
        </script>
    """

# Sass snippets
'.source.scss':
  'Section Comment':
    'prefix': 'sc'
    'body': """
      /*=================================================
      $1
      =================================================== */
    """
  'Sub Section Comment':
    'prefix': 'ssc'
    'body': """
      /* $1
      =================================================== */
     """
```


* Default snippets
    - html + tab (html page)
* You can create your own snippets
* You can add Snippets via packages
* Autocomplete by default
    - Type a word and hit enter and it will type the rest of the word (in dropdown)
    - Autocomplete tells you `f` it is a function
