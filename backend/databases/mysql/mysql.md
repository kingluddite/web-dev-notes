# MySQL
## Lots of issues with Mysql 8.0.16
* Doesn't play nicely with Sequel Pro
* Installed workbench
* Forgot password and after installing Workbench could not connect via Workbench or console. I installed MySQL via homebrew
* Here is the fix ([thanks to this post](https://stackoverflow.com/questions/9695362/macosx-homebrew-mysql-root-password))

```
None of these worked for me. I think i already had mysql somewhere on my computer so a password was set there or something. After spending hours trying every solution out there this is what worked for me:

$ brew services stop mysql
$ pkill mysqld
$ rm -rf /usr/local/var/mysql/ # NOTE: this will delete your existing database!!!
$ brew postinstall mysql
$ brew services restart mysql
$ mysql -uroot
```

## Commands

When working with Vagrant you may get a strange MySQL error because you are opening too many files. The solution will be to increase MySQL memory by opening a file, increasing the memory and then halting and running vagrant up --provision. This was a rather troubling problem because it appeared that all my databases were destroyed and I couldn't open them in phpMyAdmin. Several hours spent researching it. Bottom line is memory is by default 1024 so that is too loo and needs to be increased. 

Linux

```
$ sudo service mysql start
```

```
$ sudo /etc/init.d/mysql restart
```

limits.conf

## Local db with vagrant

* SSH into Vagrant
    - make sure you are in /var/www/your-wordpress-install
    - where is your sql file? you may have to export it from phpMyAdmin on goDaddy.
        + How to export using phpMyAdmin
    - move the wp-sql-file.sql to your wp core install folder on vagrant and type this command.
        + you could also try to use `adminer` (using ip-address/adminer) to install the sql file but if it is too large (which it probably will be) it is best to use the terminal to install the sql file

Here is the terminal command to install a sql file into your local MySQL db

```
$ mysql -u root -p 123 fair_dev < fairprogram-local.sql
```


## How to extract data from mysql database

```
mysqldump --host=localhost --user=root --password=123 bhs --result-file=/Users/philiphowley/Documents/dev/puPHPet/bhs-wp/workspace/bhs-wp/wp-content/dump.sql
```
