# Troubleshoot MAMP/WP-CLI install problems

### Troubleshooting
Lots of bugs/problems can happen when trying to use WP-CLI with MAMP.

### Problems with MAMP and WP-CLI
* Check out [More notes on MAMP](mamp.md)

This is a common error. I've run into a bunch of different ones and spend more time then I would have liked to troubleshoot and resolve them. The main error has to do with something like `database connection`. MAMP is usually the problem. I think because I moved from MAMP to virtual box, vagrant, vvv I ran into problems because I first started with MAMP and set my .zshrc to be working with MAMP and then when I moved to virtualbox and went back and forth between MAMP and virtual box, I think I just had to update my .zshrc with the correct info. Just make sure whatever you are using the PHP and MySQL are pointing to the right place.

add this to your `.zshrc` file

**note** I use oh-my-zsh instead of bash. Lots of developers love oh-my-zsh and so I moved from bash to the zsh. I highly recommend Wes Bos 10 free videos on getting up and running with zsh.

`.zshrc`

* make sure your php version is the correct folder

```
##
# WP-CLI / MAMP compat
##
export MAMP_PHP=/Applications/MAMP/bin/php/php5.5.10/bin
export PATH="$MAMP_PHP:$PATH:/Applications/MAMP/Library/bin"
```

[ref](http://laurenpittenger.com/wpcli-error-establishing-database-connection-mamp/)

**IMPORTANT:** Remember to refresh bash or zshr with:
```
$ source ~/.bash_profile
# or
$ source ~/.zshrc 
```

I've also notice that if you follow all of the aforementioned troubleshooting techniques, it still may not work. The problem is that your computer is not pointing to the MAMP install of PHP or MySQL. The reason is Mac computers come preinstalled with their own MySQL and PHP and you most likely are pointing to those installs. I have noticed that when people switch to the .zsh shell, this problem happens a lot. I have students switch to the bash shell using:

`$ exec bash` and then refreshing the `~/.bash_profile` with `$ source ~/.bash_profile`

That seems to be a short term solution.

It should be noted this was one of the main reasons I stopped using MAMP at home and Use VVV, Vagrant and Virtual Box.

To switch back to the `.zsh` shell is as simple as `exec zsh`

You can refresh the `~/.zshrc` file with `$ source ~/.zshrc`

You now can jump back and forth between shells if you need to. Not a great solution but a solution nevertheless
