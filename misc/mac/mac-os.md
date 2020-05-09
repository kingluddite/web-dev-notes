# Mac OS
## Turn off Mac Starting chime
`$ sudo nvram SystemAudioVolume=%80﻿`

* Enter password
* The next time you start... no chime

## Add arrows and other unique icons
`Command+Control+Spacebar` to open the Character Palette

## getting gyp: No Xcode or CLT version detected error
```
$ sudo rm -rf $(xcode-select -print-path)
$ xcode-select --install
```
