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
