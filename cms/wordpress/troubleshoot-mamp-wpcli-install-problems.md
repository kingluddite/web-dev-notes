# Troubleshoot MAMP/WP-CLI install problems

### Troubleshooting
Lots of bugs/problems can happen when trying to use WP-CLI with MAMP.

### Problems with MAMP and WP-CLI
* Check out [More notes on MAMP](mamp.md)

This is a common error. I've run into a bunch of different ones and spend more time then I would have liked to troubleshoot and resolve them. The main error has to do with something like `database connection`. MAMP is usually the problem. I think because I moved from MAMP to virtual box, vagrant, vvv I ran into problems because I first started with MAMP and set my .zshrc to be working with MAMP and then when I moved to virtualbox and went back and forth between MAMP and virtual box, I think I just had to update my .zshrc with the correct info. Just make sure whatever you are using the PHP and MySQL are pointing to the right place.

add this to your `.zshrc` file

**note** I use `oh-my-zsh` instead of bash. Lots of developers love oh-my-zsh and so I moved from bash to the zsh. I highly recommend [Wes Bos 10 free videos](http://wesbos.com/command-line-video-tutorials/) on getting up and running with zsh.

## If you are not using ZSH
But if you have not watched the videos then you will be using the Terminal and Bash.

To get WP-CLI playing nice with MAMP, you need to create your `.bash_profile`. [This is just a configuration file](http://www.joshstaiger.org/archives/2005/07/bash_profile_vs.html).

`$ touch ~/.bash_profile`

Open that file inside atom and you should see it is empty (I'm assuming you never created one before). Just add this code inside `.bash_profile` and save it.

`.bash_profile` (make sure it is located in your home directory)

```
export PATH=/usr/local/bin:/usr/local/sbin:$PATH
# The following MAMP export stuff is needed when you work with WP-CLI
# If you don't use it, you will get lots of errors and spend hours of your life trying to fix them. I just save you hours of your life!!! :)
# Use MAMP version of PHP
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"
```

### Time to refresh
You then need to refresh this config file to make the changes take affect.

`$ source ~/.bash_profile`

Now if you type:

`$ which php` and `$ which mysql` you should see paths to both PHP and MySQL (where they are located on your Mac) and this lets you know WP-CLI and MAMP will play nice together.

## If you are using the ZSH shell...
Follow these instructions

`.zshrc`

* Make sure your php version is the correct folder

```
##
# WP-CLI / MAMP compat
##
export PATH=/usr/local/bin:/usr/local/sbin:$PATH
# The following MAMP export stuff is needed when you work with WP-CLI
# If you don't use it, you will get lots of errors and spend hours of your life trying to fix them. I just save you hours of your life!!! :)
# Use MAMP version of PHP
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"
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
