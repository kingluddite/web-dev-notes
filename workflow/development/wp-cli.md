# WP CLI
**Note:**
```
$ - local terminal
```

## Remote SSH terminal
* SSH into your server
 
```
$ ssh kingludd@kingluddite.com
```

* You may have to enable SSH on your host.

When you are logged into SSH on the remote server you can navigate around that server.

```
# cd public_html
# curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
```

Then check if it works

```
$ php wp-cli.phar --info
```

Change so we just have to type `wp`

```
$ chmod +x wp-cli.phar
$ sudo mv wp-cli.phar /usr/local/bin/wp
```

Now this will work

```
$ wp --info
```

Output will look something like below:
![output](https://i.imgur.com/1t3tQ45.png)

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

```
$ which php
```

Output
/Applications/MAMP/bin/php/php5.6.10/bin/php

Change into your folder where you will install WordPress

```
$ cd /var/www/wp-project
```

Then install wordpress with this:

```
$ wp core download
```



So now you are ready to create your `wp-config.php` file

```
 wp core config --dbuser=root --dbpass=123 --dbname=bhs
```

If you get success, that file is created

Now you need to finish your core install by creating your title, username and password and email

```
$  wp core install --url=http://dev.bhs-wp.com --title=BHS --admin_user=peh2 --admin_password=password --admin_email=howley.phil@gmail.com
```

* If you get success, wordpress has been installed on command line. 
* Log in with the credentials you just created.

**IMPORTANT:** Remember to refresh terminal with:
```
$ source ~/.bash_profile'
```

* This makes `.bash_profile` changes live

**Note:** copy/paste [in google might give you wonky quotations](https://productforums.google.com/forum/#!topic/docs/qMlQPzQNRXY)

**Solution:** [turn off smart quotes in google docs](https://productforums.google.com/forum/#!topic/docs/qMlQPzQNRXY)

![screenshot](https://i.imgur.com/kz6wmFK.png)

**IMPORTANT:** Manually Check `Discourage search engines from indexing this site`

* wp cli version
```
# mkdir your_new_wp_site
# ch your_new_wp_site
# wp core download
# wp core config --dbhost=localhost --dbname=kingludd_soccer --dbuser=kingludd_soccer --dbpass=9fR7ZCVmj2REDTR
# chmod 644 wp-config.php
# wp core install --url=soccer.kingluddite.com --title="Soccer" --admin_name=soccer_admin --admin_password=4LongStrong1 --admin_email=howley.phil@gmail.com
```

### Back up DB

[helpful link](https://blog.sucuri.net/2015/07/wp-cli-guide-secure-wordpress-backup-update.html)

```
# wp db export
```

### Now backup the database and all wordpress files
* then pack up into GZ (zipped) file

```
# tar -vczf yourbackupfilename.gz .
```

### Transfer Backups
Once you have your backup, transfer it to 2 different places. 
**IMPORTANT** If you don’t have 2 different backups on 2 different servers, you don’t have a backup.

I created a spot on AWS for backups
ssh to aws
ssh -i ~/.ssh/smart_location.pem ec2-user@54.67.121.16


once logged in, go to the db folder (follow path below)
# cd /var/www/db
drag backup to respective folder
backup naming convention: domain_backup_fulldate (ie - dial800_backup_01012016.gz)

Should always be backed up in 2 locations
 
I store it in Documents/backups (put backup in respective website folder)

remove backup GZ and .sql files from wordpress local root folder
$ rm *.sql
$ rm *.gz

If a plugin conflict breaks your website, you will want to have at least the following ready to recover:

Core files for your current versions of 
* WordPress
* Plugins
* Themes
* Any custom or altered files
* Your wp-config.php or database credentials

### Update

```
# wp core update
# wp core update-db
```

Can You Log In Successfully?
At this point, you will want to check your website to make sure everything looks good and you can log in successfully.
You can use WP-CLI every day to check for critical WordPress updates, and with some practice, it can be an efficient way to manage WordPress securely.

### Backups
1. Your backups should be stored offsite and not on the same server as your website.
2. Another very important feature of any backup system is that it should be completely automated.
3. Schofield’s Second Law of Computing states that data doesn’t exist unless there are at least two copies of it. This means that your backup strategy has to include redundancy, or in other words, backups of your backups.
4. The final task in establishing a secure and reliable backup process is to test to make sure that the backup and restore actually works. Start with an empty web directory and then make sure you can use those backups to get all your data back and the website back online (with a test domain of course) using nothing but the files from the backup.

### Plugins/Themes
Do updates often for security
For every plugin and theme you add to your website, you are adding a whole directory of files that may contain a vulnerability. This is why you should choose additional themes/plugins wisely and remove the ones you don’t need. You can do all this directly in the WordPress console, as long as you have write access to the server and your SFTP credentials. Plain FTP is an insecure communication mechanism, please leverage SFTP when it’s available.

### Update all themes

```
wp plugin update-all
```

### Update all plugins

```
wp theme update-all
```

Maybe you want to check which plugins are installed, and which have updates available?

```
wp plugin list
wp theme list
```

Sample ways to modify plugins

```
wp plugin install akismet
wp plugin activate akismet
wp plugin update akismet
wp plugin deactivate zeroday
wp plugin delete zeroday
```

Sample ways to modify themes

```
wp theme install twentyfifteen
wp theme activate twentyfifteen
wp theme update twentyfifteen
wp theme disable twentyfifteen
wp theme delete twentyfifteen
```

Where to get name for theme/plugin?

If you want to install a new plugin but you don’t know the slug for it, you can find it as a directory under [WordPress.org](http://wordpress.org)

Of course, take care to only install plugins and themes from trusted sources because pirated and nulled themes and plugins are dangerous and often contain some nasty backdoors.

### Enable File Uploading

In your main WordPress installation folder enter the following SSH commands:

```
cd wp-content
mkdir uploads
chgrp web uploads/
chmod 775 uploads/
```

### Security Tip
You also want to run this command to remove the history of commands you typed during this session, which contains your super-secret WordPress configuration information!:
