# Prettier Setup
* Will automatically format and standarize the JavaScript code you write

## What is it?
* [video](https://www.youtube.com/watch?v=hkfBvpEfWdA)

## Install
* Globally

`$ yarn global add prettier`

* Sublime Text 3
    - Install the JsPrettier through Package Control

![settings](https://i.imgur.com/velNSec.png)

`jsPrettier.sublime-settings`

```json
{
  // Turns on/off autoformatting on save
  "auto_format_on_save": true,

  // Fit code within this line limit
  "printWidth": 80,

  // Number of spaces it should use per tab
  "tabWidth": 2,

  // Use the flow parser instead of babylon
  "useFlowParser": false,

  // If true, will use single instead of double quotes
  "singleQuote": true,

  // Controls the printing of trailing commas wherever possible
  "trailingComma": false,

  // Controls the printing of spaces inside array and objects
  "bracketSpacing": true
}
```

