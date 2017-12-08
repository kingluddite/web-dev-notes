# The ZSH shell

## Search history without using command line and move around
```
Up     Ctrl+P
Down   Ctrl+N
Left   Ctrl+B
Right  Ctrl+F
Home   Ctrl+A
End    Ctrl+E
Delete Ctrl+D
```

* Alternatively, you could set up your shell to use vi command edition mode, by adding `set -o vi` to your shell startup file

## truncate the shell
1. Open .zshrc
2. Add this function

```
# more code
prompt_dir() {
    prompt_segment blue black "%-53<...<%~%<<"
}
```

3. Refresh your `.zshrc`

`$ source ~/.zshrc`

## Install Z
# Download to latest to home dir
wget https://raw.githubusercontent.com/rupa/z/master/z.sh -O ~/z.sh
# Add to .bashrc
`$ echo . /path/to/z.sh >> ~/.bashrc`
# Add to .zshrc
`$ echo . /path/to/z.sh >> ~/.zshrc`

[watch video tutorial](https://www.youtube.com/watch?v=qbNn5zJLZU0&index=10&list=PLu8EoSxDXHP7tXPJp5ZmUpuT7sFvrswzf)

## How to manually upgrade oh-my-zsh
`$ upgrade_oh_my_zsh`

**What is the Zsh shell?**
It's just a terminal.

**Why use Zsh?**
This is a really cool terminal.

There are many `Pros` to why you should use the `Zsh` shell. Here's my sales pitch to using it.

* Pros
    + lower case completion** document Document both work with tab
    + history based on what you have already typed in prompt - if you type c and hit up arrow, will only show you `commands with c`
    + Better than man page `ls - tab` see all flags!

Make directory and takes you inside it!

```
$ take
```

### Powerline fonts

* Add powerline fonts
[fonts](https://github.com/powerline/fonts/blob/master/Inconsolata/Inconsolata%20for%20Powerline.otf)

This is what the plain Terminal looks like:
![Terminal](https://i.imgur.com/OTyA3zw.png)

This is what Zsh looks like:
![Zsh](https://i.imgur.com/IiHCOfe.png)

Just based on that alone is cause to use Zsh. But there are tons of other things Zsh give you ability to do. If that doesn't pull you over to the dark side, watch these *[free Videos by Wes Bos](http://commandlinepoweruser.com/).

* Thanks for the tip Sean!

## Oh-my-zsh

[Read more about oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

Great people got together to make working with zsh great.

Install ZSH first

`$ sudo apt-get install zsh`

### Install oh-my-zsh

```
$ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### See hidden files

When working with zsh you will want to see hidden files. Just add the code below to get it to work.

source: [show hidden files on mac](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/) 

```
$ defaults write com.apple.finder AppleShowAllFiles YES
```

Press return and relaunch finder (_hover over finder icon on dashboard and hold down option key, this will let you relaunch finder)_
* You can also choose from dropdown

Now when you open it up you will see hidden files like `.zshrc` and `.oh-my-zsh`

### Choose a theme

[Lots](https://wiki.github.com/robbyrussell/oh-my-zsh/themes) to choose from.

Here's one theme:

**cobalt2**

[https://github.com/wesbos/Cobalt2-iterm](https://github.com/wesbos/Cobalt2-iterm)

### ~/.zshrc

This is your profile config file for `zsh`. The `bash` shell has the `.bash_profile` file. `zsh` has the `.zshrc` file.

It is located in the user directory (`~/.zshrc`)

Open that file in Sublime Text and change the `ZSH_THEME`.

```
ZSH_THEME="agnoster"
```

## `.zshrc` Make your terminal cool looking
* [link to my .zshrc](https://gist.github.com/kingluddite/773fa05efffe05b6b56e7d599cef1dfa)
* shorten the path


### Add useful plugins 
* Add [syntax highlighting plugin](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md)
  - install
    + `$ git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`
    + add to plugin list `.zshrc`
      * ` plugins=( [plugins...] zsh-syntax-highlighting)`
    + **zfrash!**
* Add [autosuggest](git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions)
* The font may be hard to see on augosuggest so go into iTerm2 and adjust it accordingly
  - install
    + `$ git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions`
    + add to plugin list in `.zshrc`
      * `plugins=(zsh-autosuggestions)`
    + **zfrash!**
* [alias-tips](https://github.com/djui/alias-tips)

## ag
Z is great when you’re moving to a specific directory, but what if you want to find a certain file or line of code? That’s where the silver searcher comes in. The silver search, aka ag, is great. It is an improvement over the many tools there are for searching on the command line. The biggest thing is that it is SUPER FAST. There are a lot of technical things in does in the background to get that speed, but the thing you should know is that it is fast.

You can easily search your entire codebase for a certain function call, or for a file you can’t remember where it was, anything you want. To put it in perspective, I just searched the entire WordPress codebase for wp_insert_post(), and it returned all the results in less than 1/10 of a second. And this is on a four year old machine. Pretty good.

To install `ag`, simply do `$ brew install the_silver_searcher`, and you’re all good to go.

## Install Z
* Tracks your most used directories, based on **frecency**
* [link to z](https://github.com/rupa/z)
  - install with:
    + Download `z.sh` file
    + Copy the `raw` code and save to $HOME directory
    + Save as `z.sh`
    + [watch video of installing z.sh](https://www.youtube.com/watch?v=qbNn5zJLZU0)
    + Open `~/.zshrc` and add this after your alias'
    
    ```
    # include Z
    . ~/z.sh
    ```

    + Works with a small DB so the more the use it the more it **learns**

## Start .zshrc in your `experiments` folder
`.zshrc`

```
# Start in experiments
cd ~/Documents/dev/experiments
```

### What is my Path?
If you ever need to find out the full path, just type `$ pwd`.

**What's my current theme in `zsh`?**

Open your `.zshrc` file

```bash
ZSH_THEME="cobalt2"
```

### Where are my Zsh themes located?

Open up that theme by going to your themes folder

```bash
$ cd ~/.oh-my-zsh/themes/
```

I'm using the `cobalt2` theme so I opened that theme up and commented out the existing code _(comments are made using #)_

## Keyboard shortcuts
Task | Keyboard shortcut
|--- | ---
| Clear line | `ctrl` + `u`
| Go back to previous directory | type dash `-`
| Autocomplete Folder/File (find stuff in folder and move between them) | press the `tab`
| links inside terminal | `cmd` + click
| search through history | `ctrl` + `r`
| clears screen but still has history | `cmd` + `r`

### Learn with Videos
[Wes Bos Intro](https://www.youtube.com/watch?v=IVgo5msaTlo)

Install oh my zsh
[video tutorial](https://www.youtube.com/watch?v=Tz4kScOIOW0)

[wes bos tips](https://www.youtube.com/watch?v=4q3eO17eEK4)

### Advanced history
### plugins
[wes bos video](https://www.youtube.com/watch?v=JsLHUSlwJBA)

###3 plugins overview
[link](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview)

## Troubleshooting

### You may run into problems with themes

[this link may help](https://github.com/robbyrussell/oh-my-zsh/issues/4182)

### Some problems after installing oh-my-zsh. 

Wordmove was was working great but after installing `zsh` and changing the `~/.zshrc` config and alias I could not get wordmove to work. I got ruby errors saying I did not have permissions. I then used `$ sudo gem install wordmove` and that would not let me install it because I didn't have a ruby 2.0.0 or greater. I did have it install but it did not work. I tried messing with the `.zshrc` PATH config and that didn't work. I got GEM_PATH GEM_HOME errors says they weren't properly defined? I couldn't get brew installed on `vagrant ssh`. I tried to install the linux flavor of brew no luck. It was 2 hours of pain but I finally just uninstall ruby and then reinstalled `rvm 2.2.2`. I checked the version and then installed wordmove and all was well.

**VERY IMPORTANT TIP**: don't install wordmove on osx. Install it on linux box. Following this tip will save you problems because the paths of wordmove are absolute paths based on the linux box.
[link for rvm install](https://rvm.io/rvm/install)

### Problems with ruby version
The error: keeps kicking back to default install of ruby 1.9
**My Solution:** _(I'll walk you through how the error happened and how I fixed it)_

When I tried to use Wordmove
```
$ wordmove
```

`zsh` says `command not found`
![command not found](https://i.imgur.com/hSVc130.png)

```
$ gem list
```

I use the abovi and I see wordmove is a local install

I get these errors:

```
Ignoring executable-hooks-1.3.2 because its extensions are not built.
and
Ignoring gem-wrappers-1.2.7 because its extensions are not built.
```

I run these two lines to fix them:

```
gem pristine executable-hooks --version 1.3.2
gem pristine gem-wrappers --version 1.2.7
```

But it still doesn't find `wordmove` command

I try to install wordmove again

```
$ gem install wordmove
```

But get this error:

`wordmove requires Ruby versio ~> 2.0.`

I type: 
```
$ ruby --version
```

And I see I'm only using the default install of ruby 1.9.3p484

I then show my list of rvms with

```
$ rvm list
```

And see I have `ruby-2.2.1` and `ruby-2.2.2` installed

Looks like `2.2.1` is current

I switch to `2.2.2` with

```
$ rvm use ruby-2.2.2
```

Success! it now understands `wordmove`

Whew!

## Add Oh My ZSH to Vagrant

Are you using Vagrant and VVV? If so, you can create your own `.zshrc` file inside your Vagrant box.

Here's how you install your `zsh` shell inside your vagrant box.

```
# Add zsh shell.
$ sudo apt-get install zsh

$ wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

$ sudo chsh -s /bin/zsh vagrant
zsh
```

As n nice addition, make it so that your terminals don't look too similar on your different boxes.

You should visually be able to know that you are on your local computer or on a remote box. I also like to know, when I'm developing locally, when I am in vagrant ssh and when I'm not. If you use zsh on all your different server environments, you can visually know where you are at all times. This is huge for preventing unwanted mistakes from happening.

```
# Change the oh my zsh default theme.
sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="dieter"/g' ~/.zshrc
```

### Need Xcode aggreement?

To bring up xcode aggreement:

```
$ sudo xcrun css
```

## Switching between `bash` and `zsh`

I like `ZSH` but I also like `BASH` as I've been using it so long and like the solarized and settings I set for it.

To easily switch to bash from zsh (make zsh your defaut profile). You can have a `.bash_profile` and a `.zshrc` file with all your aliases then to switch to bash

```
exec bash -l
```

That will log you in. If you **don't** do that you will have to refresh your `.bash_profile` with the following terminal command:

```
$ source ~/.bash_profile
```
