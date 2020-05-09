# Stylelint
`.stylelintrc`

```json
{
    "plugins": [
        "stylelint-order"
    ],
  "processors": ["stylelint-processor-styled-components"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-styled-components"
  ],
  "syntax": "scss",
    "rules": {
        "order/order": [
            "custom-properties",
            "declarations"
        ],
        "order/properties-alphabetical-order": true
    }
}
```

## For vim `vimrc` (my dotfiles)

```
" MORE CODE
Plug 'prettier/prettier'
Plug 'mitermayer/vim-prettier'
Plug 'pangloss/vim-javascript'

" MORE CODE
" ESLint through Vim
" Fix eslint on save
let g:ale_lint_on_text_changed = 'never'
" disable the Ale HTML linters
let g:ale_linters = {
\   'html': [],
\}
let g:ale_set_highlights = 0

let g:ale_fixers = {}
let g:ale_fixers['javascript'] = [
\ 'prettier', 'eslint'
\]
let g:ale_fix_on_save = 1
let g:ale_javascript_prettier_options = '--single-quote --trailing-comma es5'

" let g:ale_linters = {
"   \ 'javascript': ['stylelint', 'eslint'],
"   \}

" shortcut to run :ALEFix (<space>d)
nmap <leader>d <Plug>(ale_fix)
" MORE CODE
```
