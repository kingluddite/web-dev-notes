# Visual Mode
## Three types of visual mode
1. characterwise (v)
2. linewise
3. blockwise
    * make vertical selections

### Characterwise (v)
* `o` moves you to oppisite end of  (toggle to quickly move between beginning and end of your selection)
* `y` puts what you yanked into the normal register

## Use TextObjects
* `viw` - select inner word
* `vap` - select entire paragragh
* Make all highlighted text uppercase
    - `vap` + shift U
* `gv` select what you last had highlighted and the same mode of visual mode
* `ctrl` + `v`
    - This is awesome you can now selection items vertically
    - `o` - toggles begin and end
    - `O` - toggles cursor left and right
    - `~` switch case command
* select all lines with `ctrl` + `v` + `$`

## Append text in visual mode
- `A` (lowercase a doesn't work)
- `a` will enter into insert mode
- type stuff and hit return and after a brief pause, you'll see the text apended onto every line

## Add comments using vim
* shift + v (capital V) enter visual line mode
* `:ce` so center text
* `ctrl` + `v` to enter block visual mode (vertical columns)
* select all lines for comment
* `j` down and replace spaces with `#`

```
################################################################################
#                                 Episode V:
#                           The Empire Strikes Back
################################################################################
```

### visual range
* When you highlight a range of lines
* You'll see range separate by comma at bottom

```
:'<,'>
```

* Highlight recent highlight `ctrl` + `g`
