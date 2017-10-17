### VVV

Where are the local hosts defined on a mac?

`$ vi /etc/hosts`

### Install zsh and oh-my-zsh and different theme on ssh
* [link to stackoverflow](sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="3den"/g' ~/.zshrc)
* SSH into vvv

`$ vagrant ssh`

```
# Added zsh shell.
$ sudo apt-get install zsh
$ wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh 
$ sudo chsh -s /bin/zsh vagrant
$ zsh
```

* As an nice addition, so that your terminals don't look too similar on the different boxes

# Change the oh my zsh default theme
`$ sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="3den"/g' ~/.zshrc`

`zsh`

You will see a new theme like:

![new vvv zsh theme](https://i.imgur.com/pisXqCe.png)

* I created aliases inside `~/.zshrc`

```
#########
# PEH2 CUSTOM ALIASES
########
alias ibd="cd /srv/www/investors.com/wordpress/wp-content"
alias ibdp="cd /srv/www/investors.com/wordpress/wp-content/plugins/snappy-list-builder"
```

* zfrash!
* This will help you get around your vvv virtual box faster
* Note copy paste works using right click, but `"*y` will not because the virtual box and Your mac OS are two separate machines


