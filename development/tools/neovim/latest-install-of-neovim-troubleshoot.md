I was getting an error because of existing code folder

Error: It seems there is already a Binary at '/usr/local/bin/code'.

I removed it (All my VS code settings were here and I dropped them all - I was ready for a fresh start - you may not be... you're decision)

rm -rf /usr/local/bin/code

I then installed vscodium

brew cask install vscodium

I open vscodium and install Neo Vim Extension
* saw this warning in this extension - Neovim 0.5+ is required. Any version lower than that won't work. Many linux distributions have an old version of neovim in their package repo - always check what version are you installing.

The version of neovim I was using `nvim -v` was 0.4.4 so I needed to upgrade

NVIM v0.4.4 (my version of neovim)

brew upgrade neovim

But that only gave me 0.4.4

I got this warning (Warning: neovim 0.4.4 already installed)

brew install --HEAD neovim

I then got this warning trying to install the latest version of neovim

Error: neovim 0.4.4 is already installed
To install HEAD-c6ccdda, first run `brew unlink neovim`.

I needed to unlink neovim

brew unlink neovim

Then I tried to install the latest neovim with: brew install --HEAD neovim

It said I needed to install luarocks (luarocks was installed successfully)

brew install --HEAD neovim (I tried this again)

I got another error:

Error: An exception occurred within a child process:
  CompilerSelectionError: neovim cannot be built with any available compilers.
Install GNU's GCC:
  brew install gcc

So I install gcc with `$ brew install gcc`

I then got this error

Warning: Building gcc from source:
  The bottle needs the Xcode CLT to be installed.

And this instruction

xcrun: error: active developer path ("/Library/Developer/CommandLineTools") does not exist
Use `sudo xcode-select --switch path/to/Xcode.app` to specify the Xcode that you wish to use for command line developer tools, or use `xcode-select --install` to install the standalone command line developer tools.
See `man xcode-select` for more details

And so I used this command

xcode-select --install

I installed and agreed to xcodes CLI license agreement

And then I got 'Can't install the software because it is not currently available from the Software update server

Now I had to sign on to developer.app.com to download the Command line tools (this was an entirely new experience installing CLI tools for Max)

then this again 

brew install gcc

And this again

brew install --HEAD neovim

got this error

-- Could NOT find LUAJIT (missing: LUAJIT_INCLUDE_DIR)
CMake Error: The following variables are used in this project, but they are set to NOTFOUND.

so I installed luajit

brew install luajit

I was getting this error

https://i.imgur.com/6laA0Z4.png

I used this command to find out more info about my error

brew uninstall neovim --force

I saw that luajit was a problem so I installed and resintalled it

brew tap neovim/neovim
brew tap --repair
brew reinstall luajit
brew install neovim --HEAD --verbose
nvim -v

And finally I saw I successfully installed neovim 0.5.0

https://i.imgur.com/R2k1qGv.png

this is the repo for the latest release of neovim - https://github.com/neovim/neovim/releases
