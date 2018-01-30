# Intro to Underscores
* Make sure [MAMP is installed](https://www.mamp.info/en/)
    - Mac (but also for Windows? )
    - MySQL (database)
    - Apache (server)
    - PHP (server side language)
    - phpMyAdmin (DB GUI)
* Install free MAMP (not premium MAMP Pro)

## Create empty WordPress database
* Use phpMyAdmin
* Name it `bhs_wp`

## WP-CLI [website](http://wp-cli.org/)
[notes link](https://github.com/kingluddite/web-dev-notes/blob/master/wordpress/development/wp-cli.md)

### Install
`$ curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar`

## Troubleshooting
* I am using Zsh (my dotfiles)
* zash opens .zshrc
* Uncomment the lines necessary to get MySQL and PHP working with MAMP and .zshrc

```
# ...MORE STUFF
## MAMP stuff
PHP_VERSION=`ls /Applications/MAMP/bin/php/ | sort -n | tail -1`
export PATH=/Applications/MAMP/bin/php/${PHP_VERSION}/bin:$PATH
# MAMP and MYSQL
export PATH="/Applications/MAMP/Library/bin:$PATH"
# MORE STUFF...
```

## wp-config.php with wp-cli
`$ wp core config --dbuser=root --dbpass=root --dbname=bhs_wp`

* This is the default username and password with MAMP
* You can create a user

### More Troubleshooting
* If you get a session error from trying to view phpMyAdmin web page
* `$ sudo chmod -R 777 /Applications/MAMP/tmp/php`

    * Link to [website](http://underscores.me/)

## Create User - User accounts -> phpMyAdmin
* User name: phildev
* local --> localhost
* pwd: OC76scdGTSTpDil9
    - Generate password
* Global priv: Check all
* Click Go (bottom right corner)

## Delete root user
`$ rm -rf wp-config.php`

* Create new `wp-config.php`

`$ wp core config --dbuser=phildev --dbpass=3GliXg8OYZovUJEe --dbname=bhs_wp`

## Create WP Dashboard
```
$  wp core install --url=http://localhost/bhs-wp --title=BHSWP --admin_user=philuser --admin_password=3GliXg8OYZovUJEf --admin_email=myemail@gmail.com
```

### More troubleshooting
* Lots of problems can happen here
* We want to use a version of PHP7
* I install php with home brew
* which php? look at the path
* look at info from wp --info?
* Most issues come with this pointing to the default PHP on Macs
    - We need to make sure we are pointing to the latest version of PHP
    - Use [this gist](https://gist.github.com/jbanety/998a9e6d631d6ebbcba42b2a80498cda)
    - `$ touch upgrade-mamp-php-7.sh` and save to desk
    - Run with `$ sh upgrade-mamp-php-7.sh`
    - Rerun the dashboard code

## Turn debugging
* "White Screen of Death"

`wp-config.php`

```
// Set to false when in Production
define( 'WP_DEBUG', true );
```

## View new wordpress site
* With default theme

`http://localhost/bhs-wp/`

### Access dashboard
`http://localhost/bhs-wp/wp-admin`

#### Login:
* user:
* pwd:

## Security
* No admin username
* Strong passwords
* salts - https://api.wordpress.org/secret-key/1.1/salt/
* _wp table prefix

## Why use Underscores
* Enter a name for your theme
* CSS (not sassify - keep it simple for now)
* The files are not wordpress core but just the theme

## Install underscore
* Drag theme into `wordpress/wp-content/theme/`

`$ wp theme activate bhs`

* View `http://localhost/bhs-wp/`
* You now see "bare" underscores theme
