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
export MAMP_PHP=/Applications/MAMP/bin/php/php5.3.6/bin/php 
export PATH="$MAMP_PHP:$PATH"
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

You will then (using MAMP) have more problems with `mysql`
make these changes to `.bash_profile`

```
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
[source for this code:](http://stackoverflow.com/questions/4145667/how-to-override-the-path-of-php-to-use-the-mamp-path)
```

You know this is all good for local development when your following queries both point to MAMP mysql and php

```
$ which mysql
```

Output
/Applications/MAMP/Library/bin/mysql

if you don't get out it means the program doesn't see mysql, so to see this you need to go into your `.bash_profile` or `.zshrc` and make it see it throught the PATH environment variable with this:

```
export PATH=$PATH:/Applications/MAMP/Library/bin
```

## Troubleshooting
if you have mysql command not found, open up your .zshrc file

can't connect through socket error
try this sym link solution
```
sudo ln -s /Applications/MAMP/Library/bin/mysql /usr/local/bin/mysql
```

```
$ which php
```

Output
/Applications/MAMP/bin/php/php5.6.10/bin/php

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
