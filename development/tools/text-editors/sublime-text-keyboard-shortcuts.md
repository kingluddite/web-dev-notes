# Sublime Text Keyboard shortcuts
## Make all text capitalized
1. `Opt` + `Cmd` + `f` | Opens find/replace
2. Do a **regex**
    find: `(^|\.\s|…\s)([a-z])`
    replace: `\1\u\2`

### Explanation:

1. The first find group (_parenthesis group_) captures a line beginning or a dot followed by a space or three dots character followed by a space
2. The second group captures a letter
3. In the replace expresion `\1` and `\2` refer to the captured groups
4. `\u` means translate one character to **uppercase**
5. This capitalizes lines starting with a character and sentences starting after other sentences

| Command | Description |
| ------- | -------- |
| `ctrl` + `p` | See previous command in history | This saves from stretching to see previous terminal history using up arrow
