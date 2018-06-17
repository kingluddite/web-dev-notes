
# VVV2

## How to migrate a DB
[link to how to do it](http://chronicoverengineering.com/pressable-vvv/)

### Import database
* During provisioning VVV imports any SQL dump file in `database/backups/` dir mapped by filename to the specific database
* First you need to make sure the custom database with permissions exists by editing `database/init-custom.sql` to contain:

```sql
CREATE DATABASE IF NOT EXISTS `mysite`;
GRANT ALL PRIVILEGES ON `mysite`.* TO 'root'@'localhost' IDENTIFIED BY 'root';
```

* Then copy your SQL dump file into `database/backups/mysite.sql`
* In case you have the database dump as separate files, just combine them into one with 

`$ cat *.sql > mysite.sql`

* Now with Vagrant running, run the provisioning vagrant provision to set up the database, or alternatively boot it up with:

`$ vagrant up --provision`

### Replace database strings
* As WordPress uses absolute urls for posts in the database, you need to convert each url to pointing to your earlier domain to the local development environment

#### ExampleEg
* `Pressable.com` site was accessed at `http://mysite.mystagingwebsite.com` and needs to be changed to `http://mysite.dev`

#### Search and Replace with WP-CLI
* VVV comes with WP-CLI installed that allows easy search and replace for the database
* Connect view ssh to your machine, navigate to site `www` directory and replace all string in database:

`$ vagrant ssh`

`$ cd /vagrant/www/mysite/public_html`

# Dry run first to check what would be replaced
`$ wp search-replace 'mysite.mystagingwebsite.com 'mysite.dev' --dry-run`

# After checking validating dry run output, run
`$ wp search-replace 'mysite.mystagingwebsite.com 'mysite.dev'`

* Alternatively a tool such as **Search Replace DB** can be used for doing replacements

### Done!
* Now (if you're lucky) the site should be accessible at `http://mysite.dev` on your local machine

* [tips on vvv2](https://wpbeaches.com/setting-up-a-wordpress-vvv-vagrant-workflow/)
* [vvv provision](https://github.com/Varying-Vagrant-Vagrants/VVV/wiki/Add-New-Domain)
* [force quit mac](http://osxdaily.com/2012/03/02/force-quit-mac-apps/)
* [how to view kill all processes](http://www.chriswrites.com/how-to-view-and-kill-processes-using-the-terminal-in-mac-os-x/)

## Problems running VVV2
### Did you run vagrant up?
* `$ vagrant up`

### Is a vagrant process running?
* Find the process

`$ ps -ax | grep vagrant`

`$ ps -ax | grep ruby`

### Kill the process    
`$ kill -9 2608`

### Run Vagrant up
`$ vagrant up`

### Provision that site
`$ vagrant provision --provision-with=site-elementsre`

## How to provision one site in vvv2
`$ vagrant provision --provision-with=site-elementsre`

## Setting up an existing database for WordPress
* If you want to setup a WordPress installation using a custom domain that uses an existing database that you have exported from MAMP or elsewhere, be sure to follow the above steps for a new database and then continue

1. Copy the SQL file containing your database from MAMP or other source to `{vvv-dir}/database/backups/new_database_name.sql`
2. Verify that the name of the SQL file matches that of the new database. If your database is named custom_database, your SQL file should be named `custom_database.sql`. If these names do not match, it will not work
3. At the command line in the `{vvv-dir}` directory, type vagrant provision. This will cause the database import script to run, setting up any new databases and importing existing data
4. At this point, accessing the custom domain setup in Nginx will lead you to a WordPress site containing the data from your SQL export

## How to create a new WP site
custom config file

```
testsite:
 repo: https://github.com/Varying-Vagrant-Vagrants/custom-site-template
 hosts:
   - testsite.test
```

Then run this line:

* `$ vagrant provision --provision-with=site-testsite`
* Obviously change `testsite` to your site name

## Install oh-my-zsh on VVV
```
# Added zsh shell.
sudo apt-get install zsh
wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh 
sudo chsh -s /bin/zsh vagrant
zsh
```

As an nice addition, so that your terminals don't look too similar on the different boxes

```
# Change the oh my zsh default theme.
sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="3den"/g' ~/.zshrc
```

## sshpass
* You will need to install this to get Wordmove to work
* Without it you can still send and get the database
* But to push and pull files you need sshpass install on the virtual vagrant box (after you ssh vagrant)
* Install with `apt-get install sshpass`
    - source - `https://gist.github.com/arunoda/7790979`
* You will get a permission error if you don't use `sudo`
* After that you can send and push templates, plugins, upload and core WordPress files

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


