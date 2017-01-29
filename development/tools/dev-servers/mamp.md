# MAMP

So if you are using MAMP you are not alone. It is free (there also is a pro version). It gets you set up pretty quickly with Apache, PHP, MySQL and phpMyAdmin. It's default port is :8888 so your local URL for development is http://localhost:8888. I'm not a fan of this and suggest you change the configuration to http://localhost.

Another thing I don't like about MAMP out of the box is how deep it is stored in your file system. The dev sites are stored in the `htdocs` folder. You can also change this in the configuration setup of MAMP. I recommend, if you're using a MAC which is what I use, that you create a `Sites` folder in your home directory (`~/your-use-name`). This is the way it used to be set up out of the box on Mac OS systems but in the recent past, they removed this folder. You'll see a lot of people use it.

I also don't like how you can mimick the box your prod site is on. If this is something you want you should checkout, Virtual Box and Vagrant.

If you want to easily migrate sites, I hear that many people love [DesktopServer](https://serverpress.com/get-desktopserver/)

### MAMP local testing causes problems
* Upgrade to using latest php
* Change this in `.bash_profile` (keep version up to date of PHP!)

`.bash_profile` (at top)

```
# MAMP STUFF (COMMENT OUT BEGIN to END if not using MAMP)
# BEGIN
# MAMP PHP
PHP_VERSION="ls /Applications/MAMP/bin/php/ | sort -n | tail -1"
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"
# END 
source $ZSH/oh-my-zsh.sh
```

Test with

```
$ php -v
```

You should see:

![output](https://i.imgur.com/QzljTo7.png)

Find path to where you know which `php` is being used

```
$ which php
```

Output:

![screenshot](https://i.imgur.com/HOnRQ4t.png)

You know this is all good for local development when your following queries both point to MAMP mysql and php

```
$ which mysql
```

Output
/Applications/MAMP/Library/bin/mysql

if you don't get out it means the program doesn't see mysql

## Troubleshooting
if you have mysql command not found, open up your `~.zshrc` file

can't connect through socket error
try this sym link solution
```
sudo ln -s /Applications/MAMP/Library/bin/mysql /usr/local/bin/mysql
```

## Local Environment
* Use MAMP
    - Pro not needed (use free version)
    - [download](https://www.mamp.info/en/downloads/)
    - Using MAMP preferences
        + Change URL from `http://localhost:8888` to `http://localhost`
        + Change root from `htdocs` to `Sites`
        + Add `Sites` to Mac Favorites (easy access)
        + Extract WordPress
            * Rename to your project
                - example: `bhs-wp`
        + Restart MySQL and Apache
        + Open MAMP `start page`
    - Create empty database (with a name like `bhs`) using phpMyAdmin
        + MAMP MAC default user is `root` (production different!)
        + MAMP MAC default password is `root` (production different!)
        + permissions on production and how you set it up on a host like godaddy is different

## Creating a Virtual host in MAMP

Tired of using `http://localhost/your-site` instead of something more useful like `http://my-site.dev`?

Real world scenario. You will get a SQL file from a member of your team and they might have the URL point to http://my-site.dev. If you don't change your host you will have to open the SQL file, find and replace their URL with your local URL. Doing this everytime you start working with a site is a bit of a paint. There is a better way and that is Creating a virtual host with MAMP.

[Here is an article](http://foundationphp.com/tutorials/vhosts_mamp.php) with step-by-step instructions.

### Summary of what you'll be doing:

* editings
    * `/etc/hosts`
    * `/Applications/MAMP/conf/apache/httpd.conf`
    * `/Applications/MAMP/conf/apache/extra/httpd-vhosts.conf`
 
After you follow the instructions in the blog post link mentioned above, be sure to stop and restart your apache server from MAMP.

## Manually stop MAMP MySQL
`$ /Applications/MAMP/bin/stopMysql.sh`
